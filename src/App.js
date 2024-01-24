import React, {useEffect, useState} from 'react';
import {View, Text, StatusBar, LogBox} from 'react-native';
import SplashScreen from 'react-native-splash-screen';
import {
  NavigationContainer,
  createNavigationContainerRef,
} from '@react-navigation/native';
import {MainStackNavigator} from './Navigation/StackNavigator';
import AuthNavigator from './Navigation/AuthNavigator';
import {BottomTabNavigator} from './Navigation/BottomTabNavigator';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {Provider} from 'react-redux';
import store from './redux/store';
import {FitterStackNavigator} from './Navigation/FitterNavigator';
import {COLORS} from './utils/theme';
import RootNavigation from './Navigation/RootNavigation';
export const navigationRef = createNavigationContainerRef();
const Stack = createNativeStackNavigator();

export default function App() {
  // LogBox.ignoreLogs([
  //   'Require cycle: src/Navigation/AuthNavigator.js -> src/screens/Common/AppIntroSlider.js -> src/Navigation/AuthNavigator.js',
  // ]);
  useEffect(() => {
    setTimeout(() => {
      SplashScreen.hide();
    }, 2000);
  }, []);
  return (
    <Provider store={store}>
      <StatusBar backgroundColor={COLORS.black} barStyle="light-content" />
      <NavigationContainer ref={navigationRef}>
        <RootNavigation />
      </NavigationContainer>
    </Provider>
  );
}