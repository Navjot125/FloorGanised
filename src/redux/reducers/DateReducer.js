import {SET_DATES,SET_SELECTED_DATES} from '../constants';

const initialState = {
    dates:'',
    selectedDate:''
};
export const DateReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_DATES:
    //   return [...state, state?.date =action.data];
    return {
        ...state,
        dates: action.data,
      };
      case SET_SELECTED_DATES:
        // return [...state,state?.selectedDate= action.data]
        return {
            ...state,
            selectedDate: action.data,
          };
    default:
      return state;
  }
};
