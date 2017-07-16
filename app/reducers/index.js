import {combineReducers} from 'redux';
import reducer from './reducer';
import newsPageReducer from './newsPage';
import userReducer from './userReducer';

const appReducer = combineReducers({
  reducer,
  newsPageReducer,
  userReducer,
});

export default appReducer;
