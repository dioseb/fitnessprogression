import * as React from "react";
import { NavigationContainer, useNavigation } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

import Dashboard from '../screens/Home/DashboardScreen';
import Loading from '../screens/Auth/LoadingScreen';
import LoginAnimated from '../screens/Auth/LoginAnimatedScreen';
import SignUp from '../screens/Auth/SignUpScreen';
import Profile from '../screens/Home/ProfileScreen';
import Settings from '../screens/Home/SettingsScreen';

const Stack = createStackNavigator();

function AuthStack () {
  return (
    <Stack.Navigator initialRouteName='Loading'>
      <Stack.Screen name="Loading" component={Loading} />
      <Stack.Screen name="SignUp" component={SignUp} />
      <Stack.Screen name="LoginAnimated" component={LoginAnimated} />      
    </Stack.Navigator>
  );
};

const Tab = createBottomTabNavigator();

function DashboardTabNavigator () {
  return (
    <Tab.Navigator initialRouteName='Dashboard'>
      <Tab.Screen name="Dashboard" component={Dashboard} />
      <Tab.Screen name="Profile" component={Profile} />
      <Tab.Screen name="Settings" component={Settings} />
    </Tab.Navigator>
  );
};

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName='Auth' headerMode="none">
        <Stack.Screen name="Auth" component={AuthStack} />
        <Stack.Screen name="Dashboard">{() => <DashboardTabNavigator />}</Stack.Screen>
      </Stack.Navigator>
    </NavigationContainer>
  );
}

// const AppSwicth = createSwitchNavigator({
//   Auth: AuthStackNavigator,
//   Dashboard: DashboardTabNavigator
// },
//   {
//     initialRouteName: 'Auth'
//   }
// );

// export default createRootNavigation = createAppContainer(AppSwicth);