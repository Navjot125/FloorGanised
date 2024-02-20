import {call, put, takeEvery} from 'redux-saga/effects';
import {navigationRef} from '../../App';
import AsyncStorage from '@react-native-async-storage/async-storage';
import APIS from '../../services/apis';
import {url} from '../../services/Config';
import {
  DELETE_ACCOUNT,
  GET_PROFILE,
  SET_USER_DATA,
  SET_USER_TOKEN,
  UPDATE_PASSWORD,
  UPDATE_PROFILE,
} from '../constants';

function* getProfile(action) {
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
    const responseData = yield response.json();
    if (responseData?.status) {
      // console.log(responseData, 'getProfile response --');
      yield put({type: SET_USER_DATA, data: responseData?.data});
      yield put({type: SET_USER_TOKEN, data: responseData?.token});
      //   yield put({type: GET_JOBS, data: 'Pending'});
    } else {
      console.log(responseData, 'responseData----', action?.data?.toastFun);
      action?.data?.toastFun(responseData?.message, 'danger');
    }
  } catch (error) {
    console.error('An error occurred during getProfile:', error);
  }
}

function* updatePassword(action) {
  try {
    const {old_password, new_password} = action.data?.data;
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
    const responseData = yield response.json();
    if (responseData?.status) {
      console.log(responseData, 'updatePassword response --');
      navigationRef.navigate('Home');
    } else {
      action.data?.toastFun(responseData?.message, 'danger');
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
    };
    const response = yield call(
      fetch,
      `${url}${APIS.DELETE_ACCOUNT}`,
      requestOptions,
    );
    const responseData = yield response.json();
    if (responseData?.status) {
      console.log(responseData, 'deleteAccount response --');
      navigationRef.reset({
        index: 0,
        routes: [{name: 'Root'}],
      });
    } else {
      action?.data?.toastFun(responseData?.message, 'danger');
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
      body: JSON.stringify({
        name,
      }),
    };
    const response = yield call(
      fetch,
      `${url}${APIS.UPDATE_PROFILE}`,
      requestOptions,
    );
    const responseData = yield response.json();
    if (responseData?.status) {
      console.log(responseData, 'updateProfile response --');
      navigationRef.navigate('Home');
    } else {
      action?.data?.toastFun(responseData?.message, 'danger');
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
