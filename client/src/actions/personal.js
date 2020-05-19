import axios from 'axios';
import { API } from '../config';
import { PERSONAL_CHAT_ADD, PERSONAL_GET, PERSONAL_ERROR, PERSONAL_CLEAR } from './types';

export const personalChat = (text, id) => async (dispatch) => {
    try {
        let textTrim = text.trim();
        const res = await axios.post(`${API}/data_chat/simsim/chat/${id}`, {
            text: textTrim,
        });
        const resq = await axios.get(`${API}/data_chat/simsim/get/${id}`);

        dispatch({
            type: PERSONAL_GET,
            payload: resq.data,
        });
    } catch (err) {
        console.log(err.response);
        dispatch({
            type: PERSONAL_ERROR,
            payload: {
                msg: err.response.data.msg,
                status: err.response.status,
            },
        });
    }
};

export const personalGet = (id) => async (dispatch) => {
    try {
        const res = await axios.get(`${API}/data_chat/simsim/get/${id}`);

        dispatch({
            type: PERSONAL_CLEAR,
            payload: 1
        })

        dispatch({
            type: PERSONAL_GET,
            payload: res.data,
        });
    } catch (err) {
        console.log(err.response);
        dispatch({
            type: PERSONAL_ERROR,
            payload: {
                msg: err.response.data.msg,
                status: err.response.status,
            },
        });
    }
};

export const personalClear = () => async (dispatch) => {
    try {

        dispatch({
            type: PERSONAL_CLEAR,
            payload: 1
        })

    } catch (err) {

    }
}

export const personalRoomAdd = (history) => async (dispatch) => {
    try {
        const res = await axios.post(`${API}/data_chat/simsim/room/`);

        history.push(`/parsonal/room/${res.data}`);
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
