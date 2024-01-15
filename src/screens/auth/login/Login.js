import {
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useState} from 'react';
import {navigationRef} from '../../../../App';
import CommonTextInput from '../../../components/Input/InputBox';
import CommonButton from '../../../components/CommonButton/CommonButton';
import CommonBackground from '../../../components/CommonBG/CommonBackground';
import {height} from '../../../assets/styles/styles';
import {RadioButton} from 'react-native-paper';
import {COLORS} from '../../../utils/theme';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [selectedOption, setSelectedOption] = useState(null);
  const options = ['Fitter', 'Surveyor'];
  const handleOptionPress = option => {
    setSelectedOption(option);
  };
  const onPress = () => {
    // navigationRef.reset({
    //   index: 0,
    //   routes: [{name: 'tabs'}],
    // });
    navigationRef.navigate('VerifyOTP');
  };

  return (
    <View style={{flex: 1}}>
      <CommonBackground title={'Login'} />
      <SafeAreaView />
      <ScrollView
        contentContainerStyle={{marginTop: height / 4}}
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
          <View style={{height: '38%', justifyContent: 'space-between'}}>
            <CommonTextInput
              placeholder="Email Adress"
              value={email}
              onChangeText={newText => setEmail(newText)}
            />
            <CommonTextInput
              placeholder="Password"
              value={password}
              onChangeText={newText => setPassword(newText)}
            />
          </View>
          <TouchableOpacity
            style={{alignSelf: 'flex-end', left: -60, top: 10}}
            onPress={() => navigationRef.navigate('ForgotPassword')}>
            <Text style={{fontWeight: 500}}>Forgot Password?</Text>
          </TouchableOpacity>
          <CommonButton style={styles.Button} title="Login" onPress={onPress} />
        </View>
      </ScrollView>
      <Text
        style={{
          alignSelf: 'center',
          bottom: 30,
          position: 'absolute',
          fontWeight: 300,
        }}>
        Dont't have an account ?
        <Text
          style={{fontWeight: 500}}
          onPress={() => navigationRef.navigate('Signup')}>
          {' '}
          Sign Up
        </Text>
      </Text>
    </View>
  );
};

export default Login;

const styles = StyleSheet.create({
  innerBox: {
    height: height / 2.1,
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
    elevation: 24,
  },
  radioBox: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingVertical: 30,
  },
  Button: {
    marginTop: '17%',
  },
});
