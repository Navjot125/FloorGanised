import {call, put, takeEvery} from 'redux-saga/effects';
import {
  LOGIN_REQUEST,
  RESET_PASSWORD,
  SEND_OTP,
  SET_USER_DATA,
  SET_USER_TOKEN,
  VERIFY_OTP,
} from '../constants';
import {url} from '../../services/Config';
import APIS from '../../services/apis';
import {navigationRef} from '../../App';
import AsyncStorage from '@react-native-async-storage/async-storage';

function* login(action) {
  try {
    const {email, password, selectedOption} = action.data;
    const requestOptions = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email,
        password,
        selectedOption,
      }),
    };

    const response = yield call(fetch, `${url}${APIS.LOGIN}`, requestOptions);
    if (response.ok) {
      const responseData = yield response.json();
      yield put({type: SET_USER_DATA, data: responseData?.data});
      yield put({type: SET_USER_TOKEN, data: responseData?.token});
      yield call(
        AsyncStorage.setItem,
        'token',
        JSON.stringify(responseData?.token),
      );
      yield call(
        AsyncStorage.setItem,
        'role',
        JSON.stringify(responseData?.data?.role),
      );
      navigationRef.reset({
        index: 0,
        routes: [{name: 'tabs'}],
      });
    } else {
      const errorData = yield response.json();
      console.error(
        'Login request failed:',
        response.status,
        response.statusText,
        errorData,
      );
    }
  } catch (error) {
    console.error('An error occurred during login:', error);
  }
}

function* sendOtp(action) {
  try {
    const email = action.data;
    const requestOptions = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email,
      }),
    };

    const response = yield call(
      fetch,
      `${url}${APIS.SEND_OTP}`,
      requestOptions,
    );
    if (response.ok) {
      const responseData = yield response.json();
      console.log(responseData, 'resdponse of sendOtp');
      navigationRef.navigate('VerifyOTP', {reset: 'ResetPassword',
      data: action.data});
    } else {
      const errorData = yield response.json();
      console.error(
        'sendOtp request failed:',
        response.status,
        response.statusText,
        errorData,
      );
    }
  } catch (error) {
    console.error('An error occurred during sendOtp:', error);
  }
}

function* verifyOtp(action) {
  try {
    const {email, code} = action.data;
    const requestOptions = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email,
        otp:code
      }),
    };

    const response = yield call(
      fetch,
      `${url}${APIS.VERIFY_OTP}`,
      requestOptions,
    );
    if (response.ok) {
      const responseData = yield response.json();
      console.log(responseData, 'resdponse of verifyOtp');
      navigationRef.navigate("ResetPassword",{
        data:responseData?.data
      })
      
    } else {
      const errorData = yield response.json();
      console.error(
        'verifyOtp request failed:',
        response.status,
        response.statusText,
        errorData,
      );
    }
  } catch (error) {
    console.error('An error occurred during verifyOtp:', error);
  }
}

function* resetPassword(action) {
  try {
    const {cPassword, unique_id} = action.data;
    const requestOptions = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        id:unique_id,
        password:cPassword
      }),
    };

    const response = yield call(
      fetch,
      `${url}${APIS.RESET_PASSWORD}`,
      requestOptions,
    );
    if (response.ok) {
      const responseData = yield response.json();
      console.log(responseData, 'resdponse of resetPassword');
    } else {
      const errorData = yield response.json();
      console.error(
        'resetPassword request failed:',
        response.status,
        response.statusText,
        errorData,
      );
    }
  } catch (error) {
    console.error('An error occurred during resetPassword:', error);
  }
}

function* loginSaga() {
  yield takeEvery(LOGIN_REQUEST, login);
  yield takeEvery(SEND_OTP, sendOtp);
  yield takeEvery(VERIFY_OTP, verifyOtp);
  yield takeEvery(RESET_PASSWORD, resetPassword);
}
export default loginSaga;
