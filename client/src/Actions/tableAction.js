import { GET_TABLE_START, GET_TABLE_SUCCESS, GET_TABLE_FAILED } from './type';

const getDate = (date) => {
    return new Date(date).toLocaleDateString('en-US', {
        month: '2-digit',day: '2-digit',year: 'numeric'});
}


const getTableStart = () => {
    return {
        type: GET_TABLE_START
    }
}

const getTableSuccess = res => {
    if(res.msg){
        return { 
            type: GET_TABLE_FAILED,
            payload: res.msg
        }
    }

    res.map(x => {
        x.appt_start = new Date(x.appt_start).toLocaleString()
        x.appt_end = new Date(x.appt_end).toLocaleString()
        x.date_extracted = new Date(x.date_extracted).toLocaleString()
    })

    return {
        type: GET_TABLE_SUCCESS,
        payload: res
    }
    
}

const getTableFailed = err => {
    return {
        type: GET_TABLE_FAILED,
        payload: err
    }
}

export const getTable = (token) => {

    return (dispatch) => {
        dispatch(getTableStart());
        fetch('/dashboard', {
            method: 'GET',
            headers: {
                'Accept':'application/json',
                'Content-Type': 'application/json',
                'x-auth-token': token
            }
        })
        .then(res => res.json())
        .then(res => {
            dispatch(getTableSuccess(res))
        })
        .catch((err) => {
            dispatch(getTableFailed(err))
        })
    }
}
