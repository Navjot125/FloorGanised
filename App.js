import React, {useEffect, useState} from 'react';
import {View, Text, SafeAreaView, StatusBar} from 'react-native';
import CommonModal from './src/components/Modal/Modal';
import Back from './src/components/BackButton/Back';
import CommonTextInput from './src/components/Input/InputBox';
import CommonButton from './src/components/CommonButton/CommonButton';
import SplashScreen from 'react-native-splash-screen';
import AppIntro from './src/screens/AppIntroSlider';
import {
  NavigationContainer,
  createNavigationContainerRef,
} from '@react-navigation/native';
import {MainStackNavigator} from './src/Navigation/StackNavigator';
import AuthNavigator from './src/Navigation/AuthNavigator';
import {GestureHandlerRootView} from 'react-native-gesture-handler';
import {BottomTabNavigator} from './src/Navigation/BottomTabNavigator';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Login from './src/screens/auth/login/Login';
import Notifications from './src/screens/Tabs/Notifications';
import {Provider} from 'react-redux';
import Detail from './src/screens/Detail';
import {store} from './src/redux/store';
export const navigationRef = createNavigationContainerRef();
const Stack = createNativeStackNavigator();

export default function App() {
  useEffect(() => {
    setTimeout(() => {
      SplashScreen.hide();
    }, 2000);
  }, []);
  return (
    <Provider store={store}>
        <StatusBar barStyle="light-content" />
      <NavigationContainer ref={navigationRef}>
        <Stack.Navigator screenOptions={{headerShown: false}}>
          <Stack.Screen name="Root">{() => <AuthNavigator />}</Stack.Screen>
          <Stack.Screen name="tabs">
            {() => <BottomTabNavigator />}
          </Stack.Screen>
          <Stack.Screen name="Main">
            {() => <MainStackNavigator />}
          </Stack.Screen>
        </Stack.Navigator>
      </NavigationContainer>
    </Provider>
  );
}
