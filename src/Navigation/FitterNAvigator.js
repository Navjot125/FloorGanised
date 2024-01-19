import React, {useState} from 'react';
import {StyleSheet} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {navigationRef} from '../../App';
import FitterDetail from '../screens/Fitter/FitterDetails';
import MeasuringQuestionnaire from '../screens/Common/MeasuringQuestionnaire';
import JobCompleteForm from '../screens/Fitter/JobCompleteForm';
import ManageProfile from '../screens/Common/ManageProfile';
import TermsConditions from '../screens/Common/TermsConditions';
import ChangePassword from '../screens/Common/ChangePassword';
import ContactUs from '../screens/Common/ContactUs';

const Stack = createNativeStackNavigator();

const FitterStackNavigator = ({}) => {
  const [authtoken, setauthtoken] = useState();
  const navigation = useNavigation();
  const onPress = () => {
    navigationRef.goBack();
  };
  return (
    <>
      <Stack.Navigator>
        <Stack.Screen
          name="FitterDetail"
          options={({navigation}) => ({
            headerShown: false,
          })}
          component={FitterDetail}></Stack.Screen>
        <Stack.Screen
          name="MeasuringQuestionnaire"
          options={({navigation}) => ({
            headerShown: false,
          })}
          component={MeasuringQuestionnaire}></Stack.Screen>
        <Stack.Screen
          name="JobCompleteForm"
          options={({navigation}) => ({
            headerShown: false,
          })}
          component={JobCompleteForm}></Stack.Screen>
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

export {FitterStackNavigator};
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
