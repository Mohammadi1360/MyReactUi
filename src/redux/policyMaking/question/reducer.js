import {
  RECEIVE_QUESTION,
  RECEIVE_SURVEY_QUESTIONS,
  RECEIVE_QUESTIONS_BY_GROUP_ID
} from './actionTypes';

const initialState = {
  surveyQuestions: [],
  questions: [],
  question: {},
  errorCode: 0,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case RECEIVE_SURVEY_QUESTIONS :
      return {
        ...state,
        surveyQuestions: action.surveyQuestions,
        errorCode: action.errorCode
      };
    case RECEIVE_QUESTIONS_BY_GROUP_ID :
      return {
        ...state,
        questions: action.questions,
        errorCode: action.errorCode
      };
    case RECEIVE_QUESTION:
      console.log('RECEIVE_QUESTION');
      console.log(action);
      return {
        ...state,
        question: action.question,
        errorCode: action.errorCode
      };
    default:
      return state;
  }
}

