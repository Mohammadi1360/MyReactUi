import {combineReducers} from 'redux';
import settings from './settings/reducer';
import authUser from './auth/reducer';
import userTasks from './policyMaking/bpmn/task/reducer';
// import questionGroups from './questionGroup/reducers';
import questionGroup from './policyMaking/questionGroup/reducer';
import survey from './policyMaking/survey/reducer';
import question from './policyMaking/question/reducer';
import {LOGOUT_USER} from "./auth/actionTypes";

const rootReducer = combineReducers({
  settings,
  authUser,
  userTasks,
  questionGroup,
  survey,
  question,

});

export default (state, action) => (
  action.type === LOGOUT_USER
    ? rootReducer(undefined, action)
    : rootReducer(state, action)
);
