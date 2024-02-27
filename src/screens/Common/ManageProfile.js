import {
  Image,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useState} from 'react';
import {scale} from 'react-native-size-matters';
import {COLORS} from '../../utils/theme';
import Header from '../../components/Header/Header';
import CommonTextInput from '../../components/Input/InputBox';
import CommonButton from '../../components/CommonButton/CommonButton';
import {navigationRef} from '../../App';
import {useDispatch, useSelector} from 'react-redux';
import {updateProfileRequest} from '../../redux/actions/profileAction';
import {useToast} from 'react-native-toast-notifications';
import Feather from 'react-native-vector-icons/Feather';
import {launchImageLibrary, launchCamera} from 'react-native-image-picker';
import {requestPermissions} from '../../components/Permissions/Permission';
import Modal from 'react-native-modal';
import {width} from '../../assets/styles/styles';
import LaunchImageLibraryAsync from '../../components/ImagePicker/ImagePicker';
import {ImageUrl} from '../../services/Config';
const ManageProfile = () => {
  const dispatch = useDispatch();
  const userData = useSelector(state => state?.onBoardingreducer?.userData);
  const [name, setName] = useState();
  const [pickLocation, setPickLocation] = useState(false);
  const [profile, setProfile] = useState(userData?.profile_image);
  const toast = useToast();
  const [email, setEmail] = useState();
  const style = {
    width: '100%',
    marginTop: 25,
  };
  const buttonStyle = {
    marginBottom: 25,
  };
  const onPress = () => {
    const param = {
      name,
      email,
      profile: profile,
      toastFun: (msg, type) => {
        toast.show(msg, {
          type: type,
          placement: 'bottom',
          duration: 4000,
          offset: 30,
          animationType: 'slide-in ',
        });
      },
    };
    dispatch(updateProfileRequest(param));
  };
  const openCamera = async () => {
    const permissionResponse = await requestPermissions('CAMERA');
    if (permissionResponse.isGraned) {
      try {
        setTimeout(async () => {
          await ImageCropPicker.openCamera(config).then(image => {
            // onResponse(image.path);
            // console.log('image.path', image);
            // getImage(image?.path);
            if (image?.path) {
              getImage(image?.path);
              handleUploadImage(image?.path);
            }
          });
        }, 500);
      } catch (err) {
        console.log('camera picker Error Hai...', err);
      }
    }
  };

  const openGallery = async () => {
    try {
      const photo = await requestPermissions('PHOTO_LIBRARY');
      if (Platform.OS === 'android') {
        setTimeout(async () => {
          try {
            const granted = await PermissionsAndroid.requestMultiple([
              PermissionsAndroid.PERMISSIONS.READ_MEDIA_IMAGES,
              PermissionsAndroid.PERMISSIONS.ACCESS_MEDIA_LOCATION,
            ]);
            // console.log("granted", granted)
            if (
              granted['android.permission.READ_MEDIA_IMAGES'] ===
                PermissionsAndroid.RESULTS.GRANTED &&
              granted['android.permission.ACCESS_MEDIA_LOCATION'] ===
                PermissionsAndroid.RESULTS.GRANTED
            ) {
              // console.log('Storage permissions granted');
              await ImageCropPicker.openPicker(config).then(async image => {
                // console.log('image.path', image.path);
                // console.log(imageKey)
                // getImage(image?.path);
                console.log(image, 'image2');
                if (image?.path) {
                  getImage(image?.path);
                  handleUploadImage(image?.path);
                }
              });
            } else {
              await ImageCropPicker.openPicker(config).then(async image => {
                // console.log('image.path', image.path);
                // console.log(imageKey)
                // getImage(image?.path);
                console.log(image, 'image');
                if (image?.path) {
                  getImage(image?.path);
                  handleUploadImage(image?.path);
                }
              });
            }
          } catch (error) {
            console.log('Error requesting storage permissions:', error);
          }
        }, 500);
      } else {
        if (photo.isGraned) {
          const image = await ImageCropPicker.openPicker(config);
          if (image?.path) {
            getImage(image?.path);
            handleUploadImage(image?.path);
          }
          // console.log(image.path, "IMAGG")
        }
      }
    } catch (error) {
      console.log('gallery Picker Error hai...', error);
    }
  };
  console.log(profile, 'p---------------');
  return (
    <View style={{flex: 1, backgroundColor: 'black'}}>
      <SafeAreaView />
      <Header title={'Manage Profile'} back={true} />
      <View style={styles.container}>
        <View>
          <View
            style={{
              alignItems: 'center',
              paddingVertical: 30,
            }}>
            <View
              style={{
                height: 100,
                width: 100,
                borderRadius: 100,
                justifyContent: 'center',
                alignItems: 'center',
                overflow: 'hidden',
                borderWidth: 1,
              }}>
              <Image
                style={{height: '100%', width: '100%'}}
                source={
                  profile == undefined
                    ? require('../../assets/images/avatar.png')
                    : {
                        uri: profile?.uri ? profile?.uri : ImageUrl + profile,
                      }
                }
                resizeMode="cover"
              />
            </View>
            <TouchableOpacity
              onPress={() => {
                setPickLocation(true);
              }}
              style={{
                backgroundColor: '#F3A204',
                top: scale(-25),
                left: scale(35),
                padding: 5,
                borderRadius: 30,
              }}>
              <Feather name="camera" size={20} color={COLORS.white} />
            </TouchableOpacity>
            <Text style={{fontWeight: 600, fontSize: 16, marginTop: 10}}>
              {userData?.name}
            </Text>
          </View>
          <CommonTextInput
            placeholder={'Full Name'}
            value={name}
            onChangeText={newText => setName(newText)}
            style={style}
          />
          <CommonTextInput
            placeholder={'Email ( Username )'}
            value={email}
            keyboardType="email-address"
            onChangeText={newText => setEmail(newText)}
            style={style}
          />
        </View>
        <CommonButton style={buttonStyle} title={'Save'} onPress={onPress} />
      </View>
      <Modal
        propagateSwipe={true}
        isVisible={pickLocation}
        onBackdropPress={() => {
          setPickLocation(false);
        }}
        animationInTiming={500}
        style={[styles.mainmodal]}>
        <View style={[styles.center]}>
          <Text style={{fontSize: 17, fontWeight: 600, marginVertical: 20}}>
            Select Photo From
          </Text>
          <TouchableOpacity
            style={styles.btnlogin2}
            onPress={() => {
              LaunchImageLibraryAsync(
                profile,
                setProfile,
                setPickLocation,
                'profile',
                (camera = false),
              );
              // setPickLocation(false);
            }}>
            <Text style={styles.buttonText}>Gallery</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.btnlogin2}
            onPress={() => {
              LaunchImageLibraryAsync(
                profile,
                setProfile,
                setPickLocation,
                'profile',
                (camera = true),
              );
            }}>
            <Text style={styles.buttonText}>Camera</Text>
          </TouchableOpacity>
        </View>
      </Modal>
    </View>
  );
};
// style, title, onPress

export default ManageProfile;

const styles = StyleSheet.create({
  container: {
    backgroundColor: COLORS?.white,
    flex: 1,
    borderTopRightRadius: scale(20),
    borderTopLeftRadius: scale(20),
    padding: 20,
    justifyContent: 'space-between',
  },

  mainmodal: {
    justifyContent: 'flex-end',
    marginBottom: 40,
  },
  center: {
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 20,
    backgroundColor: COLORS.white,
  },
  btnlogin2: {
    height: 60,
    backgroundColor: COLORS.primary,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 40,
    width: width / 1.5,
    marginBottom: 20,
  },
  buttonText: {
    fontWeight: 600,
    fontSize: 16,
  },
});
