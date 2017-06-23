import React, { Component } from 'react'
import {Router} from 'react-native-router-flux';
import scenes from './scenes'
import SplashScreen from 'react-native-splash-screen'

export default class extends Component {
  render() {
    return <Router scenes={scenes}/>
  }
}
