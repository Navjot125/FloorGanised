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
import SelectDropdown from 'react-native-select-dropdown';
import AntDesign from 'react-native-vector-icons/AntDesign';
import DropDown from '../../components/DropDown/DropDown';
import {RadioButton} from 'react-native-paper';
import CommonTextInput from '../../components/Input/InputBox';
import CommonButton from '../../components/CommonButton/CommonButton';
import {navigationRef} from '../../App';
import CommonModal from '../../components/Modal/Modal';
import jobComplete from '../../assets/images/jobComplete.png';
import Header from '../../components/Header/Header';
import ImagePicker from '../../components/ImagePicker/ImagePicker';
import Octicons from 'react-native-vector-icons/Octicons';
import LaunchImageLibraryAsync from '../../components/ImagePicker/ImagePicker';

const MeasuringQuestionnaire = ({route}) => {
  const [licencseLevel, setLicencseLevel] = useState();
  const [measuremntRoomImages, setMeasuremntRoomImages] = useState();
  const [furnitureImages, setFurnitureImages] = useState();
  const [floorImages, setFloorImages] = useState();
  const [doorBarType, setDoorBarType] = useState();
  const [selectedOption, setSelectedOption] = useState(null);
  const [flooringChoiceColorCheckBox, setFlooringChoiceColorCheckBox] =
    useState(null);
  const [typeOfRoom, setTypeOfRoom] = useState(null);
  const [surcharge, setSurcharge] = useState(null);
  const [flooringChoiceColor, setFlooringChoiceColor] = useState(null);
  const [size, setSize] = useState(null);
  const [SQM, setSQM] = useState(null);
  const [gripperLengths, setGripperLengths] = useState(null);
  const [doorBarAmount, setDoorBarAmount] = useState(null);
  const [underlayType, setUnderlayType] = useState(null);
  const [underlayAmount, setUnderlayAmount] = useState(null);
  const [scotia, setScotia] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);
  const handleOptionPress = option => {
    setSelectedOption(option);
  };
  const location = ['1', '2', '3', '4', '5'];
  const doorsToCut = ['Yes', 'No'];
  const doorBars = ['silver', 'gold', 'oak', 'other', '5'];
  const FlooringType = [
    'Carpets',
    'Vinyl',
    'Commercial Carpet',
    'Laminate',
    'LVT',
    'Engineered Wood',
  ];
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
        {/* <DropDown
          defaultButtonText={'Add Room'}
          data={location}
          setLicencseLevel={setLicencseLevel}
        /> */}
        <DropDown
          defaultButtonText={'Flooring Type'}
          data={FlooringType}
          setLicencseLevel={setLicencseLevel}
        />
        {/* <DropDown
          defaultButtonText={'Select flooring Choice & Colour'}
          data={location}
          setLicencseLevel={setLicencseLevel}
        /> */}
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            marginTop: 0,
            marginBottom: 15,
          }}>
          <Text style={{fontSize: 14, fontWeight: 600}}>
            flooring Choice & Colour
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
          placeholder={'flooring Choice & Colour'}
          value={flooringChoiceColor}
          onChangeText={newText => setFlooringChoiceColor(newText)}
          style={style1}
        />
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
          <Text>Measurement of room</Text>
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
        {/* {!Laminate ? (
          <> */}
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            marginTop: 10,
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
          //   textAlignVertical="top"
          placeholder="Write Notes"
        />
        <CommonTextInput
          placeholder={'Gripper Lengths'}
          value={gripperLengths}
          onChangeText={newText => setGripperLengths(newText)}
          style={style}
        />
        {/* <CommonTextInput
          placeholder={'SQM Total'}
          value={gripperLengths}
          onChangeText={newText => setGripperLengths(newText)}
          style={style}
        /> */}
        {/* </>
        ) : (
          <CommonTextInput
            placeholder={'SQM Total'}
            value={gripperLengths}
            onChangeText={newText => setGripperLengths(newText)}
            style={style}
          />
        )} */}
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
          {/* {Laminate ? null : ( */}
          <View style={{marginBottom: -25}}>
            <CommonTextInput
              placeholder={'Scotia'}
              value={scotia}
              onChangeText={newText => setScotia(newText)}
              style={[style, {marginBottom: 30}]}
            />
            <DropDown
              defaultButtonText={'Skirting Boards'}
              data={location}
              setLicencseLevel={setLicencseLevel}
            />
          </View>
          {/* )} */}
        </View>
        <DropDown
          defaultButtonText={'Door Bars'}
          data={doorBars}
          setLicencseLevel={setDoorBarType}
        />
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
          //   textAlignVertical="top"
          placeholder="Door Bars Notes"
        />
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
            Uplift waste Service
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
          //   textAlignVertical="top"
          placeholder="Furniture Notes"
        />
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            marginTop: 25,
            marginBottom: -5,
          }}>
          <Text style={{fontSize: 14, fontWeight: 600}}>Suitable For Job</Text>
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
          placeholder={'Suitable For Job Notes'}
          value={doorBarAmount}
          onChangeText={newText => setDoorBarAmount(newText)}
          style={[style]}
        />
        {/* <CommonTextInput
          placeholder={'Floor Preparation'}
          value={gripperLengths}
          onChangeText={newText => setGripperLengths(newText)}
          style={[style]}
        /> */}
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            marginTop: 10,
          }}>
          <Text style={{fontSize: 14, fontWeight: 600}}>Floor Preparation</Text>
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
            marginTop: 20,
          }}
          multiline={true}
          //   textAlignVertical="top"
          placeholder="Floor Preparation Notes"
        />
        <View style={{marginVertical: 20}}>
          <Text style={{fontSize: 14, fontWeight: 600}}>Floor Preparation</Text>
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
                  <Text style={{fontSize: 14, fontWeight: 500, marginTop: 10}}>
                    Take Pictures
                  </Text>
                </TouchableOpacity>
              </>
            )}
          </View>
        </View>
        <View style={{marginBottom: -25, marginTop: 25}}>
          <DropDown
            defaultButtonText={'Doors To Cut'}
            data={doorsToCut}
            setLicencseLevel={setLicencseLevel}
          />
        </View>
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
        {/* <TextInput
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
          //   textAlignVertical="top"
          placeholder="Floor Plan Notes"
        /> */}
        {/* <CommonTextInput
          placeholder={'Minimum Charge'}
          value={gripperLengths}
          onChangeText={newText => setGripperLengths(newText)}
          style={[style]}
        /> */}
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
// isVisible,onPress,img,title,description,onModalPress,

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
