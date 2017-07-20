import { RECEIVE_MESSAGELIST, RECEIVE_MESSAGE,
  REQUEST_MESSAGELIST, REQUEST_MESSAGE, DELETE_MESSAGE } from '../constants';
import { REHYDRATE } from 'redux-persist/constants';

const initialState = {
  isFetchingList: false,
  isFetchingMessage: false,
  messageList: [],
  messages: [],
  currentPage: 0,
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

    case RECEIVE_MESSAGE: {
      newState.isFetchingMessage = false;
      if (JSON.stringify(newState.messages) !== JSON.stringify(payload.messages)) {
        newState.messages = payload.messages;
        newState.currentPage = payload.currentPage;
      }
      break;
    }

    case DELETE_MESSAGE: {
      const plidsToDelete = payload;
      newState.messageList = state.messageList.filter(message => {
        return !plidsToDelete.includes(message.plid);
      });
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
