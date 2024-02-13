// submitQuestionnaire
import {call, put, takeEvery} from 'redux-saga/effects';
import {navigationRef} from '../../App';
import AsyncStorage from '@react-native-async-storage/async-storage';
import APIS from '../../services/apis';
import {url} from '../../services/Config';
import {SUBMIT_QUESTIONNAIRE} from '../constants';
import {setLoader} from '../actions/Loader';
async function convertPayloadToFormData(payload) {
  const formData = new FormData();
  for (const key in payload) {
    if (payload.hasOwnProperty(key)) {
      if (
        payload[key] !== '' &&
        payload[key] !== null &&
        payload[key] != undefined
      ) {
        if (key === 'measurement_of_room' && Array.isArray(payload[key])) {
          payload[key].forEach((imageData, index) => {
            if (imageData != '') {
              // const randomName = `image_${Math.random().toString(36).substr(2, 10)}.jpg`;
              formData.append(`measurement_of_room`, {
                // uri: imageData,
                // type: 'image/jpeg',
                // name: randomName,
                uri: imageData.uri,
                type: imageData.type,
                name: imageData.fileName,
              });
            }
          });
        }
        if (key === 'furniture_images' && Array.isArray(payload[key])) {
          payload[key].forEach((imageData, index) => {
            if (imageData != '') {
              formData.append(`furniture_images`, {
                uri: imageData.uri,
                type: imageData.type,
                name: imageData.fileName,
              });
            }
          });
        }
        if (key === 'floor_preparation_images' && Array.isArray(payload[key])) {
          payload[key].forEach((imageData, index) => {
            if (imageData != '') {
              formData.append(`floor_preparation_images`, {
                uri: imageData.uri,
                type: imageData.type,
                name: imageData.fileName,
              });
            }
          });
        } else {
          if (key !== 'photos') {
            if (Array.isArray(payload[key])) {
              payload[key].map(item => {
                formData.append(key, item);
              });
            } else formData.append(key, payload[key]);
          }
        }
      }
    }
  }
  return formData;
}
function* submitQuestionnaire(action) {
  console.log('action', action);
  try {
    const extractedData = yield convertPayloadToFormData(action.data);
    yield put(setLoader(true));
    const token = yield call(AsyncStorage.getItem, 'token');
    const requestOptions = {
      method: 'POST',
      headers: {
        'Content-Type': 'multipart/form-data',
        Authorization: `Bearer ${JSON.parse(token)}`,
      },
      body: extractedData,
    };
    const response = yield call(
      fetch,
      `${url}${APIS.SUBMIT_QUESTIONNAIRE}`,
      requestOptions,
    );
    if (response.ok) {
      const responseData = yield response.json();
      action.callBack();
      console.log(responseData, 'submitQuestionnaire response --');
      //   navigationRef.navigate('Home');
    } else {
      const errorData = yield response.json();
      console.error(
        'submitQuestionnaire request failed:',
        response.status,
        response.statusText,
        errorData,
      );
    }
  } catch (error) {
    console.error('An error occurred during contactUs:', error);
  } finally {
    yield put(setLoader(false));
  }
}

function* jobSaga() {
  yield takeEvery(SUBMIT_QUESTIONNAIRE, submitQuestionnaire);
}
export default jobSaga;
