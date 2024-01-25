import {put, takeEvery} from 'redux-saga/effects';
import {LOGIN_REQUEST, SET_USER_DATA} from './constants';
import {url} from '../services/Config';

function* login(dataa) {
  console.log(dataa, '---------------------------');
  let data = yield fetch(url);
  data = yield data.json();
  // yield put({type:SET_USER_DATA, data})
}
function* SagaData() {
  yield takeEvery(LOGIN_REQUEST, login);
}
export default SagaData;

// {
// "data": {"email": "Navjots.indiit@gmail.com", "password": "Delhi@1A", "selectedOption": "Fitter"},
//  "type": "LOGIN_REQUEST"
// }
