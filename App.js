import React, {useEffect, useState} from 'react';
import {View, Text, StatusBar, LogBox} from 'react-native';
import SplashScreen from 'react-native-splash-screen';
import {
  NavigationContainer,
  createNavigationContainerRef,
} from '@react-navigation/native';
import {MainStackNavigator} from './src/Navigation/StackNavigator';
import AuthNavigator from './src/Navigation/AuthNavigator';
import {BottomTabNavigator} from './src/Navigation/BottomTabNavigator';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {Provider} from 'react-redux';
import {store} from './src/redux/store';
import {FitterStackNavigator} from './src/Navigation/FitterNavigator';
import {COLORS} from './src/utils/theme';
export const navigationRef = createNavigationContainerRef();
const Stack = createNativeStackNavigator();

export default function App() {
  LogBox.ignoreLogs([
    'Require cycle: src/Navigation/AuthNavigator.js -> src/screens/Common/AppIntroSlider.js -> src/Navigation/AuthNavigator.js',
  ]);
  useEffect(() => {
    setTimeout(() => {
      SplashScreen.hide();
    }, 2000);
  }, []);

  const role = 2;
  return (
    <Provider store={store}>
      <StatusBar backgroundColor={COLORS.black} barStyle="light-content" />
      <NavigationContainer ref={navigationRef}>
        <Stack.Navigator screenOptions={{headerShown: false}}>
          <Stack.Screen name="Root">{() => <AuthNavigator />}</Stack.Screen>
          <Stack.Screen name="tabs">
            {() => <BottomTabNavigator />}
          </Stack.Screen>
          {role == 1 ? (
            <Stack.Screen name="Main">
              {() => <MainStackNavigator />}
            </Stack.Screen>
          ) : (
            <Stack.Screen name="Fitter">
              {() => <FitterStackNavigator />}
            </Stack.Screen>
          )}
        </Stack.Navigator>
      </NavigationContainer>
    </Provider>
  );
}
