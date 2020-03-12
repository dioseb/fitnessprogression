import * as React from 'react';
import { 
  Text,
  View, 
  TouchableOpacity, 
  StatusBar,
  Image,
  KeyboardAvoidingView
 } from 'react-native'

import { loginStyles } from '../../styles/styles';
import color from '../../styles/colors';
import MyTextInput from '../../components/MyTextInput';

const LoginScreen = () => {
  const [hidePassword, setHidePassword] = React.useState(false);

  return (
    <KeyboardAvoidingView style={{
      flex: 1,
      backgroundColor: 'white',
      justifyContent: 'flex-end'
    }}
    behavior="height" enabled>
    <View style={ [loginStyles.container, {padding: 50}] }>
      <StatusBar backgroundColor={color.BLUE} translucent={true}></StatusBar>
      <View style={loginStyles.logo}>
        <Image source={require('../../assets/images/instaIcon.png')}
        style={{height:250, width:250}}/>
      </View>
      <MyTextInput keyboardType='email-address' placeholder='Email' image='user'/>
      <MyTextInput keyboardType={null} placeholder='Password' image='lock'
      bolGone={true} secureTextEntry={hidePassword}
      onPress={() => setHidePassword(!hidePassword)}/>
      <View style={loginStyles.btnMain}>
        <TouchableOpacity>
          <Text style={loginStyles.btntxt}>LogIn</Text>
        </TouchableOpacity>
      </View>
      <View style={loginStyles.btnTransparent}>
        <TouchableOpacity>
          <Text style={ [loginStyles.btntxt, { color: color.BLUE }]}>Register</Text>
        </TouchableOpacity>
      </View>
      <View>
        <TouchableOpacity>
          <Text style={ [loginStyles.txtTransparent, { textDecorationLine: 'underline' }]}>Password lost ?</Text>
        </TouchableOpacity>
      </View>
    </View>
    </KeyboardAvoidingView>
  )
}

export default LoginScreen;