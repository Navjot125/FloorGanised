import {
  FlatList,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  SafeAreaView,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {COLORS} from '../../utils/theme';
import Header from '../../components/Header/Header';
import {scale} from 'react-native-size-matters';
import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons';
import {useDispatch, useSelector} from 'react-redux';
import {getJobs} from '../../redux/actions/homeAction';
import {useFocusEffect} from '@react-navigation/native';
import {useToast} from 'react-native-toast-notifications';
import ShimmerEffect from '../../components/ShimmerEffect/Shimmer';
import FONTS from '../../assets/styles/fonts';

const History = () => {
  const [jobListing, setJobListing] = useState();
  const [count, setCount] = useState(0);
  const [offset, setOffset] = useState(0);
  const dispatch = useDispatch();
  const toast = useToast();
  const loader = useSelector(state => state?.loaderReducer?.loader);

  useFocusEffect(
    React.useCallback(() => {
      setOffset(0);
      const param = {
        status: 'Complete',
        offset: offset,
        loader: true,
        cb: data => {
          setJobListing(data?.data);
          setCount(data?.totalJobs);
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
      dispatch(getJobs(param));
    }, []),
  );

  const Loadmore = () => {
    const param = {
      status: 'Complete',
      offset: offset + 1,
      cb: data => {
        const newData = data?.data;
        setJobListing(prevJobListing => [...prevJobListing, ...newData]);
        setCount(data?.totalJobs);
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
    offset + 1 > count / 10
      ? console.log('not Working Loadmore for home')
      : (setOffset(offset + 1), dispatch(getJobs(param)));
  };
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
              fontFamily: FONTS?.MontserratSemiBold,
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
              fontFamily: FONTS?.MontserratMedium,
              width: '55%',
              left: -15,
            }}>
            {item?.address}
          </Text>
          <TouchableOpacity
            disabled
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
                fontFamily: FONTS?.MontserratSemiBold,
                color: COLORS.white,
              }}>
              {item?.surveyor_status
                ? item?.surveyor_status
                : item?.fitter_status}
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
        {loader ? (
          <ShimmerEffect />
        ) : jobListing?.length ? (
          <FlatList
            data={jobListing}
            renderItem={renderItem}
            contentContainerStyle={{paddingBottom: 20}}
            onEndReached={Loadmore}
            onEndReachedThreshold={0.2}
            showsVerticalScrollIndicator={false}
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
