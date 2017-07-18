import { RECEIVE_MESSAGELIST, RECEIVE_MESSAGE,
  REQUEST_MESSAGELIST, REQUEST_MESSAGE, DELETE_MESSAGE } from '../constants';
import * as ENDPOINTS from '../endpoints';
import { Actions } from 'react-native-router-flux';

export const fetchMessageList = (uid, token) => dispatch => {
  dispatch({ type: REQUEST_MESSAGELIST });
  fetch(`${ENDPOINTS.BASE}${ENDPOINTS.GET_MESSAGE_LIST}?uid=${uid}&token=${token}`)
  .then(res => res.text())
  .then(
    text => {
      console.log(JSON.parse(text));
      const messageList = JSON.parse(text).datas.map(
        message => {
          return (
            {
              avatar: message.avatar,
              plid: message.plid,
              hasNew: message.hasnew,
              creatorUsername: message.creatorusername,
              lastAuthor: message.lastauthor,
              members: message.members,
              pmType: message.pmtype,
              subject: message.subject,
              dateRange: message.daterange,
              pmNum: message.pmnum,
              toUsername: message.tousername,
              summary: message.summary,
            }
          )
        }
      );
      dispatch({
        type: RECEIVE_MESSAGELIST,
        payload: messageList
      })
    },
    err => {
      console.error(err);
    }
  )
}

export const fetchMessage = (uid, plid, daterange, type, token) => dispatch => {
  dispatch({ type: REQUEST_MESSAGE });
  fetch(`${ENDPOINTS.BASE}${ENDPOINTS.GET_MESSAGE}?uid=${uid}&plid=${plid}&daterange=${daterange}&type=${type}&token=${token}`)
  .then(res => res.text())
  .then(
    text => {
      const json = JSON.parse(text)
      console.log(json);
    },
    err => {
      console.error(err);
    }
  )
}


export const requestDeleteMessage = (uid, plids, token) => dispatch => {
  console.log("DELETE MESSAGE id: ", plids);
  dispatch({
    type: DELETE_MESSAGE,
    payload: plids,
  });
  const data = {
    uid,
    plids: plids.join(),
    token
  }
  fetch(`${ENDPOINTS.BASE}${ENDPOINTS.DELETE_MESSAGE}`, {
    method: 'POST',
    mode: 'cors',
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'text/html'
    },
    body: JSON.stringify(data)
  })
  .then(res => res.text())
  .then(
    text => {
      const json = JSON.parse(text);
      if (json.success) {
        console.log("Delete success");
      } else {
        console.log("Delete fail");
      }
    },
    err => {
      console.err("server err");
    }
  )
}
