import {
  ADD_SURVEY, RECEIVE_SURVEY,
  RECEIVE_SURVEYS, REMOVE_SURVEY, UPDATE_SURVEY, RECEIVE_SURVEY_QUESTIONS
} from './actionTypes';

import {formatJalaliDateToNumber, formatNumberDateToJalaliDate} from '../../../utils/common';


import axios from 'axios';
import {servicePath} from '../defaultValues'

const apiUrl = servicePath + "/srvSurvey";

export const getSurveys = () => {
  // debugger;
  return (dispatch) => {
    return axios.get(`${apiUrl}`)
      .then(response => {
        dispatch({
          type: RECEIVE_SURVEYS,
          surveys: response.data,
          errorCode: response.status === 200 ? 0 : 100
        })
      })
      .catch(error => {
        throw(error);
      });
  };
};

export const getSurvey = (id) => {
  return (dispatch) => {
    return axios.get(`${apiUrl}/${id}`)
      .then(response => {
        response.data.endDate = formatNumberDateToJalaliDate(response.data.endDate);
        response.data.firstSendDate = formatNumberDateToJalaliDate(response.data.firstSendDate);

        dispatch({
          type: RECEIVE_SURVEY,
          survey: response.data,
          errorCode: response.data.errorCode
        });
      })
      .catch(error => {
        throw(error);
      });
  };
};

export const addSurvey = (survey) => {
  console.log("addSurvey 2 = >>");
  console.log(survey);
  // debugger;
  return (dispatch) => {
    survey.endDate = formatJalaliDateToNumber(survey.endDate);
    survey.firstSendDate = formatJalaliDateToNumber(survey.firstSendDate);

    return axios.post(`${apiUrl}`, survey)
      .then(response => {
        survey.endDate = formatJalaliDateToNumber(survey.endDate);
        survey.firstSendDate = formatJalaliDateToNumber(survey.firstSendDate);
        survey.id = response.data.id;
        survey.timex = response.data.timex;

        dispatch({
          type: ADD_SURVEY,
          survey: survey,
          errorCode: response.data.errorCode
        })
      })
      .then(data => {
          console.log("addSurvey 5 = >>", data)
        }
      ).catch(error => {
        console.log("addSurvey 6 = >>");
        throw(error)
      });
  };
};

export const updateSurvey = (survey) => {
  survey.endDate = formatJalaliDateToNumber(survey.endDate);
  survey.firstSendDate = formatJalaliDateToNumber(survey.firstSendDate);
  return (dispatch) => {
    return axios.put(`${apiUrl}`, survey)
      .then(response => {
        survey.timex = response.data.timex;
        survey.endDate = formatNumberDateToJalaliDate(survey.endDate);
        survey.firstSendDate = formatNumberDateToJalaliDate(survey.firstSendDate);

        dispatch({
          type: UPDATE_SURVEY,
          survey: survey,
          errorCode: response.data.errorCode
        })
      })
      .then({})
      .catch(error => {
        throw(error)
      });
  };
};

export const deleteSurvey = (id) => {
  return (dispatch) => {
    return axios.delete(`${apiUrl}/${id}`)
      .then(response => {
        dispatch({type: REMOVE_SURVEY, payload: {id}})
      })
      .then({})
      .catch(error => {
        throw(error);
      });
  };
};

