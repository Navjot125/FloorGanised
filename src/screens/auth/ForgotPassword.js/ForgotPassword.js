import {
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
import CommonTextInput from '../../../components/Input/InputBox';
import CommonButton from '../../../components/CommonButton/CommonButton';
import CommonBackground from '../../../components/CommonBG/CommonBackground';
import {height} from '../../../assets/styles/styles';
import {RadioButton} from 'react-native-paper';
import {COLORS} from '../../../utils/theme';
import Back from '../../../components/BackButton/Back';
import {scale} from 'react-native-size-matters';
import { useDispatch } from 'react-redux';
import { sendOtp } from '../../../redux/actions/onBoardingAction';

const ForgotPassword = () => {
  const dispatch = useDispatch()
  const [email, setEmail] = useState('navjots.indiit@gmail.com');
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
    dispatch(sendOtp(email))
  };
  const onBackPress = () => {
    navigationRef.goBack();
  };

  return (
    <View style={{flex: 1, paddingTop: Platform.OS === 'android' ? 0 : scale(120)}}>
      <CommonBackground title={'Forgot Password'} />
      <SafeAreaView />
      <ScrollView
        contentContainerStyle={{
          paddingTop: Platform?.OS === 'android' ? height / 7.8 : height / 105.5,
          marginTop: scale(144),
          flexGrow: 1,
        }}
        showsVerticalScrollIndicator={false}
        automaticallyAdjustKeyboardInsets
      >
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
            Enter your email to receive an OTP for password reset.
          </Text>
          <View style={{height: '31%', justifyContent: 'space-between'}}>
            <CommonTextInput
              placeholder="Email Adress"
              value={email}
              onChangeText={newText => setEmail(newText)}
            />
          </View>
          <CommonButton
            style={styles.Button}
            title="Proceed"
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
          Back to
          <Text
            style={{fontWeight: 500}}
            onPress={() => navigationRef.navigate('Login')}>
            {' '}
            Login
          </Text>
        </Text>
      </ScrollView>
    </View>
  );
};

export default ForgotPassword;

const styles = StyleSheet.create({
  innerBox: {
    height: height / 2.9,
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
    marginTop: '2%',
  },
});
