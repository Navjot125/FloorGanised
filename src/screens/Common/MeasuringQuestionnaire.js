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

const MeasuringQuestionnaire = ({route}) => {
  const [licencseLevel, setLicencseLevel] = useState();
  const [flooringType, setFlooringType] = useState();
  const [measuremntRoomImages, setMeasuremntRoomImages] = useState();
  const [furnitureImages, setFurnitureImages] = useState();
  const [doorsToCut, setDoorsToCut] = useState();
  const [floorImages, setFloorImages] = useState();
  const [doorBarType, setDoorBarType] = useState();
  const [selectedOption, setSelectedOption] = useState(null);
  const [isFloorPreparation, setIsFloorPreparation] = useState(null);
  const [flooringChoiceColorCheckBox, setFlooringChoiceColorCheckBox] =
    useState(null);
  const [isSuitableForJob, setIsSuitableForJob] = useState(null);
  const [isSkirtingBoard, setIsSkirtingBoard] = useState();
  const [isFlooringChoiceSelected, setIsFlooringChoiceSelected] =
    useState(null);
  const [typeOfRoom, setTypeOfRoom] = useState(null);
  const [surcharge, setSurcharge] = useState(null);
  const [flooringChoiceColor, setFlooringChoiceColor] = useState(null);
  const [size, setSize] = useState(null);
  const [SQM, setSQM] = useState(null);
  const [gripperLengths, setGripperLengths] = useState(null);
  const [doorBarAmount, setDoorBarAmount] = useState(null);
  const [underlayType, setUnderlayType] = useState(null);
  const [isSecondScreen, setIssecondScreen] = useState(false);
  const [underlayAmount, setUnderlayAmount] = useState(null);
  const [scotia, setScotia] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);
  const handleOptionPress = option => {
    setSelectedOption(option);
  };
  const location = ['1', '2', '3', '4', '5'];
  const doorsToCutOption = ['Yes', 'No'];
  const suitableOptions = ['O Yes', 'Unable To See Due To Current Floor', 'No'];
  const skirtingBoardsOptions = ['Yes', 'Not Sure Yet', 'No'];
  const doorBars = ['silver', 'gold', 'oak', 'other'];
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
    route?.params
      ? navigationRef.navigate('Home')
      : setModalVisible(!modalVisible);
  };
  const onPressModal = () => {
    setModalVisible(!modalVisible);
    navigationRef.navigate('Home');
  };
  const Laminate = true;
  useEffect(() => {
    if (measuremntRoomImages?.length > 3) {
      Alert.alert('You can pic only 3 images');
    }
  }, [measuremntRoomImages]);

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
          <Text style={{fontSize: 14, fontWeight: 600}} >Measurement of room</Text>
          <View style={styles.dottedBox}>
            {measuremntRoomImages ? (
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-around',
                  width: '100%',
                }}>
                {measuremntRoomImages.map((item, index) => (
                  <Image
                    key={index}
                    style={{height: 80, width: 80, borderRadius: 16}}
                    source={{uri: item?.uri}}
                  />
                ))}
              </View>
            ) : (
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
            )}
          </View>
        </View>
        {!isSecondScreen && (
          <>
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                marginTop: 25,
                marginBottom:5
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
                  <RadioButton.Android
                    color={COLORS.secondry}
                    value={option}
                    status={selectedOption === option ? 'checked' : 'unchecked'}
                    onPress={() => handleOptionPress(option)}
                  />
                  <Text style={{color: 'black', fontSize: 14, fontWeight: 400}}>
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
                  Will Skirting Board Be Off Or On
                </Text>
                {skirtingBoardsOptions.map(option => (
                  <View
                    key={option}
                    style={{
                      flexDirection: 'row',
                      alignItems: 'center',
                      marginTop: 5,
                    }}>
                    <RadioButton.Android
                      color={COLORS.secondry}
                      value={option}
                      status={
                        isSkirtingBoard === option ? 'checked' : 'unchecked'
                      }
                      onPress={() => setIsSkirtingBoard(option)}
                    />
                    <Text
                      style={{color: 'black', fontSize: 14, fontWeight: 400}}>
                      {option}
                    </Text>
                  </View>
                ))}
              </View>
              {isSkirtingBoard == 'No' || isSkirtingBoard == 'Not Sure Yet' ? (
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
            marginTop: 0,
            marginBottom: 15,
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
              <RadioButton.Android
                color={COLORS.secondry}
                value={option}
                status={selectedOption === option ? 'checked' : 'unchecked'}
                onPress={() => setFlooringChoiceColorCheckBox(option)}
              />
              <Text style={{color: 'black', fontSize: 14, fontWeight: 400}}>
                {option}
              </Text>
            </View>
          ))}
        </View>
        <CommonTextInput
          placeholder={'Uplift and waste service'}
          value={gripperLengths}
          onChangeText={newText => setGripperLengths(newText)}
          style={[style, {marginTop: 0}]}
        />
        <View style={{marginVertical: 20}}>
          <Text style={{fontSize: 14, fontWeight: 600}}>Furniture</Text>
          <View style={styles.dottedBox}>
            {furnitureImages ? (
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-around',
                  width: '100%',
                }}>
                {furnitureImages.map((item, index) => (
                  <Image
                    key={index}
                    style={{height: 80, width: 80, borderRadius: 16}}
                    source={{uri: item?.uri}}
                  />
                ))}
              </View>
            ) : (
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
                  <Text style={{fontSize: 14, fontWeight: 500, marginTop: 10}}>
                    Take Pictures
                  </Text>
                </TouchableOpacity>
              </>
            )}
          </View>
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
          multiline={true}
          placeholder="Furniture Notes"
        />
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
                marginTop: 5,
              }}>
              <RadioButton.Android
                color={COLORS.secondry}
                value={option}
                status={isSuitableForJob === option ? 'checked' : 'unchecked'}
                onPress={() => setIsSuitableForJob(option)}
              />
              <Text style={{color: 'black', fontSize: 14, fontWeight: 400}}>
                {option}
              </Text>
            </View>
          ))}
        </View>
        {isSuitableForJob == 'No' ||
        isSuitableForJob == 'Unable To See Due To Current Floor' ? (
          <CommonTextInput
            placeholder={'Suitable For Job Notes'}
            value={doorBarAmount}
            onChangeText={newText => setDoorBarAmount(newText)}
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
                  multiline={true}
                  placeholder="Floor Preparation Notes"
                />
                <View style={{marginVertical: 20}}>
                  <Text style={{fontSize: 14, fontWeight: 600}}>
                    Floor Preparation
                  </Text>
                  <View style={styles.dottedBox}>
                    {floorImages ? (
                      <View
                        style={{
                          flexDirection: 'row',
                          justifyContent: 'space-around',
                          width: '100%',
                        }}>
                        {floorImages.map((item, index) => (
                          <Image
                            key={index}
                            style={{height: 80, width: 80, borderRadius: 16}}
                            source={{uri: item?.uri}}
                          />
                        ))}
                      </View>
                    ) : (
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
                    )}
                  </View>
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
              value={gripperLengths}
              onChangeText={newText => setGripperLengths(newText)}
              style={[style]}
            />
            <CommonTextInput
              placeholder={'Type Of Doors To cut'}
              value={gripperLengths}
              onChangeText={newText => setGripperLengths(newText)}
              style={[style]}
            />
          </>
        )}
        <View style={{marginTop: 20}}>
          <DropDown
            defaultButtonText={'How many fitters needed'}
            data={location}
            setLicencseLevel={setLicencseLevel}
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
});
