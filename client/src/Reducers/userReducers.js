import { ADD_USER_START, ADD_USER_SUCCESS, ADD_USER_FAILED }  from '../Actions/type';

const initialState = {
    loading: true,
    error: false,
    message: '',
    data: '',
    messageType: ''
}

export default function(state = initialState, actions){
    
    switch(actions.type){
        case ADD_USER_START: 
            return {
                ...state,
                loading: true
            }
        case ADD_USER_SUCCESS:
            return {
                ...state,
                data: actions.payload,
                message: actions.msg,
                loading: false,
                messageType: actions.messageType
            }
        case ADD_USER_FAILED:
            return {
                ...state,
                loading: false,
                error: true,
                message: actions.payload,
                messageType: actions.messageType
            }
        default:
            return state
    }
}
