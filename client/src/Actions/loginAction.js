import { LOGIN_START, LOGIN_SUCCESS, LOGIN_FAILED } from './type';

const loginStart = () => {
    return {
        type: LOGIN_START
    }
}

const loginSuccess = res => {
    //console.log(res)
    if(res.msg){
        return { 
            type: LOGIN_FAILED,
            payload: res.msg
        }
    }else{ 
        return {
            type: LOGIN_SUCCESS,
            payload: res
        }
    }
}

const loginFailed = err => {
    return {
        type: LOGIN_FAILED,
        payload: err
    }
}

export const login = (user,password) => {
    
    return (dispatch) => {
        dispatch(loginStart());
        fetch('/user/auth', {
            method: 'POST',
            headers: {
                'Accept':'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                username: user,
                password: password
            })
        })
        .then(res => res.json())
        .then(res => {
            dispatch(loginSuccess(res))
        })
        .catch((err) => {
            dispatch(loginFailed(err))
        })
    }
}