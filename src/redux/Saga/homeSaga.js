import {call, put, takeEvery} from 'redux-saga/effects';
import AsyncStorage from '@react-native-async-storage/async-storage';
import APIS from '../../services/apis';
import {url} from '../../services/Config';
import {GET_JOBS, JOB_DETAIL, START_FITTING} from '../constants';
import {navigationRef} from '../../App';
import {setLoader} from '../actions/Loader';

function* getJob(action) {
  try {
    yield put(setLoader(true));
    const {status, date} = action.data;
    const token = yield call(AsyncStorage.getItem, 'token');
    const queryParams = `status=${encodeURIComponent(
      status,
    )}&job_date=${encodeURIComponent(date)}`;
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
      // console.log(responseData,'responseData?.data');
      action?.data?.cb(responseData?.data);
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
  } finally {
    yield put(setLoader(false));
  }
}
function* jobDetail(action) {
  try {
    yield put(setLoader(true));
    const {_id, stack, screen} = action.data;
    const token = yield call(AsyncStorage.getItem, 'token');
    const queryParams = `job_id=${encodeURIComponent(_id)}`;
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
      console.log(responseData, 'responseData-------------');
      responseData?.measuring_details
        ? navigationRef.navigate(stack, {
            screen: screen,
            params: {
              responseData: responseData?.data,
              measurinDetails: responseData?.measuring_details,
            },
          })
        : navigationRef.navigate(stack, {
            screen: screen,
            params: {
              responseData: responseData?.data,
            },
          });
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
  } finally {
    yield put(setLoader(false));
  }
}

function* startFittingSaga(action) {
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
