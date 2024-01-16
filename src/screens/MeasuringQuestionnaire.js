import {
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
import React, {useState} from 'react';
import {scale} from 'react-native-size-matters';
import Header from '../components/Header/Header';
import {COLORS} from '../utils/theme';
import SelectDropdown from 'react-native-select-dropdown';
import AntDesign from 'react-native-vector-icons/AntDesign';
import DropDown from '../components/DropDown/DropDown';
import {RadioButton} from 'react-native-paper';
import CommonTextInput from '../components/Input/InputBox';

const MeasuringQuestionnaire = () => {
  const [licencseLevel, setLicencseLevel] = useState();
  const [selectedOption, setSelectedOption] = useState(null);
  const [gripperLengths, setGripperLengths] = useState(null);
  const handleOptionPress = option => {
    setSelectedOption(option);
  };
  const location = ['1', '2', '3', '4', '5'];
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
  return (
    <View style={{flex: 1, backgroundColor: 'black'}}>
      <SafeAreaView />
      <Header title={'Measuring Questionnaire'} back={true} />
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.container}
        automaticallyAdjustKeyboardInsets>
        <DropDown
          defaultButtonText={'Add Room'}
          data={location}
          setLicencseLevel={setLicencseLevel}
        />
        <DropDown
          defaultButtonText={'Flooring Type'}
          data={FlooringType}
          setLicencseLevel={setLicencseLevel}
        />
        <DropDown
          defaultButtonText={'Select flooring Choice & Colour'}
          data={location}
          setLicencseLevel={setLicencseLevel}
        />
        <View>
          <Text>Measurement of room</Text>
          <View style={styles.dottedBox}></View>
        </View>
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
        <CommonTextInput
          placeholder={'Underlay'}
          value={gripperLengths}
          onChangeText={newText => setGripperLengths(newText)}
          style={style}
        />
        <DropDown
          defaultButtonText={'Select flooring Choice & Colour'}
          data={location}
          setLicencseLevel={setLicencseLevel}
        />
      </ScrollView>
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
  },
});
