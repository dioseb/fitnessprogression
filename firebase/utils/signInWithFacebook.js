import * as Facebook from 'expo-facebook';

import onSignInFacebook from './facebookSignInFirebase';

import { facebookAppId } from '../config/facebook_config';

const signInWithFacebookAsync = async () => {
    try {
        await Facebook.initializeAsync(facebookAppId, 'FitnessProgression')
            .then(async () => {
                await Facebook.logInWithReadPermissionsAsync({ permissions: ['public_profile'] })
                    .then(async (type, token) => {
                        if (type === 'success') {
                            console.log('Success :', 'logInWithReadPermissionsAsync SUCCESS');
                            onSignInFacebook(token);
                            Alert.alert('Logged in!', `Hi ${(await response.json()).name}!`);
                        } else {
                            console.log(`Error Response : ${type}, Token : ${token}`);
                        }
                    })
                    .catch(e => console.log(e));
            })
            .catch(e => console.log(e));
    } catch ({ message }) {
        alert(`Facebook Login Error: ${message}`);
    }
    //   try {
    //     await Facebook.initializeAsync(facebookAppId);
    //     const { 
    //         type, 
    //         token,
    //         expires,
    //         permissions,
    //         declinedPermissions
    //     } = await Facebook.logInWithReadPermissionsAsync(
    //       facebookAppId,
    //       {
    //         permissions: ['public_profile', 'email'],
    //       }
    //     );

    //     if (type === 'success') {
    //       onSignInFacebook(token);
    //     } else {
    //       console.log('Error Response');
    //     }
    //   } catch ({ message }) {
    //     alert(`Facebook Login Error: ${message}`);
    //   }
};

export default signInWithFacebookAsync;