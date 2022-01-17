import * as React from "react";
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
  Keyboard,
} from "react-native";

//import Form from 'react-native-basic-form';
//import CTA from "../../components/CTA";
//import { Header, ErrorText } from "../../components/Shared";

import * as api from "../../services/auth";
import { useAuth } from "../../provider";

import { Ionicons } from "@expo/vector-icons";
import bground from "../../../assets/images/background.png";

//import { UserContext } from '../../context/UserContext';

export default function SignInScreen({ navigation }) {
  //const [login, loginAction] = React.useContext(UserContext)
  //1 - DECLARE VARIABLES
  const [error, setError] = React.useState(null);
  const [loading, setLoading] = React.useState(false);
  const { handleLogin } = useAuth();

  //const [user, setUser] = React.useState({})

  const [username, setUsername] = React.useState('')
  const [password, setPassword] = React.useState('')
  const [hidePassword, setHidePassword] = React.useState(false)

  const fields = [
    { name: "email", label: "Email Address", required: true },
    { name: "password", label: "Password", required: true, secure: true },
  ];

  async function onSubmit() {
    console.log(`User : ${JSON.stringify(user)}`);
    setLoading(true);

    try {
      let response = await api.login(user);

      await handleLogin(response);

      setLoading(false);

      //check if username is null
      let username = response.email !== null;
      if (username) {
        navigation.navigate("App");
      } else {
        navigation.replace("SignIn");
      }
    } catch (error) {
      setError(error.message);
      setLoading(false);
    }
  }

  // function iniciarSesion() {
  //     loginAction({
  //         type: 'sign-up', data: {
  //             username, password
  //         }
  //     })
  //     goToScreen('Dashboard')
  // }

  function goToScreen(routeName) {
    navigation.navigate(routeName);
  }

  let formProps = { title: "LOGIN", fields, onSubmit, loading };
  return (
    // <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
    // <ImageBackground source={bground} style={styles.container}>
    //   <View style={styles.fixedView}>
    //     <TouchableOpacity onPress={() => goToScreen("LoginAnimated")}>
    //       <Ionicons name={"ios-arrow-back"} color={"white"} size={36} />
    //     </TouchableOpacity>
    //   </View>
    //   <Header title={"Sign In"} />
    //   <Form {...formProps}>
    //     <CTA
    //       ctaText={"Forgot Password?"}
    //       onPress={() => navigation.navigate("ForgotPassword")}
    //       style={{ marginTop: 20 }}
    //     />
    //   </Form>
    // </ImageBackground>
    // </TouchableWithoutFeedback>
    <KeyboardAvoidingView
        behavior="padding"
        enabled
        style={{
            flex: 1,
            backgroundColor: 'white',
            justifyContent: 'flex-end'
        }}>
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
            <ImageBackground source={bground} style={styles.container}>
                <View style={styles.fixedView}>
                    <TouchableOpacity onPress={() => goToScreen('LoginAnimated')}>
                        <Ionicons name={'ios-arrow-back'} color={'white'} size={36} />
                    </TouchableOpacity>
                </View>
                <Text style={styles.logo}>Sign In</Text>
                <View style={styles.inputView} >
                    <TextInput
                        keyboardType='email-address'
                        style={styles.inputText}
                        placeholder="Email..."
                        placeholderTextColor="#666"
                        value={username}
                        onChangeText={(username) => setUsername(username)} />
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
                <TouchableOpacity onPress={() => goToScreen('PasswordLost')}>
                    <Text style={styles.forgot}>Forgot Password?</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.loginBtn} onPress={() => onSubmit()}>
                    <Text style={styles.loginText}>LOGIN</Text>
                </TouchableOpacity>
            </ImageBackground>
        </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  logo: {
    fontWeight: "bold",
    fontSize: 50,
    color: "#fb5b5a",
  },
  inputView: {
    width: "80%",
    backgroundColor: "#fff",
    borderRadius: 25,
    height: 50,
    marginBottom: 10,
    justifyContent: "center",
    padding: 20,
  },
  inputText: {
    height: 60,
    color: "grey",
  },
  forgot: {
    color: "white",
    fontSize: 12,
  },
  loginBtn: {
    width: "80%",
    backgroundColor: "#fb5b5a",
    borderRadius: 25,
    height: 50,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 40,
    marginBottom: 10,
  },
  loginText: {
    color: "white",
  },
  fixedView: {
    position: "relative",
    margin: 30,
    alignSelf: "flex-start",
  },
});
