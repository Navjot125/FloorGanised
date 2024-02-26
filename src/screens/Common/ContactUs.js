import {
  Keyboard,
  SafeAreaView,
  StyleSheet,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import React, {useState} from 'react';
import {scale} from 'react-native-size-matters';
import {COLORS} from '../../utils/theme';
import Header from '../../components/Header/Header';
import CommonButton from '../../components/CommonButton/CommonButton';
import {useDispatch} from 'react-redux';
import {cmsRequest} from '../../redux/actions/cmsAction';
import {useToast} from 'react-native-toast-notifications';
import {TextInput} from 'react-native-paper';

const ContactUs = () => {
  const [message, setMessage] = useState();
  const [token, setToken] = useState();
  const toast = useToast();
  const dispatch = useDispatch();
  const onPress = async () => {
    // const token = await AsyncStorage.getItem('token');
    param = {
      message,
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
    dispatch(cmsRequest(param));
  };
  const style = {
    bottom: 20,
  };
  return (
    <View style={{flex: 1, backgroundColor: 'black'}}>
      <SafeAreaView />
      <Header title={'Contact Us'} back={true} />
      <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
        <View style={styles.container}>
          <View style={[styles.inputContainer, style]}>
            <TextInput
              style={styles.input}
              textAlignVertical="top"
              underlineColor="transparent"
              selectionColor={COLORS.primary}
              placeholder="Write Your Message"
              value={message}
              onChangeText={setMessage}
              multiline
              textAlign="center"
              verticalAlign="top"
              placeholderTextColor={'rgba(0,0,0,0.5)'}
              ref={ref =>
                ref &&
                ref.setNativeProps({
                  style: {
                    // fontFamily: FONTS.PoppinsRegular,
                    color: COLORS.black,
                  },
                })
              }
              theme={{
                colors: {
                  primary: 'transparent',
                  text: COLORS.black,
                },
                fonts: {
                  regular: {
                    // fontFamily: FONTS.PoppinsRegular,
                  },
                },
              }}
            />
          </View>
          <CommonButton title={'Submit'} onPress={onPress} style={style} />
        </View>
      </TouchableWithoutFeedback>
    </View>
  );
};

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
  input: {
    backgroundColor: COLORS.white,
    fontSize: scale(14),
    // fontFamily: FONTS.PoppinsRegular,
    color: '#35454F',
  },
  inputContainer: {
    height: scale(137),
    overflow: 'hidden',
    borderRadius: 16,
    borderWidth: 1,
    borderColor: COLORS.brgrey,
    marginTop: scale(20),
  },
});
