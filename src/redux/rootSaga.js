import {all} from 'redux-saga/effects';
import loginSaga from './Saga/loginSaga';
import cmsSaga from './Saga/cmsSaga';
import profileSaga from './Saga/profileSaga';
import homeSaga from './Saga/homeSaga';
import notificationSaga from './Saga/notificationSaga';
import jobSaga from './Saga/jobSaga';

function* rootSaga() {
  yield all([
    loginSaga(),
    cmsSaga(),
    profileSaga(),
    homeSaga(),
    notificationSaga(),
    jobSaga(),
  ]);
}

export default rootSaga;
