import {
  FlatList,
  Image,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useState} from 'react';
import {scale} from 'react-native-size-matters';
import {COLORS} from '../../utils/theme';
import Header from '../../components/Header/Header';
import {jobForm} from '../../config/DummyData';
import CommonButton from '../../components/CommonButton/CommonButton';
import {navigationRef} from '../../App';
import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons';
import Feather from 'react-native-vector-icons/Feather';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {ImageUrl} from '../../services/Config';
import CheckBox from '../../components/CheckBox/CheckBox';
import {useDispatch} from 'react-redux';
import {submitJob} from '../../redux/actions/job';
import moment from 'moment';
import {useToast} from 'react-native-toast-notifications';
import FONTS from '../../assets/styles/fonts';
const JobCompleteForm = ({route}) => {
  const toast = useToast();
  const dispatch = useDispatch();
  const [selectedItems, setSelectedItems] = useState(jobForm);
  const [checked, setChecked] = useState();
  const {responseData, measurinDetails} = route.params;
  const job_id = measurinDetails?.job_id;
  const mq_id = measurinDetails?._id;
  const generateInitialCheckedState = items => {
    const initialState = {job_id, mq_id};
    items?.forEach(item => {
      initialState[item] = true;
    });
    const param = {
      initialState,
      toastFun: (msg, type) => {
        toast?.show(msg, {
          type: type,
          placement: 'bottom',
          duration: 4000,
          offset: 30,
          animationType: 'slide-in ',
        });
      },
    };
    moment(new Date()).format('DD MM YYYY') ===
    moment(responseData?.fitter_job_date).format('DD MM YYYY')
      ? dispatch(submitJob(param))
      : toast.show('You can not Submit the Job, Before assigned time', {
          type: 'danger',
          placement: 'bottom',
          duration: 4000,
          offset: 30,
          animationType: 'slide-in ',
        });
  };
  const addValues = value => {
    checked
      ? checked?.includes(value)
        ? setChecked(checked.filter(item => item !== value))
        : setChecked([...checked, value])
      : setChecked([value]);
  };
  return (
    <View style={{flex: 1, backgroundColor: 'black'}}>
      <SafeAreaView />
      <Header title={'Job Complete Form'} back={true} />
      <ScrollView
        contentContainerStyle={styles.container}
        showsVerticalScrollIndicator={false}>
        <View style={[styles.mainBox, {marginTop: 20}]}>
          {measurinDetails?.type_of_room && (
            <View style={styles.commonContainer}>
              <CheckBox
                value={checked?.includes('type_of_room')}
                onPress={() => addValues('type_of_room')}
                checked={checked}
              />
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  paddingVertical: 15,
                  paddingLeft: 10,
                  flex: 1,
                }}>
                <Text style={styles.leftText}>Type of room</Text>
                <Text
                  style={{
                    fontSize: 12,
                    fontWeight: 400,
                    // width: 70,
                    textAlign: 'right',
                  }}>
                  {measurinDetails?.type_of_room}
                </Text>
              </View>
            </View>
          )}
          {measurinDetails?.surcharge && (
            <View style={styles.commonContainer}>
              <CheckBox
                value={checked?.includes('surcharge')}
                onPress={() => addValues('surcharge')}
                // setChecked={setChecked}
                checked={checked}
              />
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  paddingVertical: 15,
                  paddingLeft: 10,
                  flex: 1,
                }}>
                <Text style={styles.leftText}>Surcharge</Text>
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
            </View>
          )}
          {measurinDetails?.flooring_type && (
            <View style={styles.commonContainer}>
              <CheckBox
                value={checked?.includes('flooring_type')}
                onPress={() => addValues('flooring_type')}
                // setChecked={setChecked}
                checked={checked}
              />
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  paddingVertical: 15,
                  paddingLeft: 10,
                  flex: 1,
                }}>
                <Text style={styles.leftText}>Flooring Type</Text>
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
            </View>
          )}
          {measurinDetails?.is_flooring_choice_selected && (
            <View style={styles.commonContainer}>
              <CheckBox
                value={checked?.includes('is_flooring_choice_selected')}
                onPress={() => addValues('is_flooring_choice_selected')}
                checked={checked}
              />
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  paddingVertical: 15,
                  paddingLeft: 10,
                  flex: 1,
                }}>
                <Text style={styles.leftText}>Flooring Choice & Colour</Text>
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
            </View>
          )}
          {measurinDetails?.size && (
            <View style={styles.commonContainer}>
              <CheckBox
                value={checked?.includes('size')}
                onPress={() => addValues('size')}
                checked={checked}
              />
              <View style={styles.innerContaner}>
                <Text style={styles.leftText}>Size</Text>
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
            </View>
          )}
          {measurinDetails?.sqm && (
            <View style={styles.commonContainer}>
              <CheckBox
                value={checked?.includes('sqm')}
                onPress={() => addValues('sqm')}
                checked={checked}
              />
              <View style={styles.innerContaner}>
                <Text style={styles.leftText}>SQM Total</Text>
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
            </View>
          )}
          {measurinDetails?.measurement_of_room && (
            <View
              style={{
                paddingVertical: 15,
              }}>
              <View style={{flexDirection: 'row'}}>
                <CheckBox
                  value={checked?.includes('measurement_of_room')}
                  onPress={() => addValues('measurement_of_room')}
                  checked={checked}
                />
                <Text style={{fontSize: 12, fontWeight: 600, marginLeft: 10}}>
                  Measurement of room
                </Text>
              </View>
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  marginTop: 20,
                  flexWrap: 'wrap',
                  marginLeft: 30,
                }}>
                {measurinDetails?.measurement_of_room.map((item, index) => (
                  <Image
                    key={index}
                    style={{
                      height: scale(56),
                      width: scale(80),
                      borderRadius: scale(10),
                      marginTop: scale(10),
                    }}
                    resizeMode="cover"
                    source={{uri: `${ImageUrl}${item}`}}
                  />
                ))}
              </View>
            </View>
          )}
          {measurinDetails?.join_in_floor && (
            <View style={styles.commonContainer}>
              <CheckBox
                value={checked?.includes('join_in_floor')}
                onPress={() => addValues('join_in_floor')}
                checked={checked}
              />
              <View style={styles.innerContaner}>
                <Text style={styles.leftText}>Join In Floor</Text>
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
            </View>
          )}
          {measurinDetails?.join_in_floor_notes && (
            <View style={{marginVertical: 0, marginLeft: 30}}>
              <Text style={{fontSize: 12, fontWeight: 400}}>
                <Text style={styles.leftText}>Notes : </Text>
                {measurinDetails?.join_in_floor_notes}
              </Text>
            </View>
          )}
          {measurinDetails?.scotia && (
            <View style={styles.commonContainer}>
              <CheckBox
                value={checked?.includes('scotia')}
                onPress={() => addValues('scotia')}
                checked={checked}
              />
              <View style={styles.innerContaner}>
                <Text
                  style={{
                    fontSize: 12,
                    fontWeight: 600,
                  }}>
                  scotia
                </Text>
                <Text style={{fontSize: 12, fontWeight: 400}}>
                  {measurinDetails?.scotia}
                </Text>
              </View>
            </View>
          )}
          {measurinDetails?.skirting_board && (
            <View style={styles.commonContainer}>
              <CheckBox
                value={checked?.includes('skirting_board')}
                onPress={() => addValues('skirting_board')}
                checked={checked}
              />
              <View style={styles.innerContaner}>
                <Text
                  style={{
                    fontSize: 12,
                    fontWeight: 600,
                  }}>
                  Skirting Board
                </Text>
                <Text style={{fontSize: 12, fontWeight: 400}}>
                  {measurinDetails?.skirting_board}
                </Text>
              </View>
            </View>
          )}
          {measurinDetails?.skirting_board_notes && (
            <View style={styles.commonContainer}>
              <CheckBox
                value={checked?.includes('skirting_board_notes')}
                onPress={() => addValues('skirting_board_notes')}
                checked={checked}
              />
              <View style={styles.innerContaner}>
                <Text
                  style={{
                    fontSize: 12,
                    fontWeight: 600,
                  }}>
                  Skirting Board Notes
                </Text>
                <Text style={{fontSize: 12, fontWeight: 400}}>
                  {measurinDetails?.skirting_board_notes}
                </Text>
              </View>
            </View>
          )}
          {measurinDetails?.gripper_length && (
            <View style={[styles.commonContainer]}>
              <CheckBox
                value={checked?.includes('gripper_length')}
                onPress={() => addValues('gripper_length')}
                checked={checked}
              />
              <View style={styles.innerContaner}>
                <Text style={styles.leftText}>Gripper Lengths</Text>
                <Text style={{fontSize: 12, fontWeight: 400}}>
                  {measurinDetails?.gripper_length}
                </Text>
              </View>
            </View>
          )}
          {measurinDetails?.underlay_type && (
            <View style={[styles.commonContainer]}>
              <CheckBox
                value={checked?.includes('underlay_type')}
                onPress={() => addValues('underlay_type')}
                checked={checked}
              />
              <View style={styles.innerContaner}>
                <Text style={styles.leftText}>Underlay Type</Text>
                <Text style={{fontSize: 12, fontWeight: 400}}>
                  {measurinDetails?.underlay_type}
                </Text>
              </View>
            </View>
          )}
          {measurinDetails?.underlay_amount && (
            <View style={[styles.commonContainer]}>
              <CheckBox
                value={checked?.includes('underlay_amount')}
                onPress={() => addValues('underlay_amount')}
                checked={checked}
              />
              <View style={styles.innerContaner}>
                <Text style={styles.leftText}>Underlay Amount</Text>
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
            </View>
          )}
          {measurinDetails?.doorbar_type && (
            <View style={[styles.commonContainer]}>
              <CheckBox
                value={checked?.includes('doorbar_type')}
                onPress={() => addValues('doorbar_type')}
                checked={checked}
              />
              <View style={styles.innerContaner}>
                <Text style={styles.leftText}>Door Bars</Text>
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
            </View>
          )}
          {measurinDetails?.doorbar_type_text && (
            <View style={[styles.commonContainer]}>
              <CheckBox
                value={checked?.includes('doorbar_type_text')}
                onPress={() => addValues('doorbar_type_text')}
                checked={checked}
              />
              <View style={styles.innerContaner}>
                <Text style={styles.leftText}>Door Bars Notes</Text>
                <Text style={{fontSize: 12, fontWeight: 400}}>
                  {measurinDetails?.doorbar_type_text}
                </Text>
              </View>
            </View>
          )}
          {measurinDetails?.doorbar_amount && (
            <View style={[styles.commonContainer]}>
              <CheckBox
                value={checked?.includes('doorbar_amount')}
                onPress={() => addValues('doorbar_amount')}
                checked={checked}
              />
              <View style={styles.innerContaner}>
                <Text style={styles.leftText}>Door Bar Amount</Text>
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
            </View>
          )}
          {measurinDetails?.uplift_waste_service && (
            <View style={[styles.commonContainer]}>
              <CheckBox
                value={checked?.includes('uplift_waste_service')}
                onPress={() => addValues('uplift_waste_service')}
                checked={checked}
              />
              <View style={styles.innerContaner}>
                <Text style={styles.leftText}>Uplift and waste service</Text>
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
            </View>
          )}
          {measurinDetails?.uplift_waste_service_notes && (
            <View style={[styles.commonContainer]}>
              <CheckBox
                value={checked?.includes('uplift_waste_service_notes')}
                onPress={() => addValues('uplift_waste_service_notes')}
                checked={checked}
              />
              <View style={styles.innerContaner}>
                <Text style={styles.leftText}>
                  Uplift and waste service Notes
                </Text>
                <Text style={{fontSize: 12, fontWeight: 400}}>
                  {measurinDetails?.uplift_waste_service_notes}
                </Text>
              </View>
            </View>
          )}
          {measurinDetails?.furniture_images?.length ? (
            <View
              style={{
                paddingVertical: scale(15),
              }}>
              <View style={{flexDirection: 'row'}}>
                <CheckBox
                  value={checked?.includes('furniture_images')}
                  onPress={() => addValues('furniture_images')}
                  checked={checked}
                />
                <Text style={{fontSize: 12, fontWeight: 600, marginLeft: 10}}>
                  Furniture
                </Text>
              </View>
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  marginTop: scale(20),
                  flexWrap: 'wrap',
                  marginLeft: scale(30),
                }}>
                {measurinDetails?.furniture_images.map((item, index) => (
                  <Image
                    key={index}
                    style={{
                      height: scale(56),
                      width: scale(80),
                      borderRadius: scale(10),
                      marginTop: scale(10),
                    }}
                    resizeMode="cover"
                    source={{uri: `${ImageUrl}${item}`}}
                  />
                ))}
              </View>
            </View>
          ) : null}
          {measurinDetails?.furniture_notes && (
            <View style={{marginVertical: 10, marginLeft: 30}}>
              <Text style={{fontSize: 12, fontWeight: 400, lineHeight: 20}}>
                <Text style={styles.leftText}>Notes </Text>:{' '}
                {measurinDetails?.furniture_notes}
              </Text>
            </View>
          )}
          {measurinDetails?.is_suitable_for_job && (
            <View style={[styles.commonContainer]}>
              <CheckBox
                value={checked?.includes('is_suitable_for_job')}
                onPress={() => addValues('is_suitable_for_job')}
                checked={checked}
              />
              <View style={styles.innerContaner}>
                <Text style={styles.leftText}>Suitable for Job</Text>
                <Text style={{fontSize: 12, fontWeight: 400}}>
                  {measurinDetails?.is_suitable_for_job}
                </Text>
              </View>
            </View>
          )}
          {measurinDetails?.suitable_for_job && (
            <View style={[styles.commonContainer]}>
              <CheckBox
                value={checked?.includes('suitable_for_job')}
                onPress={() => addValues('suitable_for_job')}
                checked={checked}
              />
              <View style={styles.innerContaner}>
                <Text style={styles.leftText}>Suitable for Job Notes</Text>
                <Text style={{fontSize: 12, fontWeight: 400}}>
                  {measurinDetails?.suitable_for_job}
                </Text>
              </View>
            </View>
          )}
          {measurinDetails?.floor_preparation_notes && (
            <View style={[styles.commonContainer]}>
              <CheckBox
                value={checked?.includes('floor_preparation_notes')}
                onPress={() => addValues('floor_preparation_notes')}
                checked={checked}
              />
              <View style={styles.innerContaner}>
                <Text style={styles.leftText}>Floor Preparation</Text>
                <Text style={{fontSize: 12, fontWeight: 400}}>
                  {measurinDetails?.floor_preparation_notes}
                </Text>
              </View>
            </View>
          )}
          {measurinDetails?.floor_preparation_images?.length ? (
            <View
              style={{
                paddingVertical: 15,
              }}>
              <Text style={styles.leftText}>Floor Preparation Images</Text>
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
            <View style={[styles.commonContainer]}>
              <CheckBox
                value={checked?.includes('how_many_doors_to_cut')}
                onPress={() => addValues('how_many_doors_to_cut')}
                checked={checked}
              />
              <View style={styles.innerContaner}>
                <Text style={styles.leftText}>How Many Doors To Cut</Text>
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
            </View>
          )}
          {measurinDetails?.type_of_doors_to_cut && (
            <View style={[styles.commonContainer]}>
              <CheckBox
                value={checked?.includes('type_of_doors_to_cut')}
                onPress={() => addValues('type_of_doors_to_cut')}
                checked={checked}
              />
              <View style={styles.innerContaner}>
                <Text style={styles.leftText}>Type Of Doors To Cut</Text>
                <Text style={{fontSize: 12, fontWeight: 400}}>
                  {measurinDetails?.type_of_doors_to_cut}
                </Text>
              </View>
            </View>
          )}
          {measurinDetails?.fitters_needed && (
            <View style={[styles.commonContainer]}>
              <CheckBox
                value={checked?.includes('fitters_needed')}
                onPress={() => addValues('fitters_needed')}
                checked={checked}
              />
              <View style={styles.innerContaner}>
                <Text style={styles.leftText}>How many fitters needed</Text>
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
            </View>
          )}
          {measurinDetails?.additional_notes && (
            <View style={[styles.commonContainer]}>
              <CheckBox
                value={checked?.includes('additional_notes')}
                onPress={() => addValues('additional_notes')}
                checked={checked}
              />
              <View style={styles.innerContaner}>
                <Text style={{fontSize: 12, fontWeight: 600, top: scale(5)}}>
                  Additional Notes
                </Text>
                <Text style={{fontSize: 12, fontWeight: 400}}>
                  {measurinDetails?.additional_notes}
                </Text>
              </View>
            </View>
          )}
        </View>
        <View style={{flex: 1, justifyContent: 'flex-end', marginVertical: 25}}>
          <CommonButton
            // onPress={console.log(
            //   'responseData?.fitter_status ',
            //   responseData?.fitter_status,
            // )}
            onPress={() => {
              generateInitialCheckedState(checked);
            }}
            // onPress={onStart}
            title={'Submit'}
          />
        </View>
      </ScrollView>
    </View>
  );
};
// style, title, onPress
export default JobCompleteForm;

const styles = StyleSheet.create({
  // container: {
  //   backgroundColor: COLORS?.white,
  //   flex: 1,
  //   borderTopRightRadius: scale(20),
  //   borderTopLeftRadius: scale(20),
  //   padding: 20,
  //   justifyContent: 'space-between',
  // },
  container: {
    backgroundColor: COLORS?.white,
    borderTopRightRadius: scale(20),
    borderTopLeftRadius: scale(20),
    // padding: 20,
    flexGrow: 1,
  },
  mainBox: {
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
    padding: 10,
    paddingHorizontal: 30,
    paddingBottom: 20,
  },
  userName: {
    height: scale(50),
    borderBottomColor: 'rgba(0, 0, 0, 0.1)',
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
  commonContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  innerContaner: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 15,
    paddingLeft: 10,
    flex: 1,
  },
  leftText: {
    fontSize: 12,
    fontFamily: FONTS?.MontserratSemiBold,
  },
});
