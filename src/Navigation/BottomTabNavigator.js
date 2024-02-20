import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  Platform,
  Dimensions,
  TouchableOpacity,
} from 'react-native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import Home from '../screens/Tabs/Home';
import Notifications from '../screens/Tabs/Notifications';
import History from '../screens/Tabs/History';
import Profile from '../screens/Tabs/Profile';
import {COLORS} from '../utils/theme';
import {useDispatch, useSelector} from 'react-redux';
import {setSelecteddate, setdate} from '../redux/reducers/Dates';
import {dateListing} from '../utils/Dates/DateLimit';
import {setDate, setSelectedDateReducer} from '../redux/actions/DateAction';
import {scale} from 'react-native-size-matters';
const moment = require('moment');
const Tab = createBottomTabNavigator();

const BottomTabNavigator = ({}) => {
  const [selectedDate, setSelectedDate] = useState();
  const [open, setOpen] = useState(false);
  const [isModalVisible, setModalVisible] = useState(false);
  const dispatch = useDispatch();
  // const date = useSelector(state => state.date.date);
  const date = useSelector(state => state.DateReducer);
  const [minDate, setMinDate] = useState(
    new Date().toISOString().split('T')[0],
  );
  useEffect(() => {
    dispatch(setDate(dateListing()));
  }, []);
  useEffect(() => {
    dispatch(setSelectedDateReducer(dateListing()[0]));
  }, []);
  return (
    <>
      <Tab.Navigator
        initialRouteName="Home"
        screenOptions={{
          headerShown: false,
          tabBarShowLabel: false,
          headerStyle: {
            borderBottomWidth: 0,
            height: 112,
          },
          tabBarStyle: {
            backgroundColor: COLORS.white,
            borderTopColor: COLORS.white,
            height: Platform.OS === 'ios' ? 90 : 70,
            paddingTop: 0,
            overflow: 'visible',
            paddingTop: Platform.OS === 'ios' ? 5 : 0,
            shadowOffset: {
              width: 0,
              height: 12,
            },
            shadowOpacity: 0.48,
            shadowRadius: 16.0,
            elevation: 24,
          },
        }}>
        <Tab.Screen
          name="Home"
          options={({navigation}) => ({
            headerShown: false,
            title: 'Home',
            tabBarIcon: ({focused}) => (
              <View style={styles.iconFlex}>
                {focused ? (
                  <View
                    style={[
                      styles.tabBar,
                      // {minWidth: 81}
                      {minWidth: scale(80)},
                    ]}>
                    <Image
                      resizeMode="contain"
                      style={{height: 20, width: 20}}
                      source={require('../assets/images/Home.png')}
                    />
                    {/* <Text style={{}}>Home</Text> */}
                  </View>
                ) : (
                  <Image
                    style={{height: 20, width: 20}}
                    resizeMode="contain"
                    source={require('../assets/images/Home.png')}
                  />
                )}
              </View>
            ),
          })}
          component={Home}
        />
        <Tab.Screen
          name="Notification"
          options={({navigation}) => ({
            title: 'Notifications',
            headerTitleAlign: 'left',
            // headerShown:false,
            headerBackground: () => (
              <View
                style={{
                  backgroundColor: COLORS.black,
                  height: 140,
                }}></View>
            ),
            headerShadowVisible: false,
            headerTitleStyle: {
              // fontFamily: FONTS.PoppinsSemiBold,
              fontSize: 20,
              color: COLORS.white,
              paddingLeft: 5,
              fontWeight: 600,
            },
            //headerTransparent: true,
            tabBarIcon: ({focused}) => (
              <View style={styles.iconFlex}>
                {focused ? (
                  <View
                    style={[
                      styles.tabBar,
                      //  {minWidth: 130}
                      {minWidth: scale(80)},
                    ]}>
                    <Image
                      resizeMode="contain"
                      style={{height: 20, width: 20}}
                      source={require('../assets/images/NotificationTab.png')}
                    />
                    {/* <Text style={{}}>Notifications</Text> */}
                  </View>
                ) : (
                  <Image
                    resizeMode="contain"
                    style={{height: 20, width: 20}}
                    source={require('../assets/images/NotificationTab.png')}
                  />
                )}
              </View>
            ),
          })}
          component={Notifications}
        />
        <Tab.Screen
          name="History"
          options={({navigation}) => ({
            title: 'History',
            headerTitleAlign: 'left',
            // headerShown:false,
            headerBackground: () => (
              <View
                style={{
                  backgroundColor: COLORS.black,
                  height: 140,
                }}></View>
            ),
            headerShadowVisible: false,
            headerTitleStyle: {
              // fontFamily: FONTS.PoppinsSemiBold,
              fontSize: 20,
              color: COLORS.white,
              paddingLeft: 5,
              fontWeight: 600,
            },
            //headerTransparent: true,
            tabBarIcon: ({focused}) => (
              <View style={styles.iconFlex}>
                {focused ? (
                  <View
                    style={[
                      styles.tabBar,
                      //  {minWidth: 88}
                      {minWidth: scale(80)},
                    ]}>
                    <Image
                      resizeMode="contain"
                      style={{height: 20, width: 20}}
                      source={require('../assets/images/HistoryTab.png')}
                    />
                    {/* <Text style={{}}>History</Text> */}
                  </View>
                ) : (
                  <Image
                    resizeMode="contain"
                    style={{height: 20, width: 20}}
                    source={require('../assets/images/HistoryTab.png')}
                  />
                )}
              </View>
            ),
          })}
          component={History}
        />
        <Tab.Screen
          name="Profile"
          options={({navigation}) => ({
            title: 'Profile',
            headerTitleAlign: 'left',
            // headerShown:false,
            headerBackground: () => (
              <View
                style={{
                  backgroundColor: COLORS.black,
                  height: 140,
                }}></View>
            ),
            headerShadowVisible: false,
            headerTitleStyle: {
              // fontFamily: FONTS.PoppinsSemiBold,
              fontSize: 20,
              color: COLORS.white,
              paddingLeft: 5,
              fontWeight: 600,
            },

            //headerTransparent: true,
            tabBarIcon: ({focused}) => (
              <View style={styles.iconFlex}>
                {focused ? (
                  <View
                    style={[
                      styles.tabBar,
                      // {minWidth: 82}
                      {minWidth: scale(80)},
                    ]}>
                    <Image
                      resizeMode="contain"
                      style={{height: 20, width: 20}}
                      source={require('../assets/images/ProfileTab.png')}
                    />
                    {/* <Text style={{}}>Profile</Text> */}
                  </View>
                ) : (
                  <Image
                    resizeMode="contain"
                    style={{height: 20, width: 20}}
                    source={require('../assets/images/ProfileTab.png')}
                  />
                )}
              </View>
            ),
          })}
          component={Profile}
        />
      </Tab.Navigator>
    </>
  );
};

export {BottomTabNavigator};

const styles = StyleSheet.create({
  backbtn: {
    paddingLeft: 20,
  },
  tabtext1: {
    // fontFamily: FONTS.PoppinsMedium,
    fontSize: 13,
    textAlign: 'center',
    paddingTop: 3,
    color: COLORS.primary,
  },
  iconFlex: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  tabborder: {
    position: 'absolute',
    top: -11,
    borderRadius: 10,
    width: 45,
    height: 4,
  },
  userimg: {
    borderRadius: 100,
    width: 40,
    height: 40,
  },
  userright: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 20,
    marginBottom: 0,
  },
  usertext: {
    marginRight: 14,
    color: COLORS.white,
    fontSize: 14,
    // fontFamily: FONTS.PoppinsMedium,
  },
  mainmodal: {
    alignItems: 'center',
    marginVertical: 0,
    padding: 0,
    marginLeft: 0,
    marginRight: 0,
    width: '100%',
    justifyContent: 'center',
  },
  tabBar: {
    flexDirection: 'row',
    backgroundColor: COLORS.primary,
    borderRadius: 40,
    height: 38,
    // width: 81,
    alignItems: 'center',
    paddingHorizontal: 4,
    justifyContent: 'space-evenly',
  },
});
