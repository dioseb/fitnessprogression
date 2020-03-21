import * as React from "react";
import { createStackNavigator } from "@react-navigation/stack";

import LoginAnimated from '../screens/Auth/LoginAnimatedScreen';
import SignIn from '../screens/Auth/SignInScreen';
import SignUp from '../screens/Auth/SignUpScreen';
import PasswordLost from '../screens/Auth/PasswordLostScreen';

const Stack = createStackNavigator();
function AuthStack() {
  return (
    <Stack.Navigator initialRouteName='LoginAnimated' headerMode="none" screenOptions={{ gestureEnabled: false }}>
      <Stack.Screen name="SignUp" component={SignUp} />
      <Stack.Screen name="SignIn" component={SignIn} />
      <Stack.Screen name="PasswordLost" component={PasswordLost} />
      <Stack.Screen name="LoginAnimated" component={LoginAnimated} />
    </Stack.Navigator>
  );
};

export default AuthStack;