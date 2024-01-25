import {configureStore} from '@reduxjs/toolkit';
import Loader from './reducers/Loader';
import User from './reducers/User';
import Dates from './reducers/Dates';
import rootReducer from './rootReducer';
import createSagaMiddleware from 'redux-saga';
import SagaData from './saga';
const sagaMiddleware = createSagaMiddleware();
const store = configureStore({
  // reducer: {
  //   loader: Loader,
  //   userData: User,
  //   date:Dates,
  // },
  reducer: rootReducer,
  middleware: () => [sagaMiddleware],
});
sagaMiddleware.run(SagaData);

export default store;
