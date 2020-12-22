import { PROJECTASKS_STATUS, USER_STATUS } from '../actionTypes';

export default function(state = {}, action) {
    switch (action.type) {
        case PROJECTASKS_STATUS:
            return { ...state, projectasks: action.payload };
        case USER_STATUS:
            return { ...state, user: action.payload };
        default:
            return state;
    }
}
