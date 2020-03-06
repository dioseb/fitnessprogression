import * as React from 'react';
import { Platform, StatusBar, StyleSheet, View } from 'react-native';
import { SplashScreen } from 'expo';
import * as Font from 'expo-font';
import { Ionicons } from '@expo/vector-icons';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createSwitchNavigator, createAppContainer } from 'react-navigation';

//import BottomTabNavigator from './navigation/BottomTabNavigator';
import useLinking from './navigation/useLinking';

import { DashboardScreen, LoadingScreen, LoginAnimatedScreen, SignUpScreen } from './screens';

import API from './firebase/utils/firebase';
import { firebaseConfig } from './firebase/config/firebase_config';
API.initializeApp(firebaseConfig);

const Stack = createStackNavigator();
function Auth() {
    return (
        <View style={styles.container}>
            {Platform.OS === 'ios' && <StatusBar barStyle="default" />}
            <NavigationContainer ref={containerRef} initialState={initialNavigationState}>
                <Stack.Navigator screenOptions={{
                    headerShown: false
                }}>
                    <Stack.Screen name="LoginAnimatedScreen" component={LoginAnimatedScreen} />
                    <Stack.Screen name="SignUpScreen" component={SignUpScreen} />
                 </Stack.Navigator>
            </NavigationContainer>
        </View>
    );
}

const Root = createAppContainer(createSwitchNavigator(
    {
      AuthLoading: LoadingScreen,
      App: DashboardScreen,
      Auth: Auth,
    },
    {
      initialRouteName: 'AuthLoading',
    }
  ));

export default function App(props) {
    const [isLoadingComplete, setLoadingComplete] = React.useState(false);
    const [initialNavigationState, setInitialNavigationState] = React.useState();
    const containerRef = React.useRef();
    const { getInitialState } = useLinking(containerRef);

    // Load any resources or data that we need prior to rendering the app
    React.useEffect(() => {
        async function loadResourcesAndDataAsync() {
            try {
                SplashScreen.preventAutoHide();

                // Load our initial navigation state
                setInitialNavigationState(await getInitialState());

                // Load fonts
                await Font.loadAsync({
                    ...Ionicons.font,
                    'space-mono': require('./assets/fonts/SpaceMono-Regular.ttf'),
                });
            } catch (e) {
                // We might want to provide this error information to an error reporting service
                console.warn(e);
            } finally {
                setLoadingComplete(true);
                SplashScreen.hide();
            }
        }

        loadResourcesAndDataAsync();
    }, []);

    if (!isLoadingComplete && !props.skipLoadingScreen) {
        return null;
    } else {
        return <Root/>;
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
});
