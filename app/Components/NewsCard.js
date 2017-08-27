
import React, { Component } from 'react';
import {
  View,
  Text,
  Image,
  Alert,
  TouchableOpacity,
  Dimensions,
  StyleSheet,
} from 'react-native';

import { Card, ListItem, Button, Icon } from 'react-native-elements'
import {Actions} from 'react-native-router-flux'
import {Col, Row, Grid} from 'react-native-easy-grid';


export default class NewsCard extends Component {
  constructor(props) {
    super(props);
    this.news = this.props.newsObj;
  }

  goToWeb(link) {
    return Actions.webPage({this_url:link});
  }

  render() {
    const imgPrefix = "http://demo.bucssa.net/"
    const { index } = this.props
    const {tid, postDate, cover, title, author} = this.props.newsObj

    const viewHeight = title.length / 22.0 * 22.0 + 22.0;


    return (
      <View style={{
        width: Dimensions.get('window').width * (61/75),
        paddingBottom: 20,
        backgroundColor: 'white'
      }}>
          <Grid>
            <Col size={0.2} style={{alignItems:'flex-start', backgroundColor: 'gray', marginRight: 10}}>
            </Col>
            <Col size={12}>
              <TouchableOpacity onPress={() => this.goToWeb(
                  `http://demo.bucssa.net/forum.php?mod=viewthread&tid=${tid}&mobile=2`
                )}>
                <Text style={{fontSize: 14, fontWeight: 'bold', marginBottom: 5}}>{title}</Text>
                <Text style={{fontSize: 10}}> by {author}, {postDate} </Text>
              </TouchableOpacity>
            </Col>
            <Col size={2} style={{justifyContent: 'center', alignItems: 'flex-end'}}>
            <Icon
              name='ios-heart-outline'
              type='ionicon'
              color='red'
              onPress={() => console.log('hello')} />
            </Col>
          </Grid>
       </View>
    )
  }
}

const styles = StyleSheet.create({
  newsCard: {
    width: Dimensions.get('window').width * (61/75),
    height: Dimensions.get('window').height * (90/1334),
    shadowOpacity: 0,
    borderColor: 'red',
    marginBottom: 20
  }
})
