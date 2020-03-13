import * as React from 'react';
import * as Font from 'expo-font';

import { Asset } from 'expo-asset';
import { AppLoading } from 'expo';

import RootNavigator from './navigations/RootNavigator';
import { UserProvider } from './context/UserContext';

import API from './firebase/utils/firebase';
import { firebaseConfig } from './firebase/config/firebase_config';
API.initializeApp(firebaseConfig);

function cacheImages(images) {
  return images.map(image => {
    if (typeof image === 'string') {
      return Image.prefetch(image);
    } else {
      return Asset.fromModule(image).downloadAsync();
    }
  });
}

export default class App extends React.Component {
  constructor() {
    super();
    this.state = {
      isReady: false
    };
  }

  async _loadAssetsAsync() {
    const imageAssets = cacheImages([require('./assets/images/background.png')]);

    Font.loadAsync({
      'Poppins-Light': require('./assets/fonts/Poppins-Light.ttf'),
      'Poppins-Bold': require('./assets/fonts/Poppins-Bold.ttf'),
      'Poppins-Medium': require('./assets/fonts/Poppins-Medium.ttf'),
      'Poppins-SemiBold': require('./assets/fonts/Poppins-SemiBold.ttf'),
    });

    await Promise.all([...imageAssets]);
  }

  render() {
    if (!this.state.isReady) {
      return <AppLoading
        startAsync={this._loadAssetsAsync}
        onFinish={() => this.setState({ isReady: true })}
        onError={console.warn}
      />
    }
    return (
    <UserProvider>
      <RootNavigator headerMode="none" />
    </UserProvider>)
  }
}