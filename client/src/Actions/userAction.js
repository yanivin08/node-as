//this action use to change password, get all active users and registrations

import { ADD_USER_START, ADD_USER_SUCCESS, ADD_USER_FAILED } from './type';

const addUserStart = () => {
    return {
        type: ADD_USER_START
    }
}

const addUserSuccess = res => {
    if(res.msg){
        if(res.errorType == 'success'){
            return { 
                type: ADD_USER_SUCCESS,
                payload: {},
                msg: res.msg
            }
        }else{
            return { 
                type: ADD_USER_FAILED,
                payload: res.msg
            }
        }
    }else{
        res.length > 1
            ? res.map(x => {
                x.register_date = new Date(x.register_date).toLocaleDateString()
              })
            : res.register_date = new Date(res.register_date).toLocaleDateString()

        return {
            type: ADD_USER_SUCCESS,
            payload: res,
            msg: ""
        }
    }
}

const addUserFailed = err => {
    return {
        type: ADD_USER_FAILED,
        payload: err
    }
}

export const addUser = (data) => {
    
    const { first_name,second_name,email,position,user_type,department } = data;
    const password = "password12345"

    return (dispatch) => {
        dispatch(addUserStart());
        fetch('/user/register', {
            method: 'POST',
            headers: {
                'Accept':'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                'username': first_name,
                first_name,
                second_name,
                email,
                position,
                user_type,
                department,
                password
            })
        })
        .then(res => res.json())
        .then(res => {
            dispatch(addUserSuccess(res))
        })
        .catch((err) => {
            dispatch(addUserFailed(err))
        })
    }
}

export const getUsers = (token) => {

    return (dispatch) => {
        dispatch(addUserStart());
        fetch('/user/users', {
            method: 'GET',
            headers: {
                'Accept':'application/json',
                'Content-Type': 'application/json',
                'x-auth-token': token
            }
        })
        .then(res => res.json())
        .then(res => {
            dispatch(addUserSuccess(res))
        })
        .catch((err) => {
            dispatch(addUserFailed(err))
        })
    }
}

export const getInfo = (token) => {
    return (dispatch) => {
        dispatch(addUserStart());
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
            dispatch(addUserSuccess(res))
        })
        .catch((err) => {
            dispatch(addUserFailed(err))
        })
    }
}

export const changePass = (token,data) => {
    //change_password
    return (dispatch) => {
        dispatch(addUserStart());
        fetch('/user/change_password', {
            method: 'POST',
            headers: {
                'Accept':'application/json',
                'Content-Type': 'application/json',
                'x-auth-token': token
            },
            body: JSON.stringify(data)
        })
        .then(res => res.json())
        .then(res => {
            dispatch(addUserSuccess(res))
        })
        .catch((err) => {
            dispatch(addUserFailed(err))
        })
    }
}

export const changeInfo = (token,data) => {
    //change_info
    return (dispatch) => {
        dispatch(addUserStart());
        fetch('/user/change_info', {
            method: 'POST',
            headers: {
                'Accept':'application/json',
                'Content-Type': 'application/json',
                'x-auth-token': token
            },
            body: JSON.stringify(data)
        })
        .then(res => res.json())
        .then(res => {
            dispatch(addUserSuccess(res))
        })
        .catch((err) => {
            dispatch(addUserFailed(err))
        })
    }
}