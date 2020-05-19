import {
    PERSONAL_GET,
    PERSONAL_CHAT_ADD,
    PERSONAL_ERROR,
    PERSONAL_CLEAR
} from '../actions/types';

const initialState = {
    personal: [],
    loading: true,
    error: null,
};

export default function (state = initialState, actions) {
    const {
        type,
        payload
    } = actions;

    switch (type) {
        case PERSONAL_GET:
            return {
                ...state,
                personal: payload,
                loading: false,
            };
        case PERSONAL_CHAT_ADD:
            return {
                ...state,
                personal: [...state, payload],
                loading: false,
            };
        case PERSONAL_ERROR:
            return {
                ...state,
                error: payload,
                loading: false,
            };
        case PERSONAL_CLEAR:
            return {
                ...state,
                personal: [],
                loading: false,
                error: null
            }
        default:
            return state;
    }
}