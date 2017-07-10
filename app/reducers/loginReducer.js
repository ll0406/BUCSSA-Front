import {FETCH_LOGIN, RECEIVE_LOGIN, LOGIN_ERROR, SERVER_ERROR} from '../constants';

const initialState={
  isFetching: false,
  errors: [],
  userData: {},
}

function loginReducer(state = initialState, action){
  let newState = Object.assign({}, state);
  const {type, payload, error} = action;

  switch (type) {
    case FETCH_LOGIN: {
      newState.isFetching = true;
      break;
    }
    case RECEIVE_LOGIN: {
      newState.userData = payload;
      newState.errors = [];
      newState.isFetching = false;
      break;
    }
    case LOGIN_ERROR: {
      newState.errors = [];
      newState.errors.push(error);
      newState.isFetching = false;
      break;
    }
    case SERVER_ERROR: {
      newState.errors.push("服务器好像出错了QAQ");
      newState.isFetching = false;
      break;
    }
  }
  return newState;
};

export default loginReducer;
