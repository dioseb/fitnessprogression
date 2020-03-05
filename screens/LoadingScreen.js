import * as React from 'react';
import { StyleSheet, View, ActivityIndicator, ImageBackground } from 'react-native';

import bground from '../assets/images/background.png';

import API from '../firebase/utils/firebase';

const LoadingScreen = ({ navigation }) => {
    const isUserLoggedIn = React.useCallback(() => {
        API.auth()
        .onAuthStateChanged((user) => {
            console.log("user connected" , !!user);
            user ? navigation.navigate('DashboardScreen') : navigation.navigate('LoginAnimatedScreen')
        });

    }, [navigation]);

    React.useEffect(() => {
        isUserLoggedIn();
    }, [isUserLoggedIn]);
   
  
    return (
        <ImageBackground source={bground} style={styles.backgroundContainer}>
            <ActivityIndicator style={styles.activityIndicator} size="large" />
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