import * as Google from 'expo-google-app-auth';
//import * as Google from 'expo-google-sign-in';

import onSignInGoogle from './googleSignInFirebase';
import { iosClientId } from '../config/google_config';

//import { GoogleSignIn } from 'expo';

const signInWithGoogleAsync = async () => {
    console.log("Button Clicked !!!");
    try {
        const result = await Google.logInAsync({
            iosClientId: iosClientId,
            scopes: ['profile', 'email']
        });
        //PRODUCTION
        // await GoogleSignIn.initAsync({
        //     ClientId: 'com.googleusercontent.apps.566994980610-0lpb22vrk8286064pff7tbn7eele86c1',
        // })
        if (result.type === 'success') {
            onSignInGoogle(result);
            console.log(`Result.accessToken ${result.accessToken}`);
            return result.accessToken;
        }
        return { cancelled: true };
    } catch (e) {
        console.log(e);
        return { error: true };
    }
};

export default signInWithGoogleAsync;