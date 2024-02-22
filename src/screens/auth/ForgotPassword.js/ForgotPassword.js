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
import {useDispatch} from 'react-redux';
import {sendOtp} from '../../../redux/actions/onBoardingAction';
import {useToast} from 'react-native-toast-notifications';
import * as Yup from 'yup';

const ForgotPassword = () => {
  const dispatch = useDispatch();
  const toast = useToast();
  const [disableButton, setDisableButton] = useState(false);
  const [email, setEmail] = useState();
  const [selectedOption, setSelectedOption] = useState(null);
  const options = ['Fitter', 'Surveyor'];
  const [error, setErrors] = useState();

  const handleOptionPress = option => {
    setSelectedOption(option);
  };

  const validationSchema = Yup.object().shape({
    email: Yup.string()
      .email('Invalid email format')
      .required('Email is required'),
  });
  const onPress = async () => {
    try {
      setDisableButton(true);
      setTimeout(() => {
        setDisableButton(false);
      }, 4000);
      await validationSchema.validate({email}, {abortEarly: false});
      param = {
        email,
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
      dispatch(sendOtp(param));
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
      style={{flex: 1, paddingTop: Platform.OS === 'android' ? 0 : scale(120)}}>
      <CommonBackground title={'Forgot Password'} />
      <SafeAreaView />
      <ScrollView
        contentContainerStyle={{
          paddingTop:
            Platform?.OS === 'android' ? height / 7.8 : height / 105.5,
          marginTop: scale(144),
          flexGrow: 1,
        }}
        showsVerticalScrollIndicator={false}
        automaticallyAdjustKeyboardInsets>
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
            disableButton={disableButton}
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
