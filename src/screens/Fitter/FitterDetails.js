import {
  FlatList,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  SafeAreaView,
  ScrollView,
  Image,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {scale} from 'react-native-size-matters';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons';
import Feather from 'react-native-vector-icons/Feather';
import Header from '../../components/Header/Header';
import {COLORS} from '../../utils/theme';
import CommonButton from '../../components/CommonButton/CommonButton';
import {navigationRef} from '../../App';
const FitterDetail = () => {
  const [startFitting, setStartFitting] = useState(false);
  const onStart = () => {
    // navigationRef.navigate('Home');
    startFitting ? navigationRef.navigate('Home') : setStartFitting(true);
  };
  const style = {
    height: 24,
    width: 81,
    borderRadius: 17,
  };
  return (
    <View style={{flex: 1, backgroundColor: 'black'}}>
      <SafeAreaView />
      <Header title={'Details'} back={true} />
      <ScrollView
        contentContainerStyle={styles.container}
        showsVerticalScrollIndicator={false}
        //   style={styles.container}
      >
        <View style={styles.mainBox}>
          <View style={styles.userName}>
            <Text style={{fontWeight: 700, fontSize: 16}}>Desirae Bergson</Text>
            <Text style={{fontWeight: 700, fontSize: 16}}>$150</Text>
          </View>
          <View style={styles.details}>
            <Icon
              name="office-building-outline"
              size={20}
              color={COLORS.secondry}
            />
            <Text style={{fontSize: 12, fontWeight: 500, left: scale(10)}}>
              Exela Movers Company
            </Text>
          </View>
          <View style={styles.details}>
            <SimpleLineIcons
              name="location-pin"
              size={20}
              color={COLORS.secondry}
            />
            <Text style={{fontSize: 12, fontWeight: 500, left: scale(10)}}>
              Brewster Rd, Newark, NJ 07, United States
            </Text>
          </View>
          <View style={styles.details}>
            <Feather name="phone" size={20} color={COLORS.secondry} />
            <Text style={{fontSize: 12, fontWeight: 500, left: scale(10)}}>
              +1 74 392394984
            </Text>
          </View>
          <View style={styles.details}>
            <Feather name="mail" size={20} color={COLORS.secondry} />
            <Text style={{fontSize: 12, fontWeight: 500, left: scale(10)}}>
              exelamoverscompany@gmail.com
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
              Lorem ipsum dolor sit amet, consectetur aute adipiscing elit, sed
              do eiusmod tempor aute a incididunt ut labore et dolore magna
              aliqua. Ut enim ad minim veniam, quis nostrud auteo.
            </Text>
          </View>
        </View>
        <View style={[styles.mainBox, {marginTop: 20}]}>
          <View style={styles.userName}>
            <Text style={{fontWeight: 700, fontSize: 16}}>
              Measuring Details
            </Text>
            <TouchableOpacity
              onPress={() => {
                navigationRef.navigate(
                  'MeasuringQuestionnaire',
                  (button = true),
                );
              }}
              style={{
                height: 24,
                width: 81,
                backgroundColor: COLORS.primary,
                borderRadius: 17,
                justifyContent: 'center',
                alignItems: 'center',
              }}>
              <Text style={{fontSize: 10, fontWeight: 600}}>File Access</Text>
            </TouchableOpacity>
          </View>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              paddingVertical: 15,
            }}>
            <Text style={{fontSize: 12, fontWeight: 600}}>Rooms</Text>
            <Text
              style={{
                fontSize: 12,
                fontWeight: 400,
                width: 70,
                textAlign: 'right',
              }}>
              2 Rooms
            </Text>
          </View>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              paddingVertical: 15,
            }}>
            <Text style={{fontSize: 12, fontWeight: 600}}>Flooring Type</Text>
            <Text
              style={{
                fontSize: 12,
                fontWeight: 400,
                width: 70,
                textAlign: 'right',
              }}>
              Carpets
            </Text>
          </View>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              paddingVertical: 15,
            }}>
            <Text style={{fontSize: 12, fontWeight: 600}}>
              Flooring Choice & Colour
            </Text>
            <Text
              style={{
                fontSize: 12,
                fontWeight: 400,
                width: 70,
                textAlign: 'right',
              }}>
              Wooden Light Brown
            </Text>
          </View>
          <View
            style={{
              paddingVertical: 15,
            }}>
            <Text style={{fontSize: 12, fontWeight: 600}}>
              Measurement of room
            </Text>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                marginTop: 20,
              }}>
              <Image
                style={{height: 56, width: 80, borderRadius: 10}}
                resizeMode="cover"
                source={require('../../assets/images/profile1.jpg')}
              />
              <Image
                style={{height: 56, width: 80, borderRadius: 10}}
                resizeMode="cover"
                source={require('../../assets/images/profile1.jpg')}
              />
              <Image
                style={{height: 56, width: 80, borderRadius: 10}}
                resizeMode="cover"
                source={require('../../assets/images/profile1.jpg')}
              />
            </View>
          </View>
          <View style={{marginVertical: 10}}>
            <Text style={{fontSize: 12, fontWeight: 600, marginBottom: 10}}>
              Join in floor
            </Text>
            <Text style={{fontSize: 12, fontWeight: 400, lineHeight: 20}}>
              <Text style={{fontSize: 12, fontWeight: 600}}>Notes </Text>: Lorem
              ipsum dolor sit amet, consectet aute adipiscing elit, sed do
              eiusmod tamed the aute a incididunt.
            </Text>
          </View>
          <View style={{marginVertical: 10}}>
            <Text style={{fontSize: 12, fontWeight: 600, marginBottom: 10}}>
              Gripper Lengths
            </Text>
            <Text style={{fontSize: 12, fontWeight: 400, lineHeight: 20}}>
              Lorem ipsum dolor sit amet, consectetur aute adipiscing elit, sed
              do eiusmod tamed the aute.
            </Text>
          </View>
          <View style={{marginVertical: 10}}>
            <Text style={{fontSize: 12, fontWeight: 600, marginBottom: 10}}>
              Underlay
            </Text>
            <Text style={{fontSize: 12, fontWeight: 400, lineHeight: 20}}>
              Lorem ipsum dolor sit amet, consectetur aute adipiscing elit, sed
              do eiusmod tamed the aute.
            </Text>
          </View>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              paddingVertical: 15,
            }}>
            <Text style={{fontSize: 12, fontWeight: 600}}>Door Bars</Text>
            <Text
              style={{
                fontSize: 12,
                fontWeight: 400,
                width: 70,
                textAlign: 'right',
              }}>
              Silver
            </Text>
          </View>
          <View style={{marginVertical: 10}}>
            <Text style={{fontSize: 12, fontWeight: 600, marginBottom: 10}}>
              Uplift and waste service
            </Text>
            <Text style={{fontSize: 12, fontWeight: 400, lineHeight: 20}}>
              Lorem ipsum dolor sit amet, consectetur aute adipiscing elit, sed
              do eiusmod tamed the aute.
            </Text>
          </View>
          <View
            style={{
              paddingVertical: 15,
            }}>
            <Text style={{fontSize: 12, fontWeight: 600}}>Furniture</Text>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                marginTop: 20,
              }}>
              <Image
                style={{height: 56, width: 80, borderRadius: 10}}
                resizeMode="cover"
                source={require('../../assets/images/profile1.jpg')}
              />
              <Image
                style={{height: 56, width: 80, borderRadius: 10}}
                resizeMode="cover"
                source={require('../../assets/images/profile1.jpg')}
              />
              <Image
                style={{height: 56, width: 80, borderRadius: 10}}
                resizeMode="cover"
                source={require('../../assets/images/profile1.jpg')}
              />
            </View>
          </View>
          <View style={{marginVertical: 10}}>
            <Text style={{fontSize: 12, fontWeight: 400, lineHeight: 20}}>
              <Text style={{fontSize: 12, fontWeight: 600}}>Notes </Text>: Lorem
              ipsum dolor sit amet, consectet aute adipiscing elit, sed do
              eiusmod tamed the aute a incididunt.
            </Text>
          </View>
          <View style={{marginVertical: 10}}>
            <Text style={{fontSize: 12, fontWeight: 600, marginBottom: 10}}>
              Floor Preparation
            </Text>
            <Text style={{fontSize: 12, fontWeight: 400, lineHeight: 20}}>
              Lorem ipsum dolor sit amet, consectet aute adipiscing elit, sed do
              eiusmod tamed the aute a incididunt.
            </Text>
          </View>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              paddingVertical: 15,
            }}>
            <Text style={{fontSize: 12, fontWeight: 600}}>Doors to cut</Text>
            <Text
              style={{
                fontSize: 12,
                fontWeight: 400,
                width: 70,
                textAlign: 'right',
              }}>
              10
            </Text>
          </View>
          <View style={{marginVertical: 10}}>
            <Text style={{fontSize: 12, fontWeight: 600, marginBottom: 10}}>
              Floor Plan
            </Text>
            <Text style={{fontSize: 12, fontWeight: 400, lineHeight: 20}}>
              Lorem ipsum dolor sit amet, consectetur aute adipiscing elit, sed
              do.
            </Text>
          </View>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              paddingVertical: 15,
            }}>
            <Text style={{fontSize: 12, fontWeight: 600}}>Minimum Charge</Text>
            <Text
              style={{
                fontSize: 12,
                fontWeight: 400,
                width: 70,
                textAlign: 'right',
              }}>
              $150
            </Text>
          </View>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              paddingVertical: 15,
            }}>
            <Text style={{fontSize: 12, fontWeight: 600}}>
              How many fitters needed
            </Text>
            <Text
              style={{
                fontSize: 12,
                fontWeight: 400,
                width: 70,
                textAlign: 'right',
              }}>
              1 Fitter
            </Text>
          </View>
          <View style={{marginVertical: 10}}>
            <Text style={{fontSize: 12, fontWeight: 600, marginBottom: 10}}>
              Additional Notes
            </Text>
            <Text style={{fontSize: 12, fontWeight: 400, lineHeight: 20}}>
              Lorem ipsum dolor sit amet, consectetur aute adipiscing elit, sed
              do eiusmod tamed the aute a incididunt.
            </Text>
          </View>
        </View>
        <View style={{flex: 1, justifyContent: 'flex-end', marginVertical: 25}}>
          <CommonButton
            onPress={onStart}
            title={startFitting ? 'Job Complete' : 'Start Measuring'}
          />
        </View>
      </ScrollView>
    </View>
  );
};

export default FitterDetail;

const styles = StyleSheet.create({
  container: {
    backgroundColor: COLORS?.white,
    borderTopRightRadius: scale(20),
    borderTopLeftRadius: scale(20),
    padding: 20,
    flexGrow: 1,
  },
  mainBox: {
    // height: scale(359),
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
    paddingBottom: 20,
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
