import {call, put, takeEvery} from 'redux-saga/effects';
import {LOGIN_REQUEST, SET_USER_DATA, SET_USER_TOKEN} from './constants';
import {url} from '../services/Config';
import APIS from '../services/apis';
import {navigationRef} from '../App';
import AsyncStorage from '@react-native-async-storage/async-storage';

// function* login(dataa) {
//   console.log(dataa, '---------------------------');
//   let data = yield fetch(url);
//   data = yield data.json();
//   // yield put({type:SET_USER_DATA, data})
// }

function* login(action) {
  try {
    const {email, password, selectedOption} = action.data;
    const requestOptions = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email,
        password,
        selectedOption,
      }),
    };

    const response = yield call(fetch, `${url}${APIS.LOGIN}`, requestOptions);
    if (response.ok) {
      const responseData = yield response.json();
      yield put({type: SET_USER_DATA, data: responseData?.data});
      yield put({type: SET_USER_TOKEN, data: responseData?.token});
      yield call(
        AsyncStorage.setItem,
        'token',
        JSON.stringify(responseData?.token),
      );
      yield call(
        AsyncStorage.setItem,
        'role',
        JSON.stringify(responseData?.data?.role),
      );
      navigationRef.reset({
        index: 0,
        routes: [{name: 'tabs'}],
      });
    } else {
      const errorData = yield response.json();
      console.error(
        'Login request failed:',
        response.status,
        response.statusText,
        errorData,
      );
    }
  } catch (error) {
    console.error('An error occurred during login:', error);
  }
}

function* SagaData() {
  yield takeEvery(LOGIN_REQUEST, login);
}
export default SagaData;

// {
// "data": {"email": "Navjots.indiit@gmail.com", "password": "Delhi@1A", "selectedOption": "Fitter"},
//  "type": "LOGIN_REQUEST"
// }
