import {GET_JOBS, JOB_DETAIL, START_FITTING} from '../constants';

export function getJobs(item) {
  return {
    type: GET_JOBS,
    data: item,
  };
}
export function jobDetail(item) {
  return {
    type: JOB_DETAIL,
    data: item,
  };
}
export function startFittingAction(item) {
  return {
    type: START_FITTING,
    data: item,
  };
}
