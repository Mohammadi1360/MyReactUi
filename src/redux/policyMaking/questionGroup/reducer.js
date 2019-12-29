import {
  ADD_QUESTION_GROUP,
  RECEIVE_QUESTION_GROUP,
  RECEIVE_QUESTION_GROUPS, REMOVE_QUESTION_GROUP,
  UPDATE_QUESTION_GROUP
} from './actionTypes';

const initialState = {
  questionGroups: [],
  questionGroup: {},
  errorCode: 0,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case RECEIVE_QUESTION_GROUPS:
      console.log('RECEIVE_QUESTION_GROUPS reducer');
      console.log(action);
      return {
        ...state,
        questionGroups: action.questionGroups,
        errorCode: action.errorCode
      };
    case ADD_QUESTION_GROUP:
      return {
        ...state,
        questionGroup: action.questionGroup,
        errorCode: action.errorCode
      };
    case REMOVE_QUESTION_GROUP:
      console.log('REMOVE_QUESTION_GROUP reducer');
      console.log(action);
      return {
        ...state,
        questionGroups: state.questionGroups.filter(item => item.id !== action.questionGroup.id),
        errorCode: action.errorCode
      };
    case RECEIVE_QUESTION_GROUP:
      console.log('RECEIVE_QUESTION_GROUP  reducer');
      console.log(action);
      return {
        ...state,
        questionGroup: action.questionGroup,
        errorCode: action.errorCode
      };
    case UPDATE_QUESTION_GROUP:
      console.log('UPDATE_QUESTION_GROUP reducer');
      console.log(action);
      return {
        ...state,
        questionGroup: action.questionGroup,
        errorCode: action.errorCode
      };
    default:
      return state;
  }

}
//
// const initialState = {questionGroups: []};
//
// export const questionGroups = (state = initialState, action) => {
//   switch (action.type) {
//     case ADD_QUESTION_GROUP:
//       return [
//         ...state,
//         Object.assign({}, action.questionGroup)
//       ];
//     case RECEIVE_QUESTION_GROUPS:
//       return action.questionGroups;
//     case REMOVE_QUESTION_GROUP:
//       return state.filter(item => item.id !== action.payload.id);
//     default:
//       return state;
//   }
// };
//
// export const questionGroup = (state = [], action) => {
//   switch (action.type) {
//     case RECEIVE_QUESTION_GROUP:
//       return action.questionGroup;
//     case UPDATE_QUESTION_GROUP:
//       return {
//         id: action.id,
//         title: action.payload.title
//       };
//     default:
//       return state;
//   }
// };
