import axios from 'axios';
import {
    setAlert
} from './alert';
import {
    API
} from '../config';
import {
    GET_CLUBS,
    CLUBS_ERROR,
    DELETE_CLUBS,
    ADD_CLUB,
    GET_CLUB,
    ADD_CHAT,
    ADD_USER,
    DELETE_USER,
    GET_USER,
    GET_CLUB_ONLY,
    CLEAR_CLUB
} from './types';

export const create = (FormData, history) => async (dispatch) => {
    try {
        const res = await axios.post(`${API}/alice/room/new`, FormData);

        dispatch({
            type: ADD_CLUB,
            payload: res.data,
        });

        history.push('/alice/rooms');

        dispatch(setAlert('Success Add club', 'success'));
    } catch (err) {
        console.log(err.response);
        dispatch({
            type: CLUBS_ERROR,
            payload: {
                msg: err.response.data.msg,
                status: err.response.status,
            },
        });
    }
};

export const deleteClub = (id) => async (dispatch) => {
    try {
        await axios.delete(`${API}/alice/room/delete/${id}`);

        dispatch({
            type: DELETE_CLUBS,
            payload: id
        })
        dispatch(setAlert('Success Delete Club', 'success'));
    } catch (err) {
        dispatch({
            type: CLUBS_ERROR,
            payload: {
                msg: err.response.data.msg,
                status: err.response.status,
            },
        });
    }
}


export const updateClub = (id, formData, history) => async (dispatch) => {
    try {
        const res = axios.put(`${API}/alice/room/update/${id}`, formData);

        dispatch({
            type: ADD_CLUB,
            payload: res.data,
        });

        history.push('/alice/rooms');

        dispatch(setAlert('Success Update club', 'success'));

    } catch (err) {
        dispatch({
            type: CLUBS_ERROR,
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
            type: CLEAR_CLUB
        });

        const res = await axios.get(`${API}/alice/rooms`);

        dispatch({
            type: GET_CLUBS,
            payload: res.data,
        });
    } catch (err) {
        console.log(err.response);
        dispatch({
            type: CLUBS_ERROR,
            payload: {
                msg: err.response.data.msg,
                status: err.response.status,
            },
        });
    }
};

export const addClub = (socket, id, history) => async (dispatch) => {
    try {
        await axios.post(`${API}/alice/user/join/${id}`);
        socket.emit('groupRoom', () => {
            socket.close()
        });
        history.push(`/alice/chat/${id}`);
    } catch (err) {
        dispatch({
            type: CLUBS_ERROR,
            payload: {
                msg: err.response.data.msg,
                status: err.response.status,
            },
        });
    }
};


export const getClub = (id) => async (dispatch) => {
    try {
        const res = await axios.get(`${API}/alice/${id}`);
        dispatch({
            type: GET_CLUB,
            payload: res.data,
        });
    } catch (err) {
        dispatch({
            type: CLUBS_ERROR,
            payload: {
                msg: err.response.data.msg,
                status: err.response.status,
            },
        });
    }
};

export const addClubChat = (socket, text, id) => async (dispatch) => {
    try {
        const res = await axios.post(`${API}/alice/send/${id}`, {
            text: text,
        });


        socket.emit('createMesage', {
            chatList: res.data,
            room: id
        });


        dispatch({
            type: ADD_CHAT,
            payload: res.data[0],
        });
        if (res.data[1]) {


            dispatch({
                type: ADD_CHAT,
                payload: res.data[1],
            });
        }

    } catch (err) {
        dispatch({
            type: CLUBS_ERROR,
            payload: {
                msg: err.response.data.msg,
                status: err.response.status,
            },
        });
    }
};

export const addClubChatItem = (data) => async (dispatch) => {
    try {



        dispatch({
            type: ADD_CHAT,
            payload: data[0],
        });
        if (data[1]) {
            dispatch({
                type: ADD_CHAT,
                payload: data[1],
            });
        }
    } catch (err) {
        dispatch({
            type: CLUBS_ERROR,
            payload: {
                msg: err.response.data.msg,
                status: err.response.status,
            },
        });
    }
};

export const addClubUserItem = (id) => async (dispatch) => {
    try {
        const res = await axios.get(`${API}/alice/user/${id}`);

        dispatch({
            type: ADD_USER,
            payload: res.data,
        });
    } catch (err) {
        dispatch({
            type: CLUBS_ERROR,
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


        const res = await axios.delete(`${API}/alice/user/${id}`, {
            params: {
                userId: userId
            }
        }, config);

        dispatch({
            type: DELETE_USER,
            payload: res.data,
        });
    } catch (err) {
        dispatch({
            type: CLUBS_ERROR,
            payload: {
                msg: err.response.data.msg,
                status: err.response.status,
            },
        });
    }
};

export const modeUpdate = (formData, id, socket) => async (dispatch) => {
    try {

        const config = {
            headers: {
                'Content-Type': 'application/json'
            }
        };
        const res = await axios.patch(`${API}/alice/mode/update/${id}`, formData, config);
        console.log(res.data);
        socket.emit('modeChange', {
            data: res.data
        });

        dispatch({
            type: GET_CLUB_ONLY,
            payload: res.data,
        });

    } catch (err) {
        dispatch({
            type: CLUBS_ERROR,
            payload: {
                msg: err.response.data.msg,
                status: err.response.status,
            },
        });
    }
}

export const modeChangeSocket = (data) => async (dispatch) => {
    console.log(data);
    try {
        dispatch({
            type: GET_CLUB_ONLY,
            payload: data,
        });

    } catch (err) {
        dispatch({
            type: CLUBS_ERROR,
            payload: {
                msg: err.response.data.msg,
                status: err.response.status,
            },
        });
    }
}