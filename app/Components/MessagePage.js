import React, { Component } from 'react';
import {AppRegistry, View} from 'react-native';
import {Actions} from 'react-native-router-flux'
import { Content, Container, InputGroup, Input , Left, Body,Card, CardItem ,Text, Header, Button, Toast } from 'native-base';

export default class MessagePage extends Component {
  constructor(props) {
    super(props);
    this.senderName = this.props.messageObj.name;
    this.message = this.props.messageObj.text;
  }

  componentWillMount(){
  }

  // If you type something in the text box that is a color, the background will change to that
  // color.
  render() {
    return (
      <Container>
        <Header/>
        <Content>
           <Card>
                       <CardItem bordered>
                         <Body>
                           <Text>
                              来自: {this.senderName}
                           </Text>
                         </Body>
                       </CardItem>

                       <CardItem>
                       <Body>
                         <Text>
                            {this.message}
                         </Text>
                       </Body>
                       </CardItem>

            </Card>
          </Content>
        </Container>
    );
  }
}
