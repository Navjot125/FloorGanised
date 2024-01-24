import {SET_DATES, SET_SELECTED_DATES} from '../constants';

export function setDate(item) {
  return {
    type: SET_DATES,
    data: item,
  };
}
export function setSelectedDateReducer(item) {
  return {
    type: SET_SELECTED_DATES,
    data: item,
  };
}
