import axios from "axios";
import {FETCH_TASKS} from "../actionTypes";

export function taskList(field, value, loginObj) {

  // const authorization = 'Basic ' + btoa('BPM0003:QWA123');
  // // const baseUrl = 'https://172.20.146.103:9443';
  // // const baseUrl = 'https://172.20.142.91:9445';
  // const baseUrl = 'https://172.20.146.99:9444'; //nc-dev
  console.log("loginObj");
  console.log(loginObj);


  return function (dispatch) {
    let requestOptions = {};

    requestOptions = {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': loginObj.authorization
      }
    };

    let conditions = '';
    if (value !== '' && field !== '') {

      if ((typeof field) === 'string')
        conditions = ',"conditions" : [{"field":"' + field + '", "operator":"FullTextSearch", "value":"' + value + '"}]';
      else
        conditions = ',"conditions" : [{"field":"' + field + '", "operator":"Equals", "value":"' + value + '"}]';
    }

    const inputRequest =
      '{' +
      ' "organization" : "byTask"' +
      ' ,"sort" : [{"field":"taskReceivedDate", "order":"DESC"}]' +
      ' ,"fields" : ["taskSubject", "instanceName", "taskStatus","taskReceivedDate","instanceCreateDate","taskDueDate"]' +
      ' ,"interaction" : "claimed_and_available"' +
      ' ,"size" : 100' +
      conditions +
      '}';

    axios.put(loginObj.baseUrl + '/rest/bpm/wle/v1/tasks?calcStats=true', inputRequest, requestOptions)
      .then(function (response) {
        console.log("response =>>");
        console.log(response);
        console.log(response.data.data.items);

        dispatch({
          type: FETCH_TASKS,
          tasks: response.data.data.items,
          isLoading: false,
          errorCode: 0
        });
      })
      .catch(function (error) {
        console.log("error");
        console.log(error);
        dispatch({
          type: FETCH_TASKS,
          tasks: [],
          isLoading: false,
          errorCode: 100
        });
      })
      .finally(function () {
        console.log("finally");
        // always executed
      });

    dispatch({
      type: FETCH_TASKS,
      tasks: [],
      isLoading: true,
      errorCode: 0
    });
  }
}


//
//
// export function finishTask(taskID, inputData, loginObj) {
//   const requestOptions = {
//     method: 'POST',
//     headers: {'Content-Type': 'application/json'},
//     body: JSON.stringify({authorizationCode: loginObj.authorizationCode, taskID: taskID, inputData})
//   };
//   return function (dispatch) {
//     return fetch(loginObj.baseUrl + '/finishTask', requestOptions)
//       .then(res => res.json())
//       .then(data => {
//         dispatch({type: FINISH_TASK, payload: data});
//       })
//       .catch(function () {
//         console.log("error");
//       });
//   };
// }
//
// export function setData(taskID, inputData, loginObj) {
//   const requestOptions = {
//     method: 'POST',
//     headers: {'Content-Type': 'application/json'},
//     body: JSON.stringify({authorizationCode: loginObj.authorizationCode, taskID: taskID, inputData})
//   };
//   return function (dispatch) {
//     return fetch(loginObj.baseUrl + '/setData', requestOptions)
//       .then(res => res.json())
//       .then(data => {
//         dispatch({type: SET_DATA, payload: data});
//       })
//       .catch(function () {
//         console.log("error");
//       });
//   };
// }
//
// export function getTaskData(taskID, fields, loginObj) {
//   const requestOptions = {
//     method: 'POST',
//     headers: {'Content-Type': 'application/json'},
//     body: JSON.stringify({authorizationCode: loginObj.authorizationCode, taskID: taskID, fields: fields})
//   };
//   return function (dispatch) {
//     return fetch(loginObj.baseUrl + '/getData', requestOptions)
//       .then(res => res.json())
//       .then(data => {
//         dispatch({type: RECEIVE_TASK, taskInputs: data});
//       })
//       .catch(function () {
//         console.log("error");
//       });
//   };
// }
//
//
// export const fetchExternalUi = (taskID, piid, loginObj) => {
//   return function (dispatch) {
//     fetchExternalUiFromTask(taskID, piid, loginObj).then(data =>
//       dispatch({type: FETCH_EXTERNAL_UI, url: data})
//     )
//   }
// };
//
//
// export function fetchExternalUiFromTask(taskID, piid, loginObj) {
//   const requestOptions = {
//     method: 'POST',
//     headers: {'Content-Type': 'application/json'},
//     body: JSON.stringify({authorizationCode: loginObj.authorizationCode, taskID: taskID, piid: piid})
//   };
//   return fetch(loginObj.baseUrl + '/externalUI', requestOptions)
//     .then(response => response.json());
// }
//
// export function deleteTask(task) {
//   return dispatch => {
//     dispatch({
//       type: REMOVE_TASK,
//       person: task
//     })
//   }
// }

