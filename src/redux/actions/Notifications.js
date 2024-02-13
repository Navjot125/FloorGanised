import {GET_NOTIFICATION} from '../constants';

export function getNotifications(item, cb) {
  return {
    type: GET_NOTIFICATION,
    data: item,
    callBack:cb
  };
}
