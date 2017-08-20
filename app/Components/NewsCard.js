
import React, { Component } from 'react';
import {
  View,
  Image,
  Alert,
  TouchableOpacity
} from 'react-native';
import {Content, Container, Header, Title, Footer, FooterTab, Button, Left, Right, Body, Text, Thumbnail, CardItem, Card, Spinner} from 'native-base';
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
    const { index } = this.props
    const {tid, postDate, cover, title, summary} = this.props.newsObj

    let sideStyle;
    if (index % 2 == 0){
      sideStyle = {left: 8}
    } else {
      sideStyle = {right: 5}
    }

    return (
      <Card style={{width:180, shadowOpacity:0, borderColor: 'pink'}}>
            <CardItem style={{height:250, backgroundColor: 'pink'}}>
                <Body>
                <TouchableOpacity
                onPress={() => this.goToWeb(
                  `http://demo.bucssa.net/forum.php?mod=viewthread&tid=${tid}&mobile=2`
                )}
                >
                <Image
                style={[{width: 150, height: 150, resizeMode: 'cover', marginBottom:10, borderRadius:25, right:10}, sideStyle]}
                source={{uri: imgPrefix + cover, cache: 'force-cache'}}/>
                </TouchableOpacity>
                <Text style={{fontSize:10, marginBottom:5}}>
                  {postDate}
                </Text>
                <Text style={{fontSize:14, marginBottom:10, fontWeight:'bold'}}>
                  {title}
                </Text>


                </Body>
            </CardItem>
       </Card>
    )
  }
}
