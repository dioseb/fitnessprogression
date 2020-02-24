import * as React from 'react';
import { StyleSheet, View, ActivityIndicator } from 'react-native';

import API from '../firebase/utils/firebase';

const LoadingScreen = ({ navigation }) => {
    const isUserLoggedIn = React.useCallback(() => {
        API.auth().onAuthStateChanged(user =>
            user
                ? navigation.navigate('DashboardScreen')
                : navigation.navigate('LoginScreen')
        );
    }, [navigation]);

    React.useEffect(() => {
        isUserLoggedIn();
    }, [isUserLoggedIn]);

    return (
        <View style={styles.container}>
            <ActivityIndicator size="large" />
        </View>
    );
};

export default LoadingScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#fff',
    }
});