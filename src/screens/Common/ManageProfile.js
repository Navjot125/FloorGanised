import {Image, SafeAreaView, StyleSheet, Text, View} from 'react-native';
import React, {useState} from 'react';
import {scale} from 'react-native-size-matters';
import {COLORS} from '../../utils/theme';
import Header from '../../components/Header/Header';
import CommonTextInput from '../../components/Input/InputBox';
import CommonButton from '../../components/CommonButton/CommonButton';
import {navigationRef} from '../../../App';

const ManageProfile = () => {
  const [name, setName] = useState();
  const [email, setEmail] = useState();
  const style = {
    width: '100%',
    marginTop: 25,
  };
  const buttonStyle = {
    marginBottom: 25,
  };
  const onPress = () => {
    navigationRef.navigate('Profile');
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
              John Watson
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
