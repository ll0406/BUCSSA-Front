import {FETCH_LOGIN, RECEIVE_LOGIN, LOGIN_ERROR, SERVER_ERROR} from '../constants';
import * as ENDPOINTS from "../endpoints";
import { Actions } from 'react-native-router-flux';

export const requestLogin = () => {
  return {
    type: FETCH_LOGIN,
  }
}

export const receiveLogin = (datas) => {
  return {
    payload: datas,
    type: RECEIVE_LOGIN,
  }
}


export const fetchLogin = (user, pass) => dispatch => {
  let formData = new FormData();
  formData.append('useracc', user);
  formData.append('userpw', pass);

  dispatch(requestLogin());

  fetch(`${ENDPOINTS.BASE}${ENDPOINTS.LOGIN}`, {
        method: 'POST',
        mode: 'cors',
        headers: {
          'Content-Type': 'multipart/form-data',
          'Accept': 'text/html'
        },
        body: formData
      })
      .then(res => res.text())
      .then(
        text => {
          const json = JSON.parse(text);
          if (json.success){
            dispatch(receiveLogin(json.datas))
            Actions.newsPage();
          } else {
            dispatch({
              type: LOGIN_ERROR,
              error: json.error,
            })
          }
        },
        err => {
          dispatch({
            type: SERVER_ERROR,
          })
          console.error(err);
        }
    );
};

export const userAuth = (uid, token) => dispatch => {

  dispatch(requestLogin());

  fetch(`${ENDPOINTS.BASE}${ENDPOINTS.USER_AUTH}?uid=${uid}&token=${token}`)
    .then(res => res.text())
    .then(
      text => {
        const json = JSON.parse(text);
        if (json.success){
          dispatch(receiveLogin(json.datas))
          Actions.newsPage();
        } else {
          dispatch({
            type: LOGIN_ERROR,
            error: json.error,
          })
        }
      },
      err => {
        dispatch({
          type: SERVER_ERROR,
        })
        console.error(err);
      }
    )

}
