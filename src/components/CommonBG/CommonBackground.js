import {Image, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {moderateScale, scale, verticalScale} from 'react-native-size-matters';
import {height} from '../../assets/styles/styles';

const CommonBackground = () => {
  return (
    <View style={{height: height / 2.3, width: '100%', position: 'absolute',}}>
      <Image
        style={{height: '100%', width: '100%'}}
        resizeMode="cover"
        source={require('../../assets/images/HeaderBg.png')}
      />
    </View>
  );
};

export default CommonBackground;

const styles = StyleSheet.create({});
