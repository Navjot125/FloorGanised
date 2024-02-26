import {Image, SafeAreaView, StyleSheet, Text, View} from 'react-native';
import React, {useState} from 'react';
import {scale} from 'react-native-size-matters';
import {COLORS} from '../../utils/theme';
import Header from '../../components/Header/Header';
import CommonTextInput from '../../components/Input/InputBox';
import CommonButton from '../../components/CommonButton/CommonButton';
import {navigationRef} from '../../App';
import {useDispatch, useSelector} from 'react-redux';
import {updateProfileRequest} from '../../redux/actions/profileAction';
import { useToast } from 'react-native-toast-notifications';

const ManageProfile = () => {
  const dispatch = useDispatch();
  const userData = useSelector(state => state?.onBoardingreducer?.userData);
  const [name, setName] = useState();
  const toast = useToast()
  const [email, setEmail] = useState();
  const style = {
    width: '100%',
    marginTop: 25,
  };
  const buttonStyle = {
    marginBottom: 25,
  };
  const onPress = () => {
    const param = {
      name, email,
      toastFun: (msg, type) => {
        toast.show(msg, {
          type: type,
          placement: 'bottom',
          duration: 4000,
          offset: 30,
          animationType: 'slide-in ',
        });
      },
    }
    dispatch(updateProfileRequest((param)));
  };
  return (
    <View style={{flex: 1, backgroundColor: 'black'}}>
      <SafeAreaView />
      <Header title={'Manage Profile'} back={true} />
      <View style={styles.container}>
        <View>
          <View
            style={{
              alignItems: 'center',
              paddingVertical: 30,
            }}>
            <Image
              style={{height: 66, width: 66}}
              resizeMode="contain"
              source={require('../../assets/images/profile.png')}
            />
            <Text style={{fontWeight: 600, fontSize: 16, marginTop: 10}}>
              {userData?.name}
            </Text>
          </View>
          <CommonTextInput
            placeholder={'Full Name'}
            value={name}
            onChangeText={newText => setName(newText)}
            style={style}
          />
          <CommonTextInput
            placeholder={'Email ( Username )'}
            value={email}
            keyboardType="email-address"
            onChangeText={newText => setEmail(newText)}
            style={style}
          />
        </View>
        <CommonButton style={buttonStyle} title={'Save'} onPress={onPress} />
      </View>
    </View>
  );
};
// style, title, onPress

export default ManageProfile;

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
