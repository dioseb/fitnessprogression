import * as React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { MaterialCommunityIcons } from 'react-native-vector-icons';
import { Ionicons } from '@expo/vector-icons';

import Dashboard from '../screens/Home/DashboardScreen';
import Loading from '../screens/Auth/LoadingScreen';
import LoginAnimated from '../screens/Auth/LoginAnimatedScreen';
import SignUp from '../screens/Auth/SignUpScreen';
import Profile from '../screens/Home/ProfileScreen';
import Settings from '../screens/Home/SettingsScreen';

const Stack = createStackNavigator();

function AuthStack() {
  return (
    <Stack.Navigator initialRouteName='Loading' headerMode="none">
      <Stack.Screen name="Loading" component={Loading} />
      <Stack.Screen name="SignUp" component={SignUp} />
      <Stack.Screen name="LoginAnimated" component={LoginAnimated} />
    </Stack.Navigator>
  );
};

const Tab = createBottomTabNavigator();

function DashboardTabNavigator() {
  return (
    <Tab.Navigator
      initialRouteName='Dashboard'
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;

          if (route.name === 'Dashboard') {
            iconName = focused ? 'ios-desktop' : 'ios-desktop';
          } else if (route.name === 'Settings') {
            iconName = focused ? 'ios-settings' : 'ios-settings';
          }
          else if (route.name === 'Profile') {
            iconName = focused ? 'ios-person' : 'ios-person';
          }

          // You can return any component that you like here!
          return <Ionicons name={iconName} size={size} color={color} />;
        },
      })}
      tabBarOptions={{
        activeTintColor: 'tomato',
        inactiveTintColor: 'gray',
      }}
    >
      <Tab.Screen
        name="Dashboard"
        component={Dashboard}
      />
      <Tab.Screen
        name="Settings"
        component={Settings}
      />
      <Tab.Screen
        name="Profile"
        component={Profile}
      />
    </Tab.Navigator>
  );
};

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName='Auth' headerMode="none">
        <Stack.Screen name="Auth" component={AuthStack} />
        <Stack.Screen name="Dashboard" component={DashboardTabNavigator}/>
      </Stack.Navigator>
    </NavigationContainer>
  );
}