import {
  FlatList,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Image,
  SafeAreaView,
} from 'react-native';
import React, {useEffect} from 'react';
import {navigationRef} from '../../../App';
import {dateListing} from '../../utils/Dates/DateLimit';
import CalendarStrip from '../../utils/Dates/CalendarStrip';
import {height} from '../../assets/styles/styles';
import {HistoryData, HomeData} from '../../config/DummyData';
import {COLORS} from '../../utils/theme';
import Header from '../../components/Header/Header';
import {scale} from 'react-native-size-matters';

const Profile = () => {
  const screens = [
    {
      name: 'Manage Profile',
      screen: 'UserProfile',
      _id: 0,
    },
    {
      name: 'Change Password',
      screen: 'ChangePassword',
      _id: 0,
    },
    {
      name: 'Terms & Conditions',
      screen: 'TermsConditions',
      _id: 0,
    },
    {
      name: 'Contact Us',
      screen: 'ContactUs',
      _id: 0,
    },
  ];

  const renderItem = ({item, index}) => {
    return (
      <TouchableOpacity
        style={styles.container}
        onPress={() => {
          navigationRef.navigate(item?.screen);
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
            John Watson
          </Text>
        </View>
        <FlatList data={screens} renderItem={renderItem} />
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
    elevation: 14,
    marginHorizontal: 20,
    paddingHorizontal: 25,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
});
