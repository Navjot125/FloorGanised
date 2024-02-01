import {call, put, takeEvery} from 'redux-saga/effects';
import {navigationRef} from '../../App';
import AsyncStorage from '@react-native-async-storage/async-storage';
import APIS from '../../services/apis';
import {url} from '../../services/Config';
import {
  CONTACT_US,
  DELETE_ACCOUNT,
  GET_JOBS,
  GET_PROFILE,
  SET_USER_DATA,
  SET_USER_TOKEN,
  UPDATE_PASSWORD,
  UPDATE_PROFILE,
} from '../constants';

function* getProfile() {
  try {
    const token = yield call(AsyncStorage.getItem, 'token');
    const requestOptions = {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${JSON.parse(token)}`,
      },
    };
    const response = yield call(
      fetch,
      `${url}${APIS.GET_PROFILE}`,
      requestOptions,
    );
    if (response.ok) {
      const responseData = yield response.json();
      // console.log(responseData, 'getProfile response --');
      yield put({type: SET_USER_DATA, data: responseData?.data});
      yield put({type: SET_USER_TOKEN, data: responseData?.token});
      //   yield put({type: GET_JOBS, data: 'Pending'});
    } else {
      const errorData = yield response.json();
      console.error(
        'getProfile request failed:',
        response.status,
        response.statusText,
        errorData,
      );
    }
  } catch (error) {
    console.error('An error occurred during getProfile:', error);
  }
}

function* updatePassword(action) {
  try {
    const {old_password, new_password} = action.data;
    const token = yield call(AsyncStorage.getItem, 'token');
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
function* updateProfile(action) {
  try {
    const {email, name} = action.data;
    const token = yield call(AsyncStorage.getItem, 'token');
    const requestOptions = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${JSON.parse(token)}`,
      },
    };
    const response = yield call(
      fetch,
      `${url}${APIS.UPDATE_PROFILE}`,
      requestOptions,
    );
    if (response.ok) {
      const responseData = yield response.json();
      console.log(responseData, 'updateProfile response --');
      navigationRef.navigate('Home');
    } else {
      const errorData = yield response.json();
      console.error(
        'updateProfile request failed:',
        response.status,
        response.statusText,
        errorData,
      );
    }
  } catch (error) {
    console.error('An error occurred during updateProfile:', error);
  }
}

function* profileSaga() {
  yield takeEvery(UPDATE_PASSWORD, updatePassword);
  yield takeEvery(GET_PROFILE, getProfile);
  yield takeEvery(DELETE_ACCOUNT, deleteAccount);
  yield takeEvery(UPDATE_PROFILE, updateProfile);
}
export default profileSaga;
