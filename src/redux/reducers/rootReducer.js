import {combineReducers} from 'redux';
import auth from './auth/reducer';
import socket from './Socket/reducers'

const rootReducer = combineReducers({
  auth,
  socket
});

export default rootReducer;
