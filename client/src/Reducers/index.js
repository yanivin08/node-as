import { combineReducers } from 'redux';
import  dataReducers  from './dataReducers';
import loginReducers from './loginReducers';
import authReducers from './authReducers';
import tableReducers from './tableReducers';

export default combineReducers({
    data: dataReducers,
    user: loginReducers,
    auth: authReducers,
    table: tableReducers
})