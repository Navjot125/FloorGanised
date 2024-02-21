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
const JobCompleteForm = ({route}) => {
  const [selectedItems, setSelectedItems] = useState(jobForm);
  const [checked, setChecked] = useState(false);
  const {responseData, measurinDetails} = route.params;
  // const toggleTaskCompletion = name => {
  //   setSelectedItems(prevTasks =>
  //     prevTasks?.map(task =>
  //       task.title === name
  //         ? task?.status === 'pending'
  //           ? {...task, status: 'completed'}
  //           : {...task, status: 'pending'}
  //         : task,
  //     ),
  //   );
  // };
  // const style = {
  //   marginVertical: 10,
  // };
  // const onStart = () => {
  //   const param = {
  //     job_id: responseData?._id,
  //     fitter_status: 'On-work',
  //   };
  //   // console.log(param,'param----------');
  //   // responseData?.fitter_status == 'On-work'
  //   responseData?.fitter_status == 'Pending'
  //     ? dispatch(startFittingAction(param))
  //     : // navigationRef.navigate('JobCompleteForm'),
  //       navigationRef.navigate('Fitter', {
  //         screen: 'JobCompleteForm',
  //         params: {
  //           responseData: responseData,
  //           measurinDetails: measurinDetails,
  //         },
  //       });
  //   console.log(responseData?.fitter_status, '--responseData?.fitter_status');
  // };
  // const onPress = () => {
  //   navigationRef.navigate('Home');
  // };
  // const TypeDropDown = ({item, index}) => {
  //   return (
  //     <View
  //       style={{
  //         flexDirection: 'row',
  //         justifyContent: 'space-between',
  //         padding: 10,
  //         width: '90%',
  //         alignItems: 'center',
  //       }}>
  //       <Text style={{fontSize: 12, fontWeight: 600}}>
  //         {Object.keys(jobForm)[index]}
  //       </Text>
  //       <Text
  //         style={{
  //           fontSize: 12,
  //           fontWeight: 400,
  //           width: 70,
  //           textAlign: 'right',
  //         }}>
  //         {item?.value}
  //       </Text>
  //     </View>
  //   );
  // };
  // const TypeDescription = ({item, index}) => {
  //   return (
  //     <View
  //       style={{
  //         padding: 10,
  //         width: '90%',
  //       }}>
  //       <Text style={{fontSize: 12, fontWeight: 600}}>
  //         {Object.keys(jobForm)[index]}
  //       </Text>
  //       <Text
  //         style={{
  //           fontSize: 12,
  //           fontWeight: 400,
  //           top: 10,
  //         }}>
  //         {item?.description}
  //       </Text>
  //     </View>
  //   );
  // };
  // const TypeImages = ({item, index}) => {
  //   return (
  //     <View
  //       style={{
  //         padding: 10,
  //         width: '90%',
  //       }}>
  //       <Text style={{fontSize: 12, fontWeight: 600}}>
  //         {Object.keys(jobForm)[index]}
  //       </Text>
  //       <View
  //         style={{
  //           flexDirection: 'row',
  //           justifyContent: 'space-between',
  //           marginTop: 10,
  //         }}>
  //         <Image
  //           source={item?.image1}
  //           style={{height: 56, width: 90, borderRadius: 16}}
  //         />
  //         <Image
  //           source={item?.image1}
  //           style={{height: 56, width: 90, borderRadius: 16}}
  //         />
  //         <Image
  //           source={item?.image1}
  //           style={{height: 56, width: 90, borderRadius: 16}}
  //         />
  //       </View>
  //       <Text
  //         style={{
  //           fontSize: 12,
  //           fontWeight: 400,
  //           top: 10,
  //         }}>
  //         {item?.description}
  //       </Text>
  //     </View>
  //   );
  // };
  // const toggleStatus = key => {
  //   setSelectedItems(prevData => {
  //     const updatedData = {...prevData};
  //     const currentItem = updatedData[key];
  //     currentItem.status =
  //       currentItem.status === 'pending' ? 'complete' : 'pending';
  //     return updatedData;
  //   });
  // };
  // const renderItem = ({item, index}) => {
  //   return (
  //     <View
  //       style={{
  //         flexDirection: 'row',
  //         marginVertical: 5,
  //         alignItems: 'center',
  //       }}>
  //       {item?.status == 'pending' ? (
  //         <TouchableOpacity
  //           style={{height: 20, width: 20}}
  //           onPress={() => toggleStatus(Object.keys(selectedItems)[index])}>
  //           <Image
  //             style={{height: 20, width: 20}}
  //             source={require('../../assets/images/unchecked.png')}
  //           />
  //         </TouchableOpacity>
  //       ) : (
  //         <TouchableOpacity
  //           style={{height: 20, width: 20}}
  //           onPress={() => toggleStatus(Object.keys(selectedItems)[index])}>
  //           <Image
  //             style={{height: 20, width: 20}}
  //             source={require('../../assets/images/checked.png')}
  //           />
  //         </TouchableOpacity>
  //       )}
  //       {item?.type === 'DropDown' ? (
  //         <View style={{flexDirection: 'row', alignItems: 'center'}}>
  //           <TypeDropDown item={item} index={index} />
  //         </View>
  //       ) : item?.type === 'Description' ? (
  //         <View
  //           style={{
  //             flexDirection: 'row',
  //             alignItems: 'center',
  //           }}>
  //           <TypeDescription item={item} index={index} />
  //         </View>
  //       ) : item?.type === 'Images' ? (
  //         <View
  //           style={{
  //             flexDirection: 'row',
  //             alignItems: 'center',
  //           }}>
  //           <TypeImages item={item} index={index} />
  //         </View>
  //       ) : null}
  //     </View>
  //   );
  // };

  return (
    // <View style={{flex: 1, backgroundColor: 'black'}}>
    //   <SafeAreaView />
    //   <Header title={'Job Complete Form'} back={true} />
    //   <View style={styles.container}>
    //     <FlatList
    //       data={Object.values(selectedItems)}
    //       keyExtractor={item => item._id.toString()}
    //       renderItem={renderItem}
    //       showsVerticalScrollIndicator={false}
    //       ListFooterComponent={
    //         <CommonButton style={style} title={'Submit'} onPress={onPress} />
    //       }
    //     />
    //   </View>
    // </View>
    <View style={{flex: 1, backgroundColor: 'black'}}>
      <SafeAreaView />
      <Header title={'Job Complete Form'} back={true} />
      <ScrollView
        contentContainerStyle={styles.container}
        showsVerticalScrollIndicator={false}
        //   style={styles.container}
      >
        <View style={[styles.mainBox, {marginTop: 20}]}>
          {measurinDetails?.type_of_room && (
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                paddingVertical: 15,
              }}>
              <Text style={{fontSize: 12, fontWeight: 600}}>Type of room</Text>
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
              <Text style={{fontSize: 12, fontWeight: 600}}>Flooring Type</Text>
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
              <Text style={{fontSize: 12, fontWeight: 600}}>Join In Floor</Text>
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
                <Text style={{fontSize: 12, fontWeight: 600}}>Notes : </Text>
                {measurinDetails?.join_in_floor_notes}
              </Text>
            </View>
          )}
          {measurinDetails?.scotia && (
            <View style={{marginVertical: 10}}>
              <Text style={{fontSize: 12, fontWeight: 600, marginBottom: 10}}>
                scotia
              </Text>
              <Text style={{fontSize: 12, fontWeight: 400, lineHeight: 20}}>
                {measurinDetails?.scotia}
              </Text>
            </View>
          )}
          {measurinDetails?.skirting_board && (
            <View style={{marginVertical: 10}}>
              <Text style={{fontSize: 12, fontWeight: 600, marginBottom: 10}}>
                Skirting Board
              </Text>
              <Text style={{fontSize: 12, fontWeight: 400, lineHeight: 20}}>
                {measurinDetails?.skirting_board}
              </Text>
            </View>
          )}
          {measurinDetails?.skirting_board_notes && (
            <View style={{marginVertical: 10}}>
              <Text style={{fontSize: 12, fontWeight: 600, marginBottom: 10}}>
                Skirting Board Notes
              </Text>
              <Text style={{fontSize: 12, fontWeight: 400, lineHeight: 20}}>
                {measurinDetails?.skirting_board_notes}
              </Text>
            </View>
          )}
          {measurinDetails?.gripper_length && (
            <View style={{marginVertical: 10}}>
              <Text style={{fontSize: 12, fontWeight: 600, marginBottom: 10}}>
                Gripper Lengths
              </Text>
              <Text style={{fontSize: 12, fontWeight: 400, lineHeight: 20}}>
                {measurinDetails?.gripper_length}
              </Text>
            </View>
          )}
          {measurinDetails?.underlay_type && (
            <View style={{marginVertical: 10}}>
              <Text style={{fontSize: 12, fontWeight: 600, marginBottom: 10}}>
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
              <Text style={{fontSize: 12, fontWeight: 600, marginBottom: 10}}>
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
              <Text style={{fontSize: 12, fontWeight: 600, marginBottom: 10}}>
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
              <Text style={{fontSize: 12, fontWeight: 600, marginBottom: 10}}>
                Suitable for Job
              </Text>
              <Text style={{fontSize: 12, fontWeight: 400, lineHeight: 20}}>
                {measurinDetails?.is_suitable_for_job}
              </Text>
            </View>
          )}
          {measurinDetails?.suitable_for_job && (
            <View style={{marginVertical: 10}}>
              <Text style={{fontSize: 12, fontWeight: 600, marginBottom: 10}}>
                Suitable for Job Notes
              </Text>
              <Text style={{fontSize: 12, fontWeight: 400, lineHeight: 20}}>
                {measurinDetails?.suitable_for_job}
              </Text>
            </View>
          )}
          {measurinDetails?.floor_preparation_notes && (
            <View style={{marginVertical: 10}}>
              <Text style={{fontSize: 12, fontWeight: 600, marginBottom: 10}}>
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
              <Text style={{fontSize: 12, fontWeight: 600, marginBottom: 10}}>
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
              <Text style={{fontSize: 12, fontWeight: 600, marginBottom: 10}}>
                Additional Notes
              </Text>
              <Text style={{fontSize: 12, fontWeight: 400, lineHeight: 20}}>
                {measurinDetails?.additional_notes}
              </Text>
            </View>
          )}
        </View>
        <View style={{flex: 1, justifyContent: 'flex-end', marginVertical: 25}}>
          <CommonButton
            // onPress={onStart}
            title={
              responseData?.fitter_status == 'On-work'
                ? 'Job Complete'
                : 'Start Fitting'
            }
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
});
