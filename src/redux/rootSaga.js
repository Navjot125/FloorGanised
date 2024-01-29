import { all } from 'redux-saga/effects';
import loginSaga from './Saga/loginSaga';
import cmsSaga from './Saga/cmsSaga';
import profileSaga from './Saga/profileSaga';
import homeSaga from './Saga/homeSaga';

function* rootSaga() {
  yield all([
    loginSaga(),
    cmsSaga(),
    profileSaga(),
    homeSaga(),
  ]);
}

export default rootSaga;
