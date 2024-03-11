import {
  FlatList,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Image,
  SafeAreaView,
} from 'react-native';
import React, {useState} from 'react';
import {navigationRef} from '../../App';
import {COLORS} from '../../utils/theme';
import Header from '../../components/Header/Header';
import {scale} from 'react-native-size-matters';
import {useDispatch, useSelector} from 'react-redux';
import {removeUserData} from '../../redux/reducers/User';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {deleteAccount} from '../../redux/actions/profileAction';
import ResetSuccess from '../../assets/images/deleteAccount.png';
import CommonModal from '../../components/Modal/Modal';
import {useToast} from 'react-native-toast-notifications';
import {ImageUrl} from '../../services/Config';
import FONTS from '../../assets/styles/fonts';
const Profile = () => {
  const dispatch = useDispatch();
  const toast = useToast();
  const userData = useSelector(state => state?.onBoardingreducer?.userData);
  console.log('userData-', userData);
  const screen = userData?.role === 'Surveyor' ? 'Main' : 'Fitter';
  const [showModal, setShowModal] = useState(false);
  console.log(userData,'userData--');
  const screens = [
    {
      name: 'Manage Profile',
      screen: 'ManageProfile',
      _id: 0,
    },
    {
      name: 'Change Password',
      screen: 'ChangePassword',
      _id: 1,
    },
    {
      name: 'Terms & Conditions',
      screen: 'TermsConditions',
      _id: 2,
    },
    {
      name: 'Contact Us',
      screen: 'ContactUs',
      _id: 3,
    },
    {
      name: 'Delete Account',
      screen: '',
      _id: 3,
    },
    {
      name: 'Log Out',
      screen: '',
      _id: 4,
    },
  ];

  const param = {
    toastFun: (msg, type) => {
      setShowModal(false),
        toast.show(msg, {
          type: type,
          placement: 'bottom',
          duration: 4000,
          offset: 30,
          animationType: 'slide-in ',
        });
    },
  };

  const renderItem = ({item, index}) => {
    return (
      <TouchableOpacity
        style={styles.container}
        onPress={async () => {
          item?.name == 'Log Out'
            ? (dispatch(removeUserData()),
              navigationRef.reset({
                routes: [{name: 'Root', params: {screen: 'Login'}}],
              }),
              setTimeout(async () => {
                await AsyncStorage.removeItem('token');
              }, 300))
            : item?.name == 'Delete Account'
            ? setShowModal(true)
            : navigationRef.navigate(screen, {screen: item?.screen});
        }}>
        <Text style={{fontSize: 14, fontFamily: FONTS?.MontserratMedium}}>
          {' '}
          {item?.name}{' '}
        </Text>
        <Image
          style={{height: 10, width: 10}}
          resizeMode="contain"
          source={require('../../assets/images/rightArrow.png')}
        />
      </TouchableOpacity>
    );
  };
  return (
    <View style={{flex: 1, backgroundColor: 'black'}}>
      <SafeAreaView />
      <Header title={'Profile'} />
      <View
        style={{
          backgroundColor: COLORS.white,
          flex: 1,
          borderTopRightRadius: scale(20),
          borderTopLeftRadius: scale(20),
        }}>
        <View
          style={{
            alignItems: 'center',
            paddingVertical: 30,
            // height: 100,
            // width: 100,
            // borderRadius: 100,
            // justifyContent: 'center',
            // alignItems: 'center',
            // overflow: 'hidden',
            // borderWidth: 1,
          }}>
          <View
            style={{
              // alignItems: 'center',
              // paddingVertical: 30,
              height: 100,
              width: 100,
              borderRadius: 100,
              justifyContent: 'center',
              alignItems: 'center',
              overflow: 'hidden',
              borderWidth: 1,
            }}>
            <Image
              style={{height: '100%', width: '100%', borderRadius: 50}}
              resizeMode="cover"
              source={
                !userData?.profile_image
                  ? require('../../assets/images/avatar.png')
                  : {uri: ImageUrl + userData?.profile_image}
              }
            />
          </View>
          <Text
            style={{
              fontSize: 16,
              marginTop: 10,
              fontFamily: FONTS?.MontserratSemiBold,
            }}>
            {userData?.name}
          </Text>
        </View>
        <FlatList
          data={screens}
          renderItem={renderItem}
          contentContainerStyle={{paddingBottom: 20}}
          showsVerticalScrollIndicator={false}
        />
      </View>
      {showModal && (
        <CommonModal
          isVisible={showModal}
          twoButtons={true}
          onModalPress={() => dispatch(deleteAccount(param))}
          onPress={() => setShowModal(false)}
          img={ResetSuccess}
          title={'Are You Sure ?'}
          description={
            'After deleting the account you can not access your profile'
          }
          buttonTitle={'Delete Account'}
          secondButtonTitle={'Cancel'}
          secondOnClick={() => setShowModal(false)}
        />
      )}
    </View>
  );
};

export default Profile;

const styles = StyleSheet.create({
  container: {
    height: 56,
    backgroundColor: 'rgba(255, 255, 255, 1)',
    marginTop: 20,
    borderRadius: 40,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 6,
    },
    shadowOpacity: 0.1,
    shadowRadius: 11.27,
    elevation: 10,
    marginHorizontal: 20,
    paddingHorizontal: 25,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
});
