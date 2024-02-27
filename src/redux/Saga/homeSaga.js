import {call, put, takeEvery} from 'redux-saga/effects';
import AsyncStorage from '@react-native-async-storage/async-storage';
import APIS from '../../services/apis';
import {url} from '../../services/Config';
import {GET_JOBS, JOB_DETAIL, START_FITTING} from '../constants';
import {navigationRef} from '../../App';
import {setLoader} from '../actions/Loader';
import moment from 'moment';

function* getJob(action) {
  console.log('getJob API --------------------------');
  try {
    const {status, date, offset, loader} = action.data;
    loader ? yield put(setLoader(true)) : null;
    const token = yield call(AsyncStorage.getItem, 'token');
    const queryParams = `status=${encodeURIComponent(
      status,
    )}&job_date=${encodeURIComponent(
      moment(date).format('YYYY-MM-DD'),
    )}&offset=${encodeURIComponent(offset)}`;
    const requestOptions = {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${JSON.parse(token)}`,
      },
    };
    const urlWithParams = `${url}${APIS.GET_JOBS}?${queryParams}`;
    const response = yield call(fetch, urlWithParams, requestOptions);
    const responseData = yield response.json();
    if (responseData?.status) {
      action?.data?.cb(responseData);
    } else {
      action?.data?.toastFun(responseData?.message, 'danger');
    }
  } catch (error) {
    console.error('An error occurred during getJob:', error);
  } finally {
    yield put(setLoader(false));
  }
}
function* jobDetail(action) {
  console.log('jobDetail API --------------------------', action);
  try {
    yield put(setLoader(true));
    const {job_id, toastFun, cb} = action.data;
    const token = yield call(AsyncStorage.getItem, 'token');
    const queryParams = `job_id=${encodeURIComponent(job_id)}`;
    const requestOptions = {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${JSON.parse(token)}`,
      },
    };
    const urlWithParams = `${url}${APIS.JOB_DETAIL}?${queryParams}`;
    const response = yield call(fetch, urlWithParams, requestOptions);
    const responseData = yield response.json();
    if (responseData?.status) {
      cb(responseData);
    } else {
      toastFun(responseData?.message, 'danger');
    }
  } catch (error) {
    console.error('An error occurred during jobDetail:', error);
  } finally {
    yield put(setLoader(false));
  }
}
function* startFittingSaga(action) {
  console.log('startFittingSaga API --------------------------');
  try {
    yield put(setLoader(true));
    const {fitter_status, job_id} = action.data;
    const token = yield call(AsyncStorage.getItem, 'token');
    const requestOptions = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${JSON.parse(token)}`,
      },
      body: JSON.stringify({
        fitter_status,
        job_id,
      }),
    };
    const response = yield call(
      fetch,
      `${url}${APIS.START_FITTING}`,
      requestOptions,
    );
    if (response.ok) {
      const responseData = yield response.json();
      console.log(responseData, 'startFittingSaga response --');
      navigationRef.navigate('Home');
    } else {
      const errorData = yield response.json();
      console.error(
        'startFittingSaga request failed:',
        response.status,
        response.statusText,
        errorData,
      );
    }
  } catch (error) {
    console.error('An error occurred during startFittingSaga:', error);
  } finally {
    yield put(setLoader(false));
  }
}

function* homeSaga() {
  yield takeEvery(GET_JOBS, getJob);
  yield takeEvery(JOB_DETAIL, jobDetail);
  yield takeEvery(START_FITTING, startFittingSaga);
}
export default homeSaga;
