import {call, put, takeEvery} from 'redux-saga/effects';
import {
  LOGIN_REQUEST,
  RESET_PASSWORD,
  SEND_OTP,
  SET_USER_DATA,
  SET_USER_TOKEN,
  SIGNUP_REQUEST,
  VERIFY_OTP,
} from '../constants';
import {useDispatch} from 'react-redux';
import {url} from '../../services/Config';
import APIS from '../../services/apis';
import {navigationRef} from '../../App';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {showMessage} from 'react-native-flash-message';
import {useToast} from 'react-native-toast-notifications';
import {showToastAction} from '../actions/onBoardingAction';
import { setLoader } from '../actions/Loader';
function* signup(action) {
  console.log('signup API --------------------------');
  try {
    yield put(setLoader(true));
    const {email, password, name, selectedOption, token} =
      action.data?.signUpData;
    const requestOptions = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email,
        password,
        role: selectedOption,
        name,
        fcm_token: token,
      }),
    };
    const response = yield call(fetch, `${url}${APIS.SIGNUP}`, requestOptions);
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
      action?.data?.toastFun(errorData?.message, 'danger');
    }
  } catch (error) {
    console.error('An error occurred during Signup:', error);
  } finally {
    yield put(setLoader(false));
  }
}

function* login(action) {
  console.log('login API --------------------------');
  try {
    yield put(setLoader(true));
    const {email, password, selectedOption, token} = action.data?.userDataState;
    const requestOptions = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email,
        password,
        selectedOption,
        fcm_token: token,
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
      action?.data?.toastFun(errorData?.message, 'danger');
    }
  } catch (error) {
    // action?.data?.toastFun(error)
    console.log('An error occurred during login:', error);
  } finally {
    yield put(setLoader(false));
  }
}

function* sendOtp(action) {
  console.log('sendOtp API --------------------------');
  try {
    yield put(setLoader(true));
    const email = action.data?.email;
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
      navigationRef.navigate('VerifyOTP', {
        reset: 'ResetPassword',
        data: action.data?.email,
      });
    } else {
      const errorData = yield response.json();
      action?.data?.toastFun(errorData?.message, 'danger');
    }
  } catch (error) {
    console.error('An error occurred during sendOtp:', error);
  } finally {
    yield put(setLoader(false));
  }
}

function* verifyOtp(action) {
  console.log('verifyOtp API --------------------------');
  try {
    yield put(setLoader(true));
    const code = action.data?.code;
    const email = action.data?.email;
    const requestOptions = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email,
        otp: code,
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
      navigationRef.navigate('ResetPassword', {
        data: responseData?.data,
      });
    } else {
      const errorData = yield response.json();
      action?.data?.toastFun(errorData?.message, 'danger');
    }
  } catch (error) {
    console.error('An error occurred during verifyOtp:', error);
  } finally {
    yield put(setLoader(false));
  }
}

function* resetPassword(action) {
  console.log('resetPassword API --------------------------');
  try {
    yield put(setLoader(true));
    const {cPassword, unique_id} = action.data?.data;
    const requestOptions = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        id: unique_id,
        password: cPassword,
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
      action?.data?.toastFun(errorData?.message, 'danger');
    }
  } catch (error) {
    console.error('An error occurred during resetPassword:', error);
  } finally {
    yield put(setLoader(false));
  }
}

function* loginSaga() {
  yield takeEvery(LOGIN_REQUEST, login);
  yield takeEvery(SIGNUP_REQUEST, signup);
  yield takeEvery(SEND_OTP, sendOtp);
  yield takeEvery(VERIFY_OTP, verifyOtp);
  yield takeEvery(RESET_PASSWORD, resetPassword);
}
export default loginSaga;
