import * as React from 'react';
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  TextInput,
  KeyboardAvoidingView,
  Button,
  TouchableOpacity,
  StatusBar
} from 'react-native';

import { SocialIcon } from 'react-native-elements'
import Svg, { Image, Circle, ClipPath } from 'react-native-svg';
import Animated, { Easing } from 'react-native-reanimated';
import { TapGestureHandler, State } from 'react-native-gesture-handler';

import signInWithGoogleAsync from '../../firebase/utils/signInWithGoogle';
import signInWithFacebookAsync from '../../firebase/utils/signInWithFacebook';

import * as Animatable from 'react-native-animatable';

const { width, height } = Dimensions.get('window');

export default function LoginAnimatedScreen({navigation}) {

  const {
    Value,
    event,
    block,
    cond,
    eq,
    set,
    Clock,
    startClock,
    stopClock,
    timing,
    clockRunning,
    interpolate,
    Extrapolate,
    concat
  } = Animated;

  // function runTiming(clock, value, dest) {
  //   const state = {
  //     finished: new Value(0),
  //     position: new Value(0),
  //     time: new Value(0),
  //     frameTime: new Value(0)
  //   };

  //   const config = {
  //     duration: 1000,
  //     toValue: new Value(0),
  //     easing: Easing.inOut(Easing.ease)
  //   };

  //   return block([
  //     cond(clockRunning(clock), 0, [
  //       set(state.finished, 0),
  //       set(state.time, 0),
  //       set(state.position, value),
  //       set(state.frameTime, 0),
  //       set(config.toValue, dest),
  //       startClock(clock)
  //     ]),
  //     timing(clock, state, config),
  //     cond(state.finished, stopClock(clock)),
  //     state.position
  //   ]);
  // }

  function goToScreen(routeName) {
    navigation.navigate(routeName)
  }

  const buttonOpacity = new Value(1);

  // const onStateChange = event([
  //   {
  //     nativeEvent: ({ state }) =>
  //       block([
  //         cond(
  //           eq(state, State.END),
  //           set(buttonOpacity, runTiming(new Clock(), 1, 0))
  //         )
  //       ])
  //   }
  // ]);

  // const onCloseState = event([
  //   {
  //     nativeEvent: ({ state }) =>
  //       block([
  //         cond(
  //           eq(state, State.END),
  //           set(buttonOpacity, runTiming(new Clock(), 0, 1))
  //         )
  //       ])
  //   }
  // ]);

  const buttonY = interpolate(buttonOpacity, {
    inputRange: [0, 1],
    outputRange: [100, 0],
    extrapolate: Extrapolate.CLAMP
  });

  const bgY = interpolate(buttonOpacity, {
    inputRange: [0, 1],
    outputRange: [-height / 2.5 - 50, 0],
    extrapolate: Extrapolate.CLAMP
  });

  // const textInputZindex = interpolate(buttonOpacity, {
  //   inputRange: [0, 1],
  //   outputRange: [1, -1],
  //   extrapolate: Extrapolate.CLAMP
  // });

  // const textInputY = interpolate(buttonOpacity, {
  //   inputRange: [0, 1],
  //   outputRange: [0, 100],
  //   extrapolate: Extrapolate.CLAMP
  // });

  // const textInputOpacity = interpolate(buttonOpacity, {
  //   inputRange: [0, 1],
  //   outputRange: [1, 0],
  //   extrapolate: Extrapolate.CLAMP
  // });

  // const rotateCross = interpolate(buttonOpacity, {
  //   inputRange: [0, 1],
  //   outputRange: [180, 360],
  //   extrapolate: Extrapolate.CLAMP
  // })

  return (
    <KeyboardAvoidingView
      style={{
        flex: 1,
        backgroundColor: 'white',
        justifyContent: 'flex-end'
      }}
      behavior="height" enabled
    >
      <Animated.View
        style={{
          ...StyleSheet.absoluteFill,
          transform: [{ translateY: bgY }]
        }}
      >
        <Svg height={height + 50} width={width}>
          <ClipPath id="clip">
            <Circle r={height + 50} cx={width / 2} />
          </ClipPath>
          <Image
            href={require('../../../assets/images/background.png')}
            height={height + 50}
            width={width}
            preserveAspectRatio="xMidYMid slice"
            clipPath="url(#clip)"
          />
        </Svg>
      </Animated.View>
      <View style={styles.container}>
      <Animatable.Image
                easing="ease-out"
                iterationCount="infinite"
                style={{
                    width: 100,
                    height: 100,
                    margin: 100
                }}
                source={require('../../../assets/images/instaIcon.png')}
            />
      </View>
      <View style={{ height: height / 2.5, justifyContent: 'center' }}>
        <Animated.View
          style={{
            opacity: buttonOpacity,
            transform: [{ translateY: buttonY }]
          }}
        >
          <SocialIcon
            title='Sign Up'
            light
            button
            onPress={() => goToScreen('SignUp')}
          />
        </Animated.View>
        <Animated.View
          style={{
            opacity: buttonOpacity,
            transform: [{ translateY: buttonY }]
          }}
        >
          <SocialIcon
            title='Sign in with Facebook'
            button
            type='facebook'
            onPress={signInWithFacebookAsync}
          />
        </Animated.View>
        <Animated.View
          style={{
            opacity: buttonOpacity,
            transform: [{ translateY: buttonY }]
          }}
        >
          <SocialIcon
            title='Sign in with Google'
            button
            type='google'
            onPress={signInWithGoogleAsync}
          />
        </Animated.View>
        <View style={{ ...styles.fixToText }}>
        <Text style={{ fontSize: 14, alignSelf: 'center', color: 'white' }}>Already have an account ? </Text>
            <TouchableOpacity
              style={styles.text}
              onPress={() => goToScreen('SignIn')}
            >
              <Text
                style={{
                  fontSize: 14,
                  alignSelf: 'center',
                  color: 'rgb(33, 150, 243)'
                }}>Sign In</Text>
            </TouchableOpacity>
            </View>
      </View>
    </KeyboardAvoidingView>
  );
}

LoginAnimatedScreen.navigationOptions = ({}) => {
  return {
      title: ``
  }
};

const styles = StyleSheet.create({
  fixToText: {
    flexDirection: 'row',
    justifyContent: 'center'
  },
  text: {
    alignItems: 'center',
    backgroundColor: 'transparent',
  },
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  },
  button: {
    backgroundColor: 'white',
    height: 70,
    marginHorizontal: 20,
    borderRadius: 35,
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: 5,
    shadowOffset: { width: 2, height: 2 },
    shadowColor: 'black',
    shadowOpacity: 0.2,
    elevation: 2
  },
  closeButton: {
    height: 40,
    width: 40,
    backgroundColor: 'white',
    borderRadius: 20,
    backgroundColor: 'white',
    alignItems: 'center',
    justifyContent: 'center',
    position: 'absolute',
    top: -20,
    left: width / 2 - 20,
    shadowOffset: { width: 2, height: 2 },
    shadowColor: 'black',
    shadowOpacity: 0.2,
    elevation: 2,
  },
  textInput: {
    height: 50,
    borderRadius: 25,
    borderWidth: 0.5,
    marginHorizontal: 20,
    paddingLeft: 10,
    marginVertical: 5,
    borderColor: 'rgba(0,0,0,0.2)',
    backgroundColor: 'white'
  }
});