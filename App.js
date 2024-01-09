import React, { useEffect, useState } from "react";
import {View, Text, SafeAreaView} from 'react-native';
import CommonModal from './src/components/Modal/Modal';
import Back from './src/components/BackButton/Back';
import CommonTextInput from './src/components/Input/InputBox';
import CommonButton from './src/components/CommonButton/CommonButton';
import SplashScreen from "react-native-splash-screen";
import AppIntro from "./src/screens/AppIntroSlider";

export default function App() {

  useEffect(() => {
    setTimeout(() => {
      SplashScreen.hide();
    }, 2000);
  }, []);
  return (
    <SafeAreaView>
      {/* <Text>Hello Floor Ganised</Text> */}
      {/* <CommonModal  /> */}
      {/* <Back /> */}
      {/* <CommonTextInput /> */}
      {/* <CommonButton /> */}
      <AppIntro />
    </SafeAreaView> 
  );
}
