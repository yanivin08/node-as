import { LOGIN_START, LOGIN_SUCCESS, LOGIN_FAILED } from '../Actions/type';

const initialState = {
    loading: false,
    error: false,
    message: '',
    data: '',
    isLoggedIn: false
}

export default function(state = initialState, actions){
    
    switch(actions.type){
        case LOGIN_START: 
            return {
                ...state,
                loading: true
            }
        case LOGIN_SUCCESS:
            return {
                ...state,
                data: actions.payload,
                isLoggedIn: true
            }

        case LOGIN_FAILED:
            return {
                ...state,
                loading: false,
                error: true,
                message: actions.payload
            }
        default:
            return state
    }
}