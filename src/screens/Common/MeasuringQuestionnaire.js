import {
  Alert,
  Image,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {scale} from 'react-native-size-matters';
import {COLORS} from '../../utils/theme';
import Modal from 'react-native-modal';
import DropDown from '../../components/DropDown/DropDown';
import {Checkbox, RadioButton} from 'react-native-paper';
import CommonTextInput from '../../components/Input/InputBox';
import CommonButton from '../../components/CommonButton/CommonButton';
import {navigationRef} from '../../App';
import CommonModal from '../../components/Modal/Modal';
import jobComplete from '../../assets/images/jobComplete.png';
import Header from '../../components/Header/Header';
import Octicons from 'react-native-vector-icons/Octicons';
import LaunchImageLibraryAsync from '../../components/ImagePicker/ImagePicker';
import {useDispatch, useSelector} from 'react-redux';
import {submitQuestionnaire} from '../../redux/actions/job';

const MeasuringQuestionnaire = ({route}) => {
  const userData = useSelector(state => state?.onBoardingreducer?.userData);
  // console.log('userData---',userData?.role == 'Surveyor');
  const job_id = route?.params?._id;
  const dispatch = useDispatch();
  const [modalImage, setModalImage] = useState();
  const [modal, setModal] = useState(false);
  const [typeOfRoom, setTypeOfRoom] = useState(null);
  const [surcharge, setSurcharge] = useState(null);
  const [flooringType, setFlooringType] = useState();
  const [flooringChoiceColor, setFlooringChoiceColor] = useState(null);
  const [isFlooringChoiceSelected, setIsFlooringChoiceSelected] =
    useState(null);
  const [size, setSize] = useState(null);
  const [SQM, setSQM] = useState(null);
  const [measuremntRoomImages, setMeasuremntRoomImages] = useState();
  const [isJoinFloor, setIsJoinFloor] = useState();
  const [JoinInNotes, setJoinInNotes] = useState();
  const [gripperLengths, setGripperLengths] = useState(null);
  const [underlayType, setUnderlayType] = useState(null);
  const [underlayAmount, setUnderlayAmount] = useState(null);
  const [doorBarType, setDoorBarType] = useState();
  const [doorBarAmount, setDoorBarAmount] = useState(null);
  const [doorBarNotes, setDoorBarNotes] = useState(null);
  const [isUpliftWasteService, setIsUpliftWasteService] = useState();
  const [upliftWasteServiceNotes, setUpliftWasteServiceNotes] = useState();
  const [isFurnitureToMove, setIsFurnitureToMove] = useState(); // p
  const [furnitureImages, setFurnitureImages] = useState();
  const [furnitureNotes, setFurnitureNotes] = useState();
  const [isSuitableForJob, setIsSuitableForJob] = useState(null);
  const [SuitableForJobNotes, setSuitableForJobNotes] = useState(null);
  const [doorsToCut, setDoorsToCut] = useState(); // p
  const [howManyDoorsToCut, setHowManyDoorsToCut] = useState();
  const [typeOfdoorsToCut, setTypeOfDoorsToCut] = useState();
  const [fittersNeeded, setFittersNeeded] = useState();
  const [additionalNotes, setAdditionalNotes] = useState();
  const [scotia, setScotia] = useState(null);
  const [isSkirtingBoard, setIsSkirtingBoard] = useState();
  const [skirtingBoardNotes, setSkirtingBoardNotes] = useState();
  const [isFloorPreparation, setIsFloorPreparation] = useState(null); // p
  const [floorNotes, setFloorNotes] = useState();
  const [floorImages, setFloorImages] = useState();
  const [isSecondScreen, setIssecondScreen] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const doorsToCutOption = ['Yes', 'No'];
  const suitableOptions = ['Yes', 'Unable to see due to current floor', 'No'];
  const skirtingBoardsOptions = ['Yes', 'Not sure yet', 'No'];
  const doorBars = ['silver', 'gold', 'oak', 'other'];
  const howManyFitters = ['1', '2', '3', '4', '5'];
  const FlooringType = [
    'Carpets',
    'Vinyl',
    'Commercial Carpet',
    'Laminate',
    'LVT',
    'Engineered Wood',
  ];
  const handleChangeSecondScreen = () => {
    flooringType == 'Laminate' ||
    flooringType == 'LVT' ||
    flooringType == 'Engineered Wood'
      ? setIssecondScreen(true)
      : setIssecondScreen(false);
  };
  useEffect(() => {
    handleChangeSecondScreen();
  }, [flooringType]);
  const options = ['Yes', 'No'];
  const style = {
    width: '100%',
    marginTop: 25,
  };
  const style1 = {
    width: '100%',
    marginBottom: 25,
  };
  const onPress = () => {
    const cb = () => {
      userData?.role == 'Surveyor'
        ? setModalVisible(!modalVisible)
        : navigationRef.navigate('Home');
    };
    dispatch(submitQuestionnaire(data, cb));
  };
  const onPressModal = () => {
    setModalVisible(!modalVisible);
    navigationRef.navigate('Home');
  };
  // useEffect(() => {
  //   if (measuremntRoomImages?.length > 3) {
  //     Alert.alert('You can pic only 3 images');
  //   }
  // }, [measuremntRoomImages]);
  const data = {
    job_id: job_id,
    type_of_room: typeOfRoom,
    surcharge: surcharge,
    flooring_type: flooringType,
    flooring_choice_color: flooringChoiceColor,
    is_flooring_choice_selected: isFlooringChoiceSelected,
    size: size,
    sqm: SQM,
    join_in_floor: isJoinFloor,
    join_in_floor_notes: JoinInNotes,
    gripper_length: gripperLengths,
    underlay_type: underlayType,
    underlay_amount: underlayAmount,
    doorbar_type: doorBarType,
    doorbar_amount: doorBarAmount,
    doorbar_type_text: doorBarNotes,
    uplift_waste_service: isUpliftWasteService,
    uplift_waste_service_notes: upliftWasteServiceNotes,
    furniture_notes: furnitureNotes,
    is_suitable_for_job: isSuitableForJob,
    suitable_for_job: SuitableForJobNotes,
    doors_to_cut: doorsToCut,
    how_many_doors_to_cut: howManyDoorsToCut,
    type_of_doors_to_cut: typeOfdoorsToCut,
    fitters_needed: fittersNeeded,
    additional_notes: additionalNotes,
    scotia: scotia,
    skirting_board: isSkirtingBoard,
    skirting_board_notes: skirtingBoardNotes,
    floor_preparation_checkbox: isFloorPreparation,
    floor_preparation_notes: floorNotes,
    is_furniture_to_move: isFurnitureToMove,
    empty_room: isFurnitureToMove,
    measurement_of_room: measuremntRoomImages,
    furniture_images: furnitureImages,
    floor_preparation_images: floorImages,
  };
  return (
    <View style={{flex: 1, backgroundColor: 'black'}}>
      <SafeAreaView />
      <Header title={'Measuring Questionnaire'} back={true} />
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.container}
        automaticallyAdjustKeyboardInsets>
        <View
          style={{
            marginBottom: 25,
          }}>
          <CommonTextInput
            placeholder={'Type Of Room'}
            value={typeOfRoom}
            onChangeText={newText => setTypeOfRoom(newText)}
            style={style}
          />
          <CommonTextInput
            placeholder={'Surcharge '}
            value={surcharge}
            onChangeText={newText => setSurcharge(newText)}
            style={style}
          />
        </View>
        <DropDown
          defaultButtonText={'Flooring Type'}
          data={FlooringType}
          setLicencseLevel={setFlooringType}
          handleChangeSecondScreen={handleChangeSecondScreen}
        />
        {!isFlooringChoiceSelected && (
          <CommonTextInput
            placeholder={'flooring Choice & Colour'}
            value={flooringChoiceColor}
            onChangeText={newText => setFlooringChoiceColor(newText)}
            style={style1}
          />
        )}
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            marginTop: -20,
            marginBottom: 25,
          }}>
          <Checkbox.Android
            color={COLORS.secondry}
            status={isFlooringChoiceSelected ? 'checked' : 'unchecked'}
            onPress={() => {
              setIsFlooringChoiceSelected(!isFlooringChoiceSelected);
            }}
          />
          <Text style={{fontSize: 14, fontWeight: 600}}>
            Customer not picked flooring choice
          </Text>
        </View>
        <CommonTextInput
          placeholder={'Size'}
          value={size}
          onChangeText={newText => setSize(newText)}
          style={style1}
        />
        <CommonTextInput
          placeholder={'SQM Total'}
          value={SQM}
          onChangeText={newText => setSQM(newText)}
          style={style1}
        />
        <View>
          <Text style={{fontSize: 14, fontWeight: 600}}>
            Measurement of room
          </Text>
          <View style={styles.dottedBox}>
            <>
              <Octicons
                name="device-camera"
                size={25}
                color={COLORS.secondry}
              />
              <TouchableOpacity
                style={{}}
                onPress={() => {
                  LaunchImageLibraryAsync(
                    measuremntRoomImages,
                    setMeasuremntRoomImages,
                    'Certifications',
                  );
                }}>
                <Text style={{fontSize: 14, fontWeight: 500, marginTop: 10}}>
                  Take Pictures
                </Text>
              </TouchableOpacity>
            </>
          </View>
        </View>
        {measuremntRoomImages && measuremntRoomImages?.length ? (
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-around',
              flexWrap: 'wrap',
            }}>
            {measuremntRoomImages.map((item, index) => (
              <>
                <TouchableOpacity
                  key={index}
                  onPress={() => {
                    setModalImage(item.uri), setModal(true);
                  }}>
                  <TouchableOpacity
                    onPress={() => {
                      setMeasuremntRoomImages(
                        measuremntRoomImages?.filter(
                          sort => sort.uri !== item.uri,
                        ),
                      );
                    }}
                    style={{
                      backgroundColor: COLORS.black,
                      height: 25,
                      width: 25,
                      borderRadius: 20,
                      alignSelf: 'flex-end',
                      zIndex: 1,
                      justifyContent: 'center',
                      alignItems: 'center',
                      left: 8,
                    }}>
                    <Text
                      style={{
                        fontSize: 20,
                        fontWeight: 600,
                        color: 'white',
                      }}>
                      X
                    </Text>
                  </TouchableOpacity>

                  <Image
                    key={index}
                    style={{
                      height: 80,
                      width: 80,
                      borderRadius: 16,
                      bottom: 15,
                    }}
                    source={{uri: item?.uri}}
                  />
                </TouchableOpacity>
              </>
            ))}
          </View>
        ) : null}
        {!isSecondScreen && (
          <>
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                marginTop: 25,
                marginBottom: 5,
              }}>
              <Text style={{fontSize: 14, fontWeight: 600}}>Join in floor</Text>
              {options.map(option => (
                <View
                  key={option}
                  style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    left: 30,
                    width: '28%',
                  }}>
                  <TouchableOpacity onPress={() => setIsJoinFloor(option)}>
                    <Image
                      source={
                        isJoinFloor === option
                          ? require('../../assets/images/check.png')
                          : require('../../assets/images/uncheck.png')
                      }
                      style={{height: 17, width: 17}}
                      resizeMode="contain"
                    />
                  </TouchableOpacity>
                  <Text
                    style={{
                      color: 'black',
                      fontSize: 14,
                      fontWeight: 400,
                      left: 7,
                    }}>
                    {option}
                  </Text>
                </View>
              ))}
            </View>
            <TextInput
              style={{
                height: 104,
                borderWidth: 1,
                padding: 20,
                borderColor: COLORS.grey,
                borderRadius: 16,
                paddingTop: 15,
              }}
              value={JoinInNotes}
              onChangeText={setJoinInNotes}
              // value='ji'
              multiline={true}
              placeholder="Write Notes"
            />
            <CommonTextInput
              placeholder={'Gripper Lengths'}
              value={gripperLengths}
              onChangeText={newText => setGripperLengths(newText)}
              style={style}
            />
          </>
        )}
        <View style={{marginBottom: 25}}>
          <CommonTextInput
            placeholder={'Underlay Type'}
            value={underlayType}
            onChangeText={newText => setUnderlayType(newText)}
            style={style}
          />
          <CommonTextInput
            placeholder={'Underlay Amount'}
            value={underlayAmount}
            onChangeText={newText => setUnderlayAmount(newText)}
            style={style}
          />
          {!isSecondScreen ? null : (
            <View style={{marginBottom: -25}}>
              <CommonTextInput
                placeholder={'Scotia'}
                value={scotia}
                onChangeText={newText => setScotia(newText)}
                style={[style, {marginBottom: 30}]}
              />
              <View
                style={{
                  marginBottom: 25,
                }}>
                <Text style={{fontSize: 14, fontWeight: 600}}>
                  Will skirting board be off or on
                </Text>
                {skirtingBoardsOptions.map(option => (
                  <View
                    key={option}
                    style={{
                      flexDirection: 'row',
                      alignItems: 'center',
                      marginTop: 10,
                    }}>
                    <TouchableOpacity
                      onPress={() => setIsSkirtingBoard(option)}>
                      <Image
                        source={
                          isSkirtingBoard === option
                            ? require('../../assets/images/check.png')
                            : require('../../assets/images/uncheck.png')
                        }
                        style={{height: 17, width: 17}}
                        resizeMode="contain"
                      />
                    </TouchableOpacity>
                    <Text
                      style={{
                        color: 'black',
                        fontSize: 14,
                        fontWeight: 400,
                        left: 7,
                      }}>
                      {option}
                    </Text>
                  </View>
                ))}
              </View>
              {isSkirtingBoard == 'No' || isSkirtingBoard == 'Not sure yet' ? (
                <TextInput
                  style={{
                    height: 104,
                    borderWidth: 1,
                    padding: 20,
                    borderColor: COLORS.grey,
                    borderRadius: 16,
                    paddingTop: 15,
                    marginBottom: 25,
                  }}
                  value={skirtingBoardNotes}
                  onChangeText={setSkirtingBoardNotes}
                  multiline={true}
                  placeholder="Skirting Board Notes"
                />
              ) : null}
            </View>
          )}
        </View>
        <DropDown
          defaultButtonText={'Door Bars'}
          data={doorBars}
          setLicencseLevel={setDoorBarType}
        />
        {doorBarType == 'other' && (
          <TextInput
            style={{
              height: 104,
              borderWidth: 1,
              padding: 20,
              borderColor: COLORS.grey,
              borderRadius: 16,
              paddingTop: 15,
              marginBottom: 25,
            }}
            value={doorBarNotes}
            onChangeText={setDoorBarNotes}
            multiline={true}
            placeholder="Door Bars Notes"
          />
        )}
        <CommonTextInput
          placeholder={'Door Bars Amount'}
          value={doorBarAmount}
          onChangeText={newText => setDoorBarAmount(newText)}
          style={[style1]}
        />
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            marginTop: 10,
            marginBottom: 10,
          }}>
          <Text style={{fontSize: 14, fontWeight: 600}}>
            Uplift waste service
          </Text>
          {options.map(option => (
            <View
              key={option}
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                left: 30,
                width: '28%',
              }}>
              <TouchableOpacity onPress={() => setIsUpliftWasteService(option)}>
                <Image
                  source={
                    isUpliftWasteService === option
                      ? require('../../assets/images/check.png')
                      : require('../../assets/images/uncheck.png')
                  }
                  style={{height: 17, width: 17}}
                  resizeMode="contain"
                />
              </TouchableOpacity>
              <Text
                style={{
                  color: 'black',
                  fontSize: 14,
                  fontWeight: 400,
                  left: 7,
                }}>
                {option}
              </Text>
            </View>
          ))}
        </View>
        <CommonTextInput
          placeholder={'Uplift and waste service'}
          value={upliftWasteServiceNotes}
          onChangeText={newText => setUpliftWasteServiceNotes(newText)}
          style={[style, {marginTop: 0}]}
        />

        <View style={{marginTop: 20}}>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              marginTop: 10,
              marginBottom: 10,
            }}>
            <Text style={{fontSize: 14, fontWeight: 600}}>
              {isSecondScreen
                ? 'Will room be empty'
                : 'Is there Furniture to move'}
            </Text>
            {options.map(option => (
              <View
                key={option}
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  left: 30,
                  width: '28%',
                }}>
                <TouchableOpacity onPress={() => setIsFurnitureToMove(option)}>
                  <Image
                    source={
                      isFurnitureToMove === option
                        ? require('../../assets/images/check.png')
                        : require('../../assets/images/uncheck.png')
                    }
                    style={{height: 17, width: 17}}
                    resizeMode="contain"
                  />
                </TouchableOpacity>
                <Text
                  style={{
                    color: 'black',
                    fontSize: 14,
                    fontWeight: 400,
                    left: 7,
                  }}>
                  {option}
                </Text>
              </View>
            ))}
          </View>
          {/* <Text style={{fontSize: 14, fontWeight: 600}}>Furniture</Text> */}
          {(!isSecondScreen && isFurnitureToMove == 'Yes') ||
          (isSecondScreen && isFurnitureToMove == 'No') ? (
            <View>
              <View style={styles.dottedBox}>
                <>
                  <Octicons
                    name="device-camera"
                    size={25}
                    color={COLORS.secondry}
                  />
                  <TouchableOpacity
                    style={{}}
                    onPress={() => {
                      LaunchImageLibraryAsync(
                        furnitureImages,
                        setFurnitureImages,
                        'Certifications',
                      );
                    }}>
                    <Text
                      style={{fontSize: 14, fontWeight: 500, marginTop: 10}}>
                      Take Pictures
                    </Text>
                  </TouchableOpacity>
                </>
              </View>
              {furnitureImages && furnitureImages.length ? (
                <View
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'space-around',
                    flexWrap: 'wrap',
                  }}>
                  {furnitureImages.map((item, index) => (
                    <>
                      <TouchableOpacity
                        key={index}
                        onPress={() => {
                          setModalImage(item.uri), setModal(true);
                        }}>
                        <TouchableOpacity
                          onPress={() => {
                            setFurnitureImages(
                              furnitureImages?.filter(
                                sort => sort.uri !== item.uri,
                              ),
                            );
                          }}
                          style={{
                            backgroundColor: COLORS.black,
                            height: 25,
                            width: 25,
                            borderRadius: 20,
                            alignSelf: 'flex-end',
                            zIndex: 1,
                            justifyContent: 'center',
                            alignItems: 'center',
                            left: 8,
                          }}>
                          <Text
                            style={{
                              fontSize: 20,
                              fontWeight: 600,
                              color: 'white',
                            }}>
                            X
                          </Text>
                        </TouchableOpacity>
                        <Image
                          key={index}
                          style={{
                            height: 80,
                            width: 80,
                            borderRadius: 16,
                            bottom: 15,
                          }}
                          source={{uri: item?.uri}}
                        />
                      </TouchableOpacity>
                    </>
                  ))}
                </View>
              ) : null}
              <TextInput
                style={{
                  height: 104,
                  borderWidth: 1,
                  padding: 20,
                  borderColor: COLORS.grey,
                  borderRadius: 16,
                  paddingTop: 15,
                  marginTop: 25,
                }}
                value={furnitureNotes}
                onChangeText={setFurnitureNotes}
                multiline={true}
                placeholder="Furniture Notes"
              />
            </View>
          ) : null}
        </View>
        <View
          style={{
            marginTop: 25,
            marginBottom: -5,
          }}>
          <Text style={{fontSize: 14, fontWeight: 600}}>
            Is the surfloor suitable for the job?
          </Text>
          {suitableOptions.map(option => (
            <View
              key={option}
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                marginTop: 10,
              }}>
              <TouchableOpacity onPress={() => setIsSuitableForJob(option)}>
                <Image
                  source={
                    isSuitableForJob === option
                      ? require('../../assets/images/check.png')
                      : require('../../assets/images/uncheck.png')
                  }
                  style={{height: 17, width: 17}}
                  resizeMode="contain"
                />
              </TouchableOpacity>
              <Text
                style={{
                  color: 'black',
                  fontSize: 14,
                  fontWeight: 400,
                  left: 7,
                }}>
                {option}
              </Text>
            </View>
          ))}
        </View>
        {isSuitableForJob == 'No' ||
        isSuitableForJob == 'Unable to see due to current floor' ? (
          <CommonTextInput
            placeholder={'Suitable For Job Notes'}
            value={SuitableForJobNotes}
            onChangeText={newText => setSuitableForJobNotes(newText)}
            style={[style]}
          />
        ) : null}
        {isSecondScreen && (
          <>
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                marginTop: 20,
              }}>
              <Text style={{fontSize: 14, fontWeight: 600}}>
                Floor Preparation
              </Text>
              {options.map(option => (
                <View
                  key={option}
                  style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    left: 30,
                    width: '28%',
                  }}>
                  <RadioButton.Android
                    color={COLORS.secondry}
                    value={option}
                    status={
                      isFloorPreparation === option ? 'checked' : 'unchecked'
                    }
                    onPress={() => setIsFloorPreparation(option)}
                  />
                  <Text style={{color: 'black', fontSize: 14, fontWeight: 400}}>
                    {option}
                  </Text>
                </View>
              ))}
            </View>
            {isFloorPreparation == 'Yes' && (
              <>
                <TextInput
                  style={{
                    height: 104,
                    borderWidth: 1,
                    padding: 20,
                    borderColor: COLORS.grey,
                    borderRadius: 16,
                    paddingTop: 15,
                    marginTop: 20,
                  }}
                  value={floorNotes}
                  onChangeText={setFloorNotes}
                  multiline={true}
                  placeholder="Floor Preparation Notes"
                />
                <View style={{marginVertical: 20}}>
                  <Text style={{fontSize: 14, fontWeight: 600}}>
                    Floor Preparation
                  </Text>
                  <View style={styles.dottedBox}>
                    <>
                      <Octicons
                        name="device-camera"
                        size={25}
                        color={COLORS.secondry}
                      />
                      <TouchableOpacity
                        style={{}}
                        onPress={() => {
                          LaunchImageLibraryAsync(
                            floorImages,
                            setFloorImages,
                            'Certifications',
                          );
                        }}>
                        <Text
                          style={{
                            fontSize: 14,
                            fontWeight: 500,
                            marginTop: 10,
                          }}>
                          Take Pictures
                        </Text>
                      </TouchableOpacity>
                    </>
                  </View>
                  {floorImages && floorImages.length ? (
                    <View
                      style={{
                        flexDirection: 'row',
                        justifyContent: 'space-around',
                        flexWrap: 'wrap',
                      }}>
                      {floorImages.map((item, index) => (
                        <>
                          <TouchableOpacity
                            key={index}
                            onPress={() => {
                              setModalImage(item.uri), setModal(true);
                            }}>
                            <TouchableOpacity
                              onPress={() => {
                                setFloorImages(
                                  floorImages?.filter(
                                    sort => sort.uri !== item.uri,
                                  ),
                                );
                              }}
                              style={{
                                backgroundColor: COLORS.black,
                                height: 25,
                                width: 25,
                                borderRadius: 20,
                                alignSelf: 'flex-end',
                                zIndex: 1,
                                justifyContent: 'center',
                                alignItems: 'center',
                                left: 8,
                              }}>
                              <Text
                                style={{
                                  fontSize: 20,
                                  fontWeight: 600,
                                  color: 'white',
                                }}>
                                X
                              </Text>
                            </TouchableOpacity>
                            <Image
                              key={index}
                              style={{
                                height: 80,
                                width: 80,
                                borderRadius: 16,
                                bottom: 15,
                              }}
                              source={{uri: item?.uri}}
                            />
                          </TouchableOpacity>
                        </>
                      ))}
                    </View>
                  ) : null}
                </View>
              </>
            )}
          </>
        )}
        <View style={{marginBottom: -25, marginTop: 25}}>
          <DropDown
            defaultButtonText={'Doors To Cut'}
            data={doorsToCutOption}
            setLicencseLevel={setDoorsToCut}
          />
        </View>
        {doorsToCut == 'Yes' && (
          <>
            <CommonTextInput
              placeholder={'How Many Doors to cut'}
              value={howManyDoorsToCut}
              onChangeText={newText => setHowManyDoorsToCut(newText)}
              style={[style]}
            />
            <CommonTextInput
              placeholder={'Type Of Doors To cut'}
              value={typeOfdoorsToCut}
              onChangeText={newText => setTypeOfDoorsToCut(newText)}
              style={[style]}
            />
          </>
        )}
        <View style={{marginTop: 20}}>
          <DropDown
            defaultButtonText={'How many fitters needed'}
            data={howManyFitters}
            setLicencseLevel={setFittersNeeded}
          />
        </View>
        <TextInput
          style={{
            height: 104,
            borderWidth: 1,
            padding: 20,
            borderColor: COLORS.grey,
            borderRadius: 16,
            paddingTop: 15,
            marginBottom: 20,
          }}
          value={additionalNotes}
          onChangeText={setAdditionalNotes}
          multiline={true}
          placeholder="Additional Notes"
        />
        <View style={{marginVertical: 20}}>
          <CommonButton
            title={route?.params ? 'Save' : 'Submit'}
            onPress={onPress}
          />
        </View>
      </ScrollView>
      <CommonModal
        isVisible={modalVisible}
        onModalPress={onPressModal}
        onPress={() => {
          setModalVisible(!modalVisible);
        }}
        img={jobComplete}
        title={'Job Completed Successfully !'}
        description={
          'Your job has been successfully completed. Thank you for working hard.'
        }
        buttonTitle={'Okay'}
      />

      <Modal
        propagateSwipe={true}
        isVisible={modal}
        // isVisible={true}
        onBackdropPress={() => {}}
        animationInTiming={700}
        style={[styles.mainmodal2]}>
        <SafeAreaView
        // style={{ flex: 1 }}
        >
          <View
            style={{
              zIndex: 2,
              height: 310,
              width: 310,
              backgroundColor: 'white',
              alignItems: 'center',
              alignSelf: 'center',
              justifyContent: 'center',
              // padding:10,
            }}>
            <TouchableOpacity
              onPress={() => setModal(false)}
              style={{
                position: 'absolute',
                top: -13,
                right: -7,
                zIndex: 3,
                backgroundColor: 'white',
                borderRadius: 110,
                height: 30,
                width: 30,
                justifyContent: 'center',
                alignItems: 'center',
              }}>
              <Text
                style={{
                  fontSize: 26,
                }}>
                X
              </Text>
            </TouchableOpacity>
            <Image
              source={{uri: modalImage}}
              resizeMode="cover"
              style={styles.document2}
            />
          </View>
        </SafeAreaView>
      </Modal>
    </View>
  );
};

