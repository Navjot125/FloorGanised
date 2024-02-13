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

const ChangePassword = () => {
  const dispatch = useDispatch();
  const userData = useSelector(state => state?.userData?.data);
  const screen = userData?.role === 'Surveyor' ? 'Main' : 'Fitter';
  const [currentPassword, setCurrentPassword] = useState();
  const [password, setPassword] = useState();
  const [confirmPassword, setConfirmPassword] = useState();
  const style = {
    width: '100%',
    marginTop: 25,
  };
  const buttonStyle = {
    marginBottom: 25,
  };
  const onPress = () => {
    dispatch(
      updatePasswordRequest(
        (data = {old_password: currentPassword, new_password: password}),
      ),
    );
    // navigationRef.navigate('Profile');
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
            style={style}
          />
          <CommonTextInput
            placeholder={'Password'}
            value={password}
            onChangeText={newText => setPassword(newText)}
            style={style}
          />
          <CommonTextInput
            placeholder={'Confirm Password'}
            value={confirmPassword}
            onChangeText={newText => setConfirmPassword(newText)}
            style={style}
          />
        </View>
        <CommonButton style={buttonStyle} title={'Save'} onPress={onPress} />
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
