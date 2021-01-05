import { AUTH_START, AUTH_SUCCESS, AUTH_FAILED } from '../Actions/type';

const initialState = {
    loading: false,
    error: false,
    message: '',
    data: '',
    isLoggedIn: false,
}

export default function(state = initialState, actions){
    
    switch(actions.type){
        case AUTH_START: 
            return {
                ...state,
                loading: true
            }
        case AUTH_SUCCESS:
            return {
                ...state,
                data: actions.payload,
                isLoggedIn: true   
            }

        case AUTH_FAILED:
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