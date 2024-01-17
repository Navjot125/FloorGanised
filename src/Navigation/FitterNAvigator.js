import React, {useState} from 'react';
import {StyleSheet} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {navigationRef} from '../../App';
import FitterDetail from '../screens/Fitter/FitterDetails';
import MeasuringQuestionnaire from '../screens/Common/MeasuringQuestionnaire';

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
