import {Image, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {moderateScale, scale, verticalScale} from 'react-native-size-matters';
import {height} from '../../assets/styles/styles';
import {COLORS} from '../../utils/theme';
import {navigationRef} from '../../../App';
import Back from '../BackButton/Back';

const CommonBackground = ({back, title}) => {
  const onBackPress = () => {
    navigationRef.goBack();
  };
  const style = {
    left: 15,
    zIndex: 3,
    top: '21%',
    position: 'absolute',
  };
  return (
    <View
      style={{
        height: height / 2.3,
        width: '100%',
        position: 'absolute',
        justifyContent: 'center',
        alignItems: 'center',
      }}>
      {!back ? <Back style={style} onPress={onBackPress} /> : null}
      <Image
        style={{height: '100%', width: '100%', position: 'absolute'}}
        resizeMode="cover"
        source={require('../../assets/images/HeaderBg.png')}
      />
      <Text
        style={{
          color: COLORS.white,
          fontSize: 24,
          fontWeight: 700,
          bottom: 30,
        }}>
        {title}
      </Text>
      <Text
        style={{
          color: COLORS.white,
          fontSize: 20,
          fontWeight: 500,
          marginTop: '25%',
        }}>
        FLOORGANISED
      </Text>
    </View>
  );
};

export default CommonBackground;

const styles = StyleSheet.create({});
