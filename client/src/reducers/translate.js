

import {
    GET_TRANSS,
    TRANSS_ERROR,
    GET_TRANS,
    ADD_TRANS,
    TRANS_ADD_CHAT,
    TRANS_ADD_USER,
    TRANS_DELETE_USER,
    DELETE_TRANS,
    GET_TRANS_ONLY,
    CLEAR_TRANS
} from '../actions/types'

const initialState = {
    clubs: [],
    club: null,
    chats: [],
    loading: true,
    mode: null,
    error: {}
};

export default function (state = initialState, action) {
    const {
        type,
        payload
    } = action;
    switch (type) {
        case GET_TRANSS:
            return {
                ...state,
                clubs: payload,
                loading: false
            }
        case GET_TRANS:
            return {
                ...state,
                club: payload.club,
                chats: payload.chat,
                mode: payload.mode,
                loading: false
            };
        case CLEAR_TRANS:
            return {
                ...state,
                club: null,
                loading: false
            };
        case GET_TRANS_ONLY:
            return {
                ...state,
                mode: payload.mode,
                chats: payload.chat,
                loading: false
            }
        case DELETE_TRANS:
            return {
                ...state,
                clubs: state.clubs.filter(
                    club => club._id !== payload
                ),
                loading: false,
            }


        case TRANS_ADD_CHAT:
            return {
                ...state,
                chats: [...state.chats, payload],
                loading: false
            };
        case TRANS_DELETE_USER:
            return {
                ...state,
                club: {
                    ...state.club,
                    users: state.club.users.filter(
                        user => user._id !== payload
                    )
                },
                loading: false
            }
        case TRANS_ADD_USER:
            return {
                ...state,
                club: {
                    ...state.club,
                    users: payload
                },
                loading: false
            };
        case ADD_TRANS:
            return {
                ...state,
                clubs: [payload, ...state.clubs],
                loading: false
            }

        case TRANSS_ERROR:
            return {
                ...state,
                error: payload,
                loading: false
            };
        default:
            return state;
    }
}