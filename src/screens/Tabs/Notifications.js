import {FlatList, StyleSheet, Text, View, TouchableOpacity, SafeAreaView} from 'react-native';
import React, {useEffect} from 'react';
import {navigationRef} from '../../../App';
import {dateListing} from '../../utils/Dates/DateLimit';
import CalendarStrip from '../../utils/Dates/CalendarStrip';
import {height} from '../../assets/styles/styles';
import {NotificationData} from '../../config/DummyData';
import {COLORS} from '../../utils/theme';
import Header from '../../components/Header/Header';
import { scale } from 'react-native-size-matters';
const Notifications = () => {
  const renderItem = ({item, index}) => {
    return (
      <View style={styles.container}>
        <View
          style={{
            height: '40%',
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
            paddingHorizontal:20
          }}>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <Text
              style={{
                fontSize: 6,
                color: index == 0 ? COLORS.primary : COLORS.black,
              }}>
              {'\u2B24'}
            </Text>
            <Text
              style={{
                fontSize: 14,
                fontWeight: 600,
                marginLeft: 10,
              }}>
              {item?.title}
            </Text>
          </View>
          <Text
            style={{
              fontSize: 9,
              fontWeight: 400,
            }}>
            {item?.time}
          </Text>
        </View>
        <View
          style={{
            height: '40%',
            flexDirection: 'row',
            alignItems: 'center',
            paddingHorizontal: 20,
          }}>
          {item?.description.length > 60 ? (
            <Text
              style={{
                fontSize: 12,
                fontWeight: 400,
              }}>
              {item?.description}...
              <Text
               onPress={() => {
                console.log('pressed');
              }}
                style={{
                  fontSize: 12,
                  fontWeight: 700,
                  color: COLORS.secondry,
                }}>
                View
              </Text>
            </Text>
          ) : (
            <Text
              style={{
                fontSize: 12,
                fontWeight: 400,
              }}>
              {item?.description}
            </Text>
          )}
        </View>
      </View>
    );
  };
  return (
    <View style={{flex: 1, backgroundColor: 'black'}}>
      <SafeAreaView />
      <Header title={'Notifications'} />
      <View
        style={{
          backgroundColor: COLORS.white,
          flex: 1,
          borderTopRightRadius: scale(20),
          borderTopLeftRadius: scale(20),
        }}>
       <FlatList data={NotificationData} renderItem={renderItem} />
      </View>
    </View>
  );
};

export default Notifications;

const styles = StyleSheet.create({
  container: {
    height: 99,
    backgroundColor: 'rgba(255, 255, 255, 1)',
    marginTop: 20,
    borderRadius: 16,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 6,
    },
    shadowOpacity: 0.1,
    shadowRadius: 11.27,
    elevation: 14,
    marginHorizontal: 20,
  },
});
