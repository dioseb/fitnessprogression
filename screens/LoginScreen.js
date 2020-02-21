import * as React from 'react';
import { StyleSheet, View, Button } from 'react-native';
import * as Google from 'expo-google-app-auth';
//import { GoogleSignIn } from 'expo';
//import { googleConfig } from '../config/google_config';

import firebase from 'firebase';

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
                    //-----------------------------------------------------
                    // TODO
                    // CALL API TO CREATE USER BASED ON GOOGLE INFORMATIONS
                    //-----------------------------------------------------
                    firebase
                        .auth()
                        .signInWithCredential(credential)
                        .then(function (result) {
                            console.log('user signed in ');
                            if (result.additionalUserInfo.isNewUser) {
                                firebase
                                    .database()
                                    .ref('/users/' + result.user.uid)
                                    .set({
                                        gmail: result.user.email,
                                        profile_picture: result.additionalUserInfo.profile.picture,
                                        first_name: result.additionalUserInfo.profile.given_name,
                                        last_name: result.additionalUserInfo.profile.family_name,
                                        created_at: Date.now()
                                    })
                                    .then(function (snapshot) {
                                        // console.log('Snapshot', snapshot);
                                    });
                            } else {
                                firebase
                                    .database()
                                    .ref('/users/' + result.user.uid)
                                    .update({
                                        last_logged_in: Date.now()
                                    });
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