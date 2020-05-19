import {
    GET_CLUBS,
    CLUB_ERROR,
    GET_CLUB,
    ADD_CLUB,
    ADD_CHAT,
    ADD_USER,
    DELETE_USER,
    DELETE_CLUBS,
    GET_USER,
    GET_CLUB_ONLY,
    CLEAR_CLUB
} from '../actions/types'

const initialState = {
    clubs: [],
    club: null,
    chats: [],
    loading: true,
    error: {}
};

export default function (state = initialState, action) {
    const {
        type,
        payload
    } = action;
    switch (type) {
        case GET_CLUBS:
            return {
                ...state,
                clubs: payload,
                loading: false
            }
        case GET_CLUB:
            return {
                ...state,
                club: payload.club,
                chats: payload.chat,
                loading: false
            };
        case CLEAR_CLUB:
            return {
                ...state,
                club: null,
                loading: false
            };
        case GET_CLUB_ONLY:
            return {
                ...state,
                club: payload,
                loading: false
            }
        case DELETE_CLUBS:
            return {
                ...state,
                clubs: state.clubs.filter(
                    club => club._id !== payload
                ),
                loading: false,
            }


        case ADD_CHAT:
            return {
                ...state,
                chats: [...state.chats, payload],
                loading: false
            };
        case DELETE_USER:
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
        case ADD_USER:
            return {
                ...state,
                club: {
                    ...state.club,
                    users: payload
                },
                loading: false
            };
        case ADD_CLUB:
            return {
                ...state,
                clubs: [payload, ...state.clubs],
                loading: false
            }

        case CLUB_ERROR:
            return {
                ...state,
                error: payload,
                loading: false
            };
        default:
            return state;
    }
}