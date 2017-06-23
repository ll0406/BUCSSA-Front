import React, {Component, PropTypes} from 'react';
import {View, Text, Navigator, TouchableHighlight, WebView} from 'react-native';
import {Actions} from 'react-native-router-flux'

export default class NewsWebScene extends Component {
  constructor(props) {
            super(props);
            this.state = {
              loading:true
            };
            console.log(this.props.this_url);
  }

  render() {
    return (
          <WebView
            source={{uri:this.props.this_url}}
            style={{marginTop: 70}}
          />
    )
  }
}
