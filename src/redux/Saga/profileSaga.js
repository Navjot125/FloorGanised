import {call, put, takeEvery} from 'redux-saga/effects';
import {navigationRef} from '../../App';
import AsyncStorage from '@react-native-async-storage/async-storage';
import APIS from '../../services/apis';
import {url} from '../../services/Config';
import {CONTACT_US, DELETE_ACCOUNT, UPDATE_PASSWORD} from '../constants';

function* updatePassword(action) {
  console.log(action.data, '---=-=action.data');
  try {
    const {old_password, new_password} = action.data;
    const token = yield call(AsyncStorage.getItem, 'token');
    console.log('token is ----', token);
    const requestOptions = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${JSON.parse(token)}`,
      },
      body: JSON.stringify({
        old_password,
        new_password,
      }),
    };
    const response = yield call(
      fetch,
      `${url}${APIS.UPDATE_PASSWORD}`,
      requestOptions,
    );
    if (response.ok) {
      const responseData = yield response.json();
      console.log(responseData, 'updatePassword response --');
      navigationRef.navigate('Home');
    } else {
      const errorData = yield response.json();
      console.error(
        'updatePassword request failed:',
        response.status,
        response.statusText,
        errorData,
      );
    }
  } catch (error) {
    console.error('An error occurred during updatePassword:', error);
  }
}

function* deleteAccount(action) {
  try {
    const token = yield call(AsyncStorage.getItem, 'token');
    const requestOptions = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${JSON.parse(token)}`,
      },
    //   body: JSON.stringify({
    //   }),
    };
    const response = yield call(
      fetch,
      `${url}${APIS.DELETE_ACCOUNT}`,
      requestOptions,
    );
    if (response.ok) {
      const responseData = yield response.json();
      console.log(responseData, 'deleteAccount response --');

      navigationRef.reset({
        index: 0,
        routes: [{name: 'Root'}],
      });

    } else {
      const errorData = yield response.json();
      console.error(
        'deleteAccount request failed:',
        response.status,
        response.statusText,
        errorData,
      );
    }
  } catch (error) {
    console.error('An error occurred during deleteAccount:', error);
  }
}

function* profileSaga() {
  yield takeEvery(UPDATE_PASSWORD, updatePassword);
  yield takeEvery(DELETE_ACCOUNT, deleteAccount);
}
export default profileSaga;
