import { CREATE_MESSAGE, CLEAR_MESSAGE } from '../actions/types';

const initialState = {
    msg: "",
    type: ""
}

export default function(state = initialState, action) {
    switch(action.type) {
        case CREATE_MESSAGE:
            return {
                ...state,
                msg: action.payload.msg,
                type: action.payload.type
            }
        case CLEAR_MESSAGE:
            return {
                msg: "",
                type: ""
            }
        default:
            return state;
    }
}