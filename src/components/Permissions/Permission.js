import {Alert, Linking, PermissionsAndroid, Platform} from 'react-native';
import {check, request, PERMISSIONS, RESULTS} from 'react-native-permissions';

// const requestCameraPermission = async () => {
//   let data = { isGraned: false, Message: 'message' };
//   if (Platform.OS == 'android') {
//     try {
//       const granted = await PermissionsAndroid.request(
//         PermissionsAndroid.PERMISSIONS.CAMERA,
//         {
//           title: 'App Camera Permission',
//           message: 'App needs access to your camera ',
//           buttonNegative: 'Cancel',
//           buttonPositive: 'OK',
//         },
//       );
//       if (granted === PermissionsAndroid.RESULTS.GRANTED) {
//         console.log('Camera permission given');
//         data = { isGraned: true, Message: 'Camera permission given' };
//         return data;
//       } else {
//         data = { isGraned: false, Message: 'Camera permission denied' };
//         console.log('Camera permission denied');
//         return data;
//       }
//     } catch (err) {
//       console.warn(err);
//       data = { isGraned: false, Message: 'Error with camera' };

//       return data;
//     }
//   } else {
//     data = { isGraned: true, Message: 'ios' };
//     return data;
//   }
// };

// const requestCameraPermission = async () => {
//   let data = { isGraned: false, Message: 'message' };
//   const cameraPermission = Platform.OS === 'android'
//     ? PERMISSIONS.ANDROID.CAMERA
//     : PERMISSIONS.IOS.CAMERA;

//   try {
//     const result = await check(cameraPermission);
//     if (result === RESULTS.GRANTED) {
//       console.log('Camera permission given');
//       data = { isGraned: true, Message: 'Camera permission given' };
//     } else if (result === RESULTS.DENIED) {
//       const requestResult = await request(cameraPermission);
//       if (requestResult === RESULTS.GRANTED) {
//         console.log('Camera permission granted after request');
//         data = { isGraned: true, Message: 'Camera permission granted after request' };
//       } else {
//         console.log('Camera permission denied');
//         await request(cameraPermission)
//         data = { isGraned: false, Message: 'Camera permission denied' };
//       }
//     } else {
//       console.log('Camera permission denied');
//       await request(cameraPermission)
//       data = { isGraned: false, Message: 'Camera permission denied' };
//     }
//   } catch (err) {
//     console.warn(err);
//     data = { isGraned: false, Message: 'Error with camera' };
//   }

//   return data;
// };

const requestCameraPermission = async () => {
  let permissionGranted = false;
  let message = 'Camera permission required for this feature.';
  const cameraPermission =
    Platform.OS === 'android'
      ? PERMISSIONS.ANDROID.CAMERA
      : PERMISSIONS.IOS.CAMERA;

  try {
    const permissionStatus = await check(cameraPermission);
    if (permissionStatus === RESULTS.GRANTED) {
      console.log('Camera permission granted');
      message = 'Camera permission granted successfully!';
      permissionGranted = true;
    } else if (permissionStatus === RESULTS.DENIED) {
      const requestResult = await request(cameraPermission);
      console.log(requestResult, 'asdagr');
      if (requestResult !== RESULTS.GRANTED) {
        // Handle persistent denial with user guidance
        message =
          'Camera permission is required. Please enable it in your device settings.';
      } else {
        console.log('Camera permission granted after request');
        message = 'Camera permission granted. Thank you!';
        permissionGranted = true;
      }
    } else if (permissionStatus === RESULTS.BLOCKED) {
      const requestResult = await request(cameraPermission);
      console.log(requestResult, 'asdagr');
      if (requestResult !== RESULTS.GRANTED) {
        // Handle persistent denial with user guidance
        message =
          'Camera permission is required. Please enable it in your device settings.';
        // Optionally, open app settings directly for convenience:
        Alert.alert('Camera permissions Blocked', message, [
          {
            text: 'Cancel',
            onPress: () => console.log('Cancel Pressed'),
            style: 'cancel',
          },
          {
            text: 'Enable Camera',
            onPress: () => {
              setTimeout(() => {
                Linking.openSettings();
              }, 300);
            },
          },
        ]);
      } else {
        console.log('Camera permission granted after request');
        message = 'Camera permission granted. Thank you!';
        permissionGranted = true;
      }
    } else {
      console.log(permissionStatus, 'qwerty');
      // Unexpected permission status, handle as needed
    }
  } catch (err) {
    console.warn(err);
    message = 'Error accessing camera permissions. Please try again.';
  }

  return {isGraned: permissionGranted, Message: message};
};

