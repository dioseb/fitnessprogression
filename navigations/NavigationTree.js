import { createAppContainer, createSwitchNavigator } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import { createDrawerNavigator } from 'react-navigation-drawer';
import { createMaterialBottomTabNavigator } from 'react-navigation-material-bottom-tabs';
import { createMaterialTopTabNavigator, createBottomTabNavigator } from 'react-navigation-tabs';

import Dashboard from '../screens/Home/DashboardScreen';
import Loading from '../screens/Auth/LoadingScreen';
import LoginAnimated from '../screens/Auth/LoginAnimatedScreen';
import SignUp from '../screens/Auth/SignUpScreen';
import Profile from '../screens/Home/ProfileScreen';
import Settings from '../screens/Home/SettingsScreen';

import TabBarIcon from '../components/TabBarIcon';

const AuthStack = createStackNavigator({
  SignUp: SignUp,
  LoginAnimated: LoginAnimated,
  Loading: Loading
},
  {
    initialRouteName: 'Loading'
  }
);

const SettingsStack = createStackNavigator({
  Settings: Settings,
});

SettingsStack.navigationOptions = {
  tabBarLabel: 'Settings',
  tabBarIcon: ({ focused }) => (
    <TabBarIcon
      focused={focused}
      name={Platform.OS === 'ios' ? 'ios-options' : 'md-options'}
    />
  ),
};

const ProfileStack = createStackNavigator({
  Profile: Profile,
});

ProfileStack.navigationOptions = {
  tabBarLabel: 'Profile',
  tabBarIcon: ({ focused }) => (
    <TabBarIcon
      focused={focused}
      name={Platform.OS === 'ios' ? 'ios-book' : 'md-book'}
    />
  ),
};

const DashboardBottomNavigator = createBottomTabNavigator({
  Dashboard: Dashboard,
  Profile: ProfileStack,
  Settings: SettingsStack
},
  {
    initialRouteName: 'Dashboard'
  },
  {
    tabBarOptions: {
      activeTintColor: '#5B71F9',
      inactiveTintColor: '#888888',
      showIcon: true,
      labelStyle: {
        fontSize: 14
      },
      style: {
        backgroundColor: '#fff',
        shadowColor: '#fff',
        shadowOffset: {
          width: 0,
          height: 0,
        },
        shadowOpacity: 0,
        shadowRadius: 0,
        elevation: 0,
        height: 60,
        borderBottomWidth: 1,
        borderBottomColor: '#E8E8E8'
      },
      indicatorStyle: {
        height: 2,
        backgroundColor: '#5B71F9'
      },
    }
  }
);

// const DashboardNavigator = createDrawerNavigator({
//   Dashboard: Dashboard,
//   Profile: Profile,
//   Settings: Settings
// },
//   {
//     initialRouteName: 'Dashboard',
//     headerMode: 'none'
//   }
// );

// const DashboardStack = createStackNavigator({
//   DashboardNavigator
//   //Add more screens here
// },
//   {
//     headerMode: 'none',
//     initialRouteName: 'Dashboard',
//     transparentCard: true
//   }
// );

const AppSwicth = createSwitchNavigator({
  Auth: AuthStack,
  Dashboard: DashboardBottomNavigator
},
  {
    initialRouteName: 'Auth'
  }
);

export default createRootNavigation = createAppContainer(AppSwicth);