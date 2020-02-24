import React from 'react';
import { StyleSheet, View, Button } from 'react-native';

import signInWithGoogleAsync from '../firebase/utils/signInWithGoogle';
//import signInWithFacebookAsync from '../firebase/utils/signInWithFacebook';

const LoginScreen = () => (
  <View style={styles.container}>
    <Button title="Sign In With Google" onPress={signInWithGoogleAsync} />
    {/* <Button title="Sign In With Facebook" onPress={signInWithFacebookAsync} /> */}
  </View>
);
export default LoginScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#fff',
    }
});