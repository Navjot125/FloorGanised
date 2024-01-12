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
import CommonModal from '../../../components/Modal/Modal';
import ResetSuccess from '../../../assets/images/ResetSuccess.png';
import Back from '../../../components/BackButton/Back';
const ResetPassword = () => {
  const [cPassword, setCPassword] = useState('');
  const [modalCondition, setModalCondition] = useState(false);
  const [newPassword, setNewPassword] = useState('');

  const onBackPress = () => {
    navigationRef.goBack();
  };
  const onPress = () => {
    setModalCondition(!modalCondition);
  };
  const onModalPress = () => {
    setModalCondition(!modalCondition),
      setTimeout(() => {
        navigationRef.reset({
          index: 0,
          routes: [{name: 'tabs'}],
        });
      }, 1000);
  };
  const title = 'Password Reset Successfully!';
  const description =
    'Your password has been reset successfully. Click on the below button to login with the new password. ';
  return (
    <View style={{flex: 1}}>
      <Back onPress={onBackPress} />
      <CommonBackground title={'Reset Password'} />
      <SafeAreaView />
      <ScrollView
        contentContainerStyle={{marginTop: height / 4}}
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
            onPress={onPress}
          />
        </View>
      </ScrollView>
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
      <CommonModal
        isVisible={modalCondition}
        onModalPress={onModalPress}
        onPress={onPress}
        img={ResetSuccess}
        title={title}
        description={description}
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
    elevation: 24,
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
