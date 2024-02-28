import React, {useEffect, useState} from 'react';
// import {createStackNavigator} from '@react-navigation/stack';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

import {View, StyleSheet, TouchableOpacity, Image} from 'react-native';
import Signup from '../screens/auth/signup/Signup';
/* Svg */
import {moderateScale, scale, verticalScale} from 'react-native-size-matters';
import Login from '../screens/auth/login/Login';
import ForgotPassword from '../screens/auth/ForgotPassword.js/ForgotPassword';
import VerifyOTP from '../screens/auth/VerifyOTP/VerifyOTP';
import ResetPassword from '../screens/auth/ResetPassword/ResetPassword';
import {COLORS} from '../utils/theme';
import AppIntro from '../screens/Common/AppIntroSlider';
import Back from '../components/BackButton/Back';

const Stack = createNativeStackNavigator();
const AuthNavigator = ({setIsLogedIn, checkUserRole}) => {
  return (
    <>
    <Stack.Navigator initialRouteName='Intro' >
      <Stack.Screen
        name="Intro"
        component={AppIntro}
        options={({navigation}) => ({
          title: '',
          headerTransparent: true,
        })}
      />
      <Stack.Screen
        name="Login"
        component={Login}
        options={({navigation}) => ({
          title: '',
          headerTransparent: true,
          headerLeft: () => (
            <TouchableOpacity
              onPress={() => navigation.goBack()}
              style={styles.backbtn}>
            </TouchableOpacity>
          ),
        })}
      />
      <Stack.Screen
        name="Signup"
        component={Signup}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="VerifyOTP"
        component={VerifyOTP}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="ForgotPassword"
        component={ForgotPassword}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="ResetPassword"
        component={ResetPassword}
        options={{
          headerShown: false,
        }}
      />
    </Stack.Navigator>
    </>
  );
};
export default AuthNavigator;

const styles = StyleSheet.create({
  bgimgStyle: {
    flex: 1,
    backgroundColor: COLORS.white,
  },
  mainimgcover: {
    flexDirection: 'column',
    width: '100%',
    padding: 20,
  },
  scrollCenter: {
    flexGrow: 1,
    justifyContent: 'center',
  },
  logoStyle: {
    width: 140,
    height: 140,
  },
  btnlogin2: {
    height: 60,
    backgroundColor: COLORS.primary,
    alignItems: 'center',
    flexDirection: 'column',
    justifyContent: 'center',
    minWidth: 154,
    paddingHorizontal: moderateScale(20),
    borderRadius: 16,
    marginTop: 30,
  },
  buttonText: {
    // fontFamily: FONTS.PoppinsMedium,
    color: COLORS.white,
    fontSize: scale(16),
  },
  footer: {
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: verticalScale(20),
  },
  heading: {
    // fontFamily: FONTS.PoppinsBold,
    color: COLORS.black,
    fontSize: scale(22),
    letterSpacing: 0,
    paddingVertical: verticalScale(25),
    marginBottom: verticalScale(20),
  },
  centerText: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  subheading: {
    // fontFamily: FONTS.PoppinsSemiBold,
    color: COLORS.black,
    fontSize: scale(14),
    textAlign: 'right',
    marginBottom: verticalScale(40),
    textDecorationLine: 'underline',
    marginTop: 15,
  },

  leftpad: {
    paddingLeft: 10,
  },
  rightpad: {
    marginRight: 10,
  },
  inputContainer: {
    justifyContent: 'center',
    overflow: 'hidden',
    position: 'relative',
    marginTop: 10,
    width: '100%',
    borderRadius: 16,
    backgroundColor: 'transparent',
    borderWidth: 1,
    borderColor: COLORS.brgrey,
  },
  input: {
    height: 60,
    backgroundColor: COLORS.white,
    fontSize: scale(14),
    // fontFamily: FONTS.PoppinsRegular,
    color: '#35454F',
    width: '100%',
    paddingHorizontal: 18,
  },
  btnlogin: {
    height: 60,
    backgroundColor: COLORS.primary,
    alignItems: 'center',
    flexDirection: 'column',
    justifyContent: 'center',
    minWidth: 154,
    paddingHorizontal: moderateScale(20),
    borderRadius: 16,
  },
  buttonText: {
    // fontFamily: FONTS.PoppinsMedium,
    color: COLORS.white,
    fontSize: scale(16),
  },
  footerheading: {
    // fontFamily: FONTS.PoppinsRegular,
    color: COLORS.dark,
    fontSize: scale(14),
  },
  footer: {
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: verticalScale(20),
  },
  erroz: {
    marginHorizontal: 5,
    marginVertical: 3,
    color: 'red',
  },
  linktext: {
    color: COLORS.primary,
    // fontFamily: FONTS.PoppinsSemiBold,
    textDecorationLine: 'underline',
  },
  frow: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
  },
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
