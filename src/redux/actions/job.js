import {SUBMIT_QUESTIONNAIRE} from '../constants';

export function submitQuestionnaire(item) {
  return {
    type: SUBMIT_QUESTIONNAIRE,
    data: item,
  };
}
