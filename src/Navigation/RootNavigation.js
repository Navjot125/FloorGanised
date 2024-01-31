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
import {getProfile} from '../redux/actions/profileAction';
import {getJobs} from '../redux/actions/homeAction';
import messaging from '@react-native-firebase/messaging';

const Stack = createNativeStackNavigator();
export const navigationRef = createNavigationContainerRef();

const RootNavigation = () => {
  const dispatch = useDispatch();
  const [state, setState] = useState({
    token: '',
    route: '',
    role: '',
  });
  state
    ? useEffect(() => {
        dispatch(getProfile());
        // dispatch(getJobs('Pending'))
      }, [])
    : null;
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

  useEffect(() => {
    requestUserPermission(), NotificationListner();
  }, []);
  const requestUserPermission = async () => {
    const authStatus = await messaging().requestPermission();
    const enabled =
      authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
      authStatus === messaging.AuthorizationStatus.PROVISIONAL;

    if (enabled) {
      console.log('Authorization status:', authStatus);
      getFCMToken();
    }
  };

  // let checkToken = useSelector(state => state.user?.fcmToken)
  const getFCMToken = async () => {
    const checkToken = await AsyncStorage.getItem('FCMToken');
    console.log('Old fcm token of instructor is ---', checkToken);
    if (!checkToken) {
      try {
        const FCMToken = await messaging().getToken();
        if (FCMToken) {
          console.log('New fcm token is ---', FCMToken);
          // dispatch(setFcmToken(FCMToken));
          await AsyncStorage.setItem('FCMToken', FCMToken);
        }
      } catch (error) {
        console.log(error, 'error in getFCMToken');
      }
    } else {
      // dispatch(setFcmToken(checkToken));
    }
  };

  const NotificationListner = () => {
    // Assume a message-notification contains a "type" property in the data payload of the screen to open

    messaging().onNotificationOpenedApp(remoteMessage => {
      console.log(
        'Notification caused app to open from background state:',
        remoteMessage.notification,
      );
    });

    messaging().onMessage(async remoteMessage => {
      console.log('Recived in foreground', remoteMessage),
        showMessage({
          message: remoteMessage?.notification?.title?.toString(),
          type: 'success',
          description: description(
            remoteMessage?.notification?.body?.toString(),
          ),
          style: {
            justifyContent: 'flex-end',
            paddingTop: 30,
            borderRadius: 20,
          },
          duration: 3500,
        });
    });
    // Check whether an initial notification is available
    messaging()
      .getInitialNotification()
      .then(remoteMessage => {
        if (remoteMessage) {
          console.log(
            'Notification caused app to open from quit state:',
            remoteMessage.notification,
          );
        }
      });
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
