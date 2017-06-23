
import React, { Component } from 'react';
import {
  View,
  Image,
  Alert
} from 'react-native';
import {Content, Container, Header, Title, Footer, FooterTab, Button, Left, Right, Body, Icon, Text, Thumbnail, CardItem, Card, Spinner} from 'native-base';
import {Actions} from 'react-native-router-flux'

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
    const {tid, postDate, cover, title, summary} = this.props.newsObj
    return (
      <Card>
            <CardItem bordered>
                <Left>
                    <Thumbnail square source={require('../img/one.png')}/>
                    <Body>
                      <Text>{title}</Text>
                      <Text note>{postDate}</Text>
                    </Body>
                </Left>
            </CardItem>

            <CardItem>
                <Body>
                    <Image
                      style={{ width:340, height:220, resizeMode: 'contain' }}
                      source={{uri: imgPrefix + cover}}/>
                    <Text>
                      {summary}...
                    </Text>
                </Body>
            </CardItem>
            <CardItem>
            <Right>
              <Button transparent textStyle={{color: '#87838B'}}
                onPress={() => this.goToWeb(
                  `http://demo.bucssa.net/forum.php?mod=viewthread&tid=${tid}&mobile=2`
                )}
              >
                  <Text>详情</Text>
              </Button>
            </Right>
            </CardItem>
       </Card>
    )
  }
}
