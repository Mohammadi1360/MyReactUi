import {FETCH_EXTERNAL_UI, FINISH_TASK, FETCH_TASKS, FETCH_TASK} from "../actionTypes";

const defaultState = {
  tasks: [],
  isLoading: false,
  task: {},
  errorCode: 0
};

export default (state = defaultState, action = {}) => {
  switch (action.type) {
    case FETCH_TASKS: {
      return {
        ...state,
        tasks: action.tasks,
        isLoading: action.isLoading,
        errorCode: action.errorCode,
      }
    }
    case FETCH_EXTERNAL_UI: {
      return {
        ...state,
        url: action.url
      }
    }
    case FETCH_TASK: {
      return {
        ...state,
        taskInputs: action.taskInputs
      }
    }
    case FINISH_TASK: {
      return {
        ...state,
        task: action.payload
      }
    }
    default:
      return state;
  }
}