export default MeasuringQuestionnaire;

const styles = StyleSheet.create({
  container: {
    backgroundColor: COLORS?.white,
    borderTopRightRadius: scale(20),
    borderTopLeftRadius: scale(20),
    padding: 20,
    flexGrow: 1,
  },
  buttonStyle: {
    width: '100%',
    backgroundColor: COLORS.white,
    borderWidth: 1,
    borderColor: COLORS.brgrey,
    borderRadius: 40,
    height: 60,
  },
  buttonTextStyle: {
    textAlign: 'left',
    color: COLORS.black,
    fontSize: scale(14),
    paddingLeft: 15,
    //   fontFamily: FONTS.PoppinsRegular
    fontWeight: 400,
  },
  dropdownStyle: {
    marginTop: -10,
    borderRadius: 16,
    borderTopWidth: 1,
    borderWidth: 1,
    borderColor: COLORS.brgrey,
    backgroundColor: COLORS.white,
  },
  rowTextStyle: {
    //   fontFamily: FONTS.PoppinsMedium,
    textAlign: 'left',
    marginBottom: 0,
    paddingHorizontal: 15,
    color: COLORS.black,
    fontSize: scale(12),
  },
  dottedBox: {
    height: 100,
    borderStyle: 'dashed',
    borderWidth: 1,
    borderRadius: 16,
    borderColor: COLORS.grey,
    marginTop: 15,
    justifyContent: 'center',
    alignItems: 'center',
  },
  document2: {
    width: 300,
    height: 300,
    borderRadius: 6,
  },
});
