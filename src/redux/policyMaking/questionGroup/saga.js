import {all, call, fork, put, takeEvery} from "redux-saga/effects";
import {RECEIVE_QUESTION_GROUPS} from './actionTypes';
import {getQuestionGroups, getQuestionGroupsError} from './actions';

import {servicePath} from '../defaultValues'

const apiUrl = servicePath + "/srvQuestionGroup";

const getQuestionGroupsRequest = async () => {
  return await new Promise((success, fail) => {
    setTimeout(() => {
      success(fetch(apiUrl));
    }, 1000);
  })
    .then(response => response)
    .catch(error => error);
};

function* getQuestionGroupsItems() {
  try {
    const response = yield call(getQuestionGroupsRequest);
    yield put(getQuestionGroups(response));
  } catch (error) {
    // yield put(getQuestionGroupsError(error));
  }
}

export function* watchQuestionGroups() {
  yield takeEvery(RECEIVE_QUESTION_GROUPS, getQuestionGroupsItems);
}

export default function* rootSaga() {
  yield all([
    fork(watchQuestionGroups),
    // fork(watchLogoutUser),
    // fork(watchRegisterUser)
  ]);
}
