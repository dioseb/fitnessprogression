import * as React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  KeyboardAvoidingView,
  TouchableOpacity,
  ImageBackground,
  Platform,
  TouchableWithoutFeedback,
  Keyboard
} from 'react-native';

import { Ionicons } from '@expo/vector-icons';
import bground from '../../assets/images/background.png';

import { UserContext } from '../../context/UserContext';

const SignInScreen = ({ navigation }) => {

  const [login, loginAction] = React.useContext(UserContext)

  const [email, setEmail] = React.useState('')
  const [password, setPassword] = React.useState('')
  const [confirmPassword, setConfirmPassword] = React.useState('')
  const [lastname, setLastname] = React.useState('')
  const [firstname, setFirstname] = React.useState('')
  const [hidePassword, setHidePassword] = React.useState(false)
  const [hideConfirmPassword, setHideConfirmPassword] = React.useState(false)

  function iniciarSesion() {
    loginAction({
      type: 'sign-up', data: {
        email, password,
        confirmPassword,
        lastname, firstname
      }
    })
    goToScreen('Dashboard')
  }

  function goToScreen(routeName) {
    navigation.navigate(routeName)
  }

  return (
    <KeyboardAvoidingView
      style={{
        flex: 1,
        backgroundColor: 'white',
        justifyContent: 'flex-end'
      }}
      behavior="padding" 
      enabled>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <ImageBackground source={bground} style={styles.container}>
          <View style={styles.fixedView}>
            <TouchableOpacity onPress={() => goToScreen('LoginAnimated')}>
              <Ionicons name={'ios-arrow-back'} color={'white'} size={36} />
            </TouchableOpacity>
          </View>
          <Text style={styles.logo}>Sign Up</Text>
          <View style={styles.inputView} >
            <TextInput
              style={styles.inputText}
              placeholder="Lastname..."
              placeholderTextColor="#666"
              value={lastname}
              onChangeText={(lastname) => setLastname(lastname)} />
          </View>
          <View style={styles.inputView} >
            <TextInput
              style={styles.inputText}
              placeholder="Firstname..."
              placeholderTextColor="#666"
              value={firstname}
              onChangeText={(firstname) => setFirstname(firstname)} />
          </View>
          <View style={styles.inputView} >
            <TextInput
              keyboardType='email-address'
              style={styles.inputText}
              placeholder="Email..."
              placeholderTextColor="#666"
              value={email}
              onChangeText={(email) => setEmail(email)} />
          </View>
          <View style={styles.inputView} >
            <TextInput
              keyboardType={null}
              secureTextEntry={hidePassword}
              style={styles.inputText}
              placeholder="Password..."
              placeholderTextColor="#666"
              value={password}
              onPress={() => setHidePassword(!hidePassword)}
              onChangeText={(password) => setPassword(password)} />
          </View>
          <View style={styles.inputView} >
            <TextInput
              keyboardType={null}
              secureTextEntry={hideConfirmPassword}
              style={styles.inputText}
              placeholder="Confirm password..."
              placeholderTextColor="#666"
              value={confirmPassword}
              onPress={() => setHideConfirmPassword(!hideConfirmPassword)}
              onChangeText={(confirmPassword) => setConfirmPassword(confirmPassword)} />
          </View>
          <TouchableOpacity style={styles.loginBtn} onPress={() => iniciarSesion()}>
            <Text style={styles.loginText}>SIGNUP</Text>
          </TouchableOpacity>
          {/* <TouchableOpacity onPress={() => goToScreen('SignUp')}>
                        <Text style={styles.loginText}>Signup</Text>
                    </TouchableOpacity> */}
        </ImageBackground>

        {/* <View style={[mainStyles.container, { padding: 50 }]}>
            <MyTextInput keyboardType='email-address' placeholder='Email' image='user'
              value={email} onChangeText={(email) => setEmail(email)} />
            <MyTextInput keyboardType={null} placeholder='Password' image='lock' bolGone={true}
              secureTextEntry={hidePassword}
              onPress={() => setHidePassword(!hidePassword)}
              value={password} onChangeText={(password) => setPassword(password)} />
            <MyButton
              titulo='Sign in'
              onPress={() => iniciarSesion()}
            />
            <View>
              <TouchableOpacity onPress={() => goToScreen(navigation, 'RecuperarPassword')}>
                <Text style={[mainStyles.txtTransparent, { textDecorationLine: 'underline' }]}>Olvide mi Contraseña</Text>
              </TouchableOpacity>
            </View>
          </View> */}
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
}

export default SignInScreen;

const styles = StyleSheet.create({
  backgroundContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  container: {
    flex: 1,
    backgroundColor: '#003f5c',
    alignItems: 'center',
    justifyContent: 'center',
  },
  logo: {
    fontWeight: "bold",
    fontSize: 50,
    color: "#fb5b5a",
    marginBottom: 40
  },
  inputView: {
    width: "80%",
    backgroundColor: "#fff",
    borderRadius: 25,
    height: 50,
    marginBottom: 10,
    justifyContent: "center",
    padding: 20
  },
  inputText: {
    height: 60,
    color: "grey"
  },
  forgot: {
    color: "white",
    fontSize: 11
  },
  loginBtn: {
    width: "80%",
    backgroundColor: "#fb5b5a",
    borderRadius: 25,
    height: 50,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 40,
    marginBottom: 10
  },
  loginText: {
    color: "white"
  },
  fixedView: {
    position: 'absolute',
    left: 20,
    top: 40,
    flexDirection: 'row',
    justifyContent: 'flex-start',
  }
});