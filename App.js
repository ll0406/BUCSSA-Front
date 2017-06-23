import { AppRegistry, Alert } from 'react-native'
import {Provider} from 'react-redux'
import React, { Component } from 'react'
import store from './app/store';

//Import App Container
import App from './app'

export default const AppWithStore = () => (
  <Provider store={store}>
    <App />
  </Provider>
)
