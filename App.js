import * as React from "react";
import * as Font from "expo-font";

import { Asset } from "expo-asset";
import AppLoading from "expo-app-loading";

//import AuthProvider from "./app/provider";

//import Router from "./app/router";
import RootNavigator from "./app/rootNavigator";

// import RootNavigator from './navigations/RootNavigator';
// import { UserProvider } from './context/UserContext';

import { getFocusedRouteNameFromRoute } from "@react-navigation/core";

function cacheImages(images) {
  return images.map((image) => {
    if (typeof image === "string") {
      return Image.prefetch(image);
    } else {
      return Asset.fromModule(image).downloadAsync();
    }
  });
}

async function _loadAssetsAsync() {
  const imageAssets = cacheImages([require("./assets/images/background.png")]);

  Font.loadAsync({
    "Poppins-Light": require("./assets/fonts/Poppins-Light.ttf"),
    "Poppins-Bold": require("./assets/fonts/Poppins-Bold.ttf"),
    "Poppins-Medium": require("./assets/fonts/Poppins-Medium.ttf"),
    "Poppins-SemiBold": require("./assets/fonts/Poppins-SemiBold.ttf"),
    "HelveticaNeue-Light": require("./assets/fonts/HelveticaNeue-Light.ttf"),
    "HelveticaNeue-Medium": require("./assets/fonts/HelveticaNeue-Medium.ttf"),
    "HelveticaNeue-Bold": require("./assets/fonts/HelveticaNeue-Bold.ttf"),
    "HelveticaNeue-Thin": require("./assets/fonts/HelveticaNeue-Thin.ttf"),
    "HelveticaNeue-BlackCond": require("./assets/fonts/HelveticaNeue-BlackCond.ttf"),
    HelveticaNeue: require("./assets/fonts/HelveticaNeue.ttf"),
  });

  await Promise.all([...imageAssets]);
}

export default () => {
  const [isReady, setIsReady] = React.useState(false);

  if (!isReady) {
    return (
      <AppLoading
        startAsync={_loadAssetsAsync}
        onFinish={() => setIsReady(true)}
        onError={console.warn}
      />
    );
  }

  return <RootNavigator />;
};
