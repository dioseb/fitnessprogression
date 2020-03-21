import * as React from 'react';
import { StackActions } from 'react-navigation';
import { StyleSheet, StatusBar, ImageBackground } from 'react-native';
import * as Animatable from 'react-native-animatable';

import bground from '../../../assets/images/background.png';
import API from '../../firebase/utils/firebase';

import { useAuth } from "../../provider";

export default function AuthLoading({ navigation }) {
    console.log(`0. AuthLoading start`)
    // ASYNC STORAGE
    const { getAuthState } = useAuth();

    // React.useEffect(() => {
    //     isUserLoggedIn(loginAction);
    // }, [isUserLoggedIn]);

    React.useEffect(() => {
        console.log(`1. Before initialize`)
        initialize()
    }, []);

    function goToScreen(routeName) {
        navigation.navigate(routeName)
    }

    async function initialize() {
        console.log(`2. initialize called LoadingScreen`)
        try {
            console.log(`3. before getAuthState LoadingScreen`)
            const { user } = await getAuthState();
            console.log(`4. after getAuthState LoadingScreen`)
            if (user) {
                console.log(`0. User from LoadingScreen : ${user}`)

                //check if user exist
                if (user) {   
                    console.log(`1. Username from LoadingScreen : ${user}`)                 
                    goToScreen('App');
                }
                else {
                    console.log(`2. Username from LoadingScreen : ${user}`)
                    goToScreen('Auth', {}, StackActions.replace({ routeName: "Username" }))
                }
            } else {
                console.log(`3. User from LoadingScreen : ${user}`)
                goToScreen('Auth');
            }
        } catch (e) {
            console.log(`4. Error : ${e}`)
            goToScreen('Auth');
        }
    }

    // const isUserLoggedIn = React.useCallback(async (loginAction) => {
    //     // ASYNCSTORAGE
    //     const response = await getUser();

    //     // FIREBASE
    //     console.log(`Firebase called from LoadingScreen`);
    //     API.auth().onAuthStateChanged(async (user) => {
    //         //console.log("0. User connected", !!user);
    //         //console.log("0. User :", user);
    //         if (!user && response == null || response == '') {
    //             console.log(`1. Response storageUser from LoadingScreen : ${JSON.stringify(response)}`);
    //             console.log(`1. user firebaseUser from LoadingScreen : ${JSON.stringify(user)}`);
    //             goToScreen('Auth');
    //         }
    //         else if (!user && response || response == '') {
    //             console.log(`2. Response storageUser from LoadingScreen : ${JSON.stringify(response)}`);
    //             console.log(`2. User firebaseUser from LoadingScreen : ${JSON.stringify(user)}`);
    //             loginAction({ type: 'sing-in', data: response })
    //             goToScreen('Dashboard');
    //         }
    //         else {
    //             //setFUser(user);
    //             // console.log(`3. storageUser from LoadingScreen : ${JSON.stringify(response)}`);
    //             // console.log(`3. firebaseUser from LoadingScreen : ${JSON.stringify(user)}`);
    //             console.log(`3. fUser : ${JSON.stringify(user)}`);
    //             iniciarSesion();          
    //         }
    //     });
    // }, [navigation]);

    // function iniciarSesion() {
    //     loginAction({ type: 'sign-up', data: fUser });
    //     goToScreen('Dashboard');
    // }

    return (
        <ImageBackground source={bground} style={styles.backgroundContainer}>
            <StatusBar translucent backgroundColor='rgba(0,0,0,0.2)' />
            <Animatable.Image
                animation="pulse"
                easing="ease-out"
                iterationCount="infinite"
                style={{
                    width: 150,
                    height: 150,
                    margin: 150
                }}
                source={require('../../../assets/images/instaIcon.png')}
            />
        </ImageBackground>
    );
};

const styles = StyleSheet.create({
    backgroundContainer: {
        flex: 1,
        width: null,
        height: null,
        justifyContent: 'center',
        alignItems: 'center'
    }
});