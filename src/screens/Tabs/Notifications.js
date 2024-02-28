import {FlatList, StyleSheet, Text, View, SafeAreaView} from 'react-native';
import React, {useState} from 'react';
import {COLORS} from '../../utils/theme';
import Header from '../../components/Header/Header';
import {scale} from 'react-native-size-matters';
import {useDispatch, useSelector} from 'react-redux';
import {getNotifications} from '../../redux/actions/Notifications';
import {useFocusEffect} from '@react-navigation/native';
import moment from 'moment';
import {useToast} from 'react-native-toast-notifications';
import ShimmerEffect from '../../components/ShimmerEffect/Shimmer';
import FONTS from '../../assets/styles/fonts';
const Notifications = () => {
  const dispatch = useDispatch();
  const toast = useToast();
  const [viewFullText, setViewFullText] = useState(null);
  const [notifications, setNotifications] = useState();
  const [count, setCount] = useState(0);
  const [offset, setOffset] = useState(0);
  const loader = useSelector(state => state?.loaderReducer?.loader);
  useFocusEffect(
    React.useCallback(() => {
      setOffset(0);
      const param = {
        offset: offset,
        loader: true,
        toastFun: (msg, type) => {
          toast.show(msg, {
            type: type,
            placement: 'bottom',
            duration: 4000,
            offset: 30,
            animationType: 'slide-in ',
          });
        },
        cb: data => {
          setNotifications(data?.data);
          setCount(data?.total);
        },
      };
      dispatch(getNotifications(param));
    }, []),
  );

  const Loadmore = () => {
    const param = {
      offset: offset + 1,
      toastFun: (msg, type) => {
        toast.show(msg, {
          type: type,
          placement: 'bottom',
          duration: 4000,
          offset: 30,
          animationType: 'slide-in ',
        });
      },
      cb: data => {
        const newData = data?.data;
        setNotifications(prevListing => [...prevListing, ...newData]);
        setCount(data?.total);
      },
    };
    offset + 1 > count / 10
      ? console.log('not Working Loadmore for Notifications')
      : (setOffset(offset + 1), dispatch(getNotifications(param)));
  };
  const getTimeAgo = createdAt => {
    const momentCreatedAt = moment(createdAt);
    const duration = moment.duration(moment().diff(momentCreatedAt));
    const days = Math.floor(duration.asDays());
    const hours = Math.floor(duration.asHours());
    const minutes = Math.floor(duration.asMinutes());
    if (days > 0) {
      return `${days} ${days === 1 ? 'day' : 'days'} ago`;
    } else if (hours > 0) {
      return `${hours} ${hours === 1 ? 'hour' : 'hours'} ago`;
    } else {
      return `${minutes} ${minutes === 1 ? 'minute' : 'minutes'} ago`;
    }
  };
  const renderItem = ({item, index}) => {
    return (
      <View style={styles.container}>
        <View
          style={{
            height: '40%',
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
            paddingHorizontal: 20,
          }}>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <Text
              style={{
                fontSize: 6,
                color: index == 0 ? COLORS.primary : COLORS.black,
              }}>
              {'\u2B24'}
            </Text>
            <Text
              style={{
                fontSize: 14,
                marginLeft: 10,
                fontFamily: FONTS?.MontserratSemiBold,
              }}>
              {item?.title}
            </Text>
          </View>
          <Text
            style={{
              fontSize: 9,
              fontFamily: FONTS?.MontserratRegular,
            }}>
            {/* {item?.time} */}
            {getTimeAgo(item?.createdAt)}
          </Text>
        </View>
        <View
          style={{
            height: '40%',
            flexDirection: 'row',
            alignItems: 'center',
            paddingHorizontal: 20,
          }}>
          {item?.content?.length > 40 && item?._id != viewFullText ? (
            <Text
              style={{
                fontSize: 12,
                fontFamily: FONTS?.MontserratRegular,
              }}>
              {item?.content.slice(0, 40)}...
              <Text
                onPress={() => {
                  console.log('pressed');
                  setViewFullText(item?._id);
                }}
                style={{
                  fontSize: 12,
                  fontWeight: 700,
                  color: COLORS.secondry,
                }}>
                View
              </Text>
            </Text>
          ) : (
            <Text
              style={{
                fontSize: 12,
                fontFamily: FONTS?.MontserratRegular,
              }}>
              {item?.content?.length > 40 && item?._id == viewFullText ? (
                <>
                  {item?.content}{' '}
                  <Text
                    onPress={() => {
                      console.log('pressed');
                      setViewFullText(null);
                    }}
                    style={{
                      color: COLORS.secondry,
                      fontSize: 12,
                      fontWeight: 700,
                    }}>
                    show Less
                  </Text>
                </>
              ) : (
                item?.content
              )}
            </Text>
          )}
        </View>
      </View>
    );
  };
  return (
    <View style={{flex: 1, backgroundColor: 'black'}}>
      <SafeAreaView />
      <Header title={'Notifications'} />
      <View
        style={{
          backgroundColor: COLORS.white,
          flex: 1,
          borderTopRightRadius: scale(20),
          borderTopLeftRadius: scale(20),
        }}>
        {loader ? (
          <ShimmerEffect />
        ) : notifications?.length ? (
          <FlatList
            data={notifications}
            renderItem={renderItem}
            contentContainerStyle={{paddingBottom: 20}}
            onEndReached={Loadmore}
            onEndReachedThreshold={0.2}
            showsVerticalScrollIndicator={false}
          />
        ) : (
          <View
            style={{
              flex: 1,
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <Text
              style={{
                fontSize: 15,
                textAlign: 'center',
                paddingHorizontal: 50,
                lineHeight: 25,
                fontFamily: FONTS?.MontserratMedium,
              }}>
              There is no notifications for you.
            </Text>
          </View>
        )}
      </View>
    </View>
  );
};

export default Notifications;

const styles = StyleSheet.create({
  container: {
    height: 99,
    backgroundColor: 'rgba(255, 255, 255, 1)',
    marginTop: 20,
    borderRadius: 16,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 6,
    },
    shadowOpacity: 0.1,
    shadowRadius: 11.27,
    elevation: 10,
    marginHorizontal: 20,
  },
});
