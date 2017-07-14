import React, { Component } from 'react';
import {
  View,
  Image,
  Alert,
  StyleSheet,
  Dimensions,
  ScrollView,
  Text
} from 'react-native';

import {Content, Container, Header, Title, Footer,
  FooterTab, Button, Left, Right, Body, Icon,
  Thumbnail, CardItem, Card, Spinner} from 'native-base';

export default class SideMenu extends Component {
  constructor(props) {
    super(props)
  }

  render() {
    return(
      <View flex={1} flexDirection={'column'} alignItems={'center'}>
        <Text style={[styles.topFont, {marginTop:30}]}> BU </Text>
        <Text style={styles.topFont}> CSSA </Text>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  topFont: {
    fontSize: 40,
    fontWeight: 'bold',
    color: 'red',
    fontFamily: 'AvenirNextCondensed-Heavy'
  }
})
