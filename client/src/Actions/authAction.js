import { AUTH_START, AUTH_SUCCESS, AUTH_FAILED } from './type';

const authStart = () => {
    return {
        type: AUTH_START
    }
}

const authSuccess = res => {
    if(res.msg){
        return { 
            type: AUTH_FAILED,
            payload: res.msg
        }
    }else{ 
        return {
            type: AUTH_SUCCESS,
            payload: res
        }
    }
}

const authFailed = err => {
    return {
        type: AUTH_FAILED,
        payload: err
    }
}

export const authenticate = (token) => {
    return (dispatch) => {
        dispatch(authStart());
        fetch('/user/auth', {
            method: 'GET',
            headers: {
                'Accept':'application/json',
                'Content-Type': 'application/json',
                'x-auth-token': token
            }
        })
        .then(res => res.json())
        .then(res => {
            dispatch(authSuccess(res))
        })
        .catch((err) => {
            dispatch(authFailed(err))
        })
    }
}