import { GET_TABLE_START, GET_TABLE_SUCCESS, GET_TABLE_FAILED }  from '../Actions/type';

const initialState = {
    loading: false,
    error: false,
    data: '',
    message: ''
}


export default function(state = initialState, actions){
    
    switch(actions.type){
        case GET_ITEMS_START: 
            return {
                ...state,
                loading: true
            }
        case GET_ITEMS_SUCCESS:
            return {
                ...state,
                data: actions.payload
            }

        case GET_ITEMS_FAILED:
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