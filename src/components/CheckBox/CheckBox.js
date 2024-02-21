import {StyleSheet, Text, View} from 'react-native';
import React, {useState} from 'react';

const CheckBox = (onPress, status) => {
  return (
    <TouchableOpacity
      style={{height: 20, width: 20}}
      onPress={() => toggleStatus(Object.keys(selectedItems)[index])}>
      <Image
        style={{height: 20, width: 20}}
        source={
          checked
            ? require('../../assets/images/checked.png')
            : require('../../assets/images/unchecked.png')
        }
      />
    </TouchableOpacity>
  );
};

export default CheckBox;

const styles = StyleSheet.create({});
