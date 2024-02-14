import {
  DELETE_IMAGES,
  EDIT_MEASURING_QUESTIONNAIRE,
  SUBMIT_QUESTIONNAIRE,
} from '../constants';

export function submitQuestionnaire(item, cb) {
  return {
    type: SUBMIT_QUESTIONNAIRE,
    data: item,
    callBack: cb,
  };
}
export function deleteImage(item, cb) {
  return {
    type: DELETE_IMAGES,
    data: item,
    callBack: cb,
  };
}
export function editMeasuring(item, cb) {
  return {
    type: EDIT_MEASURING_QUESTIONNAIRE,
    data: item,
    callBack: cb,
  };
}
