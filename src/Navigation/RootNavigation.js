import {StyleSheet, Text, View} from 'react-native';
import React, {useEffect, useState} from 'react';
import {
  NavigationContainer,
  createNavigationContainerRef,
} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import AuthNavigator from './AuthNavigator';
import {BottomTabNavigator} from './BottomTabNavigator';
import {MainStackNavigator} from './StackNavigator';
import {FitterStackNavigator} from './FitterNavigator';
import {useDispatch, useSelector} from 'react-redux';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { getProfile } from '../redux/actions/profileAction';
const Stack = createNativeStackNavigator();
export const navigationRef = createNavigationContainerRef();

const RootNavigation = () => {
  const dispatch = useDispatch()
  const [state, setState] = useState({
    token: '',
    route: '',
    role: '',
  });
  useEffect(()=>{
    dispatch(getProfile())
  },[])
  useEffect(() => {
    getData();
  }, [state]);
  const getData = async () => {
    const token = await AsyncStorage.getItem('token');
    const role = await AsyncStorage.getItem('role');
    setState(prev => ({
      ...prev,
      route: token ? 'tabs' : 'Root',
      token: token,
      role: role,
    }));
  };
  return (
    <>
      {state.route ? (
        <Stack.Navigator
          screenOptions={{headerShown: false}}
          initialRouteName={state?.route}>
          <>
            <Stack.Screen name="Root">{() => <AuthNavigator />}</Stack.Screen>
            <Stack.Screen name="tabs">
              {() => <BottomTabNavigator />}
            </Stack.Screen>
            {state?.role === 'Surveyor' ? (
              <Stack.Screen name="Main">
                {() => <MainStackNavigator />}
              </Stack.Screen>
            ) : (
              <Stack.Screen name="Fitter">
                {() => <FitterStackNavigator />}
              </Stack.Screen>
            )}
          </>
        </Stack.Navigator>
      ) : (
        <></>
      )}
    </>
  );
};

export default RootNavigation;

const styles = StyleSheet.create({});
