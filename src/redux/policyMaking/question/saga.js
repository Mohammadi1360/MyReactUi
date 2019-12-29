import {all, call, fork, put, takeEvery} from "redux-saga/effects";
import {RECEIVE_SURVEYS} from './actionTypes';
import {getSurveys, getSurveysError} from './actions';

import {servicePath} from '../defaultValues'

const apiUrl = servicePath + "/srvSurvey";

const getSurveysRequest = async () => {
  return await new Promise((success, fail) => {
    setTimeout(() => {
      success(fetch(apiUrl));
    }, 1000);
  })
    .then(response => response)
    .catch(error => error);
};

function* getSurveysItems() {
  try {
    const response = yield call(getSurveysRequest);
    yield put(getSurveys(response));
  } catch (error) {
    // yield put(getSurveysError(error));
  }
}

export function* watchSurveys() {
  yield takeEvery(RECEIVE_SURVEYS, getSurveysItems);
}

export default function* rootSaga() {
  yield all([
    fork(watchSurveys),
    // fork(watchLogoutUser),
    // fork(watchRegisterUser)
  ]);
}
