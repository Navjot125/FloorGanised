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
import {Calendar} from 'react-native-calendars';
import Modal from 'react-native-modal';
import {setSelecteddate} from '../../redux/reducers/Dates';
import {COLORS} from '../theme';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {setSelectedDateReducer} from '../../redux/actions/DateAction';
import FONTS from '../../assets/styles/fonts';
const moment = require('moment');

const CalendarStrip = ({loader}) => {
  const width = Dimensions.get('window').width;
  const height = Dimensions.get('window').height;
  const [open, setOpen] = useState(false);
  const [isModalVisible, setModalVisible] = useState(false);
  const [minDate, setMinDate] = useState(
    new Date().toISOString().split('T')[0],
  );
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const date = useSelector(state => state.DateReducer.dates);

  const SelectedDate = useSelector(state => state.DateReducer.selectedDate);
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
        {
          backgroundColor,
          marginLeft: item?.id == 0 ? 10 : 0,
          marginRight: item?.id == 14 ? 30 : 10,
        },
      ]}>
      {item?.id > 13 ? (
        <>
          <AntDesign name="calendar" size={30} color={COLORS.secondry} />
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
      item.day === SelectedDate?.day
        ? COLORS.black
        : 'rgba(233, 233, 233, 0.4)';
    const color =
      item.day === SelectedDate?.day ? COLORS.white : 'rgba(0, 0, 0, 0.3)';
    return (
      <Item
        item={item}
        onPress={() => {
          setSelectedId(item?.id), dispatch(setSelectedDateReducer(item));
        }}
        onPress2={() => {
          setModalVisible(true), setSelectedId(item?.id);
        }}
        backgroundColor={backgroundColor}
        textColor={color}
      />
    );
  };
  const changeDateUsingCal = originalData => {
    const dateObject = moment(originalData.dateString, 'YYYY-MM-DD');
    const result = {
      date: dateObject.date(),
      day: dateObject.format('D MMMM YYYY'),
      id: 0,
      month: dateObject.format('MMMM').toUpperCase(),
      monthInNumbers: dateObject.month(),
    };
    setModalVisible(false);
    dispatch(setSelectedDateReducer(result));
  };
  return (
    <>
      <View>
        <FlatList
          style={{marginRight: -15}}
          horizontal={true}
          showsHorizontalScrollIndicator={false}
          data={date ? date : ''}
          renderItem={renderItem1}
          keyExtractor={date?.id}
        />
      </View>
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
              // setdateFromCalendar(day);
              changeDateUsingCal(day);
            }}
            minDate={new Date().toISOString().split('T')[0]}
            theme={{
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
    minWidth: 65,
    marginRight: 10,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 20,
    paddingVertical: 10,
  },
  itemdate: {
    fontSize: scale(20),
    lineHeight: scale(20),
    color: COLORS.white,
    fontFamily: FONTS?.MontserratSemiBold,
    textAlign: 'center',
    top: 5,
  },
  itemmonth: {
    fontSize: scale(11),
    lineHeight: scale(12),
    color: COLORS.white,
    textAlign: 'center',
    fontFamily: FONTS?.MontserratRegular,
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
