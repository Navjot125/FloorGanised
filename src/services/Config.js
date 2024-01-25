import axios from 'axios';
// import RNSecureStorage from 'rn-secure-storage';
import AsyncStorage from '@react-native-async-storage/async-storage';
// const url = 'http://192.168.1.28:4000/';
export const url = 'http://50.16.149.253:3002/api/';
// export const SOCKET_URL = 'http://3.144.132.104:4001';
// export const ImageUrl = 'https://inflightbucket.s3.us-east-1.amazonaws.com/'

// axios instance ------------------------ start -----------------------------------------
export const ApiNonAuth = axios.create({
  baseURL: url,
});
export const ApiNonAuthFormData = axios.create({
  baseURL: url,
  headers: {
    'Content-Type': 'multipart/form-data',
  },
});
export const ApiAuthFormData = axios.create({
  baseURL: url,
  headers: {
    'Content-Type': 'multipart/form-data',
  },
});
export const ApiAuth = axios.create({
  baseURL: url,
  // headers: {'X-Custom-Header': 'foobar'},
});

// axios instance ------------------------ End -----------------------------------------

export const getToken = async () => {
  const token = await AsyncStorage.getItem('userToken');
  return token;
};

//seting token to instanse header
ApiAuthFormData.interceptors.request.use(
  async config => {
    // Retrieve the token from wherever you store it (e.g., local storage, Redux store)
    const token = await getToken();

    // If the token exists, add it to the request headers
    if (token) {
      config.headers['authorization'] = `Bearer ${token}`;
    }

    return config;
  },
  error => {
    return Promise.reject(error);
  },
);

ApiAuth.interceptors.request.use(
  async config => {
    // Retrieve the token from wherever you store it (e.g., local storage, Redux store)
    const token = await getToken();
    // If the token exists, add it to the request headers
    if (token) {
      config.headers['authorization'] = `Bearer ${token}`;
    }
    return config;
  },
  error => {
    return Promise.reject(error);
  },
);
