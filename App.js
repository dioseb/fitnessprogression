import * as React from 'react';

import { Asset } from 'expo-asset';
import { AppLoading } from 'expo';

import NavigationTree from './navigations/NavigationRoot_v5';

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
    await Promise.all([...imageAssets]);
  }

  render() {
    if (!this.state.isReady) {
      return (
        <AppLoading
          startAsync={this._loadAssetsAsync}
          onFinish={() => this.setState({ isReady: true })}
          onError={console.warn}
        />
      );
    }
    return <NavigationTree headerMode="none"/>
  }
}