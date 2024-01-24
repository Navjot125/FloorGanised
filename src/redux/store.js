import {configureStore} from '@reduxjs/toolkit';
import Loader from './reducers/Loader';
import User from './reducers/User';
import Dates from './reducers/Dates';
import rootReducer from './rootReducer';

const store = configureStore({
  // reducer: {
  //   loader: Loader,
  //   userData: User,
  //   date:Dates,
  // },
  reducer: rootReducer,
});

export default store;
