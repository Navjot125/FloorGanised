import {
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useState} from 'react';
import {navigationRef} from '../../../../App';
import CommonButton from '../../../components/CommonButton/CommonButton';
import CommonBackground from '../../../components/CommonBG/CommonBackground';
import {height} from '../../../assets/styles/styles';
import {COLORS} from '../../../utils/theme';
import OTPInputView from '@twotalltotems/react-native-otp-input';
import Back from '../../../components/BackButton/Back';
import {scale} from 'react-native-size-matters';
import {useDispatch} from 'react-redux';
import {setUserData} from '../../../redux/reducers/User';

const VerifyOTP = ({route}) => {
  const GoTo = route?.params?.reset;
  const [code, setCode] = useState();
  const dispatch = useDispatch();
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
    GoTo
      ? navigationRef.navigate(GoTo)
      : (navigationRef.reset({
          index: 0,
          routes: [{name: 'tabs'}],
        }),
        dispatch(setUserData(userData[1])));
  };
  const onBackPress = () => {
    navigationRef.goBack();
  };

  return (
    <View style={{flex: 1}}>
      <CommonBackground title={'Verify OTP'} />
      <SafeAreaView />
      <View style={{paddingTop: height / 9.5, marginTop: scale(144)}}>
        <View style={styles.innerBox}>
          <Text
            style={{
              paddingHorizontal: 60,
              color: COLORS.secondry,
              paddingVertical: 40,
              fontWeight: 500,
              fontSize: 14,
              lineHeight: 22,
            }}>
            Enter OTP for verification. Please check your registered email &
            enter the same below.
          </Text>
          <View style={{alignSelf: 'center'}}>
            <OTPInputView
              style={{width: '80%', height: 100}}
              pinCount={4}
              code={code} //You can supply this prop or not. The component will be used as a controlled / uncontrolled component respectively.
              onCodeChanged={code => {
                setCode(code);
              }}
              autoFocusOnLoad
              codeInputFieldStyle={styles.underlineStyleBase}
              codeInputHighlightStyle={styles.underlineStyleHighLighted}
              onCodeFilled={code => {
                console.log(`Code is ${code}, you are good to go!`);
              }}
            />
          </View>
          <CommonButton
            style={styles.Button}
            title="Verify"
            onPress={onPress}
          />
        </View>
      </View>
      <Text
        style={{
          alignSelf: 'center',
          bottom: 30,
          position: 'absolute',
          fontWeight: 300,
        }}>
        Not received ?
        <Text style={{fontWeight: 500}} onPress={() => {}}>
          {' '}
          Resend OTP
        </Text>
      </Text>
    </View>
  );
};

export default VerifyOTP;

const styles = StyleSheet.create({
  innerBox: {
    height: height / 2.4,
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
});
