import React from 'react';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import { COLORS } from '../../utils/theme';
import { scale, verticalScale, moderateScale } from 'react-native-size-matters';

export default function CommonButton() {
  return (
    <View style={{justifyContent:'center', alignItems:'center'}} >
      <TouchableOpacity style={styles.btnlogin} 
    //   onPress={handleResetpass}
      >
        <Text style={styles.buttonText}>Reset Password</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  btnlogin: {
    height: 56,
    backgroundColor: COLORS.primary,
    alignItems: 'center',
    flexDirection: 'column',
    justifyContent: 'center',
    // minWidth: 235,
    width:'82%',
    paddingHorizontal: moderateScale(20),
    borderRadius: 40,
  },

  buttonText: {
    // fontFamily: FONTS.PoppinsMedium,
    color: COLORS.black,
    fontSize: scale(16),
  },
});
