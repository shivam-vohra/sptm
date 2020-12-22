import { GET_PROJECTASKS } from '../actionTypes';

export default function(state = {}, action) {
    switch (action.type) {
        case GET_PROJECTASKS:
            return action.payload;
        default:
            return state;
    }
}
