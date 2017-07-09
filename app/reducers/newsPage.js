import {
  RECEIVE_NEWS,
  RECEIVE_NEWS_ERROR,
  SET_NEWSOFFSET,
  REQUEST_NEWS,
} from '../constants';

const initialState = {
    isFetching: false,
    errors:[],
    newsList:[],
    newsOffset: 0,
};

function newsPageReducer(state = initialState, action){
  let newState = Object.assign({}, state);
  const {type, payload} = action

  switch (type) {
    case SET_NEWSOFFSET: {
      newState.newsOffset = payload
      break;
    }
    case REQUEST_NEWS: {
      newState.isFetching = true;
      break;
    }
    case RECEIVE_NEWS: {
      newState.isFetching = false;
      newState.newsList = newState.newsList.concat(payload);
      break;
    }
  }
  return newState
};

export default newsPageReducer;
