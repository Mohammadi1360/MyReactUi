import fetch from "node-fetch";
import axios from 'axios';
import {LOGIN_USER, LOGOUT_USER, USER_INFO} from "./actionTypes";

export function login(userName, password) {
  console.log("login =>>");
  console.log(userName + ' ' + password);
  let authorization = '';
  authorization = 'Basic ' + btoa(userName + ':' + password);
  console.log(authorization);

  // const baseUrl = 'https://172.20.146.103:9443';
  // const baseUrl = 'https://172.20.142.91:9445';
  const baseUrl = 'https://172.20.146.99:9444'; //nc-dev

  return function (dispatch) {
    let requestOptions = {};

    requestOptions = {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'Authorization': authorization
      }
    };

    const loginObj = {
      authorizationCode: authorization,
      baseUrl: baseUrl,
      userName: userName,
      userLoggedIn: false,
    };

    console.log("loginObj >> ");
    console.log(loginObj);

    if (userName === 'admin') {
      console.log("if : ");
      loginObj["userLoggedIn"] = true;
      dispatch({type: LOGIN_USER, loginObj: loginObj, isLoading: false, errorCode: 0});
    } else {
      console.log("else : ");
      loginObj["userLoggedIn"] = false;
      dispatch({type: LOGIN_USER, loginObj: loginObj, isLoading: false, errorCode: 3000});
    }
    
    //
    // axios.get(baseUrl + '/rest/bpm/wle/v1/user', requestOptions)
    //   .then(function (response) {
    //     console.log("response =>>");
    //     console.log(response);
    //
    //     if (userName === response.data.data.userName.trim()) {
    //       console.log("if : ");
    //       loginObj["userLoggedIn"] = true;
    //       dispatch({type: LOGIN_USER, loginObj: loginObj, isLoading: false, errorCode: 0});
    //     } else {
    //       console.log("else : ");
    //       loginObj["userLoggedIn"] = false;
    //       dispatch({type: LOGIN_USER, loginObj: loginObj, isLoading: false, errorCode: 3000});
    //     }
    //   })
    //   .catch(function (error) {
    //     console.log("error");
    //     console.log(error);
    //     loginObj["userLoggedIn"] = false;
    //     dispatch({type: LOGIN_USER, loginObj: loginObj, isLoading: false, errorCode: 100});
    //   })
    //   .finally(function () {
    //     console.log("finally");
    //     // always executed
    //   });

    //dispatch({type: LOGIN_USER, loginObj: loginObj, isLoading: true, errorCode: 0});
  }
}

export function getLoginObject() {
  return function (dispatch) {
    let loginObj = getUserInfo();
    // let loginObj = LoginObject.getInstance();
    // console.log("getInstance");
    // console.log(loginObj);
    dispatch({type: USER_INFO, loginObj: loginObj});
  }
}

export function logOut() {
  return function (dispatch) {
    dispatch({type: LOGOUT_USER, loginObj: null, isLoading: false, errorCode: 0});
  }
}

async function getUserInfo() {
  if (localStorage.getItem('LoginObject')) {
    return JSON.parse(localStorage.getItem('LoginObject'));
  } else
    return null
}

const LoginObject = (function () {
  let instance;

  async function createInstance() {
    let obj = null;
    if (localStorage.getItem('LoginObject')) {
      obj = localStorage.getItem('LoginObject');
    }
    return obj;
  }

  return {
    getInstance: function () {
      if (!instance) {
        instance = createInstance();
      }
      return instance;
    }
  };
})();
