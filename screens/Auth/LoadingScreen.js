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
        API.auth().onAuthStateChanged((user) => {
            //console.log("user connected", !!user);
            //console.log("user :", user);
            if (!user && response == null) {
                console.log(`storageUser from LoadingScreen : ${JSON.stringify(response)}`);
                console.log(`firebaseUser from LoadingScreen : ${JSON.stringify(user)}`);
                goToScreen('LoginAnimated');
            }
            else if (!user && response) {
                console.log(`storageUser from LoadingScreen : ${JSON.stringify(response)}`);
                console.log(`firebaseUser from LoadingScreen : ${JSON.stringify(user)}`);
                loginAction({ type: 'sing-in', data: response })
                setTimeout(() => {
                    goToScreen('Dashboard');
                }, 2000)
            }
            else {
                console.log(`storageUser from LoadingScreen : ${JSON.stringify(response)}`);
                console.log(`firebaseUser from LoadingScreen : ${JSON.stringify(user)}`);
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