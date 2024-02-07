import {
  FlatList,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Image,
  SafeAreaView,
} from 'react-native';
import React from 'react';
import {navigationRef} from '../../App';
import {COLORS} from '../../utils/theme';
import Header from '../../components/Header/Header';
import {scale} from 'react-native-size-matters';
import {useDispatch, useSelector} from 'react-redux';
import {removeUserData} from '../../redux/reducers/User';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {deleteAccount} from '../../redux/actions/profileAction';

const Profile = () => {
  const dispatch = useDispatch();
  const userData = useSelector(state => state?.onBoardingreducer?.userData);
  const screen = userData?.role === 'Surveyor' ? 'Main' : 'Fitter';
  console.log(userData,'userData');
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
            ? dispatch(deleteAccount())
            : // item?.name == "Log Out" ? navigationRef.navigate('Login'):
              navigationRef.navigate(screen, {screen: item?.screen});
        }}>
        <Text style={{fontWeight: 500, fontSize: 14}}> {item?.name} </Text>
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
          }}>
          <Image
            style={{height: 66, width: 66}}
            resizeMode="contain"
            source={require('../../assets/images/profile.png')}
          />
          <Text style={{fontWeight: 600, fontSize: 16, marginTop: 10}}>
            {userData?.name}
          </Text>
        </View>
        <FlatList
          data={screens}
          renderItem={renderItem}
          contentContainerStyle={{paddingBottom: 20}}
        />
      </View>
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
