import {SET_LOADER} from '../constants';

export function getJobs(item) {
  return {
    type: SET_LOADER,
    data: item,
  };
}
