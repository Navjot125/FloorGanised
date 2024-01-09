import React from 'react';
import {View, Text, Image} from 'react-native';

export default function Back() {
  return (
    <View
      style={{
        height: 32,
        width: 32,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'white',
        borderRadius: 6,
        left:15
      }}>
      <Image
        style={{height: 15, width: 10, left:-2}}
        resizeMode="contain"
        source={require('../../assets/images/back.png')}
      />
    </View>
  );
}
