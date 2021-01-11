import { ADD_USER_START, ADD_USER_SUCCESS, ADD_USER_FAILED } from './type';

const addUserStart = () => {
    return {
        type: ADD_USER_START
    }
}

const addUserSuccess = res => {
    //console.log(res)
    if(res.msg){
        return { 
            type: ADD_USER_FAILED,
            payload: res.msg
        }
    }else{ 
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

export const login = (data) => {
    
    const { username,first_name,second_name,email,position,user_type,department,password } = data;

    return (dispatch) => {
        dispatch(addUserStart());
        fetch('/user/register', {
            method: 'POST',
            headers: {
                'Accept':'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                username,
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