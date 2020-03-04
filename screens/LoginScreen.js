import React from 'react';
import { StyleSheet, View, Button, Image, ImageBackground, Text, Dimensions, TextInput } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

import signInWithGoogleAsync from '../firebase/utils/signInWithGoogle';
import signInWithFacebookAsync from '../firebase/utils/signInWithFacebook';

import bground from '../assets/images/background.png';
//import logo from '../assets/images/logo.png';

const { width: WIDTH } = Dimensions.get('window');

const LoginScreen = () => (
  <ImageBackground source={bground} style={styles.backgroundContainer}>
    <View style={styles.logoContainer}>
      {/* <Image source={logo} style={styles.logo}></Image> */}
      <Text style={styles.logoText}>Fitness Progression</Text>
    </View>

    <View>
      <Ionicons name={"ios-person"} size={28} color={'black'} style={styles.inputIcon} />
      <TextInput
        style={styles.input}
        placeholder={'Username'}
        placeholderTextColor={'black'}
        underlineColorAndroid='transparent'
      />
      <Button title="Sign In With Google" onPress={signInWithGoogleAsync} />
      <Button title="Sign In With Facebook" onPress={signInWithFacebookAsync} />
    </View>
  </ImageBackground>
);
export default LoginScreen;

const styles = StyleSheet.create({
  backgroundContainer: {
    flex: 1,
    width: null,
    height: null,
    justifyContent: 'center',
    alignItems: 'center'
  },
  logoContainer: {
    width: WIDTH,
    alignItems: 'center'
  },
  logo: {
    width: 256,
    height: 256
  },
  logoText: {
    color: 'white',
    fontSize: 40,
    fontWeight: '600',
    opacity: 1
  },
  input: {
    width: WIDTH - 80,
    height: 45,
    borderRadius: 20,
    fontSize: 17,
    paddingLeft: 45,
    backgroundColor: 'white'
  },
  inputIcon: {
    position: 'absolute',
    top: 8,
    left: 37
  }
});