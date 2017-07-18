import {combineReducers} from 'redux';
import reducer from './reducer';
import newsPageReducer from './newsPage';
import userReducer from './userReducer';
import messageReducer from './messageReducer';

const appReducer = combineReducers({
  reducer,
  newsPageReducer,
  userReducer,
  messageReducer,
});

export default appReducer;
