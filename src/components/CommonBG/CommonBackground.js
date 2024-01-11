import {Image, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {moderateScale, scale, verticalScale} from 'react-native-size-matters';
import {height} from '../../assets/styles/styles';
import {COLORS} from '../../utils/theme';

const CommonBackground = () => {
  return (
    <View
      style={{
        height: height / 2.3,
        width: '100%',
        position: 'absolute',
        justifyContent: 'center',
        alignItems: 'center',
      }}>
      <Image
        style={{height: '100%', width: '100%', position: 'absolute'}}
        resizeMode="cover"
        source={require('../../assets/images/HeaderBg.png')}
      />
      <Text
        style={{
          color: COLORS.white,
          fontSize: 20,
          fontWeight: 500,
          marginTop: '30%',
        }}>
        FLOORGANISED
      </Text>
    </View>
  );
};

export default CommonBackground;

const styles = StyleSheet.create({});
