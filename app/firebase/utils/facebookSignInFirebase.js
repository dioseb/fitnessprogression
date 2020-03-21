import API from './firebase';

import isUserEqualFacebook from './isUserEqualFacebook';

import NotificationsApi from '../../api/notifications/notificationsApi';
const USER_API_ENDPOINT = 'http://10.5.118.95:3000/api/users';
//const USER_API_ENDPOINT = 'http://192.168.0.11:3000/api/users';

const onSignInFacebook = fbToken => {
    console.log('Facebook Token :', fbToken);
    if (fbToken) {
        const unsubscribe = API.auth().onAuthStateChanged(firebaseUser => {
            unsubscribe();
            if (!isUserEqualFacebook(fbToken, firebaseUser)) {
                // Build Firebase credential with the Facebook token.
                const credential = API.auth.FacebookAuthProvider.credential(fbToken);
                // Sign in with credential from the Facebook user.                    
                // CALL API TO CREATE USER BASED ON Facebook INFORMATIONS   
                API.auth().signInWithCredential(credential)
                    .then(async (result) => {
                        if (result.additionalUserInfo.isNewUser) {
                            console.log('NEW USER');
                            let token = await new NotificationsApi().registerForPushNotificationsAsync();
                            console.log(`token : ${token}`);

                            new Promise(async (resolve, reject) => {
                                console.log(`CREATE user with id : ${result.user.uid}`);
                                console.log(`CREATE user with email : ${result.additionalUserInfo.profile.email}`);
                                console.log(`${USER_API_ENDPOINT}/${result.user.uid}`);
                                await fetch(`${USER_API_ENDPOINT}`, {
                                    method: 'POST',
                                    headers: {
                                        Accept: 'application/json',
                                        'Content-Type': 'application/json',
                                    },
                                    body: JSON.stringify({
                                        id: result.user.uid,
                                        last_name: result.additionalUserInfo.profile.last_name,
                                        first_name: result.additionalUserInfo.profile.first_name,
                                        createdAt: new Date(),
                                        expoToken: token,
                                        email: result.additionalUserInfo.profile.email,
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
                                .then(async user => new Promise(async (resolve, reject) => {
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
                                    resolve(result);
                                }))
                                .catch(async (error) => {
                                    console.log('Request failed', error);
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
        });
    } else {
        console.log('Facebook Token :', token);
        API.auth().signOut();
    }
};

export default onSignInFacebook;