import fetch from "node-fetch";
import {fetchExternalUiFromTask} from "../task/actions";
import {START_PROCESS} from "../actionTypes";

export const startProcess = (processName, loginObj) => {
  return function (dispatch) {
    exposedProcess(loginObj.baseUrl + '/exposedProcess', loginObj)
      .then(data => startProcessWithStartUrl(data, processName, loginObj))
      .then(data => fetchExternalUiFromTask(data.tkiid, data.piid, loginObj))
      .then(data => {
        dispatch({
          type: START_PROCESS,
          payload: data
        })
      })
      .catch(function () {
        console.log("error");
      });
  }
};

export function exposedProcess(url, loginObj) {

  const requestOptions = {
    method: 'POST',
    headers: {'Content-Type': 'application/json'},
    body: JSON.stringify({authorizationCode: loginObj.authorizationCode})
  };

  return fetch(url, requestOptions)
    .then(response => response.json());
}

export function startProcessWithStartUrl(data, processName, loginObj) {
  let processUrl;
  Object.keys(data).forEach(function (key) {
    if (processName === (data[key].display)) {
      processUrl = data[key].startURL
    }
  });
  const requestOptions = {
    method: 'POST',
    headers: {'Content-Type': 'application/json'},
    body: JSON.stringify({processUrl: processUrl, authorizationCode: loginObj.authorizationCode})
  };
  return fetch(loginObj.baseUrl + '/startProcessWithStartUrl', requestOptions)
    .then(response => response.json());
}


