import {
  Keyboard,
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
import {RadioButton, TextInput} from 'react-native-paper';
import {COLORS} from '../../../utils/theme';
import * as Yup from 'yup';
import {useDispatch, useSelector} from 'react-redux';
import {PostApi} from '../../../services/ApisMethods';
import {setUserData} from '../../../redux/reducers/User';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {loginRequest} from '../../../redux/actions/onBoardingAction';
import {useToast} from 'react-native-toast-notifications';

const Login = () => {
  const toast = useToast();
  const [token, setToken] = useState();
  const [hidePass, setHidePass] = useState(true);
  useEffect(() => {
    getData();
  }, []);
  const getData = async () => {
    const token = await AsyncStorage.getItem('fcmToken');
    setToken(token);
  };

  const dispatch = useDispatch();
  const [email, setEmail] = useState('Navjots.indiit@gmail.com');
  const [password, setPassword] = useState('Delhi@1A');
  // const [selectedOption, setSelectedOption] = useState(null);
  const [error, setErrors] = useState();
  const [userDataState, setUserDataState] = useState({
    email,
    password,
  });
  useEffect(() => {
    setUserDataState({email, password, token});
  }, [email, password]);

  const validationSchema = Yup.object().shape({
    email: Yup.string()
      .email('Invalid email format')
      .required('Email is required'),
    password: Yup.string()
      .required('Password is required')
      .min(8, 'Password must be at least 8 characters'),
  });

  const handleLoginSaga = async () => {
    try {
      await validationSchema.validate({email, password}, {abortEarly: false});
      param = {
        userDataState,
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
      dispatch(loginRequest(param));
    } catch (error) {
      console.log(error, '------errors');
      const validationErrors = {};
      if (error.inner) {
        error.inner.forEach(err => {
          console.log(err, 'checking it ', err.path);
          validationErrors[err.path] = err.message;
        });
      }
      setErrors(validationErrors);
      toast.show(error.errors ? error.errors[0] : error, {
        type: 'danger',
        placement: 'bottom',
        duration: 4000,
        offset: 30,
        animationType: 'slide-in ',
      });
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
          <View style={styles.radioBox}></View>
          <View style={{height: '42%', justifyContent: 'space-between'}}>
            <CommonTextInput
              placeholder="Email Adress"
              value={email}
              keyboardType="email-address"
              onChangeText={newText => setEmail(newText)}
            />
            <CommonTextInput
              placeholder="Password"
              value={password}
              right={
                <TextInput.Icon
                  onPress={() => {
                    Keyboard.dismiss(), setHidePass(!hidePass);
                  }}
                  style={styles.rightpad}
                  icon={hidePass ? 'eye-off' : 'eye'}
                  size={20}
                  iconColor={COLORS.grey}
                />
              }
              secureTextEntry={hidePass ? true : false}
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
    height: height / 2.2,
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
