import {call, put, takeEvery} from 'redux-saga/effects';
import {navigationRef} from '../../App';
import AsyncStorage from '@react-native-async-storage/async-storage';
import APIS from '../../services/apis';
import {url} from '../../services/Config';
import {CONTACT_US} from '../constants';
import {setLoader} from '../actions/Loader';
function* contactUs(action) {
  console.log('contactus API --------------------------');
  try {
    yield put(setLoader(true));
    const message = action.data?.message;
    const token = yield call(AsyncStorage.getItem, 'token');
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
    const responseData = yield response.json();
    if (responseData.status) {
      console.log(responseData, 'cms response --');
      navigationRef.navigate('Home');
    } else {
      console.log(responseData, 'cms response --');
      action?.data?.toastFun(responseData?.message, 'danger');
    }
  } catch (error) {
    // console.error('An error occurred during contactUs:', error);
    action?.data?.toastFun(error, 'danger');
  } finally {
    yield put(setLoader(false));
  }
}

function* cmsSaga() {
  yield takeEvery(CONTACT_US, contactUs);
}
export default cmsSaga;
