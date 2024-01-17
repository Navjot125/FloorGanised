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
import {width} from '../../assets/styles/styles';
// import {styles} from '../../assets/styles/styles';
export default function CommonModal({
  isVisible,
  onPress,
  img,
  title,
  description,
  onModalPress,
  buttonTitle
}) {
  return (
    <Modal
      propagateSwipe={true}
      isVisible={isVisible}
      onBackdropPress={() => {
        onPress();
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
        <Image source={img} style={{height: '40%'}} resizeMode="contain" />
        <Text style={[styles.modalheading, {textAlign: 'center'}]}>
          {title}
        </Text>
        <Text style={styles.modalsubheading}>{description}</Text>

        <TouchableOpacity style={styles.btnlogin2} onPress={onModalPress}>
          <Text style={styles.buttonText}>{buttonTitle}</Text>
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
    fontWeight: 700,
  },
  modalsubheading: {
    // fontFamily: FONTS.MontserratRegular,
    color: COLORS.modalDes,
    fontSize: 14,
    textAlign: 'center',
    maxWidth: 340,
    lineHeight: 22,
    fontWeight: 400,
  },
  btnlogin2: {
    height: 60,
    backgroundColor: COLORS.primary,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 40,
    marginTop: 30,
    width: width / 1.5,
  },
  buttonText: {
    fontWeight: 600,
    fontSize: 16,
  },
});
