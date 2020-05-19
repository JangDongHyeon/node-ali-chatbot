import axios from 'axios';
import {
    setAlert
} from './alert';
import {
    API
} from '../config';
import {
    GET_TRANSS,
    TRANSS_ERROR,
    DELETE_TRANS,
    ADD_TRANS,
    GET_TRANS,
    TRANS_ADD_CHAT,
    TRANS_ADD_USER,
    TRANS_DELETE_USER,
    GET_USER,
    GET_TRANS_ONLY,
    CLEAR_TRANS
} from './types';

export const create = (FormData, history) => async (dispatch) => {
    try {
        const res = await axios.post(`${API}/trans/room/new`, FormData);

        dispatch({
            type: ADD_TRANS,
            payload: res.data,
        });

        history.push('/trans/rooms');

        dispatch(setAlert('Success Add club', 'success'));
    } catch (err) {

        dispatch({
            type: TRANSS_ERROR,
            payload: {
                msg: err.response.data.msg,
                status: err.response.status,
            },
        });
    }
};

export const deleteClub = (id) => async (dispatch) => {
    try {
        await axios.delete(`${API}/trans/room/delete/${id}`);

        dispatch({
            type: DELETE_TRANS,
            payload: id
        })
        dispatch(setAlert('Success Delete Club', 'success'));
    } catch (err) {
        dispatch({
            type: TRANSS_ERROR,
            payload: {
                msg: err.response.data.msg,
                status: err.response.status,
            },
        });
    }
}


export const updateClub = (id, formData, history) => async (dispatch) => {
    try {
        const res = axios.put(`${API}/trans/room/update/${id}`, formData);

        dispatch({
            type: ADD_TRANS,
            payload: res.data,
        });

        history.push('/trans/rooms');

        dispatch(setAlert('Success Update club', 'success'));

    } catch (err) {
        dispatch({
            type: TRANSS_ERROR,
            payload: {
                msg: err.response.data.msg,
                status: err.response.status,
            },
        });
    }
}


export const getClubs = () => async (dispatch) => {
    try {
        dispatch({
            type: CLEAR_TRANS
        });

        const res = await axios.get(`${API}/trans/rooms`);

        dispatch({
            type: GET_TRANSS,
            payload: res.data,
        });
    } catch (err) {

        dispatch({
            type: TRANSS_ERROR,
            payload: {
                msg: err.response.data.msg,
                status: err.response.status,
            },
        });
    }
};

export const addClub = (socket, id, history) => async (dispatch) => {
    try {
        await axios.post(`${API}/trans/user/join/${id}`);
        socket.emit('groupRoom', () => {
            socket.close()
        });
        history.push(`/trans/chat/${id}`);
    } catch (err) {
        dispatch({
            type: TRANSS_ERROR,
            payload: {
                msg: err.response.data.msg,
                status: err.response.status,
            },
        });
    }
};


export const getClub = (id, trans) => async (dispatch) => {
    try {
        const res = await axios.get(`${API}/trans/${id}`);


        dispatch({
            type: GET_TRANS,
            payload: res.data,
        });
    } catch (err) {
        dispatch({
            type: TRANSS_ERROR,
            payload: {
                msg: err.response.data.msg,
                status: err.response.status,
            },
        });
    }
};

export const addClubChat = (socket, text, id, trans, language) => async (dispatch) => {
    try {
        const res = await axios.post(`${API}/trans/send/${id}`, {
            text: text,
            trans: trans,
            language: language
        });
        res.data[0].originText = text;

        socket.emit('createMesage', {
            chatList: res.data,
            room: id,

        });


        dispatch({
            type: TRANS_ADD_CHAT,
            payload: res.data[0],
        });
        if (res.data[1]) {


            dispatch({
                type: TRANS_ADD_CHAT,
                payload: res.data[1],
            });
        }

    } catch (err) {
        dispatch({
            type: TRANSS_ERROR,
            payload: {
                msg: err.response.data.msg,
                status: err.response.status,
            },
        });
    }
};

export const addClubChatItem = (data, id, trans, language) => async (dispatch) => {
    try {
        const res = await axios.post(`${API}/trans/socket/send/${id}`, {
            text: data[0].originText,
            chatId: data[0]._id
        });

        dispatch({
            type: TRANS_ADD_CHAT,
            payload: res.data[0],
        });

        if (res.data[1]) {


            dispatch({
                type: TRANS_ADD_CHAT,
                payload: res.data[1],
            });
        }
    } catch (err) {
        dispatch({
            type: TRANSS_ERROR,
            payload: {
                msg: err.response.data.msg,
                status: err.response.status,
            },
        });
    }
};



export const addClubUserItem = (id) => async (dispatch) => {
    try {
        const res = await axios.get(`${API}/trans/user/${id}`);

        dispatch({
            type: TRANS_ADD_USER,
            payload: res.data,
        });
    } catch (err) {
        dispatch({
            type: TRANSS_ERROR,
            payload: {
                msg: err.response.data.msg,
                status: err.response.status,
            },
        });
    }
};

export const deleteClubUserItem = (id, userId) => async (dispatch) => {
    try {

        const config = {
            headers: {
                'Content-Type': 'application/json'
            }
        };


        const res = await axios.delete(`${API}/trans/user/${id}`, {
            params: {
                userId: userId
            }
        }, config);

        dispatch({
            type: TRANS_DELETE_USER,
            payload: res.data,
        });
    } catch (err) {
        dispatch({
            type: TRANSS_ERROR,
            payload: {
                msg: err.response.data.msg,
                status: err.response.status,
            },
        });
    }
};

export const modeUpdate = (formData, id) => async (dispatch) => {
    try {

        const config = {
            headers: {
                'Content-Type': 'application/json'
            }
        };
        const res = await axios.patch(`${API}/trans/mode/update/${id}`, formData, config);


        dispatch({
            type: GET_TRANS_ONLY,
            payload: res.data,
        });

    } catch (err) {
        dispatch({
            type: TRANSS_ERROR,
            payload: {
                msg: err.response.data.msg,
                status: err.response.status,
            },
        });
    }
}

export const modeChangeSocket = (data) => async (dispatch) => {

    try {
        dispatch({
            type: GET_TRANS_ONLY,
            payload: data,
        });

    } catch (err) {
        dispatch({
            type: TRANSS_ERROR,
            payload: {
                msg: err.response.data.msg,
                status: err.response.status,
            },
        });
    }
}