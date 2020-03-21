import React from 'react'
import {
    Text,
    TextInput,
    View,
    TouchableOpacity,
    KeyboardAvoidingView,
    ImageBackground,
    StyleSheet,
    Platform,
    TouchableWithoutFeedback,
    Keyboard
} from 'react-native';

import { Ionicons } from '@expo/vector-icons';
import bground from '../../../assets/images/background.png';
import * as Animatable from 'react-native-animatable';

//import { UserContext } from '../../context/UserContext';

export default function PasswordLostScreen({ navigation }) {
    //const [login, loginAction] = React.useContext(UserContext)

    const [email, setEmail] = React.useState('')

    function iniciarSesion() {
        loginAction({
            type: 'lost-password', data: {
                email, password
            }
        })
    }
    function goToScreen(routeName) {
        navigation.navigate(routeName)
    }
    return (
        <KeyboardAvoidingView
        behavior="padding"  enabled
            style={{
                flex: 1,
                backgroundColor: 'white',
                justifyContent: 'flex-end'
            }}>
            <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                <ImageBackground source={bground} style={styles.container}>
                    <View style={styles.fixedView}>
                        <TouchableOpacity onPress={() => goToScreen('SignIn')}>
                            <Ionicons name={'ios-arrow-back'} color={'white'} size={36} />
                        </TouchableOpacity>
                    </View>
                    <Text style={styles.logo}>Password lost ?</Text>
                    <View style={styles.inputView} >
                        <TextInput
                            keyboardType='email-address'
                            style={styles.inputText}
                            placeholder="Email..."
                            placeholderTextColor="#666"
                            value={email}
                            onChangeText={(email) => setEmail(email)} />
                    </View>
                    <TouchableOpacity style={styles.loginBtn} onPress={() => iniciarSesion()}>
                        <Text style={styles.loginText}>RESET PASSWORD</Text>
                    </TouchableOpacity>
                </ImageBackground>
            </TouchableWithoutFeedback>
        </KeyboardAvoidingView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#003f5c',
        alignItems: 'center',
        justifyContent: 'center',
    },
    inputView: {
        width: "80%",
        backgroundColor: "#fff",
        borderRadius: 25,
        height: 50,
        justifyContent: "center",
        padding: 20
    },
    logo: {
        fontWeight: "bold",
        fontSize: 50,
        color: "#fb5b5a",
        marginBottom: 40
    },
    inputText: {
        height: 60,
        color: "grey"
    },
    loginBtn: {
        width: "80%",
        backgroundColor: "#fb5b5a",
        borderRadius: 25,
        height: 50,
        alignItems: "center",
        justifyContent: "center",
        marginTop: 10,
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