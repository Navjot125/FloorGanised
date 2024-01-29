import { all } from 'redux-saga/effects';
import loginSaga from './Saga/loginSaga';
import cmsSaga from './Saga/CMSSaga';

function* rootSaga() {
  yield all([
    loginSaga(),
    cmsSaga(),
  ]);
}

export default rootSaga;
