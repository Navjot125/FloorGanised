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
import AppIntro from '../screens/AppIntroSlider';
import Home from '../screens/Tabs/Home';
import Notifications from '../screens/Tabs/Notifications';
import Detail from '../screens/Detail';
import {COLORS} from '../utils/theme';
import Back from '../components/BackButton/Back';

const Stack = createNativeStackNavigator();

const MainStackNavigator = ({}) => {
  const [authtoken, setauthtoken] = useState();
  const navigation = useNavigation();
  const user = false;

  return (
    <>
      <Stack.Navigator>
        <Stack.Screen
          name="Detail"
          options={({navigation}) => ({
            title: '',
            headerTitleAlign: 'left',
            headerBackground: () => (
              <View
                style={{
                  backgroundColor: COLORS.black,
                  height: 140,
                }}></View>
            ),
            headerShadowVisible: false,
            headerLeft: () => (
              <View style={{
                // backgroundColor: 'red', 
                flex: 1, height: 80,
                flexDirection:'row',
              }}
                >
                <Back />
                <Text
                  style={{
                    fontSize: 20,
                    color: COLORS.white,
                    color: 'white',
                    position: 'absolute',
                    left:'15%'
                  }}>
                  Details
                </Text>
              </View>
            ),
          })}
          component={Detail}></Stack.Screen>
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
