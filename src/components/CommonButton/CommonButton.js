import React from 'react';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import {COLORS} from '../../utils/theme';
import {scale, verticalScale, moderateScale} from 'react-native-size-matters';
import CustomLoader from '../CustomLoader/CustomLoader';
import {useSelector} from 'react-redux';
import FONTS from '../../assets/styles/fonts';

export default function CommonButton({style, title, onPress, disableButton}) {
  const loader = useSelector(state => state?.loaderReducer?.loader);
  return (
    <View style={[style, {justifyContent: 'center', alignItems: 'center'}]}>
      <TouchableOpacity
        disabled={loader || disableButton}
        style={styles.btnlogin}
        onPress={onPress}>
        {loader ? (
          <CustomLoader />
        ) : (
          <Text style={styles.buttonText}>{title}</Text>
        )}
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
    width: '82%',
    paddingHorizontal: moderateScale(20),
    borderRadius: 40,
  },

  buttonText: {
    fontFamily: FONTS?.MontserratSemiBold,
    color: COLORS.black,
    fontSize: scale(16),
  },
});
