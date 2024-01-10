import React, {useEffect, useState} from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {BottomTabNavigator} from './BottomTabNavigator';
import {BottomTabNavigatorInstructor} from '../Instructor_Routers/BottomTabNavigator';
import {
  View,
  StyleSheet,
  Text,
  TouchableOpacity,
  Image,
  Linking,
  StatusBar,
  Alert,
  ToastAndroid,
  Platform,
} from 'react-native';
import {COLORS} from '../../services/User_Services/colors';
import {scale} from 'react-native-size-matters';
import {useNavigation, useIsFocused} from '@react-navigation/native';
import Login from '../screens/auth/login/Login';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import AppIntro from '../screens/AppIntroSlider';
import Home from '../screens/Tabs/Home';
import Notifications from '../screens/Tabs/Notifications';

const Stack = createNativeStackNavigator();

const MainStackNavigator = ({}) => {
  const [authtoken, setauthtoken] = useState();
  const navigation = useNavigation();
  return (
    <>
      <Stack.Navigator
        // initialRouteName={'Root'}
        screenOptions={{headerMode: 'screen', headerShown: false}}>
        {/* <Stack.Screen name="Root">{() => <BottomTabNavigator />}</Stack.Screen> */}
        {/* <Stack.Screen name="Login" component={Login} /> */}
        {/* <Stack.Screen name="Home" component={Home} /> */}
      </Stack.Navigator>
    </>
  );
};

export {MainStackNavigator};
const styles = StyleSheet.create({
  backbtn: {
    marginLeft: 20,
  },
  backbtn2: {
    marginLeft: 15,
  },
  phoneicon: {
    marginRight: 20,
  },
});
