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
import React, {useState} from 'react';
import {navigationRef} from '../../../App';
import CommonButton from '../../../components/CommonButton/CommonButton';
import CommonBackground from '../../../components/CommonBG/CommonBackground';
import {height} from '../../../assets/styles/styles';
import {COLORS} from '../../../utils/theme';

import OTPTextInput from 'react-native-otp-textinput';
import Back from '../../../components/BackButton/Back';
import {scale} from 'react-native-size-matters';
import {useDispatch} from 'react-redux';
import {setUserData} from '../../../redux/reducers/User';
import {verifyOtp} from '../../../redux/actions/onBoardingAction';
import {useToast} from 'react-native-toast-notifications';
import FONTS from '../../../assets/styles/fonts';

const VerifyOTP = ({route}) => {
  const GoTo = route?.params?.reset;
  const email = route?.params?.data;
  const toast = useToast();
  const [code, setCode] = useState('');
  const [disableButton, setDisableButton] = useState(false);
  const dispatch = useDispatch();
  const handleOtpChange = value => {
    setCode(value);
  };
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
  const onPress = () => {
    setDisableButton(true);
    setTimeout(() => {
      setDisableButton(false);
    }, 4000);
    param = {
      email,
      code,
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
    GoTo
      ? dispatch(verifyOtp(param))
      : (navigationRef.reset({
          index: 0,
          routes: [{name: 'tabs'}],
        }),
        dispatch(setUserData(userData[1])));
  };
  return (
    <View
      style={{
        flexGrow: 1,
        paddingTop: Platform.OS === 'android' ? 0 : scale(120),
      }}>
      <CommonBackground title={'Verify OTP'} />
      <KeyboardAvoidingView style={{flexGrow: 1}}>
        <SafeAreaView />
        <ScrollView
          contentContainerStyle={{
            paddingTop:
              Platform?.OS === 'android' ? height / 3.1 : height / 4.8,
            flexGrow: 1,
          }}>
          <View style={styles.innerBox}>
            <Text
              style={{
                paddingHorizontal: 60,
                color: COLORS.secondry,
                paddingVertical: 40,
                fontSize: 14,
                lineHeight: 22,
                fontFamily: FONTS?.MontserratMedium,
              }}>
              Enter OTP for verification. Please check your registered email &
              enter the same below.
            </Text>
            <View style={{alignSelf: 'center'}}>
              <OTPTextInput
                containerStyle={styles.otpContainer}
                textInputStyle={[styles.otpInput, {color: COLORS.grey}]}
                handleTextChange={handleOtpChange}
                inputCount={4}
                // keyboardType="numeric"
                keyboardType="numbers-and-punctuation"
                tintColor={COLORS.primary}
                // offTintColor={"#B79B58"}
              />
            </View>
            <CommonButton
              disableButton={disableButton}
              style={styles.Button}
              title="Verify"
              onPress={onPress}
            />
          </View>
          <Text
            style={{
              alignSelf: 'center',
              bottom: 30,
              position: 'absolute',
              fontFamily: FONTS?.MontserratRegular,
            }}>
            Not received ?
            <Text
              style={{fontFamily: FONTS?.MontserratSemiBold}}
              onPress={() => {}}>
              {' '}
              Resend OTP
            </Text>
          </Text>
        </ScrollView>
      </KeyboardAvoidingView>
    </View>
  );
};

export default VerifyOTP;

const styles = StyleSheet.create({
  innerBox: {
    // height: height / 2.4,
    minHeight: height / 2.6,
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

    // marginBottom: 30,
  },
  radioBox: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingVertical: 30,
  },
  Button: {
    marginTop: '10%',
  },

  borderStyleBase: {
    width: 45,
    height: 45,
    backgroundColor: 'yellow',
  },
  borderStyleHighLighted: {
    borderColor: '#03DAC6',
  },
  underlineStyleBase: {
    width: 55,
    height: 55,
    // borderWidth: 0,
    borderBottomWidth: 1,
    // backgroundColor:'red',
    borderRadius: 100,
    color: 'black',
  },
  underlineStyleHighLighted: {
    borderColor: COLORS.secondr,
  },
  otpContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    color: '#30334F',
  },
  otpInput: {
    width: 55,
    height: 55,
    borderWidth: 3,
    textAlign: 'center',
    borderRadius: 40,
  },
});
