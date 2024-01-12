import { configureStore } from '@reduxjs/toolkit';
import Loader from './reducers/Loader';
import User from './reducers/User';
import Dates from './reducers/Dates';


export const store = configureStore({
  reducer: {
    loader: Loader,
    userData: User,
    date:Dates,
  },
});
