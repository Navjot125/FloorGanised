import React from 'react';
import {View, Text, TextInput, StyleSheet} from 'react-native';
import {COLORS} from '../../utils/theme';
import {scale, verticalScale, moderateScale} from 'react-native-size-matters';

export default function CommonTextInput() {
  return (
    <View style={styles.inputContainer}>
      <TextInput
        style={styles.input}
        underlineColor="transparent"
        selectionColor={COLORS.primary}
        placeholder="Email"
        //   value={}
        onChangeText={val => {
        //   setEmail(val);
        //   setErrors({...error, email: ''});
        }}
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
        //   left={
        //     <TextInput.Icon
        //       style={styles.leftpad}
        //       icon={() => <EmailIcon />}
        //     />
        //   }
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
    width: '100%',
    borderRadius: 16,
    backgroundColor: 'transparent',
    borderWidth: 1,
    borderColor: COLORS.brgrey,
  },
});
