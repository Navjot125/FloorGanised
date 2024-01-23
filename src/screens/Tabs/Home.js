import {
  FlatList,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  SafeAreaView,
} from 'react-native';
import React, {useEffect} from 'react';
import {navigationRef} from '../../../App';
import {dateListing} from '../../utils/Dates/DateLimit';
import CalendarStrip from '../../utils/Dates/CalendarStrip';
import {height} from '../../assets/styles/styles';
import {HomeData} from '../../config/DummyData';
import {COLORS} from '../../utils/theme';
import Header from '../../components/Header/Header';
import {scale} from 'react-native-size-matters';
import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons';
import {useSelector} from 'react-redux';

const Home = () => {
  useEffect(() => {
    dateListing();
  }, []);
  const userData = useSelector(state => state?.userData?.data);
  const stack = userData?.role == 1 ? 'Main' : 'Fitter';
  const screen = userData?.role == 1 ? 'Detail' : 'FitterDetail';
  const renderItem = ({item, index}) => {
    return (
      <View style={styles.container}>
        <View
          style={{
            height: '50%',
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
            paddingHorizontal: 15,
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
          <SimpleLineIcons
            name="location-pin"
            size={20}
            color={COLORS.secondry}
          />
          <Text
            style={{
              fontSize: 12,
              fontWeight: 500,
              width: 180,
            }}>
            {item?.location}
          </Text>
          <TouchableOpacity
            onPress={() => {
              index == 0 && userData?.role == 2
                ? navigationRef.navigate(stack, {screen: 'JobCompleteForm'})
                : navigationRef.navigate(stack, {screen: screen});
            }}
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
              {index == 0 && userData?.role == 2 ? 'On Work' : 'Details'}
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  };
  return (
    <View style={{flex: 1, backgroundColor: 'black'}}>
      <SafeAreaView />
      <Header title={'Home'} />
      <View
        style={{
          backgroundColor: COLORS?.white,
          flex: 1,
          borderTopRightRadius: scale(20),
          borderTopLeftRadius: scale(20),
        }}>
        <CalendarStrip />
        <FlatList
          data={HomeData}
          renderItem={renderItem}
          contentContainerStyle={{paddingBottom: 20}}
        />
      </View>
    </View>
  );
};

export default Home;

const styles = StyleSheet.create({
  container: {
    height: 141,
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
    elevation: 10,
    marginHorizontal: 20,
    paddingHorizontal: 20,
  },
});
