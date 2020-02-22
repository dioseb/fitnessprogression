import * as React from 'react';
import { StyleSheet, View, Text, ActivityIndicator } from 'react-native';
import firebase from 'firebase';

//const PUSH_ENDPOINT = 'http://10.5.118.64:3000/api/users/userLoggedIn/id';
const PUSH_ENDPOINT = 'http://192.168.0.7:3000/api/users/userLoggedIn/id';

class LoadingScreen extends React.Component {
    componentDidMount() {
        this.checkIfLoggedIn();
    }

    checkIfLoggedIn = () => {
        firebase.auth().onAuthStateChanged(
            function (user) {
                console.log('AUTH STATE CHANGED CALLED ')
                if (user) {
                    console.log(`DashboardScreen navigation`);
                    this.props.navigation.navigate('DashboardScreen');
                }
                else {
                    console.log(`LoginScreen navigation`);
                    this.props.navigation.navigate('LoginScreen');
                }
            }.bind(this)
        );
    };
    
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