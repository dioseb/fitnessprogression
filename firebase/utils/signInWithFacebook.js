import * as Facebook from 'expo-facebook';

import onSignInFacebook from './facebookSignInFirebase';

import { facebookAppId } from '../config/facebook_config';

const signInWithFacebookAsync = async () => {
    try {
        await Facebook.initializeAsync(facebookAppId, 'FitnessProgression')
            .then(async () => {
                await Facebook.logInWithReadPermissionsAsync({ permissions: ['public_profile'] })
                    .then(async (res) => {
                        if (res.type === 'success') {
                            onSignInFacebook(res.token);
                            alert('Logged in!', `Hi ${(await res.json()).name}!`);
                        } else {
                            console.log(`Error Response : type : ${res.type}, Token : ${res.token}`);
                        }
                    })
                    .catch(e => console.log(e));
            })
            .catch(e => console.log(e));
    } catch ({ message }) {
        alert(`Facebook Login Error: ${message}`);
    }
};

export default signInWithFacebookAsync;