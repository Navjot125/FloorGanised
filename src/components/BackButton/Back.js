import React from 'react';
import {View, Image, StyleSheet, TouchableOpacity} from 'react-native';
import {navigationRef} from '../../App';

export default function Back({onPress, style}) {
  return (
    <TouchableOpacity onPress={onPress} style={[styles.container, style]}>
      <Image
        style={{height: 15, width: 10, left: -2}}
        resizeMode="contain"
        source={require('../../assets/images/back.png')}
      />
    </TouchableOpacity>
  );
}
const styles = StyleSheet.create({
  container: {
    height: 35,
    width: 35,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
    borderRadius: 6,
    // left: 15,
    // zIndex: 3,
    // top: '9%',
    // top: '60%',
    // position: 'absolute',
  },
});
