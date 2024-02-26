import {
  FlatList,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  SafeAreaView,
  ScrollView,
  Image,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {scale} from 'react-native-size-matters';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons';
import Feather from 'react-native-vector-icons/Feather';
import Header from '../../components/Header/Header';
import {COLORS} from '../../utils/theme';
import CommonButton from '../../components/CommonButton/CommonButton';
import {navigationRef} from '../../App';
import {useDispatch, useSelector} from 'react-redux';
import {jobDetail, startFittingAction} from '../../redux/actions/homeAction';
import {ImageUrl} from '../../services/Config';
import {useFocusEffect} from '@react-navigation/native';
import {useToast} from 'react-native-toast-notifications';
import Shimmer from 'react-native-shimmer';
import ShimmerEffect from '../../components/ShimmerEffect/Shimmer';
import moment from 'moment';

const FitterDetail = ({route}) => {
  const dispatch = useDispatch();
  const toast = useToast();
  const [responseData, setResponseData] = useState();
  const [measurinDetails, setMeasurinDetails] = useState();
  const [disableButton, setDisableButton] = useState(false);
  const job_id = route?.params?._id;
  const loader = useSelector(state => state?.loaderReducer?.loader);
  // console.log('measurinDetails',(measurinDetails));
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
  const onStart = () => {
    setDisableButton(true);
    setTimeout(() => {
      setDisableButton(false);
    }, 4000);
    const param = {
      job_id: responseData?._id,
      fitter_status: 'On-work',
    };
    responseData?.fitter_status == 'Pending'
      ? moment(new Date()).format('DD MM YYYY') ===
        moment(responseData?.fitter_job_date).format('DD MM YYYY')
        ? dispatch(startFittingAction(param))
        : toast.show('You can not start the Job, before assigned time', {
            type: 'danger',
            placement: 'bottom',
            duration: 4000,
            offset: 30,
            animationType: 'slide-in ',
          })
      : navigationRef.navigate('Fitter', {
          screen: 'JobCompleteForm',
          params: {
            responseData: responseData,
            measurinDetails: measurinDetails,
          },
        });
    console.log(responseData?.fitter_status, '--responseData?.fitter_status');
  };
  const style = {
    height: 24,
    width: 81,
    borderRadius: 17,
  };
  return (
    <View style={{flex: 1, backgroundColor: 'black'}}>
      <SafeAreaView />
      <Header title={'Details'} back={true} />

      <ScrollView
        contentContainerStyle={styles.container}
        showsVerticalScrollIndicator={false}
        //   style={styles.container}
      >
        {loader ? (
          <ShimmerEffect type="box" />
        ) : (
          <>
            <View style={styles.mainBox}>
              <View style={styles.userName}>
                <Text style={{fontWeight: 700, fontSize: 16}}>
                  {responseData?.customer_id?.name}
                </Text>
                {responseData?.fitter_amount && (
                  <Text style={{fontWeight: 700, fontSize: 16}}>
                    ${responseData?.fitter_amount}
                  </Text>
                )}
              </View>
              <View style={styles.details}>
                <Icon
                  name="office-building-outline"
                  size={20}
                  color={COLORS.secondry}
                />
                <Text style={{fontSize: 12, fontWeight: 500, left: scale(10)}}>
                  {responseData?.referal}
                </Text>
              </View>
              <View style={styles.details}>
                <SimpleLineIcons
                  name="location-pin"
                  size={20}
                  color={COLORS.secondry}
                />
                <Text style={{fontSize: 12, fontWeight: 500, left: scale(10)}}>
                  {responseData?.address}
                </Text>
              </View>
              <View style={styles.details}>
                <Feather name="phone" size={20} color={COLORS.secondry} />
                <Text style={{fontSize: 12, fontWeight: 500, left: scale(10)}}>
                  {responseData?.customer_id?.phone_number}
                </Text>
              </View>
              <View style={styles.details}>
                <Feather name="mail" size={20} color={COLORS.secondry} />
                <Text style={{fontSize: 12, fontWeight: 500, left: scale(10)}}>
                  {responseData?.customer_id?.email}
                </Text>
              </View>
              <View style={{marginTop: 20}}>
                <Text style={{fontSize: 14, fontWeight: 600}}>Notes</Text>
                <Text
                  style={{
                    fontSize: 12,
                    fontWeight: 400,
                    marginTop: 10,
                    lineHeight: 18,
                  }}>
                  {responseData?.notes}
                </Text>
              </View>
            </View>
            <View style={[styles.mainBox, {marginTop: 20}]}>
              <View style={styles.userName}>
                <Text style={{fontWeight: 700, fontSize: 16}}>
                  Measuring Details
                </Text>
                <TouchableOpacity
                  onPress={() => {
                    navigationRef.navigate(
                      'MeasuringQuestionnaire',
                      measurinDetails,
                    );
                  }}
                  style={{
                    height: 24,
                    width: 81,
                    backgroundColor: COLORS.primary,
                    borderRadius: 17,
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}>
                  <Text style={{fontSize: 10, fontWeight: 600}}>
                    File Access
                  </Text>
                </TouchableOpacity>
              </View>
              {measurinDetails?.type_of_room && (
                <View
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    paddingVertical: 15,
                  }}>
                  <Text style={{fontSize: 12, fontWeight: 600}}>
                    Type of room
                  </Text>
                  <Text
                    style={{
                      fontSize: 12,
                      fontWeight: 400,
                      width: 70,
                      textAlign: 'right',
                    }}>
                    {measurinDetails?.type_of_room}
                  </Text>
                </View>
              )}
              {measurinDetails?.surcharge && (
                <View
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    paddingVertical: 15,
                  }}>
                  <Text style={{fontSize: 12, fontWeight: 600}}>Surcharge</Text>
                  <Text
                    style={{
                      fontSize: 12,
                      fontWeight: 400,
                      width: 70,
                      textAlign: 'right',
                    }}>
                    ${measurinDetails?.surcharge}
                  </Text>
                </View>
              )}
              {measurinDetails?.flooring_type && (
                <View
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    paddingVertical: 15,
                  }}>
                  <Text style={{fontSize: 12, fontWeight: 600}}>
                    Flooring Type
                  </Text>
                  <Text
                    style={{
                      fontSize: 12,
                      fontWeight: 400,
                      width: 70,
                      textAlign: 'right',
                    }}>
                    {measurinDetails?.flooring_type}
                  </Text>
                </View>
              )}
              {measurinDetails?.is_flooring_choice_selected && (
                <View
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    paddingVertical: 15,
                  }}>
                  <Text style={{fontSize: 12, fontWeight: 600}}>
                    Flooring Choice & Colour
                  </Text>
                  <Text
                    style={{
                      fontSize: 12,
                      fontWeight: 400,
                      width: 70,
                      textAlign: 'right',
                    }}>
                    {measurinDetails?.flooring_choice_color}
                  </Text>
                </View>
              )}
              {measurinDetails?.size && (
                <View
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    paddingVertical: 15,
                  }}>
                  <Text style={{fontSize: 12, fontWeight: 600}}>Size</Text>
                  <Text
                    style={{
                      fontSize: 12,
                      fontWeight: 400,
                      width: 70,
                      textAlign: 'right',
                    }}>
                    {measurinDetails?.size}
                  </Text>
                </View>
              )}
              {measurinDetails?.sqm && (
                <View
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    paddingVertical: 15,
                  }}>
                  <Text style={{fontSize: 12, fontWeight: 600}}>SQM Total</Text>
                  <Text
                    style={{
                      fontSize: 12,
                      fontWeight: 400,
                      width: 70,
                      textAlign: 'right',
                    }}>
                    {measurinDetails?.sqm}
                  </Text>
                </View>
              )}
              {measurinDetails?.measurement_of_room && (
                <View
                  style={{
                    paddingVertical: 15,
                  }}>
                  <Text style={{fontSize: 12, fontWeight: 600}}>
                    Measurement of room
                  </Text>
                  <View
                    style={{
                      flexDirection: 'row',
                      justifyContent: 'space-between',
                      marginTop: 20,
                      flexWrap: 'wrap',
                    }}>
                    {measurinDetails?.measurement_of_room.map((item, index) => (
                      <Image
                        key={index}
                        style={{
                          height: 56,
                          width: 80,
                          borderRadius: 10,
                          marginTop: 10,
                        }}
                        resizeMode="cover"
                        source={{uri: `${ImageUrl}${item}`}}
                      />
                    ))}
                  </View>
                </View>
              )}
              {measurinDetails?.join_in_floor && (
                <View
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    paddingVertical: 15,
                  }}>
                  <Text style={{fontSize: 12, fontWeight: 600}}>
                    Join In Floor
                  </Text>
                  <Text
                    style={{
                      fontSize: 12,
                      fontWeight: 400,
                      width: 70,
                      textAlign: 'right',
                    }}>
                    {measurinDetails?.join_in_floor}
                  </Text>
                </View>
              )}
              {measurinDetails?.join_in_floor_notes && (
                <View style={{marginVertical: 0}}>
                  <Text style={{fontSize: 12, fontWeight: 400, lineHeight: 20}}>
                    <Text style={{fontSize: 12, fontWeight: 600}}>
                      Notes :{' '}
                    </Text>
                    {measurinDetails?.join_in_floor_notes}
                  </Text>
                </View>
              )}
              {measurinDetails?.scotia && (
                <View style={{marginVertical: 10}}>
                  <Text
                    style={{fontSize: 12, fontWeight: 600, marginBottom: 10}}>
                    scotia
                  </Text>
                  <Text style={{fontSize: 12, fontWeight: 400, lineHeight: 20}}>
                    {measurinDetails?.scotia}
                  </Text>
                </View>
              )}
              {measurinDetails?.skirting_board && (
                <View style={{marginVertical: 10}}>
                  <Text
                    style={{fontSize: 12, fontWeight: 600, marginBottom: 10}}>
                    Skirting Board
                  </Text>
                  <Text style={{fontSize: 12, fontWeight: 400, lineHeight: 20}}>
                    {measurinDetails?.skirting_board}
                  </Text>
                </View>
              )}
              {measurinDetails?.skirting_board_notes && (
                <View style={{marginVertical: 10}}>
                  <Text
                    style={{fontSize: 12, fontWeight: 600, marginBottom: 10}}>
                    Skirting Board Notes
                  </Text>
                  <Text style={{fontSize: 12, fontWeight: 400, lineHeight: 20}}>
                    {measurinDetails?.skirting_board_notes}
                  </Text>
                </View>
              )}
              {measurinDetails?.gripper_length && (
                <View style={{marginVertical: 10}}>
                  <Text
                    style={{fontSize: 12, fontWeight: 600, marginBottom: 10}}>
                    Gripper Lengths
                  </Text>
                  <Text style={{fontSize: 12, fontWeight: 400, lineHeight: 20}}>
                    {measurinDetails?.gripper_length}
                  </Text>
                </View>
              )}
              {measurinDetails?.underlay_type && (
                <View style={{marginVertical: 10}}>
                  <Text
                    style={{fontSize: 12, fontWeight: 600, marginBottom: 10}}>
                    Underlay Type
                  </Text>
                  <Text style={{fontSize: 12, fontWeight: 400, lineHeight: 20}}>
                    {measurinDetails?.underlay_type}
                  </Text>
                </View>
              )}
              {measurinDetails?.underlay_amount && (
                <View
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    paddingVertical: 15,
                  }}>
                  <Text style={{fontSize: 12, fontWeight: 600}}>
                    Underlay Amount
                  </Text>
                  <Text
                    style={{
                      fontSize: 12,
                      fontWeight: 400,
                      width: 70,
                      textAlign: 'right',
                    }}>
                    {measurinDetails?.underlay_amount}
                  </Text>
                </View>
              )}
              {measurinDetails?.doorbar_type && (
                <View
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    paddingVertical: 15,
                  }}>
                  <Text style={{fontSize: 12, fontWeight: 600}}>Door Bars</Text>
                  <Text
                    style={{
                      fontSize: 12,
                      fontWeight: 400,
                      width: 70,
                      textAlign: 'right',
                    }}>
                    {measurinDetails?.doorbar_type}
                  </Text>
                </View>
              )}
              {measurinDetails?.doorbar_type_text && (
                <View style={{marginVertical: 10}}>
                  <Text
                    style={{fontSize: 12, fontWeight: 600, marginBottom: 10}}>
                    Door Bars Notes
                  </Text>
                  <Text style={{fontSize: 12, fontWeight: 400, lineHeight: 20}}>
                    {measurinDetails?.doorbar_type_text}
                  </Text>
                </View>
              )}
              {measurinDetails?.doorbar_amount && (
                <View
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    paddingVertical: 15,
                  }}>
                  <Text style={{fontSize: 12, fontWeight: 600}}>
                    Door Bar Amount
                  </Text>
                  <Text
                    style={{
                      fontSize: 12,
                      fontWeight: 400,
                      width: 70,
                      textAlign: 'right',
                    }}>
                    {measurinDetails?.doorbar_amount}
                  </Text>
                </View>
              )}
              {measurinDetails?.uplift_waste_service && (
                <View
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    paddingVertical: 15,
                  }}>
                  <Text style={{fontSize: 12, fontWeight: 600}}>
                    Uplift and waste service
                  </Text>
                  <Text
                    style={{
                      fontSize: 12,
                      fontWeight: 400,
                      width: 70,
                      textAlign: 'right',
                    }}>
                    {measurinDetails?.uplift_waste_service}
                  </Text>
                </View>
              )}
              {measurinDetails?.uplift_waste_service_notes && (
                <View style={{marginVertical: 10}}>
                  <Text
                    style={{fontSize: 12, fontWeight: 600, marginBottom: 10}}>
                    Uplift and waste service Notes
                  </Text>
                  <Text style={{fontSize: 12, fontWeight: 400, lineHeight: 20}}>
                    {measurinDetails?.uplift_waste_service_notes}
                  </Text>
                </View>
              )}
              {measurinDetails?.furniture_images?.length ? (
                <View
                  style={{
                    paddingVertical: 15,
                  }}>
                  <Text style={{fontSize: 12, fontWeight: 600}}>Furniture</Text>
                  <View
                    style={{
                      flexDirection: 'row',
                      justifyContent: 'space-between',
                      marginTop: 20,
                      flexWrap: 'wrap',
                    }}>
                    {measurinDetails?.furniture_images.map((item, index) => (
                      <Image
                        key={index}
                        style={{
                          height: 56,
                          width: 80,
                          borderRadius: 10,
                          marginTop: 10,
                        }}
                        resizeMode="cover"
                        source={{uri: `${ImageUrl}${item}`}}
                      />
                    ))}
                  </View>
                </View>
              ) : null}
              {measurinDetails?.furniture_notes && (
                <View style={{marginVertical: 10}}>
                  <Text style={{fontSize: 12, fontWeight: 400, lineHeight: 20}}>
                    <Text style={{fontSize: 12, fontWeight: 600}}>Notes </Text>:{' '}
                    {measurinDetails?.furniture_notes}
                  </Text>
                </View>
              )}
              {measurinDetails?.is_suitable_for_job && (
                <View style={{marginVertical: 10}}>
                  <Text
                    style={{fontSize: 12, fontWeight: 600, marginBottom: 10}}>
                    Suitable for Job
                  </Text>
                  <Text style={{fontSize: 12, fontWeight: 400, lineHeight: 20}}>
                    {measurinDetails?.is_suitable_for_job}
                  </Text>
                </View>
              )}
              {measurinDetails?.suitable_for_job && (
                <View style={{marginVertical: 10}}>
                  <Text
                    style={{fontSize: 12, fontWeight: 600, marginBottom: 10}}>
                    Suitable for Job Notes
                  </Text>
                  <Text style={{fontSize: 12, fontWeight: 400, lineHeight: 20}}>
                    {measurinDetails?.suitable_for_job}
                  </Text>
                </View>
              )}
              {measurinDetails?.floor_preparation_notes && (
                <View style={{marginVertical: 10}}>
                  <Text
                    style={{fontSize: 12, fontWeight: 600, marginBottom: 10}}>
                    Floor Preparation
                  </Text>
                  <Text style={{fontSize: 12, fontWeight: 400, lineHeight: 20}}>
                    {measurinDetails?.floor_preparation_notes}
                  </Text>
                </View>
              )}
              {measurinDetails?.floor_preparation_images?.length ? (
                <View
                  style={{
                    paddingVertical: 15,
                  }}>
                  <Text style={{fontSize: 12, fontWeight: 600}}>
                    Floor Preparation Images
                  </Text>
                  <View
                    style={{
                      flexDirection: 'row',
                      justifyContent: 'space-between',
                      marginTop: 20,
                      flexWrap: 'wrap',
                    }}>
                    {measurinDetails?.floor_preparation_images.map(
                      (item, index) => (
                        <Image
                          key={index}
                          style={{
                            height: 56,
                            width: 80,
                            borderRadius: 10,
                            marginTop: 10,
                          }}
                          resizeMode="cover"
                          source={{uri: `${ImageUrl}${item}`}}
                        />
                      ),
                    )}
                  </View>
                </View>
              ) : null}
              {measurinDetails?.how_many_doors_to_cut && (
                <View
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    paddingVertical: 15,
                  }}>
                  <Text style={{fontSize: 12, fontWeight: 600}}>
                    How Many Doors To Cut
                  </Text>
                  <Text
                    style={{
                      fontSize: 12,
                      fontWeight: 400,
                      width: 70,
                      textAlign: 'right',
                    }}>
                    {measurinDetails?.how_many_doors_to_cut}
                  </Text>
                </View>
              )}
              {measurinDetails?.type_of_doors_to_cut && (
                <View style={{marginVertical: 10}}>
                  <Text
                    style={{fontSize: 12, fontWeight: 600, marginBottom: 10}}>
                    Type Of Doors To Cut
                  </Text>
                  <Text style={{fontSize: 12, fontWeight: 400, lineHeight: 20}}>
                    {measurinDetails?.type_of_doors_to_cut}
                  </Text>
                </View>
              )}
              {measurinDetails?.fitters_needed && (
                <View
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    paddingVertical: 15,
                  }}>
                  <Text style={{fontSize: 12, fontWeight: 600}}>
                    How many fitters needed
                  </Text>
                  <Text
                    style={{
                      fontSize: 12,
                      fontWeight: 400,
                      width: 70,
                      textAlign: 'right',
                    }}>
                    {measurinDetails?.fitters_needed}
                  </Text>
                </View>
              )}
              {measurinDetails?.additional_notes && (
                <View style={{marginVertical: 10}}>
                  <Text
                    style={{fontSize: 12, fontWeight: 600, marginBottom: 10}}>
                    Additional Notes
                  </Text>
                  <Text style={{fontSize: 12, fontWeight: 400, lineHeight: 20}}>
                    {measurinDetails?.additional_notes}
                  </Text>
                </View>
              )}
            </View>
            <View
              style={{flex: 1, justifyContent: 'flex-end', marginVertical: 25}}>
              <CommonButton
                onPress={onStart}
                disableButton={disableButton}
                title={
                  responseData?.fitter_status == 'On-work'
                    ? 'Job Complete'
                    : 'Start Fitting'
                }
              />
            </View>
          </>
        )}
      </ScrollView>
    </View>
  );
};

export default FitterDetail;

const styles = StyleSheet.create({
  container: {
    backgroundColor: COLORS?.white,
    borderTopRightRadius: scale(20),
    borderTopLeftRadius: scale(20),
    padding: 20,
    flexGrow: 1,
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
});
