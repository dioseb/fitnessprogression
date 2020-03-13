import * as React from 'react';
import { StyleSheet, StatusBar, ImageBackground } from 'react-native';
import * as Animatable from 'react-native-animatable';

import bground from '../../assets/images/background.png';
import API from '../../firebase/utils/firebase';

import { UserContext } from '../../context/UserContext';

const LoadingScreen = ({ navigation }) => {

    const [login, loginAction] = React.useContext(UserContext)
    const [email, setEmail] = React.useState('')

    function iniciarSesion() {
        loginAction({
            type: 'sign', data: {
                email
            }
        })
        goToScreen('Dashboard')
    }

    function goToScreen(routeName) {
        navigation.navigate(routeName)
    }

    const isUserLoggedIn = React.useCallback(() => {
        API.auth()
            .onAuthStateChanged((user) => {
                console.log("user connected", !!user);
                console.log("user :", user);
                if(user)
                {
                    setEmail(user.email)
                    iniciarSesion()
                }
                navigation.navigate('LoginAnimated')
            });
    }, [navigation]);

    React.useEffect(() => {
        setTimeout(() => {
            console.log('This will run after 2 second!');
            isUserLoggedIn();
        }, 2000);
    }, [isUserLoggedIn]);

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
    },
    activityIndicator: {
        color: 'white'
    }
});