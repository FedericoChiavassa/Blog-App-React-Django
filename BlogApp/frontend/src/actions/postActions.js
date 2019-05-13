import axios from 'axios';
import { GET_POSTS, GET_POST, ADD_POST, UPDATE_POST, DELETE_POST, POSTS_LOADING, CLEAR_POST_STATE, GET_USER_POSTS, GET_POSTS_PER_PAGE } from './types';
import { tokenConfig } from "./authActions";
import { returnErrors } from "./errorActions";
import { createMessage } from './messageActions';

export const getPosts = () => dispatch => {
    dispatch(setPostsLoading());
    axios.get('/api/posts')
        .then(res => dispatch({
            type: GET_POSTS,
            payload: res.data
        }))

};

export const getPostsOfPage = (id) => dispatch => {
    dispatch(setPostsLoading());
    axios.get(`/api/posts/page${id}`)
        .then(res => dispatch({
            type: GET_POSTS_PER_PAGE,
            payload: res.data
        }))

};

export const getUserPosts = (id) => dispatch => {
    dispatch(setPostsLoading());
    axios.get(`/api/posts/user/${id}`)
        .then(res => dispatch({
            type: GET_USER_POSTS,
            payload: res.data
        }))

};

export const deletePost = (id) => (dispatch, getState) => {
    axios.delete(`/api/posts/${id}/`, tokenConfig(getState))
    .then(res => {
        dispatch({
            type: DELETE_POST,
            payload: id
        });
        dispatch(createMessage('Post Deleted'));
    })
    .catch(err => dispatch(
        returnErrors(err.response.data, err.response.status)
    ));

};

export const addPost = (post) => (dispatch, getState) => {
    dispatch(clearPostState());
    axios.post('/api/posts/', post, tokenConfig(getState))
        .then(res => {
            dispatch({
                type: ADD_POST,
                payload: res.data
            });
            dispatch(createMessage('New Post Created'));
        })
        .catch(err => {
            dispatch(returnErrors(err.response.data, err.response.status));
        });
};

export const getPost = (id) => (dispatch) => {
    dispatch(setPostsLoading());
    axios.get(`/api/posts/${id}`)
        .then(res => dispatch({
            type: GET_POST,
            payload: res.data
        }))
};

export const updatePost = (id, post) => (dispatch, getState) => {
    dispatch(clearPostState());
    axios.put(`/api/posts/${id}`, post, tokenConfig(getState))
        .then(res => {
            dispatch({
                type: UPDATE_POST,
                payload: res.data
            });
            dispatch(createMessage('Post Updated'));
        })
        .catch(err => dispatch(
            returnErrors(err.response.data, err.response.status)
        ));
};

export const setPostsLoading = () => {
    return {
        type: POSTS_LOADING,
    };
};

export const clearPostState = () => {
    return {
        type: CLEAR_POST_STATE,
    };
};