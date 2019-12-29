import {
  RECEIVE_SURVEYS,
  RECEIVE_SURVEY,
  ADD_SURVEY,
  REMOVE_SURVEY,
  UPDATE_SURVEY
} from './actionTypes';

const initialState = {
  surveys: null,
  survey: {},
  errorCode: 0,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case RECEIVE_SURVEYS:
      console.log('RECEIVE_SURVEYS reducer');
      console.log(action);
      return {
        ...state,
        surveys: action.surveys,
        errorCode: action.errorCode
      };
    case ADD_SURVEY:
      return {
        ...state,
        survey: action.survey,
        errorCode: action.errorCode
      };
    case REMOVE_SURVEY:
      console.log('REMOVE_SURVEY reducer');
      console.log(action);
      return {
        ...state,
        surveys: state.surveys.filter(item => item.id !== action.survey.id),
        errorCode: action.errorCode
      };
    case RECEIVE_SURVEY:
      console.log('RECEIVE_SURVEY  reducer');
      console.log(action);
      return {
        ...state,
        survey: action.survey,
        errorCode: action.errorCode
      };
    case UPDATE_SURVEY:
      console.log('UPDATE_SURVEY reducer');
      console.log(action);
      return {
        ...state,
        survey: action.survey,
        errorCode: action.errorCode
      };
    default:
      return state;
  }

}
//
// const initialState = {surveys: []};
//
// export const surveys = (state = initialState, action) => {
//   switch (action.type) {
//     case ADD_SURVEY:
//       return [
//         ...state,
//         Object.assign({}, action.survey)
//       ];
//     case RECEIVE_SURVEYS:
//       return action.surveys;
//     case REMOVE_SURVEY:
//       return state.filter(item => item.id !== action.payload.id);
//     default:
//       return state;
//   }
// };
//
// export const survey = (state = [], action) => {
//   switch (action.type) {
//     case RECEIVE_SURVEY:
//       return action.survey;
//     case UPDATE_SURVEY:
//       return {
//         id: action.id,
//         title: action.payload.title
//       };
//     default:
//       return state;
//   }
// };
