import {SafeAreaView, StyleSheet, Text, TextInput, View} from 'react-native';
import React from 'react';
import {scale} from 'react-native-size-matters';
import {COLORS} from '../utils/theme';
import Header from '../components/Header/Header';
import CommonButton from '../components/CommonButton/CommonButton';
import {navigationRef} from '../../App';

const ContactUs = () => {
  const onPress = () => {
    navigationRef.navigate('Home');
  };
  const style = {
    bottom: 20,
  };
  return (
    <View style={{flex: 1, backgroundColor: 'black'}}>
      <SafeAreaView />
      <Header title={'Contact Us'} back={true} />
      <View style={styles.container}>
        <TextInput
          style={{
            height: 137,
            borderWidth: 1,
            padding: 20,
            borderColor: COLORS.grey,
            borderRadius: 16,
            paddingTop: 15,
          }}
          multiline={true}
          placeholder="Write Your Message"
        />
        <CommonButton title={'Submit'} onPress={onPress} style={style} />
      </View>
    </View>
  );
};
// style, title, onPress

export default ContactUs;

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
