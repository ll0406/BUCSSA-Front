import React, { Component } from 'react';
import {AppRegistry, View} from 'react-native';
import {Actions} from 'react-native-router-flux'
import { Content, Container, InputGroup, Input , Left, Body,Card, CardItem ,Text, Header, Button, Toast } from 'native-base';


export default class ChatPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      text: 'Enter Mail',
    };
    this.recipientName = this.props.recipient.name;
  }

  componentWillMount(){
  }

  onSubmit(){
    Toast.show({
             text: 'Sent',
             position: 'bottom',
             buttonText: 'Okay',
             duration: 3000
    });
  }

  // If you type something in the text box that is a color, the background will change to that
  // color.
  render() {
    return (
      <Container>
        <Header/>
        <Content>
           <Card>
                       <CardItem>
                         <Body>
                           <Text>
                              发送至: {this.recipientName}
                           </Text>
                         </Body>
                       </CardItem>
            </Card>

            <InputGroup underline>
                       <Input
                       style={{height:300}}
                       multiline={true}
                       placeholder={this.state.text}
                       numberOfLines = {4}
                       onChangeText={(text) => this.setState({text})}
                        />
            </InputGroup>

             <Button full onPress={() => this.onSubmit()}>
               <Text>发送</Text>
             </Button>
          </Content>
        </Container>
    );
  }
}
