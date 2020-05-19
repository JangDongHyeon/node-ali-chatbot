import {
    CHAT_DATACOL,
    GET_DATACOL,
    ERR_DATACOL,

} from '../actions/types';

const initialState = {
    dataCol: [],
    loading: true,
    error: null,
};

export default function (state = initialState, actions) {
    const {
        type,
        payload
    } = actions;

    switch (type) {
        case GET_DATACOL:
            return {
                ...state,
                dataCol: payload,
                loading: false,
            };
        case CHAT_DATACOL:
            return {
                ...state,
                dataCol: [...state, payload],
                loading: false,
            };
        case ERR_DATACOL:
            return {
                ...state,
                error: payload,
                loading: false,
            };

        default:
            return state;
    }
}