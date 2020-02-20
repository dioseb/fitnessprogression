import * as React from 'react';
import { StyleSheet, View, Text, ActivityIndicator } from 'react-native';

//const PUSH_ENDPOINT = 'http://10.5.118.64:3000/api/users/userLoggedIn/id';
const PUSH_ENDPOINT = 'http://192.168.0.0:3000/api/users/userLoggedIn/id';

class LoadingScreen extends React.Component {
    componentDidMount() {
        this.checkIfLoggedIn();
    }

    checkIfLoggedIn = () => {
        //CALL API TO KNOW IF USER IS LOGGED IN
        let user = true;

        if (user) {
            console.log(user);
            this.props.navigation.navigate('LoginScreen');
        }
        else {
            console.log(user);
            this.props.navigation.navigate('DashboardScreen');
        }
        // try {
        //     console.log(PUSH_ENDPOINT)
        //     let res = fetch(PUSH_ENDPOINT, {
        //         method: 'GET',
        //         headers: {
        //             Accept: 'application/json',
        //             'Content-Type': 'application/json',
        //         }
        //     });

        //     if (!res.ok) {
        //         this.props.navigation.navigate('LoginScreen');
        //     }
        //     else {
        //         this.props.navigation.navigate('DashboardScreen');
        //         console.log("Ok");
        //     }
        // } catch (error) {
        //     console.log('error in checkIfLoggedIn');
        //     console.log(error);
        // }
    }
    render() {
        return (
            <View style={styles.container} >
                <ActivityIndicator size="large" />
            </View>
        );
    }
}

export default LoadingScreen;

LoadingScreen.navigationOptions = {
    header: null,
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#fff',
    }
});