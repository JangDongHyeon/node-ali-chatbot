import axios from 'axios';
import { API } from '../config';
import { CHAT_DATACOL, GET_DATACOL, ERR_DATACOL } from './types';

export const dataColChat = (text, id) => async (dispatch) => {
    try {
        let textTrim = text.trim();
        const res = await axios.post(`${API}/dataCol/chat/${id}`, {
            text: textTrim,
        });


        dispatch({
            type: CHAT_DATACOL,
            payload: res.data,
        });
    } catch (err) {
        console.log(err.response);
        dispatch({
            type: ERR_DATACOL,
            payload: {
                msg: err.response.data.msg,
                status: err.response.status,
            },
        });
    }
};

export const dataColGet = (id) => async (dispatch) => {
    try {
        const res = await axios.get(`${API}/dataCol/get/${id}`);


        dispatch({
            type: GET_DATACOL,
            payload: res.data,
        });
    } catch (err) {
        console.log(err.response);
        dispatch({
            type: ERR_DATACOL,
            payload: {
                msg: err.response.data.msg,
                status: err.response.status,
            },
        });
    }
};


export const dataColRoomAdd = (history) => async (dispatch) => {
    try {
        const res = await axios.post(`${API}/dataCol/room/`);

        history.push(`/dataCol/room/${res.data}`);
    } catch (err) {
        // console.log(err.response);
        // dispatch({
        //     type: PERSONAL_ERROR,
        //     payload: {
        //         msg: err.response.data.msg,
        //         status: err.response.status
        //     }
        // });
    }
};
