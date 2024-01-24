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
import {useSelector} from 'react-redux';
import AsyncStorage from '@react-native-async-storage/async-storage';
const Stack = createNativeStackNavigator();
export const navigationRef = createNavigationContainerRef();

const RootNavigation = () => {
  //   const userData = useSelector(state => state?.userData?.data);
  //   console.log('userData', userData);
  const [state, setState] = useState({
    token: '',
    role: '',
  });
  useEffect(() => {
    getData();
  }, []);
  const getData = async () => {
    const token = await AsyncStorage.getItem('token');
    const role = await AsyncStorage.getItem('role');
    setState(prev => ({
      ...prev,
      token: token,
      role: role,
    }));
  };
  return (
    console.log(state, 'state'),
    (
      <>
        <Stack.Navigator screenOptions={{headerShown: false}}>
          {!state?.token ? (
            <Stack.Screen name="Root">{() => <AuthNavigator />}</Stack.Screen>
          ) : (
            <></>
          )}
          <Stack.Screen name="tabs">
            {() => <BottomTabNavigator />}
          </Stack.Screen>
          {state?.role === 'Surveyor'  ? (
            <Stack.Screen name="Main">
              {() => <MainStackNavigator />}
            </Stack.Screen>
          ) : (
            <Stack.Screen name="Fitter">
              {() => <FitterStackNavigator />}
            </Stack.Screen>
          )}
        </Stack.Navigator>

        {/* <Stack.Navigator screenOptions={{headerShown: false}}>
          {!state?.token && (
            <Stack.Screen name="Root">{() => <AuthNavigator />}</Stack.Screen>
          )}
          <Stack.Screen name="tabs">
            {() => <BottomTabNavigator />}
          </Stack.Screen>
          {!state?.role === 'Fitter' && state?.token ? (
            <Stack.Screen name="Main">
              {() => <MainStackNavigator />}
            </Stack.Screen>
          ) : state?.role === 'Fitter' && state?.token ? (
            <Stack.Screen name="Fitter">
              {() => <FitterStackNavigator />}
            </Stack.Screen>
          ) : (
            <></>
          )}
        </Stack.Navigator> */}
        {/* <Stack.Navigator screenOptions={{headerShown: false}}>
          {!state?.token ? (
            <Stack.Screen name="Root" component={AuthNavigator} />
          ) : state?.role === 'Fitter' ? (
            <Stack.Screen name="Fitter" component={FitterStackNavigator} />
          ) : (
            <Stack.Screen name="Main" component={MainStackNavigator} />
          )}
          <Stack.Screen name="tabs">
            {() => <BottomTabNavigator />}
          </Stack.Screen>
        </Stack.Navigator> */}
        {/* 
    <Stack.Navigator  screenOptions={{headerShown: false}} initialRouteName={userData?.token  ? "tabs": 'Root'}>
      {!userData?.token ? (
        <Stack.Screen name="Root" component={AuthNavigator} />
      ) : (
        ((
          <Stack.Screen name="tabs" component={BottomTabNavigator} />
        ),
        userData?.role == 'Fitter' && userData?.token ? (
          <Stack.Screen name="Fitter">
            {() => <FitterStackNavigator />}
          </Stack.Screen>
        ) : 
        userData?.role == 'Surveyor' && userData?.token? (
          <Stack.Screen name="Main">
            {() => <MainStackNavigator />}
          </Stack.Screen>
        ) :<>
        </>)
      )}
    </Stack.Navigator> */}
      </>
    )
  );
};

export default RootNavigation;

const styles = StyleSheet.create({});
