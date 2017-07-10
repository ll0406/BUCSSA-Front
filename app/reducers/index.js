import {combineReducers} from 'redux';
import reducer from './reducer';
import newsPageReducer from './newsPage';
import loginReducer from './loginReducer';

const appReducer = combineReducers({
  reducer,
  newsPageReducer,
  loginReducer,
});

export default appReducer;
