import {
  FlatList,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  SafeAreaView,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {height, width} from '../../assets/styles/styles';
import Header from '../../components/Header/Header';
import {COLORS} from '../../utils/theme';
import {scale} from 'react-native-size-matters';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons';
import Feather from 'react-native-vector-icons/Feather';
import CommonButton from '../../components/CommonButton/CommonButton';
import {navigationRef} from '../../App';
import {useFocusEffect} from '@react-navigation/native';
import {useDispatch, useSelector} from 'react-redux';
import {jobDetail} from '../../redux/actions/homeAction';
import ShimmerEffect from '../../components/ShimmerEffect/Shimmer';
import moment from 'moment';
import {useToast} from 'react-native-toast-notifications';
import FONTS from '../../assets/styles/fonts';

const Detail = ({route}) => {
  const toast = useToast();
  const dispatch = useDispatch();
  const [disableButton, setDisableButton] = useState(false);
  const loader = useSelector(state => state?.loaderReducer?.loader);
  const job_id = route?.params?._id;
  const [responseData, setResponseData] = useState();
  const onStart = () => {
    setDisableButton(true);
    setTimeout(() => {
      setDisableButton(false);
    }, 4000);
    moment(new Date()).format('DD MM YYYY') ===
    moment(responseData?.surveyor_job_date).format('DD MM YYYY')
      ? navigationRef.navigate('MeasuringQuestionnaire', responseData)
      : toast.show('You can not start the Job, before assigned time', {
          type: 'danger',
          placement: 'bottom',
          duration: 4000,
          offset: 30,
          animationType: 'slide-in ',
        });
  };
  let param = {
    job_id,
    cb: res => {
      res?.measuring_details
        ? setMeasurinDetails(res?.measuring_details)
        : null;
      res?.data ? setResponseData(res?.data) : null;
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
  useFocusEffect(
    React.useCallback(() => {
      dispatch(jobDetail(param));
    }, []),
  );
  return (
    <View style={{flex: 1, backgroundColor: 'black'}}>
      <SafeAreaView />
      <Header title={'Details'} back={true} />
      <View style={styles.container}>
        {loader ? (
          <ShimmerEffect type="box" />
        ) : (
          <>
            <View style={styles.mainBox}>
              <View style={styles.userName}>
                <Text style={{fontSize: 16, fontFamily: FONTS?.MontserratBold}}>
                  {responseData?.customer_id?.name}
                </Text>
                {/* <Text style={{fontWeight: 700, fontSize: 16}}>$150</Text> */}
              </View>
              <View style={styles.details}>
                <Icon
                  name="office-building-outline"
                  size={20}
                  color={COLORS.secondry}
                />
                <Text style={styles.commonText}>{responseData?.referal}</Text>
              </View>
              <View style={styles.details}>
                <SimpleLineIcons
                  name="location-pin"
                  size={20}
                  color={COLORS.secondry}
                />
                <Text style={styles.commonText}>{responseData?.address}</Text>
              </View>
              <View style={styles.details}>
                <Feather name="phone" size={20} color={COLORS.secondry} />
                <Text style={styles.commonText}>
                  {responseData?.customer_id?.phone_number}
                </Text>
              </View>
              <View style={styles.details}>
                <Feather name="mail" size={20} color={COLORS.secondry} />
                <Text style={styles.commonText}>
                  {responseData?.customer_id?.email}
                </Text>
              </View>
              <View style={{marginTop: 20}}>
                <Text
                  style={{fontSize: 14, fontFamily: FONTS?.MontserratSemiBold}}>
                  Notes
                </Text>
                <Text
                  style={{
                    fontSize: 12,
                    marginTop: 10,
                    lineHeight: 18,
                    fontFamily: FONTS?.MontserratRegular,
                  }}>
                  {responseData?.notes}
                </Text>
              </View>
            </View>
            <View style={{flex: 1, justifyContent: 'flex-end', bottom: 25}}>
              <CommonButton
                disableButton={disableButton}
                onPress={onStart}
                title={'Start Measuring'}
              />
            </View>
          </>
        )}
      </View>
    </View>
  );
};

export default Detail;

const styles = StyleSheet.create({
  container: {
    backgroundColor: COLORS?.white,
    flex: 1,
    borderTopRightRadius: scale(20),
    borderTopLeftRadius: scale(20),
    padding: 20,
  },
  mainBox: {
    // height: scale(359),
    backgroundColor: COLORS.white,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 6,
    },
    shadowOpacity: 0.1,
    shadowRadius: 11.27,
    elevation: 14,
    borderRadius: 16,
    // alignItems: 'center',
    padding: 10,
    paddingHorizontal: 30,
    paddingBottom: 20,
  },
  userName: {
    height: scale(50),
    borderBottomColor: 'rgba(0, 0, 0, 0.1)',
    // width: '90%',
    borderBottomWidth: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  details: {
    flexDirection: 'row',
    height: scale(30),
    alignItems: 'center',
  },
  commonText: {
    fontSize: 12,
    fontFamily: FONTS?.MontserratMedium,
    left: scale(10),
  },
});