const PERMISSIONS_MAP = {
  android: {
    READ_EXTERNAL_STORAGE: 'READ_EXTERNAL_STORAGE',
    WRITE_EXTERNAL_STORAGE: 'WRITE_EXTERNAL_STORAGE',
    CAMERA: 'CAMERA',
    RECORD_AUDIO: 'RECORD_AUDIO',
    READ_MEDIA_AUDIO: 'READ_MEDIA_AUDIO',
    READ_MEDIA_IMAGES: 'READ_MEDIA_IMAGES',
    READ_MEDIA_VIDEO: 'READ_MEDIA_VIDEO',
    READ_CONTACTS: 'READ_CONTACTS',
    ACCESS_FINE_LOCATION: 'ACCESS_FINE_LOCATION',
    ACCESS_COARSE_LOCATION: 'ACCESS_COARSE_LOCATION',
    WRITE_CONTACTS: 'WRITE_CONTACTS',
    BLUETOOTH_CONNECT: 'BLUETOOTH_CONNECT',
    BLUETOOTH_SCAN: 'BLUETOOTH_SCAN',
  },
  ios: {
    PHOTO_LIBRARY: 'PHOTO_LIBRARY',
    PHOTO_LIBRARY_ADD_ONLY: 'PHOTO_LIBRARY_ADD_ONLY',
    CAMERA: 'CAMERA',
    MEDIA_LIBRARY: 'MEDIA_LIBRARY',
    BLUETOOTH_PERIPHERAL: 'BLUETOOTH_PERIPHERAL',
    MICROPHONE: 'MICROPHONE',
    CALENDARS: 'CALENDARS',
    CONTACTS: 'CONTACTS',
  },
};
type permissions =
  | 'READ_EXTERNAL_STORAGE'
  | 'WRITE_EXTERNAL_STORAGE'
  | 'RECORD_AUDIO'
  | 'READ_MEDIA_AUDIO'
  | 'READ_MEDIA_IMAGES'
  | 'READ_MEDIA_VIDEO'
  | 'READ_CONTACTS'
  | 'ACCESS_FINE_LOCATION'
  | 'ACCESS_COARSE_LOCATION'
  | 'WRITE_CONTACTS'
  | 'BLUETOOTH_CONNECT'
  | 'BLUETOOTH_SCAN'
  | 'PHOTO_LIBRARY'
  | 'PHOTO_LIBRARY_ADD_ONLY'
  | 'CAMERA'
  | 'MEDIA_LIBRARY'
  | 'BLUETOOTH_PERIPHERAL'
  | 'MICROPHONE'
  | 'CALENDARS'
  | 'CONTACTS';
// type permissionsAndroid = 'PhotoLibrary' | 'PhotoLibraryAddOnly' | 'Camera' | 'MediaLibrary' | 'Notifications' | 'LocationAccuracy'| 'LocationAlways' | 'LocationWhenInUse'

const requestPermissions = async (type: permissions) => {
  let permissionGranted = false;
  let message = `${type} permission required for this feature.`;
  const permission =
    Platform.OS === 'android'
      ? PERMISSIONS.ANDROID[type]
      : PERMISSIONS.IOS[type];

  try {
    const permissionStatus = await check(permission);
    if (permissionStatus === RESULTS.GRANTED) {
      console.log(`${type} permission granted`);
      message = `${type} permission granted successfully!`;
      permissionGranted = true;
    } else if (permissionStatus === RESULTS.DENIED) {
      const requestResult = await request(permission);
      console.log(requestResult, 'asdagr');
      if (requestResult !== RESULTS.GRANTED) {
        // Handle persistent denial with user guidance
        message = `${type} permission is required. Please enable it in your device settings.`;
      } else {
        console.log(`${type} permission granted after request`);
        message = `${type} permission granted. Thank you!`;
        permissionGranted = true;
      }
    } else if (permissionStatus === RESULTS.BLOCKED) {
      const requestResult = await request(permission);
      console.log(requestResult, 'asdagr');
      if (requestResult !== RESULTS.GRANTED) {
        // Handle persistent denial with user guidance
        message = `${type} permission is required. Please enable it in your device settings.`;
        // Optionally, open app settings directly for convenience:
        Alert.alert(`${type} permissions required`, message, [
          {
            text: 'Cancel',
            onPress: () => console.log('Cancel Pressed'),
            style: 'cancel',
          },
          {
            text: 'Enable permission',
            onPress: () => {
              setTimeout(() => {
                Linking.openSettings();
              }, 300);
            },
          },
        ]);
      } else {
        console.log(`${type} permission granted after request`);
        message = `${type} permission granted. Thank you!`;
        permissionGranted = true;
      }
    } else {
      console.log(permissionStatus, 'qwerty');
      // Unexpected permission status, handle as needed
    }
  } catch (error) {
    console.error('Error requesting permission:', error);
  }
  return {isGraned: permissionGranted, Message: message};
};

// const requestPermissions = async () => {
//   try {
//     const granted = await PermissionsAndroid.requestMultiple([
//       PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE,
//       PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
//     ]);

//     if (
//       granted['android.permission.READ_EXTERNAL_STORAGE'] ===
//         PermissionsAndroid.RESULTS.GRANTED &&
//       granted['android.permission.WRITE_EXTERNAL_STORAGE'] ===
//         PermissionsAndroid.RESULTS.GRANTED
//     ) {
//       console.log('Storage permissions granted');
//     } else {
//       console.log('Storage permissions denied');
//     }
//   } catch (error) {
//     console.log('Error requesting storage permissions:', error);
//   }
// };

export {requestCameraPermission, requestPermissions};
