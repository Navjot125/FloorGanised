import {GET_NOTIFICATION} from '../constants';

export function getNotifications(item) {
  return {
    type: GET_NOTIFICATION,
    data: item,
  };
}
