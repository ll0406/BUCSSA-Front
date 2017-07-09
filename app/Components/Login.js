import React, { Component } from 'react';
import { View } from 'react-native';
import { Container, Content, Form, Item, Input, Button, Text, Icon } from 'native-base';
import {Actions} from 'react-native-router-flux';
import { Col, Row, Grid } from "react-native-easy-grid";

import * as ENDPOINTS from "../endpoints";

export default class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user:"",
      pass:"",
    }
  }

  handleLogin = () => {
    const {user, pass} = this.state;
    console.log(user, pass);
    console.log("Endpoint ==> ", `${ENDPOINTS.BASE}${ENDPOINTS.LOGIN}`);

    const data = JSON.stringify({
      useracc: user,
      userpw: pass,
    });

    fetch(`${ENDPOINTS.BASE}${ENDPOINTS.LOGIN}`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: data
        })
        .then(res => {
          console.log(res);
          res.json()})
        .then(
          json => {console.log(json);},
          err => {console.error(err);}
        )
  }

  render() {
    return (
      <Container>
        <View style={{flex: 10}}>
          <View style={{flex: 3}}>
          </View>
          <View style={{flex: 7, flexDirection: 'column'}}>
            <Form>
              <Item rounded style={{marginBottom: 10, borderRadius: 25, paddingLeft:15 }}>
                <Icon name="ios-person-outline" />
                <Input
                  autoCapitalize='none'
                  placeholder="Username"
                  onChangeText={(text) => this.setState({user: text})}
                />
              </Item>
              <Item rounded style={{marginBottom: 20, borderRadius: 25, paddingLeft:15 }}>
                <Icon name="ios-unlock-outline" />
                <Input
                  autoCapitalize='none'
                  placeholder="Password"
                  secureTextEntry
                  onChangeText={(text) => this.setState({pass: text})}
                />
              </Item>
            </Form>

            <Button block onPress={this.handleLogin}>
              <Text> 登录 </Text>
            </Button>

          </View>
        </View>
      </Container>
    );
  }
}
