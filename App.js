import * as React from 'react';
import { Platform, StatusBar, StyleSheet, View, Text } from 'react-native';
import { SplashScreen } from 'expo';
import * as Font from 'expo-font';
import { Ionicons } from '@expo/vector-icons';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator, createSwitchNavigator, createAppContainer } from 'react-navigation';

import LoginScreen from './screens/LoginScreen';
import LoadingScreen from './screens/LoadingScreen';
import DashboardScreen from './screens/DashboardScreen';

import * as firebase from 'firebase';
import { firebaseConfig } from './config/firebase_config';
firebase.initializeApp(firebaseConfig);

//import BottomTabNavigator from './navigation/BottomTabNavigator';
import useLinking from './navigation/useLinking';

import NotificationsApi from './api/notifications/notifications_api';

//const Stack = createStackNavigator();

// const [isLoadingComplete, setLoadingComplete] = React.useState(false);
// const [initialNavigationState, setInitialNavigationState] = React.useState();
// const containerRef = React.useRef();
// const { getInitialState } = useLinking(containerRef);

export default class App extends React.Component {
  render() {
    // async function loadResourcesAndDataAsync() {
    //   try {
    //new NotificationsApi().registerForPushNotificationsAsync();

    //     SplashScreen.preventAutoHide();

    //     // Load our initial navigation state
    //     setInitialNavigationState(await getInitialState());

    //     // Load fonts
    //     await Font.loadAsync({
    //       ...Ionicons.font,
    //       'space-mono': require('./assets/fonts/SpaceMono-Regular.ttf'),
    //     });
    //   } catch (e) {
    //     // We might want to provide this error information to an error reporting service
    //     console.warn(e);
    //   } finally {
    //     setLoadingComplete(true);
    //     SplashScreen.hide();
    //   }
    // }

    // loadResourcesAndDataAsync();

    // if (!isLoadingComplete && !props.skipLoadingScreen) {
    //   return null;
    // } else {
    return (
      // <View style={styles.container}>
      //   {Platform.OS === 'ios' && <StatusBar barStyle="default" />}
      //   <NavigationContainer ref={containerRef} initialState={initialNavigationState}>
      //     <Stack.Navigator>
      //       <Stack.Screen name="Root" component={BottomTabNavigator} />
      //     </Stack.Navigator>
      //   </NavigationContainer>
      // </View>
      <AppNavigator />
    );
  }
}

const AppSwitchNavigator = createSwitchNavigator({
  LoadingScreen: LoadingScreen,
  LoginScreen: LoginScreen,
  DashboardScreen: DashboardScreen
});

const AppNavigator = createAppContainer(AppSwitchNavigator);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
});
