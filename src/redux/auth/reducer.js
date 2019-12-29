import {
  LOGIN_USER,
  LOGOUT_USER, USER_INFO
} from './actionTypes';

const defaultState = {
  loginObj: {},
  isLoading: false,
  errorCode: 0
};

export default (state = defaultState, action = {}) => {
  switch (action.type) {
    case LOGIN_USER: {
      return {
        ...state,
        loginObj: action.loginObj,
        isLoading: action.isLoading,
        errorCode: action.errorCode
      }
    }

    case USER_INFO: {
      return {
        ...state,
        loginObj: action.loginObj
      }
    }

    case LOGOUT_USER: {
      return {
        loginObj: {...action.loginObj, "userLoggedIn": false},
        isLoading: action.isLoading,
        errorCode: action.errorCode
      }
    }
    default:
      return state;
  }
}
