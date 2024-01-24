import {
  FlatList,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Platform,
} from 'react-native';
import React, {useEffect} from 'react';
import {height, width} from '../../assets/styles/styles';
import Back from '../BackButton/Back';
import {scale} from 'react-native-size-matters';
import {COLORS} from '../../utils/theme';
import {navigationRef} from '../../App';

const Header = ({title, back}) => {
  const onPress = () => {
    navigationRef.goBack();
  };
  return (
    <View
      style={{
        backgroundColor: COLORS.black,
        height: 50,
        width: '100%',
        flexDirection: 'row',
        paddingHorizontal: 15,
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 20,
        marginTop: Platform?.OS === 'android' ? scale(15) : 0,
      }}>
      {back ? (
        <View
          style={{
            minWidth: scale(40),
            height: '100%',
            justifyContent: 'center',
          }}>
          <Back onPress={onPress} />
        </View>
      ) : null}
      <View style={{flex: 1, paddingLeft: 10}}>
        <Text style={{color: COLORS.white, fontSize: 20, fontWeight: 600}}>
          {title}
        </Text>
      </View>
      <View
        style={{
          minWidth: scale(40),
          height: '100%',
          justifyContent: 'center',
        }}></View>
    </View>
  );
};

export default Header;

const styles = StyleSheet.create({});
