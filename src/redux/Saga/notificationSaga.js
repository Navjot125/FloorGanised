import {call, put, takeEvery} from 'redux-saga/effects';
import {GET_NOTIFICATION} from '../constants';
import {url} from '../../services/Config';
import APIS from '../../services/apis';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { setLoader } from '../actions/Loader';

function* getNotification(action) {
  try {
    yield put(setLoader(true));
    const {offset} = action.data;
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
    if (response.ok) {
      const responseData = yield response.json();
      console.log(responseData,'responseData---------------0');
    } else {
      const errorData = yield response.json();
      console.error(
        'getNotification request failed:',
        response.status,
        response.statusText,
        errorData,
      );
    }
  } catch (error) {
    console.error('An error occurred during getNotification:', error);
  } finally {
    yield put(setLoader(false));
  }
}

function* notificationSaga() {
  yield takeEvery(GET_NOTIFICATION, getNotification);
}
export default notificationSaga;
