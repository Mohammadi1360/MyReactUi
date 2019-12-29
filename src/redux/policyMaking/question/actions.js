import {
  RECEIVE_SURVEY_QUESTIONS,
  RECEIVE_QUESTIONS_BY_GROUP_ID
} from './actionTypes';

import axios from 'axios';
import {servicePath} from '../defaultValues'

const apiSurveyUrl = servicePath + "/srvSurvey";
const apiQuestionUrl = servicePath + "/srvQuestion";

export const getSurveyQuestions = (surveyId) => {
  return (dispatch) => {
    return axios.get(`${apiSurveyUrl}/${surveyId}/question`)
      .then(response => {
        console.log("getSurveyQuestions  = >>");
        console.log(response);
        dispatch({
          type: RECEIVE_SURVEY_QUESTIONS,
          surveyQuestions: response.data,
          errorCode: response.status === 200 ? 0 : 100
        });
      })
      .catch(error => {
        throw(error);
      });
  };
};


export const getQuestionsByGroupId = (surveyId, questionGroupId) => {
  return (dispatch) => {
    return axios.get(`${apiQuestionUrl}/${surveyId}/${questionGroupId}`)
      .then(response => {
        console.log("getQuestionsByGroupId  = >>");
        console.log(response);
        dispatch({
          type: RECEIVE_QUESTIONS_BY_GROUP_ID,
          questions: response.data,
          errorCode: response.status === 200 ? 0 : 100
        });
      })
      .catch(error => {
        throw(error);
      });
  };
};


