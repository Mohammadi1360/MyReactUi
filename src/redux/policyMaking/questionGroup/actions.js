import {
  ADD_QUESTION_GROUP, RECEIVE_QUESTION_GROUP,
  RECEIVE_QUESTION_GROUPS, REMOVE_QUESTION_GROUP, UPDATE_QUESTION_GROUP
} from './actionTypes';

import axios from 'axios';
import {servicePath} from '../defaultValues'

const apiUrl = servicePath + "/srvQuestionGroup";

export const getQuestionGroups = () => {
  // debugger;
  return (dispatch) => {
    return axios.get(`${apiUrl}`)
      .then(response => {
        console.log("getQuestionGroups  = >>");
        console.log("RECEIVE_QUESTION_GROUPS  = >>");
        console.log(response);
        dispatch({
          type: RECEIVE_QUESTION_GROUPS,
          questionGroups: response.data,
          errorCode: response.status === 200 ? 0 : 100
        })
      })
      .catch(error => {
        throw(error);
      });
  };
};

export const getQuestionGroup = (id) => {
  // debugger;

  return (dispatch) => {
    return axios.get(`${apiUrl}/${id}`)
      .then(response => {
        console.log("getQuestionGroup  = >>");
        console.log("RECEIVE_QUESTION_GROUP  = >>");
        console.log(response);
        dispatch({
          type: RECEIVE_QUESTION_GROUP,
          questionGroup: response.data.questionGroup,
          errorCode: response.data.errorCode
        });
      })
      .catch(error => {
        throw(error);
      });
  };
};

export const addQuestionGroup = (questionGroup) => {
  console.log("addQuestionGroup 2 = >>");
  console.log(questionGroup);
  // debugger;
  return (dispatch) => {
    return axios.post(`${apiUrl}`, questionGroup)
      .then(response => {
        console.log("addQuestionGroup 3 = >>");
        console.log(response);
        dispatch({
          type: ADD_QUESTION_GROUP,
          questionGroup: questionGroup,
          errorCode: response.data.errorCode
        })
      })
      .then(data => {
          console.log("addQuestionGroup 5 = >>", data)
        }
      ).catch(error => {
        console.log("addQuestionGroup 6 = >>");
        throw(error)
      });
  };
};

export const updateQuestionGroup = (questionGroup) => {
  return (dispatch) => {
    return axios.put(`${apiUrl}`, questionGroup)
      .then(response => {
        dispatch({
          type: UPDATE_QUESTION_GROUP,
          questionGroup: questionGroup,
          errorCode: response.data.errorCode
        })
      }).then({}).catch(error => {
        throw(error)
      });
  };
};

export const deleteQuestionGroup = (questionGroup) => {
  return (dispatch) => {
    return axios.delete(`${apiUrl}?id=${questionGroup.id}`)
      .then(response => {
        dispatch({
          type: REMOVE_QUESTION_GROUP,
          questionGroup: questionGroup,
          errorCode: response.data.errorCode
        })
      })
      .then({})
      .catch(error => {
        throw(error);
      });
  };
};

