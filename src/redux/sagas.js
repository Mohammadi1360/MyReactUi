import {all} from 'redux-saga/effects';
// import authSagas from './auth/saga';
// import questionGroupSagas from './policyMaking/questionGroup/saga';

export default function* rootSaga(getState) {
  yield all([
    // authSagas(),
    // questionGroupSagas()
  ]);
}
