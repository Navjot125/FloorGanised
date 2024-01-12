import React, {useEffect, useState} from 'react';
import {
  View,
  TouchableOpacity,
  Text,
  StyleSheet,
  FlatList,
  Platform,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {scale, verticalScale, moderateScale} from 'react-native-size-matters';
import {useDispatch, useSelector} from 'react-redux';
import {Image, Dimensions} from 'react-native';
import {Calendar, LocaleConfig} from 'react-native-calendars';
import Modal from 'react-native-modal';
import {setSelecteddate} from '../../redux/reducers/Dates';
import {COLORS} from '../theme';
const moment = require('moment');

const CalendarStrip = ({loader}) => {
  const width = Dimensions.get('window').width;
  const height = Dimensions.get('window').height;
  const [selectedDate, setSelectedDate] = useState();
  const [open, setOpen] = useState(false);
  const [isModalVisible, setModalVisible] = useState(false);
  const [minDate, setMinDate] = useState(
    new Date().toISOString().split('T')[0],
  );

  const dispatch = useDispatch();
  const navigation = useNavigation();
  const date = useSelector(state => state.date.date);
  const SelectedDate = useSelector(state => state.date.selectedDate);
  const [selectedId, setSelectedId] = useState(0);
  const setdateFromCalendar = day => {
    let days = new Date(day.dateString);
    let monthString = days.toLocaleString('en-us', {month: 'long'});
    let dayString = moment(days).format('DD MMMM YYYY');
    let obj = {
      id: -1,
      date: days.getDate(),
      month: monthString.toUpperCase(),
      day: dayString,
      monthInNubers: days.getMonth(),
    };
    setModalVisible(false);
    dispatch(setSelecteddate(obj));
  };

  const dateString = '09 October 2023';
  const dates = moment(dateString, 'DD MMMM YYYY');
  const dayName = dates.format('ddd');
  const Item = ({item, onPress, backgroundColor, textColor, onPress2}) => (
    <TouchableOpacity
      onPress={item?.id > 13 ? onPress2 : onPress}
      style={[
        styles.datemonth,
        {backgroundColor, marginLeft: item?.id == 0 ? 10 : 0},
      ]}>
      {item?.id > 13 ? (
        <>
          <Image
            style={{height: 19, width: 19, marginTop: 9}}
            source={require('../../assets/images/back.png')}
          />
          <Text
            style={[
              styles.itemmonth,
              {
                color: textColor,
                marginTop: 8,
                fontSize: scale(12),
                lineHeight: scale(15),
              },
            ]}>
            Schedule
          </Text>
        </>
      ) : (
        <>
          <Text style={[styles.itemdate, {color: textColor}]}>{item.date}</Text>
          <Text style={[styles.itemmonth, {color: textColor, marginBottom: 2}]}>
            {moment(item?.day, 'DD MMMM YYYY').format('ddd')}
          </Text>
        </>
      )}
    </TouchableOpacity>
  );
  const renderItem1 = ({item, index}) => {
    const backgroundColor =
      item.id === SelectedDate?.id ? COLORS.black : 'rgba(233, 233, 233, 1)';
    const color =
      item.id === SelectedDate?.id ? COLORS.white : 'rgba(0, 0, 0, 0.3)';
    return (
      <Item
        item={item}
        onPress={() => {
          setSelectedId(item?.id), dispatch(setSelecteddate(item));
        }}
        onPress2={() => {
          setModalVisible(true), setSelectedId(item?.id);
        }}
        backgroundColor={backgroundColor}
        textColor={color}
      />
    );
  };
  return (
    <>
      {console.log('date', date)}
      <FlatList
        style={{marginRight: -15}}
        horizontal={true}
        showsHorizontalScrollIndicator={false}
        data={date ? date : ''}
        renderItem={renderItem1}
        keyExtractor={date?.id}
      />
      <Modal
        backdropColor="transparent"
        propagateSwipe={true}
        isVisible={isModalVisible}
        onBackdropPress={() => {
          setModalVisible(false);
        }}
        animationInTiming={700}
        style={styles.mainmodal}>
        <View
          style={{
            width: Dimensions.get('window').width - 100,
            borderRadius: 10,
            elevation: 3,
          }}>
          <Calendar
            onDayPress={day => {
              setdateFromCalendar(day);
            }}
            minDate={minDate}
            theme={{
              backgroundColor: 'red',
              calendarBackground: 'white',
              textSectionTitleColor: '#b6c1cd',
              selectedDayBackgroundColor: 'yellow',
              selectedDayTextColor: 'cyan',
              todayTextColor: COLORS.primary,
              dayTextColor: 'black',
              textDisabledColor: COLORS.grey,
              arrowColor: COLORS.primary,
            }}
          />
        </View>
      </Modal>
    </>
  );
};
export default CalendarStrip;
const styles = StyleSheet.create({
  datemonth: {
    borderRadius: 10,
    padding: 5,
    paddingTop: 5,
    minWidth: 65,
    height: 73,
    marginRight: 10,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: Platform.OS == 'ios' ? 30 : 0,
  },
  itemdate: {
    fontSize: scale(20),
    lineHeight: scale(20),
    color: COLORS.white,
    // fontFamily: FONTS.PoppinsSemiBold,
    textAlign: 'center',
    fontWeight: 600,
  },
  itemmonth: {
    fontSize: scale(11),
    lineHeight: scale(12),
    color: COLORS.white,
    // fontFamily: FONTS.PoppinsRegular,
    textAlign: 'center',
    fontWeight: 400,
    marginTop: 10,
  },
  dateslider: {
    paddingLeft: 20,
    paddingRight: 10,
    paddingBottom: 20,
    paddingTop: 10,
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
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
