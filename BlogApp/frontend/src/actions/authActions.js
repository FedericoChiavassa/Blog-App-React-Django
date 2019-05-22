import axios from 'axios';
import { returnErrors } from './errorActions';
import { createMessage } from './messageActions';

import{
    USER_LOADING,
    USER_LOADED,
    AUTH_ERROR,
    LOGIN_SUCCESS,
    LOGIN_FAIL,
    LOGOUT_SUCCESS,
    REGISTER_SUCCESS,
    REGISTER_FAIL
} from './types';

// Check token & load user
export const loadUser = () => (dispatch, getState) => {
    // User loading
    dispatch({ type: USER_LOADING });  

    axios.get('/api/auth/user', tokenConfig(getState))
        .then(res => dispatch({
            type: USER_LOADED,
            payload: res.data
        }))
        .catch(err => {
            dispatch(returnErrors(err.response.data, err.response.status));
            dispatch({
                type: AUTH_ERROR
            });
        });
}

// Register User
export const register = ({ username, email, password }) => dispatch => {
    // Headers
    const config = {
        headers: {
            "Content-type": "application/json"
        }
    };

    // Request body
    const body = JSON.stringify({ username, email, password });

    axios.post('/api/auth/register', body, config)
        .then(res => {
            dispatch({
                type: REGISTER_SUCCESS,
                payload: res.data
            });
            dispatch(createMessage('Registration Successfull'));
        })
        .catch(err => {
            console.log(err.response.data)
            dispatch(createMessage(err.response.data.msg, 'error'));
            dispatch(returnErrors(err.response.data, err.response.status, 'REGISTER_FAIL'));
            dispatch({
                type: REGISTER_FAIL
            })
        });
}

// Login User
export const login = ({ username, password }) => dispatch => {
    // Headers
    const config = {
        headers: {
            "Content-type": "application/json"
        }
    };

    // Request body
    const body = JSON.stringify({ username, password });

    axios.post('/api/auth/login', body, config)
        .then(res => {
            dispatch({
                type: LOGIN_SUCCESS,
                payload: res.data
            });
            dispatch(createMessage('You are now logged in'));
        })
        .catch(err => {
            dispatch(createMessage(err.response.data.msg, 'error'));
            dispatch(returnErrors(err.response.data, err.response.status, 'LOGIN_FAIL'));
            dispatch({
                type: LOGIN_FAIL
            })
        });
}

// Logout User
export const logout = () => (dispatch, getState) => {
    axios
        .post("/api/auth/logout/", null, tokenConfig(getState))
        .then(res => {
            dispatch({
                type: LOGOUT_SUCCESS
            });
            dispatch(createMessage('log out successfull'));
        })
        .catch(err => {
            dispatch(returnErrors(err.response.data, err.response.status));
        });
}

// Setup config/headers and token
export const tokenConfig = getState => {
    
    // Get token from local storage
    const token = getState().auth.token;

    // Headers
    const config = {
        headers: {
            "Content-type": "application/json"
        }
    }

    // If token, add to headers
    if (token) {
        config.headers['Authorization'] = `Token ${token}`;
    }

    return config;
}

