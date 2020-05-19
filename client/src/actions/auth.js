import axios from 'axios';
import {
    setAlert
} from './alert';
import {
    API
} from '../config';
import {
    REGISTER_SUCCESS,
    REGISTER_FAIL,
    LOGIN_SUCCESS,
    LOGIN_FAIL,
    LOGOUT,
    USER_LOADED,
    AUTH_ERROR,
    CLEAR_PROFILE
} from './types';
import setAuthToken from '../utils/setAuthToken';


export const loadUser = () => async dispatch => {
    if (localStorage.token) {
        setAuthToken(localStorage.token);
    }

    try {
        const res = await axios.get(`${API}/user/me`);

        dispatch({
            type: USER_LOADED,
            payload: res.data
        });
    } catch (err) {
        dispatch({
            type: AUTH_ERROR
        });
    }
};

export const register = ({
    name,
    email,
    password
}) => async dispatch => {
    const config = {
        headers: {
            'Content-Type': 'application/json'
        }
    };

    const body = {
        name,
        email,
        password
    };

    try {
        const res = await axios.post(`${API}/auth/signup`, body, config);
        console.log(res);
        dispatch({
            type: REGISTER_SUCCESS,
            payload: res.data
        });
        dispatch(
            loadUser()
        );
        dispatch(setAlert('Register Success', 'success'));

    } catch (err) {
        dispatch(setAlert(err.response.data.msg, 'warning'));
        dispatch({
            type: REGISTER_FAIL
        });
    }
};

export const login = ({
    email,
    password
}) => async dispatch => {
    const config = {
        headers: {
            'Content-Type': 'application/json'
        }
    };

    const body = {
        email,
        password
    };

    try {
        const res = await axios.post(`${API}/auth/signin`, body, config);

        dispatch({
            type: LOGIN_SUCCESS,
            payload: res.data
        });
        dispatch(
            loadUser()
        );
        dispatch(setAlert('Login Success', 'success'));

    } catch (err) {
        dispatch(setAlert(err.response.data.msg, 'warning'));
        dispatch({
            type: LOGIN_FAIL
        });
    }
};

export const logout = history => async dispatch => {
    await axios.get(`${API}/auth/signout`);

    dispatch({
        type: LOGOUT
    });
    dispatch(setAlert('LogOut Success', 'success'));

    history.push('/signin');
};