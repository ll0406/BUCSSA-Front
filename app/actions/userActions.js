import {FETCH_LOGIN, RECEIVE_LOGIN, LOGIN_ERROR, SERVER_ERROR,
  INVALIDATE_USER, CLEAR_LOGIN_ERROR, UPDATE_SUCCESS, UPDATE_FAIL} from '../constants';
import * as ENDPOINTS from "../endpoints";
import { Actions } from 'react-native-router-flux';

export const requestLogin = () => {
  return {
    type: FETCH_LOGIN,
  }
}

export const clearLoginError = () => ({
    type: CLEAR_LOGIN_ERROR,
});

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

export const userUpdate = (data) => dispatch => {
  fetch(`${ENDPOINTS.BASE}${ENDPOINTS.USER_UPDATE}`, {
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
      console.log(json);
      dispatch({
        type: UPDATE_SUCCESS,
      })
    },
    err => {
      dispatch({
        type: UPDATE_FAIL,
      })
      console.error(err);
    }
  );
}
export const userAuth = (uid, token) => dispatch => {
  dispatch(requestLogin());
  fetch(`${ENDPOINTS.BASE}${ENDPOINTS.USER_AUTH}?uid=${uid}&token=${token}`)
    .then(res => res.text())
    .then(
      text => {
        const json = JSON.parse(text);
        if (json.success){
          dispatch(receiveLogin(json.datas));
          dispatch(clearLoginError());
          Actions.newsPage();
        } else {
          dispatch(invalidateUser);
          dispatch({
            type: LOGIN_ERROR,
            error: json.error,
          })
        }
      },
      err => {
        dispatch(invalidateUser);
        dispatch({
          type: SERVER_ERROR,
        })
        console.error(err);
      }
    )
}


export const invalidateUser = () => {
  return {
    type: INVALIDATE_USER,
  }
}
