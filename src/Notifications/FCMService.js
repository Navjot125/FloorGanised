import AsyncStorage from '@react-native-async-storage/async-storage';
import messaging from '@react-native-firebase/messaging';
import {Platform} from 'react-native';

class FCMService {
  register = (onRegister) => {
    this.checkPermission(onRegister);
    console.log("FCMService--register",);
    //this.createNotificationListeners(onRegister, onNotification, onOpenNotification)
  };
  notificationListeners = (onRegister, onNotification, onOpenNotification) => {
    // this.checkPermission(onRegister)
    this.createNotificationListeners(
      onRegister,
      onNotification,
      onOpenNotification,
    );
  };
  registerAppWithFCM = async () => {
    console.log("registerAppWithFCM---called");
    if (Platform.OS == 'ios') {
      // await messaging().registerDeviceForRemoteMessages();
      await messaging().setAutoInitEnabled(true);
    }
  };

  checkPermission = (onRegister) => {

    if (Platform.OS == 'ios') {
      messaging()
        .hasPermission()
        .then((enabled) => {
          if (enabled) {
            // User has permissions
            console.log('Enabled permisson');

            this.getToken(onRegister);
          } else {``
            // User doesn't have permission
            console.log('No permisson');
            this.requestPermission(onRegister);
          }
        })
        .catch((error) => {
          console.log('[FCMService] Permission rejected ', error);
        });
    } else {
      this.getToken(onRegister);
    }
  };

  getToken = (onRegister) => {
    console.log("getToken---function called---");
    console.log(messaging().isDeviceRegisteredForRemoteMessages,Platform.OS)
    messaging()
      .getToken()
      .then(async(fcmToken) => {
        console.log("FCMToken------",fcmToken);
        await AsyncStorage.setItem('fcmToken' , fcmToken)
        if (fcmToken) {
          onRegister(fcmToken);

        } else {
          console.log('[FCMService] User does not have a device token');
        }
      })
      .catch((error) => {
        console.log('[FCMService] getToken rejected ', error);
      });
  };

  requestPermission = (onRegister) => {
    messaging()
      .requestPermission()
      .then(() => {
        this.getToken(onRegister);
      })
      .catch((error) => {
        //  console.log('[FCMService] Request Permission rejected ', error);
      });
  };

  deleteToken = () => {
    // console.log('[FCMService] deleteToken ');
    messaging()
      .deleteToken()
      .catch((error) => {
        //console.log('[FCMService] Delete token error ', error);
      });
  };

  createNotificationListeners = (
    onRegister,
    onNotification,
    onOpenNotification,
  ) => {
    // When the application is running, but in the background
    messaging().onNotificationOpenedApp((remoteMessage) => {
      console.log(
        '[FCMService] onNotificationOpenedApp Notification caused app to open from background state:',
        remoteMessage,
      );
      if (remoteMessage) {
        const notification = remoteMessage.notification;
        onOpenNotification(notification);
        // this.removeDeliveredNotification(notification.notificationId)
      }
    });

    // When the application is opened from a quit state.
    messaging()
      .getInitialNotification()
      .then((remoteMessage) => {
        // console.log(
        //   '[FCMService] getInitialNotification Notification caused app to open from quit state:',
        //   remoteMessage,
        // );

        if (remoteMessage) {
          const notification = remoteMessage.notification;
          onOpenNotification(notification);
          //  this.removeDeliveredNotification(notification.notificationId)
        }
      });

    // Foreground state messages
    this.messageListener = messaging().onMessage(async (remoteMessage) => {
      console.log('[FCMService] A new FCM message arrived!', remoteMessage);
      if (remoteMessage) {
        let notification = null;
        if (Platform.OS === 'ios') {
          notification = remoteMessage.notification;
        } else {
          console.log("check forground notification", remoteMessage);
          notification = remoteMessage.notification;
        }
        onNotification(notification);
      }
    });

    // Triggered when have new token
    messaging().onTokenRefresh((fcmToken) => {
      // console.log('[FCMService] New token refresh: ', fcmToken);
      onRegister(fcmToken);
    });
  };

  unRegister = () => {
    this.messageListener();
  };
}

export const fcmService = new FCMService();
