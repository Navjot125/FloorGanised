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
import CommonModal from '../../../components/Modal/Modal';
import ResetSuccess from '../../../assets/images/ResetSuccess.png';
import Back from '../../../components/BackButton/Back';
import {scale} from 'react-native-size-matters';
import {useDispatch} from 'react-redux';
import * as Yup from 'yup';
import {resetPassword} from '../../../redux/actions/onBoardingAction';
import {useToast} from 'react-native-toast-notifications';
import FONTS from '../../../assets/styles/fonts';
const ResetPassword = ({route}) => {
  const unique_id = route.params?.data;
  const toast = useToast();
  const dispatch = useDispatch();
  const [cPassword, setCPassword] = useState();
  const [modalCondition, setModalCondition] = useState(false);
  const [newPassword, setNewPassword] = useState();
  const [error, setErrors] = useState();
  const [disableButton, setDisableButton] = useState(false);
  const onBackPress = () => {
    navigationRef.goBack();
  };

  const validationSchema = Yup.object().shape({
    newPassword: Yup.string()
      .required('New Password is required')
      .min(8, 'Password must be at least 8 characters'),
    cPassword: Yup.string()
      .required('Confirm Password is required')
      .oneOf([Yup.ref('newPassword'), null], 'Passwords must match'),
  });

  const handleResetPassword = async () => {
    try {
      setDisableButton(true);
      setTimeout(() => {
        setDisableButton(false);
      }, 4000);
      await validationSchema.validate(
        {newPassword, cPassword},
        {abortEarly: false},
      );
      setModalCondition(!modalCondition),
        (param = {
          data: {cPassword, unique_id},
          toastFun: (msg, type) => {
            toast.show(msg, {
              type: type,
              placement: 'bottom',
              duration: 4000,
              offset: 30,
              animationType: 'slide-in ',
            });
          },
        });
      dispatch(resetPassword(param));
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

  const onPress = () => {
    setModalCondition(!modalCondition);
  };
  const onModalPress = () => {
    setModalCondition(!modalCondition);
    // dispatch(resetPassword(data={cPassword,unique_id}))
    setTimeout(() => {
      // navigationRef.reset({
      //   index: 0,
      //   routes: [{name: 'tabs'}],
      // });
      navigationRef.navigate('Login');
    }, 1000);
  };
  const title = 'Password Reset Successfully!';
  const description =
    'Your password has been reset successfully. Click on the below button to login with the new password. ';
  return (
    <View style={{flex: 1, paddingTop: scale(110)}}>
      <CommonBackground title={'Reset Password'} />
      <SafeAreaView />
      <ScrollView
        contentContainerStyle={{
          paddingTop: Platform?.OS === 'android' ? height / 5.6 : height / 4.5,
          flexGrow: 1,
        }}
        automaticallyAdjustKeyboardInsets>
        <View style={styles.innerBox}>
          <Text
            style={{
              paddingHorizontal: 60,
              color: COLORS.secondry,
              paddingVertical: 40,
              // fontWeight: 500,
              fontSize: 14,
              lineHeight: 22,
              fontFamily: FONTS?.MontserratRegular,
            }}>
            Enter new password to reset.
          </Text>
          <View style={{height: '41%', justifyContent: 'space-between'}}>
            <CommonTextInput
              placeholder="New Password"
              value={newPassword}
              onChangeText={newText => setNewPassword(newText)}
            />
            <CommonTextInput
              placeholder="Confirm Password"
              value={cPassword}
              onChangeText={newText => setCPassword(newText)}
            />
          </View>
          <CommonButton
            style={styles.Button}
            title="Reset Password"
            disableButton={disableButton}
            onPress={handleResetPassword}
          />
        </View>
      </ScrollView>
      <Text
        style={{
          alignSelf: 'center',
          bottom: 30,
          position: 'absolute',
          fontFamily: FONTS?.MontserratRegular,
        }}>
        Back to
        <Text
          style={{fontFamily: FONTS?.MontserratSemiBold}}
          onPress={() => navigationRef.navigate('Login')}>
          {' '}
          Login
        </Text>
      </Text>
      <CommonModal
        isVisible={modalCondition}
        onModalPress={onModalPress}
        onPress={onPress}
        img={ResetSuccess}
        title={title}
        description={description}
        buttonTitle={'Login'}
      />
    </View>
  );
};

export default ResetPassword;

const styles = StyleSheet.create({
  innerBox: {
    height: height / 2.3,
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
    marginTop: '13%',
  },
});
