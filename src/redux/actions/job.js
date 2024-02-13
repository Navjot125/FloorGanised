import {SUBMIT_QUESTIONNAIRE} from '../constants';

export function submitQuestionnaire(item, cb) {
  return {
    type: SUBMIT_QUESTIONNAIRE,
    data: item,
    callBack: cb,
  };
}
