import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React, {useState} from 'react';

const CheckBox = ({value, onPress, setChecked, checked}) => {
  return (
    <TouchableOpacity
      style={{
        height: 20,
        width: 20,
        // justifyContent: 'flex-start',
        // alignItems:'flex-start',
      }}
      // onPress={() => toggleStatus(Object.keys(selectedItems)[index])}>
      // onPress={() => {
      //   setChecked(!checked);
      // }}
      onPress={() => onPress()}>
      <Image
        style={{height: 20, width: 20}}
        source={
          value
            ? require('../../assets/images/checked.png')
            : require('../../assets/images/unchecked.png')
        }
      />
    </TouchableOpacity>
  );
};

export default CheckBox;

const styles = StyleSheet.create({});
