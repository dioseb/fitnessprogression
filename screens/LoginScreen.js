import * as React from 'react';
import { StyleSheet, View, Button } from 'react-native';
import * as Google from 'expo-google-app-auth';
import firebase from 'firebase';

//import { GoogleSignIn } from 'expo';
//import { googleConfig } from '../config/google_config';

import UsersApi from '../api/users/users_api';
import NotificationsApi from '../api/notifications/notifications_api';
import { resolveUri } from 'expo-asset/build/AssetSources';

const USER_API_ENDPOINT = 'http://192.168.0.7:3000/api/users';

class LoginScreen extends React.Component {
    isUserEqual = (googleUser, firebaseUser) => {
        console.log(`isUserEqual Called !!!`);
        if (firebaseUser) {
            var providerData = firebaseUser.providerData;
            for (var i = 0; i < providerData.length; i++) {
                if (
                    providerData[i].providerId === firebase.auth.GoogleAuthProvider.PROVIDER_ID
                    && providerData[i].uid === googleUser.getBasicProfile().getId()
                ) {
                    // We don't need to reauth the Firebase connection.
                    return true;
                }
            }
        }
        return false;
    };

    onSignIn = async googleUser => {
        console.log('Google Auth Response :', googleUser);
        // We need to register an Observer on Firebase Auth to make sure auth is initialized.
        var unsubscribe = firebase.auth().onAuthStateChanged(
            async (user) => {
                unsubscribe();
                // Check if we are already signed-in Firebase with the correct user.
                if (!this.isUserEqual(googleUser, user)) {
                    // Build Firebase credential with the Google ID token.
                    var credential = firebase.auth.GoogleAuthProvider.credential(
                        googleUser.idToken,
                        googleUser.accessToken
                    );

                    // Sign in with credential from the Google user.                    
                    // CALL API TO CREATE USER BASED ON GOOGLE INFORMATIONS                   
                    await firebase.auth().signInWithCredential(credential)
                        .then(async (result) => {
                            console.log('user signed in');
                            if (result.additionalUserInfo.isNewUser) {
                                console.log('NEW USER');

                                let token = await new NotificationsApi().registerForPushNotificationsAsync();
                                console.log(`token : ${token}`);

                                new Promise(async (resolve, reject) => {
                                    console.log(Date.now());
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
                                            last_name: result.additionalUserInfo.profile.given_name,
                                            first_name: result.additionalUserInfo.profile.family_name,
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
            }
        );
    };

    signInWithGoogleAsync = async () => {
        console.log("Button Clicked !!!");
        try {
            const result = await Google.logInAsync({
                //androidClientId: YOUR_CLIENT_ID_HERE,
                iosClientId: '566994980610-ehseo4kf7lqvhll2tobmpgkuk8jt6bsu.apps.googleusercontent.com',
                scopes: ['profile', 'email']
            });

            //PRODUCTION
            // await GoogleSignIn.initAsync({
            //     ClientId: 'com.googleusercontent.apps.566994980610-0lpb22vrk8286064pff7tbn7eele86c1',
            // })

            if (result.type === 'success') {
                console.log("success");
                this.onSignIn(result);
                return result.accessToken;
            } else {
                console.log("cancelled");
                return { cancelled: true };
            }
        } catch (e) {
            console.log(e);
            return { error: true };
        }
    }

    render() {
        return (
            <View style={styles.container}>
                <Button title="Sign in with google"
                    onPress={() => this.signInWithGoogleAsync()} />
            </View>
        );
    }
}

export default LoginScreen;

LoginScreen.navigationOptions = {
    header: null,
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#fff',
    }
});