import {LOGIN_REQUEST, LOG_OUT_REQUEST, SET_USER_DATA} from '../constants';

const initialState = [];
export const onBoardingreducer = (state = initialState, action) => {
  switch (action.type) {
    // case LOGIN_REQUEST:
    //   return [...state, action.data];
    case LOG_OUT_REQUEST:
      return [(state = [])];
    case SET_USER_DATA:
      return [...state, action.data];
    default:
      return state;
  }
};
