import { RECEIVE_MESSAGELIST, RECEIVE_NEW_MESSAGE,
  REQUEST_MESSAGELIST, REQUEST_MESSAGE, DELETE_MESSAGE,
  RECEIVE_RESET_MESSAGE, CLEAR_BUFFER, SET_NEW_NUM } from '../constants';
import { REHYDRATE } from 'redux-persist/constants';

const initialState = {
  isFetchingList: false,
  isFetchingMessage: false,
  messageList: [],
  messages: undefined,
  incomingMessage: undefined,
  newNum: 0,
}

function messageReducer (state = initialState, action) {
  let newState = Object.assign({}, state);
  const { type, payload, error } = action;

  switch (type) {
    case REQUEST_MESSAGELIST: {
      newState.isFetchingList = true;
      break;
    }

    case REQUEST_MESSAGE: {
      newState.isFetchingMessage = true;
      break;
    }

    case RECEIVE_MESSAGELIST: {
      newState.isFetchingList = false;
      newState.messageList = payload;
      break;
    }

    case RECEIVE_NEW_MESSAGE: {
      newState.isFetchingMessage = false;
      newState.incomingMessage = {
        payload: payload.messages,
        type: "new"
      }
      newState.newNum = 0;
      break;
    }
    case RECEIVE_RESET_MESSAGE: {
      newState.isFetchingMessage = false;
      newState.messages = payload.messages;
      break;
    }
    case CLEAR_BUFFER: {
      newState.incomingMessage = undefined;
      break;
    }
    case DELETE_MESSAGE: {
      const plidsToDelete = payload;
      newState.messageList = state.messageList.filter(message => {
        return !plidsToDelete.includes(message.plid);
      });
      break;
    }
    case SET_NEW_NUM: {
      newState.newNum = payload;
      break;
    }
    case REHYDRATE: {
      const savedData = payload ? payload.messageReducer : initialState;
      newState = { ...savedData };
      break;
    }
  }
  return newState;
}

export default messageReducer;
