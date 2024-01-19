import {SafeAreaView, ScrollView, StyleSheet, Text, View} from 'react-native';
import React, {useState} from 'react';
import {navigationRef} from '../../../../App';
import CommonTextInput from '../../../components/Input/InputBox';
import CommonButton from '../../../components/CommonButton/CommonButton';
import CommonBackground from '../../../components/CommonBG/CommonBackground';
import {height} from '../../../assets/styles/styles';
import {RadioButton} from 'react-native-paper';
import {COLORS} from '../../../utils/theme';
import Back from '../../../components/BackButton/Back';
import {scale} from 'react-native-size-matters';
import { useDispatch } from 'react-redux';
import { setUserData } from '../../../redux/reducers/User';

const Signup = () => {
  const userData = [
    {
      name: 'Navjot Singh',
      email: 'Navjots.indiit@gmail.com',
      phone: '7009173569',
      _id: 0,
      role: 1,
      profile: '../../../assets/images/Profile1.jpg',
    },
    {
      name: 'Gurmukh Singh',
      email: 'Gurmukh.indiit@gmail.com',
      phone: '9653719007',
      _id: 1,
      role: 2,
      profile: '../../../assets/images/Profile2.jpg',
    },
  ];
  const [text, setText] = useState('');
  const [name, setName] = useState('');
  const [cPassword, setCPassword] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [selectedOption, setSelectedOption] = useState(null);
  const options = ['Fitter', 'Surveyor'];
  const handleOptionPress = option => {
    setSelectedOption(option);
  };
  const dispatch = useDispatch();
  const onPress = () => {
    navigationRef.reset({
      index: 0,
      routes: [{name: 'tabs'}],
    }),
    dispatch(setUserData(userData[1]))
  };
  const onBackPress = () => {
    navigationRef.goBack();
  };
  return (
    <View style={{flex: 1, paddingTop: 110}}>
      <CommonBackground title={'Sign Up'} />
      <SafeAreaView />
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{
          paddingTop: height / 9.5,
          marginTop: scale(111),
          flexGrow: 1,
        }}
        automaticallyAdjustKeyboardInsets>
        <View style={styles.innerBox}>
          <View style={styles.radioBox}>
            {options.map(option => (
              <View
                key={option}
                style={{flexDirection: 'row', alignItems: 'center'}}>
                <RadioButton.Android
                  color={COLORS.secondry}
                  value={option}
                  status={selectedOption === option ? 'checked' : 'unchecked'}
                  onPress={() => handleOptionPress(option)}
                />
                <Text style={{color: 'black'}}>{option}</Text>
              </View>
            ))}
          </View>
          <View style={{height: '66%', justifyContent: 'space-between'}}>
            <CommonTextInput
              placeholder="Full Name"
              value={name}
              onChangeText={newText => setName(newText)}
            />
            <CommonTextInput
              placeholder="Email Address"
              value={email}
              onChangeText={newText => setEmail(newText)}
            />
            <CommonTextInput
              placeholder="Password"
              value={password}
              onChangeText={newText => setPassword(newText)}
            />
            <CommonTextInput
              placeholder="Confirm Password"
              value={cPassword}
              onChangeText={newText => setCPassword(newText)}
            />
          </View>
          <CommonButton
            style={styles.Button}
            title="Sign Up"
            onPress={onPress}
          />
        </View>
        <Text
          style={{
            alignSelf: 'center',
            bottom: 30,
            position: 'absolute',
            fontWeight: 300,
          }}>
          Already have an account ?
          <Text
            onPress={() => {
              navigationRef.navigate('Login');
            }}
            style={{fontWeight: 500}}>
            {' '}
            Login
          </Text>
        </Text>
      </ScrollView>
    </View>
  );
};

export default Signup;

const styles = StyleSheet.create({
  innerBox: {
    height: height / 1.8,
    width: '90%',
    backgroundColor: 'white',
    marginHorizontal: 20,
    borderRadius: 40,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 12,
    },
    shadowOpacity: 0.1,
    shadowRadius: 16.27,
    elevation: 14,
    bottom: '6%',
  },
  radioBox: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingVertical: 20,
  },
  Button: {
    marginTop: '5%',
  },
});
