import {call, put, takeEvery} from 'redux-saga/effects';
import {CONTACT_US} from '../constants';
import {url} from '../../services/Config';
import APIS from '../../services/apis';
import {navigationRef} from '../../App';
import AsyncStorage from '@react-native-async-storage/async-storage';

function* contactUs(action) {
  console.log(action.data, '---=-=action.data');
  try {
    const {message} = action.data;
    const token = yield call(AsyncStorage.getItem, 'token');
    console.log('token is ----', token);
    const requestOptions = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${JSON.parse(token)}`,
      },
      body: JSON.stringify({
        message,
      }),
    };
    const response = yield call(
      fetch,
      `${url}${APIS.CONTACT_US}`,
      requestOptions,
    );
    if (response.ok) {
      const responseData = yield response.json();
      console.log(responseData, 'cms response --');
    } else {
      const errorData = yield response.json();
      console.error(
        'contactUs request failed:',
        response.status,
        response.statusText,
        errorData,
      );
    }
  } catch (error) {
    console.error('An error occurred during contactUs:', error);
  }
}

function* cmsSaga() {
  yield takeEvery(CONTACT_US, contactUs);
}
export default cmsSaga;
