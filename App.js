import {Provider} from 'react-redux';
import React, { Component } from 'react';
import store from './app/store';

import AppWithScene from './app/index.js';

export default class App extends Component{
    render() {
      return(
        <Provider store={store}>
          <AppWithScene />
        </Provider>
      );
    }
}
