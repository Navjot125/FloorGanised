import {SafeAreaView, StyleSheet, Text, View} from 'react-native';
import React, {useState} from 'react';
import Header from '../../components/Header/Header';
import {scale} from 'react-native-size-matters';
import {COLORS} from '../../utils/theme';
import CommonTextInput from '../../components/Input/InputBox';
import CommonButton from '../../components/CommonButton/CommonButton';
import {useDispatch, useSelector} from 'react-redux';
import {navigationRef} from '../../App';
import {updatePasswordRequest} from '../../redux/actions/profileAction';
import {useToast} from 'react-native-toast-notifications';
import * as Yup from 'yup';
import { TextInput } from 'react-native-paper';

const ChangePassword = () => {
  const dispatch = useDispatch();
  const userData = useSelector(state => state?.userData?.data);
  const screen = userData?.role === 'Surveyor' ? 'Main' : 'Fitter';
  const toast = useToast();
  const [currentPassword, setCurrentPassword] = useState();
  const [password, setPassword] = useState();
  const [confirmPassword, setConfirmPassword] = useState();
  const [error, setErrors] = useState();
  const [hidePass, setHidePass] = useState(true);
  const [hideCPass, setHideCPass] = useState(true);
  const [hideNewPass, setHideNewPass] = useState(true);
  const validationSchema = Yup.object().shape({
    currentPassword: Yup.string()
      .required('Current Password is required')
      .min(8, 'Password must be at least 8 characters'),
    password: Yup.string()
      .required('New Password is required')
      .min(8, 'Password must be at least 8 characters'),
    confirmPassword: Yup.string()
      .required('Confirm Password is required')
      .oneOf([Yup.ref('password'), null], 'Passwords must match'),
  });
  const style = {
    width: '100%',
    marginTop: 25,
  };
  const buttonStyle = {
    marginBottom: 25,
  };

  const handleChangePassword = async () => {
    try {
      await validationSchema.validate(
        {currentPassword, password, confirmPassword},
        {abortEarly: false},
      );
      const param = {
        data: {old_password: currentPassword, new_password: password},
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
      dispatch(updatePasswordRequest(param));
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
    <View style={{flex: 1, backgroundColor: 'black'}}>
      <SafeAreaView />
      <Header title={'Change Password'} back={true} />
      <View style={styles.container}>
        <View>
          <CommonTextInput
            placeholder={'Current Password'}
            value={currentPassword}
            onChangeText={newText => setCurrentPassword(newText)}
            secureTextEntry={hidePass ? true : false}
            style={style}
            right={
              <TextInput.Icon
                onPress={() => setHidePass(!hidePass)}
                style={styles.rightpad}
                icon={hidePass ? 'eye-off' : 'eye'}
                size={20}
                iconColor={COLORS.grey}
              />
            }
          />
          <CommonTextInput
            placeholder={'Password'}
            value={password}
            onChangeText={newText => setPassword(newText)}
            secureTextEntry={hideNewPass ? true : false}
            style={style}
            right={
              <TextInput.Icon
                onPress={() => setHideNewPass(!hideNewPass)}
                style={styles.rightpad}
                icon={hideNewPass ? 'eye-off' : 'eye'}
                size={20}
                iconColor={COLORS.grey}
              />
            }
          />
          <CommonTextInput
            placeholder={'Confirm Password'}
            value={confirmPassword}
            secureTextEntry={hideCPass ? true : false}
            onChangeText={newText => setConfirmPassword(newText)}
            style={style}
            right={
              <TextInput.Icon
                onPress={() => setHideCPass(!hideCPass)}
                style={styles.rightpad}
                icon={hideCPass ? 'eye-off' : 'eye'}
                size={20}
                iconColor={COLORS.grey}
              />
            }
          />
        </View>
        <CommonButton
          style={buttonStyle}
          title={'Save'}
          onPress={handleChangePassword}
        />
      </View>
    </View>
  );
};

export default ChangePassword;

const styles = StyleSheet.create({
  container: {
    backgroundColor: COLORS?.white,
    flex: 1,
    borderTopRightRadius: scale(20),
    borderTopLeftRadius: scale(20),
    padding: 20,
    justifyContent: 'space-between',
  },
});
