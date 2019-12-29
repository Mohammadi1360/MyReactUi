import {START_PROCESS} from "../actionTypes";

const defaultState = {
    bpmn: {}
};

export default (state = defaultState, action = {}) => {
    switch (action.type) {
        case START_PROCESS: {
            return {
                ...state,
                bpmn: action.payload
            }
        }
        default :
            return state;
    }
}
