import * as React from "react";
import { createStackNavigator } from "@react-navigation/stack";

// import AuthStack from "./routes/auth";
// import HomeStack from "./routes/home";

import AuthLoading from "./screens/Auth/LoadingScreen";
import AuthProvider from "./provider";
import { NavigationContainer } from "@react-navigation/native";

// import { createDrawerNavigator } from '@react-navigation/drawer';
// import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
// import { Ionicons } from '@expo/vector-icons';
// import Sidebar from '../components/SideBar';
// import Header from '../components/Header';
// import Dashboard from '../screens/Home/DashboardScreen';
// import Profile from '../screens/Home/ProfileScreen';
// import Settings from '../screens/Home/SettingsScreen';

// const Tab = createBottomTabNavigator();

// function DashboardTabNavigator() {
//   return (
//     <Tab.Navigator
//       initialRouteName='Dashboard'
//       screenOptions={({ route }) => ({
//         tabBarIcon: ({ focused, color, size }) => {
//           let iconName;

//           if (route.name === 'Dashboard') {
//             iconName = focused ? 'ios-desktop' : 'ios-desktop';
//           } else if (route.name === 'Settings') {
//             iconName = focused ? 'ios-settings' : 'ios-settings';
//           }
//           else if (route.name === 'Profile') {
//             iconName = focused ? 'ios-person' : 'ios-person';
//           }

//           // You can return any component that you like here!
//           return <Ionicons name={iconName} size={size} color={color} />;
//         },
//       })}
//       tabBarOptions={{
//         activeTintColor: 'tomato',
//         inactiveTintColor: 'gray',
//       }}>
//       <Tab.Screen
//         name="Dashboard"
//         component={MyDashboardStack}
//       />
//       <Tab.Screen
//         name="Settings"
//         component={MySettingsStack}
//       />
//       <Tab.Screen
//         name="Profile"
//         component={MyProfileStack}
//       />
//     </Tab.Navigator>
//   );
// };

// function HomeStackNavigator() {
//   return (
//     <Stack.Navigator>
//       <Stack.Screen name="Dashboard" component={Dashboard} />
//       <Stack.Screen name="Settings" component={Settings} />
//       <Stack.Screen name="Profile" component={Profile} />
//     </Stack.Navigator>
//   );
// }

const RootStack = createStackNavigator();
const RootStackScreen = () => {
  return (
    <RootStack.Navigator initialRouteName='Loading' headerMode="none" screenOptions={{
      gestureEnabled: false
      , headerTitleAlign: 'center'
    }}>
      <RootStack.Screen name="Loading" component={AuthLoading} />
      {/* <RootStack.Screen name="Auth" component={AuthStack} /> */}
      {/* <RootStack.Screen name="App" component={HomeStack} /> */}
      {/* <Stack.Screen name="Dashboard" component={DashboardTabNavigator}/> */}
      {/* <Stack.Screen name="Dashboard" component={HomeStackNavigator}/> */}
    </RootStack.Navigator>
  )
}

export default function Router(props) {
  return (
    <AuthProvider>
      <NavigationContainer>
      {/* <Loading/> */}
        {/* <AuthStack /> */}
        {/* <DashboardDrawerNavigator />       */}
        <RootStackScreen />
      </NavigationContainer>
    </AuthProvider>
  );
}