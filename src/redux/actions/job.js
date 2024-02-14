import {DELETE_IMAGES, SUBMIT_QUESTIONNAIRE} from '../constants';

export function submitQuestionnaire(item, cb) {
  return {
    type: SUBMIT_QUESTIONNAIRE,
    data: item,
    callBack: cb,
  };
}
export function deleteImage(item,cb) {
  return {
    type: DELETE_IMAGES,
    data: item,
    callBack: cb,
  };
}
