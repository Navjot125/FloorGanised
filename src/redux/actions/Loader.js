import {SET_LOADER} from '../constants';

export function setLoader(item) {
  return {
    type: SET_LOADER,
    data: item,
  };
}
