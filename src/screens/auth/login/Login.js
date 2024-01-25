import {
  KeyboardAvoidingView,
  Platform,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {navigationRef} from '../../../App';
import CommonTextInput from '../../../components/Input/InputBox';
import CommonButton from '../../../components/CommonButton/CommonButton';
import CommonBackground from '../../../components/CommonBG/CommonBackground';
import {height} from '../../../assets/styles/styles';
import {RadioButton} from 'react-native-paper';
import {COLORS} from '../../../utils/theme';
import * as Yup from 'yup';
import {useDispatch, useSelector} from 'react-redux';
import {PostApi} from '../../../services/ApisMethods';
import {setUserData} from '../../../redux/reducers/User';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { loginRequest } from '../../../redux/actions/onBoardingAction';

const Login = () => {
  const dispatch = useDispatch();
  const [email, setEmail] = useState('Navjots.indiit@gmail.com');
  const [password, setPassword] = useState("Delhi@1A");
  const [selectedOption, setSelectedOption] = useState(null);
  const [error, setErrors] = useState();
  const [userDataState, setUserDataState] = useState(
   { email,
    password,
    selectedOption}
  );
  useEffect(()=>{
    setUserDataState({email,password,selectedOption})
  },[email,password,selectedOption])
  const options = ['Fitter', 'Surveyor'];
  const handleOptionPress = option => {
    setSelectedOption(option);
  };
  const userData = useSelector(state => state)
  console.log('userData from saga------------------------',userData);
  const onPress = () => {
    // navigationRef.reset({
    //   index: 0,
    //   routes: [{name: 'tabs'}],
    // });
    navigationRef.navigate('VerifyOTP');
  };

  const validationSchema = Yup.object().shape({
    email: Yup.string()
      .email('Invalid email format')
      .required('Email is required'),
    password: Yup.string()
      .required('Password is required')
      .min(8, 'Password must be at least 8 characters'),
    selectedOption: Yup.string()
      .required('Role is required')
      .oneOf(['Fitter', 'Surveyor'], 'Role must be either Fitter or Surveyor'),
  });

const handleLoginSaga = ()=>{
  // userDataState
  dispatch(loginRequest(userDataState))
}

  const handleLogin = async () => {
    try {
      // Validate form inputs
      await validationSchema.validate(
        {email, password, selectedOption},
        {abortEarly: false},
      );
      // Form inputs are valid, proceed with signup
      const params = {
        email,
        password,
        role: selectedOption,
      };
      console.log('params----', params);
      const response = await PostApi('login', params);
      if (response?.data) {
        // console.log(response.data, 'res?.data');
        // navigationRef.reset({
        //   index: 0,
        //   routes: [{name: 'tabs'}],
        // }),
        navigationRef.reset({
          index: 0,
          routes: [{name: 'tabs', params: {screen: 'Home'}}],
        }),
          // navigationRef.reset({
          //   index: 0,
          //   routes: [
          //     {
          //       name: 'tabs',
          //       screen: 'Home',
          //       params: {},
          //     },
          //   ],
          // });
          await AsyncStorage.setItem(
            'token',
            JSON.stringify(response.data.token),
          );
        await AsyncStorage.setItem('role', JSON.stringify(response.data.role));
        dispatch(setUserData(response.data));
      } else {
        console.log(response, 'res');
      }
    } catch (error) {
      console.log(error, '------errors in login');
      const validationErrors = {};
      if (error.inner) {
        error.inner.forEach(err => {
          console.log(err, 'checking it ', err.path);
          validationErrors[err.path] = err.message;
        });
      }
      setErrors(validationErrors);
      console.error(error.errors ? error.errors[0] : error);
    }
  };

  return (
    <View
      style={{
        flex: 1,
      }}>
      <CommonBackground back={true} title={'Login'} />
      <SafeAreaView />
      <ScrollView
        contentContainerStyle={{
          flexGrow: 1,
          paddingTop: Platform?.OS === 'android' ? height / 3.1 : height / 4,
        }}
        showsVerticalScrollIndicator={false}
        automaticallyAdjustKeyboardInsets={true}>
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
          <CommonButton
            style={styles.Button}
            title="Login"
            // onPress={handleLogin}
            onPress={handleLoginSaga}
          />
        </View>
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
      </ScrollView>
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
    elevation: 14,
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
