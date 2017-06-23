import React, { Component } from 'react';
import { Image, TouchableOpacity, View } from 'react-native';
import { Header,Container, Content, Card, CardItem, Thumbnail, Text, Button, Icon, Left,Right, Body } from 'native-base';
import {Actions} from 'react-native-router-flux';

import InboxData from './InboxData'
import NavBarBelow from './Footer'

export default class Inbox extends Component {
  constructor(props) {
    super(props);
  }

  render() {
      return(
        <Container>
          <Header/>
          <Content>
            {InboxData.map((message) => (
            <Card key={message.image}>
              <CardItem>
                <Left>
                    <Thumbnail style={{width: 80, height: 80, borderRadius: 40}}
                      source={message.image} />
                </Left>
                <Body>
                  <Text> </Text>
                  <Text> New Message from: {message.name} </Text>
                </Body>
                <Right>
                  <TouchableOpacity onPress={() => Actions.message({messageObj:message})}>
                    <Icon name="arrow-forward" style={{ color: '#0A69FE' }} />
                  </TouchableOpacity>
                </Right>
              </CardItem>
            </Card>
            ))}
          </Content>
          <NavBarBelow/>
        </Container>
      );
  }

}
