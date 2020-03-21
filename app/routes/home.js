import * as React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { createDrawerNavigator } from '@react-navigation/drawer';

import Sidebar from '../components/SideBar';
import Header from '../components/Header';

import Dashboard from '../screens/Home/DashboardScreen';
import Profile from '../screens/Home/ProfileScreen';
import Settings from '../screens/Home/SettingsScreen';

const Drawer = createDrawerNavigator();

function DashboardDrawerNavigator() {
  return (
    <Drawer.Navigator
      initialRouteName='Dashboard'
      drawerType='slide'
      drawerContent={props => <Sidebar {...props} />}>
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

const Stack = createStackNavigator();

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
              header: () => <Header title='Dashboard' navigation={navigation} />
            }
          }}
      />
    </Stack.Navigator>
  );
}

function MySettingsStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Settings"
        component={Settings}
        options={
          ({ navigation }) => {
            return {
              header: () => <Header title='Settings' navigation={navigation} />
            }
          }} />
    </Stack.Navigator>
  );
}

function MyProfileStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Profile"
        component={Profile}
        options={
          ({ navigation }) => {
            return {
              header: () => <Header title='Profile' navigation={navigation} />
            }
          }} />
    </Stack.Navigator>
  );
}

export default DashboardDrawerNavigator;