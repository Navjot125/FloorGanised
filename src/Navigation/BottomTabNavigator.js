import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  Platform,
  Pressable,
  Dimensions,
  StatusBar,
} from 'react-native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import Home from '../screens/Tabs/Home';
import Notifications from '../screens/Tabs/Notifications';
import History from '../screens/Tabs/History';
import Profile from '../screens/Tabs/Profile';
import {COLORS} from '../utils/theme';
import Login from '../screens/auth/login/Login';
const moment = require('moment');
const Tab = createBottomTabNavigator();

const BottomTabNavigator = ({}) => {
  const width = Dimensions.get('window').width;
  const height = Dimensions.get('window').height;
  const [selectedDate, setSelectedDate] = useState();
  const [open, setOpen] = useState(false);
  const [isModalVisible, setModalVisible] = useState(false);
  // const dispatch = useDispatch();
  // const user = useSelector(state => state.user.data);
  // const date = useSelector(state => state.date.date);
  const [minDate, setMinDate] = useState(
    new Date().toISOString().split('T')[0],
  );

  // useEffect(() => {
  //   if (user == null) {
  //     authApiPost('getProfile')
  //       .then(res => {
  //         if (res?.status == 2) {
  //           ExpiryToken(navigation)
  //         }
  //         if (res?.msg === "User not exist") {
  //           navigation.navigate('Login')
  //         }
  //         dispatch(setUserData(res?.data));
  //       })
  //       .catch(err => {
  //         console.log(err);
  //       });
  //   }
  // }, [user]);

  return (
    <Tab.Navigator
      // initialRouteName="TabHome"
      screenOptions={{
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
        },
      }}>
      <Tab.Screen name="Home" component={Home} />
      <Tab.Screen name="Settings" component={Profile} />
    </Tab.Navigator>
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
});
