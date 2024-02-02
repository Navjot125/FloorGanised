import React, {useEffect, useState} from 'react';
import {BottomTabNavigator} from './BottomTabNavigator';
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
import {scale} from 'react-native-size-matters';
import {useNavigation, useIsFocused} from '@react-navigation/native';
import Login from '../screens/auth/login/Login';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import AppIntro from '../screens/Common/AppIntroSlider';
import Home from '../screens/Tabs/Home';
import Notifications from '../screens/Tabs/Notifications';
import Detail from '../screens/surveyor/Detail';
import {COLORS} from '../utils/theme';
import Back from '../components/BackButton/Back';
import {navigationRef} from '../App';
import MeasuringQuestionnaire from '../screens/Common/MeasuringQuestionnaire';
import ManageProfile from '../screens/Common/ManageProfile';
import TermsConditions from '../screens/Common/TermsConditions';
import ChangePassword from '../screens/Common/ChangePassword';
import ContactUs from '../screens/Common/ContactUs';

const Stack = createNativeStackNavigator();

const MainStackNavigator = ({}) => {
  const navigation = useNavigation();
  const onPress = () => {
    navigationRef.goBack();
  };
  return (
    <>
      <Stack.Navigator>
        <Stack.Screen
          name="Detail"
          options={({navigation}) => ({
            headerShown: false,
          })}
          component={Detail}></Stack.Screen>
        <Stack.Screen
          name="MeasuringQuestionnaire"
          options={({navigation}) => ({
            headerShown: false,
          })}
          component={MeasuringQuestionnaire}></Stack.Screen>
        <Stack.Screen
          name="ManageProfile"
          options={({navigation}) => ({
            headerShown: false,
          })}
          component={ManageProfile}></Stack.Screen>
        <Stack.Screen
          name="TermsConditions"
          options={({navigation}) => ({
            headerShown: false,
          })}
          component={TermsConditions}></Stack.Screen>
        <Stack.Screen
          name="ChangePassword"
          options={({navigation}) => ({
            headerShown: false,
          })}
          component={ChangePassword}></Stack.Screen>
        <Stack.Screen
          name="ContactUs"
          options={({navigation}) => ({
            headerShown: false,
          })}
          component={ContactUs}></Stack.Screen>
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
