import { combineReducers } from 'redux';
import  dataReducers  from './dataReducers';
import loginReducers from './loginReducers';
import authReducers from './authReducers';

export default combineReducers({
    data: dataReducers,
    user: loginReducers,
    auth: authReducers
})