import {FlatList, StyleSheet, Text, View, TouchableOpacity} from 'react-native';
import React, {useEffect} from 'react';
import {navigationRef} from '../../../App';
import {dateListing} from '../../utils/Dates/DateLimit';
import CalendarStrip from '../../utils/Dates/CalendarStrip';
import {height} from '../../assets/styles/styles';
import {HomeData} from '../../config/DummyData';
import {COLORS} from '../../utils/theme';

const Home = () => {
  useEffect(() => {
    dateListing();
  }, []);

  const renderItem = ({item, index}) => {
    return (
      <View style={styles.container}>
        <View
          style={{
            height: '50%',
            flexDirection: 'row',
            justifyContent: 'space-around',
            alignItems: 'center',
          }}>
          <Text
            style={{
              fontSize: 16,
              fontWeight: 700,
            }}>
            {item?.title}
          </Text>
          <Text
            style={{
              fontSize: 16,
              fontWeight: 700,
            }}>
            ${item?.price}
          </Text>
        </View>
        <View
          style={{
            height: 1,
            width: '90%',
            backgroundColor: 'rgba(0, 0, 0, 0.1)',
            alignSelf: 'center',
          }}></View>
        <View
          style={{
            height: '50%',
            flexDirection: 'row',
            justifyContent: 'space-around',
            alignItems: 'center',
          }}>
          <Text
            style={{
              fontSize: 12,
              fontWeight: 500,
            }}>
            ${item?.location}
          </Text>
          <TouchableOpacity
            style={{
              backgroundColor: COLORS.primary,
              height: 24,
              width: 60,
              justifyContent: 'space-around',
              alignItems: 'center',
              borderRadius: 17,
            }}>
            <Text
              style={{
                fontSize: 12,
                fontWeight: 500,
              }}>
              Details
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
        <View style={{marginTop: -10}}>
          <CalendarStrip />
        </View>
        <FlatList data={HomeData} renderItem={renderItem} />
        {/* <Text onPress={()=>{
        navigationRef.reset({
          index: 0,
          routes: [{ name: "Root", params: { screen: "Login" } }]
        })
        // navigationRef.navigate("Login")
      }}>Home</Text> */}
      </View>
    </View>
  );
};

export default Home;

const styles = StyleSheet.create({
  container: {
    height: 141,
    backgroundColor: 'rgba(255, 255, 255, 1)',
    marginTop: 25,
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
