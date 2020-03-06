import API from './firebase';

import isUserEqualGoogle from './isUserEqualGoogle';

import NotificationsApi from '../../api/notifications/notificationsApi';

import { USER_API_ENDPOINT } from '../../api/config/config';

const onSignInGoogle = async googleUser => {
    console.log('Google Auth Response :', googleUser);
    // We need to register an Observer on Firebase Auth to make sure auth is initialized.
    var unsubscribe = API.auth().onAuthStateChanged(
        async (user) => {
            unsubscribe();
            // Check if we are already signed-in Firebase with the correct user.
            if (!isUserEqualGoogle(googleUser, user)) {
                // Build Firebase credential with the Google ID token.
                var credential = API.auth.GoogleAuthProvider.credential(
                    googleUser.idToken,
                    googleUser.accessToken
                );

                // Sign in with credential from the Google user.                    
                // CALL API TO CREATE USER BASED ON GOOGLE INFORMATIONS                   
                await API.auth().signInAndRetrieveDataWithCredential(credential)
                    .then(async (result) => {
                        console.log('user signed in');
                        if (result.additionalUserInfo.isNewUser) {
                            console.log('NEW USER');

                            let token = await new NotificationsApi().registerForPushNotificationsAsync();
                            console.log(`token : ${token}`);

                            new Promise(async (resolve, reject) => {
                                console.log(`CREATE user with id : ${result.user.uid}`);
                                console.log(`${USER_API_ENDPOINT}/${result.user.uid}`);
                                await fetch(`${USER_API_ENDPOINT}`, {
                                    method: 'POST',
                                    headers: {
                                        Accept: 'application/json',
                                        'Content-Type': 'application/json',
                                    },
                                    body: JSON.stringify({
                                        id: result.user.uid,
                                        last_name: result.additionalUserInfo.profile.family_name,
                                        first_name: result.additionalUserInfo.profile.given_name,
                                        createdAt: new Date(),
                                        expoToken: token,
                                        email: result.user.email,
                                        last_logged_in: new Date()
                                    }),
                                })
                                resolve(result);
                            })
                                .catch(async (error) => {
                                    console.log('Request failed', error);
                                })
                        } else {
                            console.log(`GET User by id ${result.user.uid}`);
                            await fetch(`${USER_API_ENDPOINT}/${result.user.uid}`)
                                .then(async response => response.json())
                                .then(async user => {
                                    console.log(`UPDATE User with id ${user.id}`);
                                    console.log(`${USER_API_ENDPOINT}/${user.id}`);
                                    await fetch(`${USER_API_ENDPOINT}/${user.id}`, {
                                        method: 'PUT',
                                        headers: {
                                            Accept: 'application/json',
                                            'Content-Type': 'application/json',
                                        },
                                        body: JSON.stringify({
                                            id: user.id,
                                            last_name: user.last_name,
                                            first_name: user.first_name,
                                            createdAt: user.createdAt,
                                            expoToken: user.expoToken,
                                            email: user.email,
                                            last_logged_in: new Date()
                                        }),
                                    })
                                })
                        }
                    })
                    .catch(function (error) {
                        // Handle Errors here.
                        var errorCode = error.code;
                        var errorMessage = error.message;
                        // The email of the user's account used.
                        var email = error.email;
                        // The firebase.auth.AuthCredential type that was used.
                        var credential = error.credential;

                        console.log(`ErrorCode : ${errorCode}, errorMessage : ${errorMessage},
                            email : ${email}, credential : ${credential}`);
                    });
            } else {
                console.log('User already signed-in Firebase.');
            }
        }
    );
};

export default onSignInGoogle;