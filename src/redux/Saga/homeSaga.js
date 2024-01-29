import {call, put, takeEvery} from 'redux-saga/effects';
import {navigationRef} from '../../App';
import AsyncStorage from '@react-native-async-storage/async-storage';
import APIS from '../../services/apis';
import { url } from '../../services/Config';
import { CONTACT_US, GET_JOBS } from '../constants';
import queryString from 'query-string';

function* getJob(action) {
  try {
    const status = action.data;
    const token = yield call(AsyncStorage.getItem, 'token');
    const queryParams = queryString.stringify({ status });
    const requestOptions = {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${JSON.parse(token)}`,
      }
    };
    const response = yield call(
      fetch,
      `${url}${APIS.GET_JOBS}?${queryParams}`,
      requestOptions,
    );
    if (response.ok) {
      const responseData = yield response.json();
      console.log(responseData, 'getJob response --');
    } else {
      const errorData = yield response.json();
      console.error(
        'getJob request failed:',
        response.status,
        response.statusText,
        errorData,
      );
    }
  } catch (error) {
    console.error('An error occurred during getJob:', error);
  }
}

function* homeSaga() {
  yield takeEvery(GET_JOBS, getJob);
}
export default homeSaga;
