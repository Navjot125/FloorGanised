import {
  LOG_OUT_REQUEST,
  SET_USER_DATA,
  SET_USER_TOKEN,
} from '../constants';

const initialState = {
  userData: '',
  token: '',
};
export const onBoardingreducer = (state = initialState, action) => {
  switch (action.type) {
    case LOG_OUT_REQUEST:
      return {state: {}};
    case SET_USER_DATA:
      return {...state, userData: action.data};
    case SET_USER_TOKEN:
      return {...state, token: action.data};
    default:
      return state;
  }
};
