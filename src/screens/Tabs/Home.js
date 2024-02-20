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
import {COLORS} from '../../utils/theme';
import {useFocusEffect} from '@react-navigation/native';
import Header from '../../components/Header/Header';
import {scale} from 'react-native-size-matters';
import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons';
import {useDispatch, useSelector} from 'react-redux';
import {getJobs, jobDetail} from '../../redux/actions/homeAction';
import SkeletonPlaceholder from 'react-native-skeleton-placeholder';
import moment from 'moment';
import {useToast} from 'react-native-toast-notifications';
const Home = props => {
  const selectedDate = useSelector(state => state?.DateReducer?.selectedDate);
  const loader = useSelector(state => state?.loaderReducer?.loader);
  const [jobListing, setJobListing] = useState();
  const toast = useToast();
  const dispatch = useDispatch();
  useFocusEffect(
    React.useCallback(() => {
      const param = {
        status: 'Pending',
        date: selectedDate
          ? moment(selectedDate?.day, 'DD MMMM YYYY').format('YYYY-MM-DD')
          : new Date(),
        cb: data => {
          setJobListing(data);
        },
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
      dateListing();
      dispatch(getJobs(param));
    }, [selectedDate]),
  );
  const userData = useSelector(state => state?.onBoardingreducer?.userData);
  // console.log(userData,'userData-------');
  // console.log(jobListing, 'userData-------');
  const stack = userData?.role == 'Surveyor' ? 'Main' : 'Fitter';
  const screen = userData?.role == 'Surveyor' ? 'Detail' : 'FitterDetail';
  const renderItem = ({item, index}) => {
    let param = {
      _id: item?._id,
      stack,
      screen,
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
    return (
      <TouchableOpacity style={styles.container}>
        <View
          style={{
            height: '45%',
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
            {item?.customer_id?.name}
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
            padding: 10,
            justifyContent: 'center',
          }}>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
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
              {item?.address}
            </Text>
            <TouchableOpacity
              onPress={() => {
                dispatch(jobDetail(param));
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
                {item?.fitter_status == 'Pending'
                  ? 'Details'
                  : item?.fitter_status}
              </Text>
            </TouchableOpacity>
          </View>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              marginTop: 10,
            }}>
            <SimpleLineIcons name="clock" size={17} color={COLORS.secondry} />
            <Text
              style={{
                fontSize: 12,
                fontWeight: 400,
                left: 20,
              }}>
              {moment(item?.surveyor_job_date).format('h:mm A')}
            </Text>
          </View>
        </View>
      </TouchableOpacity>
    );
  };
  return (
    <View style={{flex: 1, backgroundColor: 'black'}}>
      <SafeAreaView />
      <Header title={'Home'} profileDetail={true} />
      <View
        style={{
          backgroundColor: COLORS?.white,
          flex: 1,
          borderTopRightRadius: scale(20),
          borderTopLeftRadius: scale(20),
        }}>
        <CalendarStrip />
        {loader ? (
          <SkeletonPlaceholder
            highlightColor="#D3D3D3"
            backgroundColor="#FFFFFF"
            borderRadius={15}>
            <View
              style={{height: 145, marginTop: 10, marginHorizontal: 10}}></View>
            <View
              style={{height: 145, marginTop: 10, marginHorizontal: 10}}></View>
            <View
              style={{height: 145, marginTop: 10, marginHorizontal: 10}}></View>
            <View
              style={{height: 145, marginTop: 10, marginHorizontal: 10}}></View>
          </SkeletonPlaceholder>
        ) : jobListing?.length ? (
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
              There are no job assignments for the selected date.
            </Text>
          </View>
        )}
      </View>
    </View>
  );
};

export default Home;

const styles = StyleSheet.create({
  container: {
    height: scale(145),
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
