import { combineReducers } from 'redux';
import postReducer from './postReducer';
import errorReducer from './errorReducer';
import authReducer from './authReducer';
import messageReducer from './messageReducer';

export default combineReducers({
    post: postReducer,
    error: errorReducer,
    auth: authReducer,
    message: messageReducer
});