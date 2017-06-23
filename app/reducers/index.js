import {combineReducers} from 'redux';
import reducer from './reducer';
import newsPageReducer from './newsPage';

const appReducer = combineReducers({
  reducer,
  newsPageReducer,
});

export default appReducer;
