import {combineReducers} from 'redux';
import reducer from './reducer';
import newsPageReducer from './newsPage';
import userReducer from './userReducer';
import messageReducer from './messageReducer';
import collectionReducer from './collectionReducer';
import friendsReducer from './friendsReducer';
import classmateReducer from './classmateReducer';

const appReducer = combineReducers({
  reducer,
  newsPageReducer,
  userReducer,
  messageReducer,
  collectionReducer,
  friendsReducer,
  classmateReducer
});

export default appReducer;
