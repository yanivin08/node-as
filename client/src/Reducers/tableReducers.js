import { GET_TABLE_START, GET_TABLE_SUCCESS, GET_TABLE_FAILED }  from '../Actions/type';

const initialState = {
    loading: true,
    error: false,
    data: '',
    message: ''
}


export default function(state = initialState, actions){
    
    switch(actions.type){
        case GET_TABLE_START: 
            return {
                ...state,
                loading: true
            }
        case GET_TABLE_SUCCESS:
            return {
                ...state,
                data: actions.payload,
                loading: false
            }

        case GET_TABLE_FAILED:
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