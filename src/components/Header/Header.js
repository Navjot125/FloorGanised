import {
  FlatList,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Platform,
  Image,
} from 'react-native';
import React, {useEffect} from 'react';
import {height, width} from '../../assets/styles/styles';
import Back from '../BackButton/Back';
import {scale} from 'react-native-size-matters';
import {COLORS} from '../../utils/theme';
import {navigationRef} from '../../App';
import {useSelector} from 'react-redux';

const Header = ({title, back, profileDetail}) => {
  const userName = useSelector(
    state => state?.onBoardingreducer?.userData?.name,
  );
  // console.log(userName,'profileDetail');
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
      {profileDetail && (
        <View
          style={{
            minWidth: scale(60),
            height: '100%',
            justifyContent: 'center',
            flexDirection: 'row',
            alignItems: 'center',
          }}>
          <Text style={{fontSize: 14, fontWeight: 400, color: COLORS.white}}>
            Hey, {userName}
          </Text>
          <Image
            style={{height: 20, width: 20, marginLeft: 5}}
            source={require('../../assets/images/profile.png')}
          />
        </View>
      )}
    </View>
  );
};

export default Header;

const styles = StyleSheet.create({});
