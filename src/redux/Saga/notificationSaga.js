import {call, put, takeEvery} from 'redux-saga/effects';
import {GET_NOTIFICATION} from '../constants';
import {url} from '../../services/Config';
import APIS from '../../services/apis';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {setLoader} from '../actions/Loader';

function* getNotification(action) {
  console.log('getNotification API --------------------------');
  try {
    const {offset, loader} = action.data;
    loader ? yield put(setLoader(true)) : null;
    const token = yield call(AsyncStorage.getItem, 'token');
    const queryParams = `offset=${encodeURIComponent(offset)}`;
    const requestOptions = {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${JSON.parse(token)}`,
      },
    };
    const urlWithParams = `${url}${APIS.GET_NOTIFICATIONS}?${queryParams}`;
    const response = yield call(fetch, urlWithParams, requestOptions);
    const responseData = yield response.json();
    if (responseData?.status) {
      action?.data?.cb(responseData);
    } else {
      action?.data?.toastFun(responseData?.message, 'danger');
    }
  } catch (error) {
    // console.error('An error occurred during getNotification:', error);
    action?.data?.toastFun(error, 'danger');
  } finally {
    yield put(setLoader(false));
  }
}

function* notificationSaga() {
  yield takeEvery(GET_NOTIFICATION, getNotification);
}
export default notificationSaga;
