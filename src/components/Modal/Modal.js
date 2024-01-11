import React from 'react';
import {
  View,
  Text,
  StatusBar,
  ImageBackground,
  TouchableOpacity,
  Image,
  SafeAreaView,
  StyleSheet,
} from 'react-native';
import Modal from 'react-native-modal';
import {COLORS} from '../../utils/theme';
// import {styles} from '../../assets/styles/styles';

export default function CommonModal({}) {
  return (
    <Modal
      propagateSwipe={true}
      //   isVisible={isModalVisible}
      isVisible={true}
      onBackdropPress={() => {
        // setModalVisible(false);
      }}
      animationInTiming={700}
      style={[styles.mainmodal]}>
      <View
        style={[
          styles.center,
          {
            borderRadius: 20,
            paddingHorizontal: 20,
            backgroundColor: COLORS.white,
          },
        ]}>
        {/* <Image
          source={require('../../assets/images/Frame.png')}
          style={{height: '40%'}}
          resizeMode="contain"
        /> */}
        <Text style={[styles.modalheading, {textAlign: 'center'}]}>
          Congratulations!
        </Text>
        <Text style={styles.modalsubheading}>
          You password has been reset successfully. Kindly re-login to your
          account with new password.
        </Text>

        <TouchableOpacity
          style={styles.btnlogin2}
          //   onPress={() => navigation.navigate('Login')}
        >
          <Text style={styles.buttonText}>Login</Text>
        </TouchableOpacity>
      </View>
    </Modal>
  );
}
const styles = StyleSheet.create({
  mainmodal: {
    //   padding:0,
  },
  mainmodal2: {
    marginVertical: 0,
    padding: 0,
    marginLeft: 0,
    marginRight: 0,
  },
  center: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalheading: {
    // fontFamily: FONTS.PoppinsBold,
    color: '#101010',
    fontSize: 20,
    marginTop: 30,
    marginBottom: 15,
    textAlign: 'center',
  },
  modalsubheading: {
    // fontFamily: FONTS.MontserratRegular,
    color: COLORS.primary,
    fontSize: 14,
    textAlign: 'center',
    maxWidth: 340,
    lineHeight: 22,
  },
  btnlogin2: {
    height: 60,
    backgroundColor: COLORS.primary,
    alignItems: 'center',
    // flexDirection: 'column',
    justifyContent: 'center',
    minWidth: 154,
    // paddingHorizontal: moderateScale(20),
    borderRadius: 16,
    marginTop: 30,
  },
});
