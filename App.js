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
export const navigationRef = createNavigationContainerRef();
const Stack = createNativeStackNavigator();

// const Loogin = ()=>{
//   return <View>
//     <SafeAreaView />
// <Text>123456</Text>
//   </View>
// }
export default function App() {
  useEffect(() => {
    setTimeout(() => {
      SplashScreen.hide();
    }, 2000);
  }, []);
  return (
    // <GestureHandlerRootView>

    <NavigationContainer ref={navigationRef}>
      {/* <StatusBar
        translucent={true}
        backgroundColor="#fff"
        barStyle="dark-content"
      /> */}
      <Stack.Navigator
        // initialRouteName={'Login'}
        screenOptions={{headerShown: false}}>
        <Stack.Screen name="Root">{() => <AuthNavigator />}</Stack.Screen>
        <Stack.Screen name="tabs">{() => <BottomTabNavigator />}</Stack.Screen>
        <Stack.Screen name="Main">{() => <MainStackNavigator />}</Stack.Screen>

        {/* <Stack.Screen name="Login" component={Login} /> */}
        {/* <Stack.Screen name="Home" component={Notifications} /> */}
      </Stack.Navigator>
      {/* <AuthNavigator /> */}
      {/* <MainStackNavigator/> */}
    </NavigationContainer>
    // </GestureHandlerRootView>
  );
}
