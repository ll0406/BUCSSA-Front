import {
  CLASSMATE_REQUEST,
  RECEIVE_CLASS_COLLECTION,
  REQUEST_CLASS_COLLECTION_FAILED,
  RECEIVE_POSTS,
  RECEIVE_GROUPS,
} from '../constants';
import * as ENDPOINTS from "../endpoints";
import { Actions } from 'react-native-router-flux';


export const addClass = (uid, classId, token) => dispatch => {
  const data = {
    uid,
    classid: eval(classId),
    token,
  }
  fetch(`${ENDPOINTS.BASE}${ENDPOINTS.ADD_CLASS}`, {
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
        console.log("adding success");
        Actions.popTo('classmateHome');
      } else {
        console.log(json);
        console.log("adding fail");
      }
    },
    err => {
      dispatch({
        type: SERVER_ERROR,
      });
      console.err("server err");
    }
  )
}

export const fetchCollection = (uid, token) => dispatch => {
  dispatch({
    type: CLASSMATE_REQUEST,
  });
  fetch(`${ENDPOINTS.BASE}${ENDPOINTS.GET_CLASS_COLLECTION}?uid=${uid}&token=${token}&pageSize=100`)
    .then(res => res.text())
    .then(
      text => {
        const json = JSON.parse(text);
        if (json.success) {
          dispatch(
            {type: RECEIVE_CLASS_COLLECTION,
            payload: json.datas}
          )
        } else {
          console.log("FETCH Class Failed");
          dispatch({
            type: REQUEST_CLASS_COLLECTION_FAILED,
            error: json.error
          });
       }
      },
      err => {
        console.log(err);
      }
    )
}

export const joinGroup = (uid, groupid, token) => {
  const data = {
    uid,
    groupid,
    token,
  }
  fetch(`${ENDPOINTS.BASE}${ENDPOINTS.JOIN_GROUP}`, {
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
        console.log("join success");
      } else {
        console.log(json);
        console.log("join fail");
      }
    },
    err => {
      dispatch({
        type: SERVER_ERROR,
      });
      console.err("server err");
    }
  )
}
