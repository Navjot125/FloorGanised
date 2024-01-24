import {LOGIN_REQUEST} from '../constants';

const initialState = [];
export const onBoardingreducer = (state = initialState, action) => {
  switch (action.type) {
    case LOGIN_REQUEST:
      return [...state, action.data];
    default:
      return state;
  }
};
