import * as Google from 'expo-auth-session/providers/google';
//import * as Google from 'expo-google-sign-in';

import onSignInGoogle from './googleSignInFirebase';
import { iosClientId, androidClientId } from '../config/google_config';

//import { GoogleSignIn } from 'expo';

const signInWithGoogleAsync = async () => {    
    console.log("1. signInWithGoogleAsync called");
    try {
        const result = await Google.useAuthRequest({
            iosClientId: iosClientId,
            androidClientId: androidClientId,
            scopes: ['profile', 'email'],
            permissions: ["public_profile", "email", "gender", "location"]
        });
        //PRODUCTION
        // await GoogleSignIn.initAsync({
        //     ClientId: 'com.googleusercontent.apps.566994980610-0lpb22vrk8286064pff7tbn7eele86c1',
        // })
        if (result.type === 'success') {
            onSignInGoogle(result);
            console.log(`2. Google AccessToken : ${result.accessToken}`);

            return result.accessToken;
        }
        return { cancelled: true };
    } catch (e) {
        console.log(e);
        return { error: true };
    }
};

export default signInWithGoogleAsync;