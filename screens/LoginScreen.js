import * as React from 'react';
import { StyleSheet, View, Button } from 'react-native';
import * as Google from 'expo-google-app-auth';
import { GoogleSignIn } from 'expo';
import { googleConfig } from '../config/google_config';

class LoginScreen extends React.Component {

    signInWithGoogleAsync = async () => {
        console.log("Button Clicked !!!");
        try {
            const result = await Google.logInAsync({
                //androidClientId: YOUR_CLIENT_ID_HERE,
                iosClientId: '566994980610-ehseo4kf7lqvhll2tobmpgkuk8jt6bsu.apps.googleusercontent.com',
                scopes: ['profile', 'email']
            });

            //PRODUCTION
            // await GoogleSignIn.initAsync({
            //     ClientId: 'com.googleusercontent.apps.566994980610-0lpb22vrk8286064pff7tbn7eele86c1',
            // })

            if (result.type === 'success') {
                console.log("success");
                console.log(result);
                this.props.navigation.navigate('DashboardScreen');
                return result.accessToken;
            } else {
                console.log("cancelled");
                return { cancelled: true };
            }
        } catch (e) {
            console.log(e);
            return { error: true };
        }
    }    

    render() {
        return (
            <View style={styles.container}>
                <Button title="Sign in with google" onPress={() => this.signInWithGoogleAsync()} />
            </View>
        );
    }
}

export default LoginScreen;

LoginScreen.navigationOptions = {
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