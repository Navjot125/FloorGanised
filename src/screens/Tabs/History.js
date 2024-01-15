import {FlatList, StyleSheet, Text, View, TouchableOpacity} from 'react-native';
import React, {useEffect} from 'react';
import {navigationRef} from '../../../App';
import {dateListing} from '../../utils/Dates/DateLimit';
import CalendarStrip from '../../utils/Dates/CalendarStrip';
import {height} from '../../assets/styles/styles';
import {HistoryData, HomeData} from '../../config/DummyData';
import {COLORS} from '../../utils/theme';
const History = () => {
  const renderItem = ({item, index}) => {
    return (
      <View style={styles.container}>
        <View
          style={{
            height: '45%',
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
            paddingHorizontal: 20,
          }}>
          <Text
            style={{
              fontSize: 16,
              fontWeight: 600,
            }}>
            {item?.title}
          </Text>
          <Text
            style={{
              fontSize: 12,
              fontWeight: 500,
              color: 'rgba(0, 0, 0, 0.6)',
            }}>
            {item?.date}
          </Text>
        </View>
        <View
          style={{
            height: '55%',
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
            paddingHorizontal: 20,
          }}>
          <Text
            style={{
              fontSize: 12,
              fontWeight: 500,
              width: '55%',
            }}>
            ${item?.location}
          </Text>

          <TouchableOpacity
            onPress={() => {
              navigationRef.navigate('Detail');
            }}
            style={{
              backgroundColor: COLORS.black,
              height: 24,
              justifyContent: 'space-around',
              alignItems: 'center',
              borderRadius: 17,
              paddingHorizontal: 10,
            }}>
            <Text
              style={{
                fontSize: 10,
                fontWeight: 600,
                color: COLORS.white,
              }}>
              {item?.status}
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  };
  return (
    <View
      style={{
        backgroundColor: 'black',
        flex: 1,
        paddingTop: height / 29,
      }}>
      <View
        style={{
          backgroundColor: 'white',
          flex: 1,
          borderTopLeftRadius: 20,
          borderTopRightRadius: 20,
        }}>
        <FlatList data={HistoryData} renderItem={renderItem} />
      </View>
    </View>
  );
};

export default History;

const styles = StyleSheet.create({
  container: {
    height: 117,
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
    paddingVertical: 15,
  },
});
