import { RECEIVE_MESSAGELIST, RECEIVE_MESSAGE,
  REQUEST_MESSAGELIST, REQUEST_MESSAGE, DELETE_MESSAGE } from '../constants';
import { REHYDRATE } from 'redux-persist/constants';

const initialState = {
  isFetchingList: false,
  isFetchingMessage: false,
  messageList: [],
  cachedMessages: [],
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
      newState.cachedMessages.unshift(payload);
      if (newState.cachedMessages > 50) {
        newState.cachedMessages.pop();
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
