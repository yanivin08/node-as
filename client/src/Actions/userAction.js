import { ADD_USER_START, ADD_USER_SUCCESS, ADD_USER_FAILED } from './type';

const addUserStart = () => {
    return {
        type: ADD_USER_START
    }
}

const addUserSuccess = res => {
    if(res.msg){
        return { 
            type: ADD_USER_FAILED,
            payload: res.msg
        }
    }else{
        
        res.map(x => {
            x.register_date = new Date(x.register_date).toLocaleDateString()
        })    

        return {
            type: ADD_USER_SUCCESS,
            payload: res
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