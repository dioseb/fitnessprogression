import * as React from 'react';
import { StyleSheet, View, Button } from 'react-native';
import * as Google from 'expo-google-app-auth';
import { Notifications } from 'expo';
import * as Permissions from 'expo-permissions';
//import { GoogleSignIn } from 'expo';
//import { googleConfig } from '../config/google_config';
import firebase from 'firebase';

const PUSH_ENDPOINT_CREATEUSER = 'http://192.168.0.7:3000/api/users';
const PUSH_ENDPOINT_UPDATEUSER = 'http://192.168.0.7:3000/api/users/';
//const PUSH_ENDPOINT_REGISTER_NOTIFICATIONS = 'http://192.168.0.7:3000/api/notifications/registerForPushNotifications/';

class LoginScreen extends React.Component {
    isUserEqual = (googleUser, firebaseUser) => {
        console.log(`isUserEqual Called !!!`);
        if (firebaseUser) {
            var providerData = firebaseUser.providerData;
            for (var i = 0; i < providerData.length; i++) {
                if (
                    providerData[i].providerId ===
                    firebase.auth.GoogleAuthProvider.PROVIDER_ID &&
                    providerData[i].uid === googleUser.getBasicProfile().getId()
                ) {
                    // We don't need to reauth the Firebase connection.
                    return true;
                }
            }
        }
        return false;
    };

    onSignIn = googleUser => {
        console.log('Google Auth Response :', googleUser);
        // We need to register an Observer on Firebase Auth to make sure auth is initialized.
        var unsubscribe = firebase.auth().onAuthStateChanged(
            function (firebaseUser) {
                unsubscribe();
                // Check if we are already signed-in Firebase with the correct user.
                if (!this.isUserEqual(googleUser, firebaseUser)) {
                    // Build Firebase credential with the Google ID token.
                    var credential = firebase.auth.GoogleAuthProvider.credential(
                        googleUser.idToken,
                        googleUser.accessToken
                    );

                    // Sign in with credential from the Google user.                    
                    // CALL API TO CREATE USER BASED ON GOOGLE INFORMATIONS                   
                    firebase
                        .auth()
                        .signInWithCredential(credential)
                        .then(async (result) => {
                            console.log('user signed in');
                            if (result.additionalUserInfo.isNewUser) {
                                console.log('NEW USER');
                                let token;
                                //CHECK IF PERMISSION FOR NOTIFICATIONS IS GRANTED
                                const { status: existingStatus } = await Permissions.getAsync(
                                    Permissions.NOTIFICATIONS
                                );
                        
                                let finalStatus = existingStatus;
                        
                                // only ask if permissions have not already been determined, because
                                // iOS won't necessarily prompt the user a second time.
                                if (existingStatus !== 'granted') {
                                    // Android remote notification permissions are granted during the app
                                    // install, so this will only ask on iOS
                                    const { status } = await Permissions.askAsync(Permissions.NOTIFICATIONS);
                                    finalStatus = status;
                                }
                        
                                // Stop here if the user did not grant permissions
                                if (finalStatus !== 'granted') {
                                    token = '';
                                }
                                else {
                                    token = await Notifications.getExpoPushTokenAsync();
                                }
                                
                                new Promise(async (resolve, reject) => {
                                    console.log(Date.now());
                                    console.log(`CREATE user with id : ${result.user.uid}`);
                                    console.log(`${PUSH_ENDPOINT_CREATEUSER}`);
                                    await fetch(`${PUSH_ENDPOINT_CREATEUSER}`, {
                                        method: 'POST',
                                        headers: {
                                            Accept: 'application/json',
                                            'Content-Type': 'application/json',
                                        },
                                        body: JSON.stringify({
                                            id: result.user.uid,
                                            last_name: result.additionalUserInfo.profile.given_name,
                                            first_name: result.additionalUserInfo.profile.family_name,
                                            createdAt: Date.now(),
                                            expoToken: token,
                                            email: result.user.email
                                        }),
                                    })
                                    resolve(result);
                                })
                                .catch(async (error) => {
                                    console.log('Request failed', error);
                                })
                                // new Promise(async (resolve, reject) => {
                                //     console.log(`REGISTERNOTIFICATION for user : ${result.user.uid}`);
                                //     console.log(`${PUSH_ENDPOINT_REGISTER_NOTIFICATIONS}${result.user.uid}`);
                                //     await fetch(`${PUSH_ENDPOINT_REGISTER_NOTIFICATIONS}${result.user.uid}`, {
                                //         method: 'POST',
                                //         headers: {
                                //             Accept: 'application/json',
                                //             'Content-Type': 'application/json',
                                //         },
                                //         body: JSON.stringify({
                                //             expoToken: token
                                //         }),
                                //     })
                                //     resolve(result);
                                // })
                                // .catch(async (error) => {
                                //     console.log('Request failed', error);
                                // })
                            } else {
                                console.log(`UPDATE User with id ${result.user.uid}`);
                                new Promise(async (resolve, reject) => {
                                    console.log(`${PUSH_ENDPOINT_UPDATEUSER}${result.user.uid}`);
                                    let res = await fetch(`${PUSH_ENDPOINT_UPDATEUSER}${result.user.uid}`, {
                                        method: 'PUT',
                                        headers: {
                                            Accept: 'application/json',
                                            'Content-Type': 'application/json',
                                        },
                                        body: JSON.stringify({
                                            last_logged_in: Date.now()
                                        }),
                                    })
                                    resolve(res);
                                })
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
            }.bind(this)
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