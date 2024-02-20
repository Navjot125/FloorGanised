import React, {useEffect} from 'react';
import {StatusBar, LogBox, Platform, PermissionsAndroid} from 'react-native';
import SplashScreen from 'react-native-splash-screen';
import {
  NavigationContainer,
  createNavigationContainerRef,
} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {Provider} from 'react-redux';
import store from './redux/store';
import {COLORS} from './utils/theme';
import RootNavigation from './Navigation/RootNavigation';
import PushNotification from 'react-native-push-notification';
import {fcmService} from './Notifications/FCMService';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {localNotificationService} from './Notifications/LocalNotificationService';
import {ToastProvider} from 'react-native-toast-notifications';
import messaging from '@react-native-firebase/messaging';
export const navigationRef = createNavigationContainerRef();
const Stack = createNativeStackNavigator();

export default function App() {
  useEffect(() => {
    GetNotificationHits(), initNotification();
  }, []);

  const GetNotificationHits = () => {
    that = this;

    if (Platform.OS == 'android') {
      PushNotification.createChannel(
        {
          channelId: 'channel-id', // (required)
          channelName: 'ChargEasy', // (required)
          channelDescription: 'A channel to categorise your notifications', // (optional) default: undefined.
          playSound: false, // (optional) default: true
          soundName: 'default', // (optional) See `soundName` parameter of `localNotification` function
          importance: 4, // (optional) default: Importance.HIGH. Int value of the Android notification importance
          vibrate: true, // (optional) default: true. Creates the default vibration patten if true.
        },
        created => console.log(`createChannel returned '${created}'`), // (optional) callback returns whether the channel was created, false means it already existed.
      );
    }
    fcmService.registerAppWithFCM();
    fcmService.notificationListeners(
      onRegister,
      onNotification,
      onOpenNotification,
    );
    localNotificationService.configure(onOpenNotification);

    function onRegister(token) {
      console.log('[App] MapSearch: ', token);
    }

    function onNotification(notify) {
      console.log('[App] onnotify:444 ', notify);

      // let notify = notification.notification;
      // let data = notification.data;

      const options = {
        soundName: 'default',
        playSound: true,
      };

      localNotificationService.showNotification(
        0,
        notify.title,
        notify.body,
        notify,
        options,
      );
    }

    async function onOpenNotification(notify) {
      console.log('[App] onOpenNotification:5555 ', notify);
    }
  };

  const initNotification = async () => {
    fcmService.registerAppWithFCM();
    fcmService.register(onRegister);
    async function onRegister(token) {
      console.log('[App] onRegister: ', token);
      if (token) {
        await AsyncStorage.setItem('fcmToken', token);
        // setConfiguration("fcmToken", token);
      } else {
        alert('failed to connect to firebase');
        AsyncStorage.setItem('fcmToken', '');
        // setConfiguration("fcmToken", "none");
      }
    }
  };

  LogBox.ignoreLogs([
    'A non-serializable value was detected in an action',
    'SerializableStateInvariantMiddleware took 45ms, which is more than the warning threshold of 32ms.',
    'SerializableStateInvariantMiddleware took',
    'Non-serializable values',
  ]);
  useEffect(() => {
    setTimeout(() => {
      SplashScreen.hide();
    }, 2000);
  }, []);
  return (
    <ToastProvider>
      <Provider store={store}>
        <StatusBar backgroundColor={COLORS.black} barStyle="light-content" />
        <NavigationContainer ref={navigationRef}>
          <RootNavigation />
        </NavigationContainer>
      </Provider>
    </ToastProvider>
  );
}
