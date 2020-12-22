import { combineReducers } from 'redux';
import projectasksReducer from './projectasksReducer';
import userReducer from './userReducer';
import loadingReducer from './loadingReducer';

const rootReducer = combineReducers({
    projectasks: projectasksReducer,
    user: userReducer,
    loading: loadingReducer
});

export default rootReducer;
