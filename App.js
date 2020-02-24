import { createSwitchNavigator, createAppContainer } from 'react-navigation';

import { DashboardScreen, LoadingScreen, LoginScreen } from './screens';

import API from './firebase/utils/firebase';
import { firebaseConfig } from './firebase/config/firebase_config';
API.initializeApp(firebaseConfig);

export default createAppContainer(
  createSwitchNavigator(
    {
      LoadingScreen,
      LoginScreen,
      DashboardScreen,
    },
    {
      initialRouteName: 'LoadingScreen',
    }
  )
);
