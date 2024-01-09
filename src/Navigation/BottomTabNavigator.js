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
import React from 'react';
import React, {useEffect, useState} from 'react';
import {createStackNavigator} from '@react-navigation/stack';
const Stack = createStackNavigator();

const BottomTabNavigator = () => {
  return (
    <Stack.Navigator
    initialRouteName={initialState}
    screenOptions={{ headerMode: "screen" }}
  >
    <Stack.Screen
      name="Root"
      options={{ headerShown: false }}
    >
      {(props) => (
        <BottomTabNavigator
          {...props}
          checkUserRole={checkUserRole}
          setIsLogedIn={setIsLogedIn}
        />
      )}
    </Stack.Screen>

    <Stack.Screen
      name="Login"
      component={LoginScreen}
      options={{ headerShown: false }}
    />

    <Stack.Screen
      name="ForgotPassword"
      component={ForgotPasswordScreen}
      options={({ navigation }) => ({
        title: "",
        headerTransparent: true,
        headerLeft: () => (
          <TouchableOpacity
            onPress={() => navigation.goBack()}
            style={styles.backbtn}
          >
            <Image
              resizeMode="contain"
              source={BackIcon}
              style={{
                width: 44,
                height: 44,
              }}
            />
          </TouchableOpacity>
        ),
      })}
    />
  </Stack.Navigator>
  );
};

export default BottomTabNavigator;

const styles = StyleSheet.create({});
