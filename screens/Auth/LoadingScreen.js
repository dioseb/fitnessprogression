import * as React from 'react';
import { StyleSheet, StatusBar, ImageBackground } from 'react-native';
import * as Animatable from 'react-native-animatable';

import bground from '../../assets/images/background.png';
import API from '../../firebase/utils/firebase';

import { getUser } from '../../storage/UserAsyncStorage';
import { UserContext } from '../../context/UserContext';

const LoadingScreen = ({ navigation }) => {
    // ASYNC STORAGE
    const [login, loginAction] = React.useContext(UserContext)

    React.useEffect(() => {
        isUserLoggedIn(loginAction);
    }, [isUserLoggedIn]);

    const isUserLoggedIn = React.useCallback(async (loginAction) => {
        // ASYNCSTORAGE
        const response = await getUser();

        // FIREBASE
        console.log(`Firebase called from LoadingScreen`);
        var unsubscribe = API.auth().onAuthStateChanged((user) => {
            unsubscribe();
            console.log("user connected", !!user);
            console.log("user :", user);
            if (!user && response == null) {
                console.log(`1. storageUser from LoadingScreen : ${JSON.stringify(response)}`);
                console.log(`1. firebaseUser from LoadingScreen : ${JSON.stringify(user)}`);
                goToScreen('Auth');
            }
            else if (!user && response) {
                console.log(`2. storageUser from LoadingScreen : ${JSON.stringify(response)}`);
                console.log(`2. firebaseUser from LoadingScreen : ${JSON.stringify(user)}`);
                loginAction({ type: 'sing-in', data: response })
                setTimeout(() => {
                    goToScreen('Dashboard');
                }, 2000)
            }
            else {
                console.log(`3. storageUser from LoadingScreen : ${JSON.stringify(response)}`);
                console.log(`3. firebaseUser from LoadingScreen : ${JSON.stringify(user)}`);
                loginAction({ type: 'sing-in', data: user })
                setTimeout(() => {
                    goToScreen('Dashboard');
                }, 2000)
            }
        });
    }, [navigation]);


    function goToScreen(routeName) {
        navigation.navigate(routeName)
    }

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
                source={require('../../assets/images/instaIcon.png')}
            />
        </ImageBackground>
    );
};

export default LoadingScreen;

const styles = StyleSheet.create({
    backgroundContainer: {
        flex: 1,
        width: null,
        height: null,
        justifyContent: 'center',
        alignItems: 'center'
    }
});