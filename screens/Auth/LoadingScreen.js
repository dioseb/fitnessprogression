import * as React from 'react';
import { StyleSheet, StatusBar, ImageBackground } from 'react-native';
import * as Animatable from 'react-native-animatable';

import bground from '../../assets/images/background.png';
import API from '../../firebase/utils/firebase';

const LoadingScreen = ({ navigation }) => {
    const isUserLoggedIn = React.useCallback(() => {
        API.auth()
            .onAuthStateChanged((user) => {
                console.log("user connected", !!user);
                user ? navigation.navigate('Dashboard') : navigation.navigate('LoginAnimated')
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
                    width: 200,
                    height: 200,
                    margin: 200
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