import {
  FlatList,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  SafeAreaView,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {navigationRef} from '../../App';
import {dateListing} from '../../utils/Dates/DateLimit';
import CalendarStrip from '../../utils/Dates/CalendarStrip';
import {height} from '../../assets/styles/styles';
import {HistoryData, HomeData} from '../../config/DummyData';
import {COLORS} from '../../utils/theme';
import Header from '../../components/Header/Header';
import {scale} from 'react-native-size-matters';
import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons';
import {useDispatch} from 'react-redux';
import {getJobs} from '../../redux/actions/homeAction';

const History = () => {
  const [jobListing, setJobListing] = useState();
  const dispatch = useDispatch();
  const param = {
    status: 'Complete',
    cb: data => {
      setJobListing(data);
    },
  };
  useEffect(() => {
    dispatch(getJobs(param));
  }, []);

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
            {item?.customer_id?.name}
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
          <SimpleLineIcons name="location-pin" size={15} color={COLORS.black} />
          <Text
            style={{
              fontSize: 12,
              fontWeight: 500,
              width: '55%',
              left: -15,
            }}>
            {item?.address}
          </Text>
          <TouchableOpacity
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
              {item?.surveyor_status}
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  };
  return (
    <View style={{flex: 1, backgroundColor: 'black'}}>
      <SafeAreaView />
      <Header title={'History'} />
      <View
        style={{
          backgroundColor: COLORS.white,
          flex: 1,
          borderTopRightRadius: scale(20),
          borderTopLeftRadius: scale(20),
        }}>
        {jobListing?.length ? (
          <FlatList
            data={jobListing}
            renderItem={renderItem}
            contentContainerStyle={{paddingBottom: 20}}
          />
        ) : (
          <View
            style={{
              flex: 1,
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <Text
              style={{
                fontSize: 15,
                fontWeight: 500,
                textAlign: 'center',
                paddingHorizontal: 50,
                lineHeight: 25,
              }}>
              There are no job assignments for your history.
            </Text>
          </View>
        )}
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
    elevation: 10,
    marginHorizontal: 20,
    paddingVertical: 15,
  },
});
