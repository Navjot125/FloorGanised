import {call, put, takeEvery} from 'redux-saga/effects';
import {navigationRef} from '../../App';
import AsyncStorage from '@react-native-async-storage/async-storage';
import APIS from '../../services/apis';
import {url} from '../../services/Config';
import {GET_JOBS, JOB_DETAIL} from '../constants';

function* getJob(action) {
  try {
    const {status} = action.data;
    const token = yield call(AsyncStorage.getItem, 'token');
    const queryParams = `status=${encodeURIComponent(status)}`;
    const requestOptions = {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${JSON.parse(token)}`,
      },
    };
    const urlWithParams = `${url}${APIS.GET_JOBS}?${queryParams}`;
    const response = yield call(fetch, urlWithParams, requestOptions);
    if (response.ok) {
      const responseData = yield response.json();
      // console.log(responseData, 'getJob response --'); 
      // yield put({type: SET_USER_TOKEN, data: responseData?.token});
      action?.data?.cb(responseData?.data)
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
function* jobDetail(action) {
  try {
    const job_id = action.data;
    const token = yield call(AsyncStorage.getItem, 'token');
    const queryParams = `job_id=${encodeURIComponent(job_id)}`;
    console.log(queryParams);
    const requestOptions = {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${JSON.parse(token)}`,
      },
    };
    const urlWithParams = `${url}${APIS.JOB_DETAIL}?${queryParams}`;
    const response = yield call(fetch, urlWithParams, requestOptions);
    if (response.ok) {
      const responseData = yield response.json();
      console.log(responseData, 'jobDetail response --');
    } else {
      const errorData = yield response.json();
      console.error(
        'jobDetail request failed:',
        response.status,
        response.statusText,
        errorData,
      );
    }
  } catch (error) {
    console.error('An error occurred during jobDetail:', error);
  }
}

function* homeSaga() {
  yield takeEvery(GET_JOBS, getJob);
  yield takeEvery(JOB_DETAIL, jobDetail);
}
export default homeSaga;