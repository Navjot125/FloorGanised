import { all } from 'redux-saga/effects';
import loginSaga from './Saga/loginSaga';
import cmsSaga from './Saga/cmsSaga';
import profileSaga from './Saga/profileSaga';

function* rootSaga() {
  yield all([
    loginSaga(),
    cmsSaga(),
    profileSaga(),
  ]);
}

export default rootSaga;
