import * as React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { createDrawerNavigator } from '@react-navigation/drawer';
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Ionicons } from '@expo/vector-icons';

import CustomDrawerContentComponent from '../components/CustomDrawerContentComponent';
import Header from '../components/Header';

import Dashboard from '../screens/Home/DashboardScreen';
import Loading from '../screens/Auth/LoadingScreen';
import LoginAnimated from '../screens/Auth/LoginAnimatedScreen';
import SignUp from '../screens/Auth/SignUpScreen';
import Profile from '../screens/Home/ProfileScreen';
import Settings from '../screens/Home/SettingsScreen';

const Stack = createStackNavigator();

function AuthStack() {
  return (
    <Stack.Navigator initialRouteName='Loading' headerMode="none" screenOptions={{gestureEnabled: false}}>
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
      }}>
      <Tab.Screen
        name="Dashboard"
        component={MyDashboardStack}
      />
      <Tab.Screen
        name="Settings"
        component={MySettingsStack}
      />
      <Tab.Screen
        name="Profile"
        component={MyProfileStack}
      />
    </Tab.Navigator>
  );
};

const Drawer = createDrawerNavigator();

function DashboardDrawerNavigator() {
  return (
    <Drawer.Navigator
      initialRouteName='Dashboard'
      drawerType='slide'
      drawerContent= { props => <CustomDrawerContentComponent {...props}/> }
      screenOptions={({ route }) => ({
        drawerIcon: ({ focused, color, size }) => {
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
        }
      })}>
      <Drawer.Screen
        name="Dashboard"
        component={MyDashboardStack}
      />
      <Drawer.Screen
        name="Settings"
        component={MySettingsStack}
      />
      <Drawer.Screen
        name="Profile"
        component={MyProfileStack}
      />
    </Drawer.Navigator>
  );
};

function HomeStackNavigator() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Dashboard" component={Dashboard} />
      <Stack.Screen name="Settings" component={Settings} />
      <Stack.Screen name="Profile" component={Profile} />
    </Stack.Navigator>
  );
}

function MyDashboardStack() {
  return (
    <Stack.Navigator
    screenOptions={{
      headerTitleAlign: 'center'
    }}>
      <Stack.Screen 
        name="Dashboard" 
        component={Dashboard} 
        options={
          ({ navigation }) => {
          return {
            headerLeft: () => <Header navigation={navigation} />
          }
        }}
      />
    </Stack.Navigator>
  );
}

function MySettingsStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Settings" component={Settings} />
    </Stack.Navigator>
  );
}

function MyProfileStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Profile" component={Profile} />
    </Stack.Navigator>
  );
}

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName='Auth' headerMode="none" screenOptions={{gestureEnabled: false}}>
        <Stack.Screen name="Auth" component={AuthStack} />
        <Stack.Screen name="Dashboard" component={DashboardDrawerNavigator} />
        {/* <Stack.Screen name="Dashboard" component={DashboardTabNavigator}/> */}
        {/* <Stack.Screen name="Dashboard" component={HomeStackNavigator}/> */}
      </Stack.Navigator>
    </NavigationContainer>
  );
}