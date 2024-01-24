import axios from 'axios';
import NetInfo from '@react-native-community/netinfo';
import {ENV} from './env';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {Alert} from 'react-native';

export let CallAPI = async ({url, method, data, headers}) => {
  const isNetConnected = await NetInfo.fetch().then(async state => {
    if (state.isConnected == false) {
      return false;
    } else {
      return true;
    }
  });
  const token = await AsyncStorage.getItem('token');
  //   const CustomerId = await AsyncStorage.getItem("customerId");

  if (isNetConnected) {
    const response = await axios({
      method: method,
      url: `${ENV.BASE_URL}${url}`,
      data: data,
      headers: headers
        ? {
            ...headers,
            token: headers.token ? headers.token : token,
            // customerid: headers?.customerId ? headers?.customerId : CustomerId,
          }
        : method == 'POST'
        ? {
            ...headers,
            token: token,
            // customerid: CustomerId,
          }
        : {
            'Content-Type': 'application/json',
            token: token,
            // customerid: CustomerId,
          },
    });

    console.log('response-api', url, '\n', response);

    return response;
  } else {
    Alert.alert('No internet connection');
  }
};
