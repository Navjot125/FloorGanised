import React from 'react';
import {View, Text, StyleSheet, KeyboardAvoidingView} from 'react-native';
import {COLORS} from '../../utils/theme';
import {scale, verticalScale, moderateScale} from 'react-native-size-matters';
import {TextInput} from 'react-native-paper';

export default function CommonTextInput({
  placeholder,
  value,
  onChangeText,
  style,
  ...props
}) {
  return (
    <View style={[styles.inputContainer, style]}>
      {/* <View style={[styles.inputContainer]}> */}
      <TextInput
        {...props}
        style={styles.input}
        underlineColor="transparent"
        selectionColor={COLORS.primary}
        placeholder={placeholder}
        value={value}
        onChangeText={onChangeText}
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
        // left={
        //   <TextInput.Icon
        //     style={styles.leftpad}
        //     icon={() => <CloseEye />}
        //   />
        // }
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
  );
}

const styles = StyleSheet.create({
  input: {
    height: 62,
    backgroundColor: COLORS.white,
    fontSize: scale(14),
    // fontFamily: FONTS.PoppinsRegular,
    color: '#35454F',
    width: '100%',
    paddingHorizontal: 18,
  },
  leftpad: {
    paddingLeft: 10,
  },
  inputContainer: {
    justifyContent: 'center',
    overflow: 'hidden',
    position: 'relative',
    marginBottom: 2,
    width: '80%',
    borderRadius: 40,
    backgroundColor: 'transparent',
    borderWidth: 1,
    borderColor: COLORS.brgrey,
    alignSelf: 'center',
  },
});
