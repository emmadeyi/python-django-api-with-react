import axios from 'axios';
import { returnErrors } from './message';
import { USER_LOADING, USER_LOADED, AUTH_ERROR, LOGIN_SUCCESS, LOGIN_FAIL, LOGOUT_SUCCESS, REGISTER_SUCCESS, REGISTER_FAIL } from './types';


axios.defaults.xsrfCookieName = 'csrftoken';
axios.defaults.xsrfHeaderName = "X-CSRFTOKEN";

//CHECK TOKEN & LOAD USER
export const loadUser = () => (dispatch, getState) => {
    //User Loading
    dispatch({ type: USER_LOADING })

    axios.get('/api/auth/user', tokenConfig(getState))
        .then(res => {
            dispatch({
                type: USER_LOADED,
                payload: res.data
            });
        }).catch(err => {
            dispatch(returnErrors(err.response.data, err.response.status));
            dispatch({
                type: AUTH_ERROR
            })
        })
}

// LOGIN USER
export const login = (username, password) => dispatch => {
    // Request Body
    const body = JSON.stringify({
        username,
        password
    })

    axios.post('/api/auth/login', body, setHeader())
        .then(res => {
            dispatch({
                type: LOGIN_SUCCESS,
                payload: res.data
            });
        }).catch(err => {
            dispatch(returnErrors(err.response.data, err.response.status));
            dispatch({
                type: LOGIN_FAIL
            })
        })

}
// REGISTER USER
export const register = ({ email, username, password }) => dispatch => {
    // Request Body
    const body = JSON.stringify({
        username,
        password,
        email
    })

    axios.post('/api/auth/register', body, setHeader())
        .then(res => {
            dispatch({
                type: REGISTER_SUCCESS,
                payload: res.data
            });
        }).catch(err => {
            dispatch(returnErrors(err.response.data, err.response.status));
            dispatch({
                type: REGISTER_FAIL
            })
        })

}

// LOGOUT USER
export const logout = () => (dispatch, getState) => {

    axios.post('/api/auth/logout', null, tokenConfig(getState))
        .then(res => {
            dispatch({
                type: LOGOUT_SUCCESS,
                payload: res.data
            });
        }).catch(err => {
            dispatch(returnErrors(err.response.data, err.response.status));
            // dispatch({
            //     type: LOGOUT_FAIL
            // })
        })

}

// SETUP CONFIG WITH TOKEN - Helper Function

export const tokenConfig = getState => {
    // Get token from state
    const token = getState().authReducer.token;
    // Headers
    const config = setHeader();

    // If token, add to header config
    if (token) {
        config.headers['Authorization'] = `Token ${token}`;
    }

    return config;
}

export const setHeader = () => {
    return {
        headers: {
            'Content-Type': 'application/json'
        }
    }
}