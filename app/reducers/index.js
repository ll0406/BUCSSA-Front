import {combineReducers} from 'redux';
import reducer from './reducer';
import newsPageReducer from './newsPage';
import userReducer from './userReducer';
import messageReducer from './messageReducer';
import collectionReducer from './collectionReducer';

const appReducer = combineReducers({
  reducer,
  newsPageReducer,
  userReducer,
  messageReducer,
  collectionReducer,
});

export default appReducer;
