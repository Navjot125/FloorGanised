import {call, put, takeEvery} from 'redux-saga/effects';
import {GET_NOTIFICATION} from '../constants';
import {url} from '../../services/Config';
import APIS from '../../services/apis';
import {navigationRef} from '../../App';
import AsyncStorage from '@react-native-async-storage/async-storage';

function* getNotification(action) {
  try {
    const {email, password, name, selectedOption, token} = action.data;
    console.log(
      'email, password, name, selectedOption',
      email,
      password,
      name,
      selectedOption,
    );
    const requestOptions = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email,
        password,
        role: selectedOption,
        name,
        fcm_token: token,
      }),
    };
    const response = yield call(fetch, `${url}${APIS.SIGNUP}`, requestOptions);
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
        'Signup request failed:',
        response.status,
        response.statusText,
        errorData,
      );
    }
  } catch (error) {
    console.error('An error occurred during Signup:', error);
  }
}

function* notificationSaga() {
  yield takeEvery(GET_NOTIFICATION, getNotification);
}
export default notificationSaga;
