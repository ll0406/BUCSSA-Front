import { RECEIVE_MESSAGELIST, RECEIVE_NEW_MESSAGE,
  REQUEST_MESSAGELIST, REQUEST_MESSAGE, DELETE_MESSAGE,
  RECEIVE_OLD_MESSAGE, SET_NEW_NUM } from '../constants';
import * as ENDPOINTS from '../endpoints';
import { Actions } from 'react-native-router-flux';

export const fetchMessageList = (uid, token) => dispatch => {
  dispatch({ type: REQUEST_MESSAGELIST });
  fetch(`${ENDPOINTS.BASE}${ENDPOINTS.GET_MESSAGE_LIST}?uid=${uid}&token=${token}`)
  .then(res => res.text())
  .then(
    text => {
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

export const fetchMessage = (uid, plid, daterange, type, page, pageSize, token, fetchType) => dispatch => {
  dispatch({ type: REQUEST_MESSAGE });
  fetch(`${ENDPOINTS.BASE}${ENDPOINTS.GET_MESSAGE}?uid=${uid}&plid=${plid}&daterange=${daterange}&type=${type}&page=${page}&pageSize=${pageSize}&token=${token}`)
  .then(res => res.text())
  .then(
    text => {
      const json = JSON.parse(text);
      if (json.success) {
        const messageData = json.datas.map(message => {
          return {
            _id: message.pmid,
            text: message.message,
            createdAt: new Date(eval(message.dateline)*1000),
            user: {
              _id: eval(message.authorid),
              name: message.author,
              avatar: message.authoravatar,
            },
            pmid: message.pmid,
          }
        });
        const data = {
          messages: messageData.reverse(),
        }
        if (fetchType === "new") {
          dispatch({
            type: RECEIVE_NEW_MESSAGE,
            payload: data,
          })
        } else {

        }
      }
    },
    err => {
      console.error(err);
    }
  )
}


export const requestDeleteMessage = (uid, plids, types, token) => dispatch => {
  dispatch({
    type: DELETE_MESSAGE,
    payload: plids,
  });
  const data = {
    uid,
    plids: plids.join(),
    types: types.join(),
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

export const checkNewMessage = (uid, plid, lastpmid, token) => dispatch => {
  fetch(`${ENDPOINTS.BASE}${ENDPOINTS.CHECK_NEW_MESSAGE}?uid=${uid}&plid=${plid}&lastpmid=${lastpmid}&token=${token}`)
  .then(res => res.text())
  .then(
    text => {
      const json = JSON.parse(text);
      if (json.success) {
        dispatch({
          type: SET_NEW_NUM,
          payload: json.newNum,
        })
      }
    }, err => {
      console.error(err);
    }
  )
}

export const requestMessageByOffset = (uid, plid, type, pmid, offset, token) => dispatch => {
  dispatch({ type: REQUEST_MESSAGE });
  fetch(`${ENDPOINTS.BASE}${ENDPOINTS.GET_MESSAGE_BYOFFSET}?uid=${uid}&plid=${plid}&type=${type}&pmid=${pmid}&offset=${offset}&token=${token}`)
  .then(res => res.text())
  .then(
    text => {
      const json = JSON.parse(text);
      if (json.success) {
        const messageData = json.datas.map(message => {
          return {
            _id: message.pmid,
            text: message.message,
            createdAt: new Date(eval(message.dateline)*1000),
            user: {
              _id: eval(message.authorid),
              name: message.author,
              avatar: message.authoravatar,
            },
            pmid: message.pmid,
          }
        });
        const data = {
          messages: messageData.reverse(),
        }
        if (pmid === 0) {
          dispatch({
            type: RECEIVE_NEW_MESSAGE,
            payload: data,
          })
        } else {
          dispatch({
            type: RECEIVE_OLD_MESSAGE,
            payload: data,
          })
        }
      }
    },
    err => {
      console.error(err);
    }
  )
}

export const replyMessage = (uid, username, plid, message, token) => dispatch => {
  const data = {
    uid,
    username,
    plid,
    message,
    token
  }
  fetch(`${ENDPOINTS.BASE}${ENDPOINTS.REPLY}`, {
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
        console.log("replying success");
      } else {
        console.log("replying fail");
      }
    },
    err => {
      console.err("server err");
    }
  )
}

export const setMessageRead = (uid, plids, types ,token) => dispatch => {
  const data = {
    uid,
    plids: plids.join(),
    types: types.join(),
    token
  }
  fetch(`${ENDPOINTS.BASE}${ENDPOINTS.SET_READ}`, {
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
        console.log("set read success");
      } else {
        console.log("set read fail");
      }
    },
    err => {
      console.err("server err");
    }
  )
}
