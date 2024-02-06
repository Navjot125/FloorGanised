import {
  FlatList,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  SafeAreaView,
} from 'react-native';
import React, {useEffect} from 'react';
import {height, width} from '../../assets/styles/styles';
import Header from '../../components/Header/Header';
import {COLORS} from '../../utils/theme';
import {scale} from 'react-native-size-matters';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons';
import Feather from 'react-native-vector-icons/Feather';
import CommonButton from '../../components/CommonButton/CommonButton';
import {navigationRef} from '../../App';
const Detail = ({route}) => {
  const {responseData} = route.params;
  const onStart = () => {
    navigationRef.navigate('MeasuringQuestionnaire');
  };
  return (
    <View style={{flex: 1, backgroundColor: 'black'}}>
      <SafeAreaView />
      <Header title={'Details'} back={true} />
      <View style={styles.container}>
        <View style={styles.mainBox}>
          <View style={styles.userName}>
            <Text style={{fontWeight: 700, fontSize: 16}}>
              {responseData?.customer_id?.name}
            </Text>
            {/* <Text style={{fontWeight: 700, fontSize: 16}}>$150</Text> */}
          </View>
          <View style={styles.details}>
            <Icon
              name="office-building-outline"
              size={20}
              color={COLORS.secondry}
            />
            <Text style={{fontSize: 12, fontWeight: 500, left: scale(10)}}>
              {responseData?.referal}
            </Text>
          </View>
          <View style={styles.details}>
            <SimpleLineIcons
              name="location-pin"
              size={20}
              color={COLORS.secondry}
            />
            <Text style={{fontSize: 12, fontWeight: 500, left: scale(10)}}>
              {responseData?.address}
            </Text>
          </View>
          <View style={styles.details}>
            <Feather name="phone" size={20} color={COLORS.secondry} />
            <Text style={{fontSize: 12, fontWeight: 500, left: scale(10)}}>
              {responseData?.customer_id?.phone_number}
            </Text>
          </View>
          <View style={styles.details}>
            <Feather name="mail" size={20} color={COLORS.secondry} />
            <Text style={{fontSize: 12, fontWeight: 500, left: scale(10)}}>
              {responseData?.customer_id?.email}
            </Text>
          </View>
          <View style={{marginTop: 20}}>
            <Text style={{fontSize: 14, fontWeight: 600}}>Notes</Text>
            <Text
              style={{
                fontSize: 12,
                fontWeight: 400,
                marginTop: 10,
                lineHeight: 18,
              }}>
              {responseData?.notes}
            </Text>
          </View>
        </View>
        <View style={{flex: 1, justifyContent: 'flex-end', bottom: 25}}>
          <CommonButton onPress={onStart} title={'Start Measuring'} />
        </View>
      </View>
    </View>
  );
};

export default Detail;

const styles = StyleSheet.create({
  container: {
    backgroundColor: COLORS?.white,
    flex: 1,
    borderTopRightRadius: scale(20),
    borderTopLeftRadius: scale(20),
    padding: 20,
  },
  mainBox: {
    height: scale(359),
    backgroundColor: COLORS.white,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 6,
    },
    shadowOpacity: 0.1,
    shadowRadius: 11.27,
    elevation: 14,
    borderRadius: 16,
    // alignItems: 'center',
    padding: 10,
    paddingHorizontal: 30,
  },
  userName: {
    height: scale(50),
    borderBottomColor: 'rgba(0, 0, 0, 0.1)',
    // width: '90%',
    borderBottomWidth: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  details: {
    flexDirection: 'row',
    height: scale(30),
    alignItems: 'center',
  },
});
