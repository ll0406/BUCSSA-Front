import React, { Component } from 'react';
import { Container, Content, Form, Item, Input, Button } from 'native-base';
import {Actions} from 'react-native-router-flux';

import * as ENDPOINTS from "../constants"


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
    
  }

  export function queryStringBuilder(query) {
  let queryString = '';

  Object.keys(query).forEach((q, index) => {
    // Remove empty values
    if (query[q] === null || query[q] === 'undefined') {
      queryString += '';
    } else {
      let value = query[q];

      if (Array.isArray(value)) {
        value = value.join();
      }

      if (queryString[0] !== '?') {
        queryString += `?${q}=${value}`;
      } else {
        queryString += `&${q}=${value}`;
      }
    }
  });

  return queryString;
}

  render() {
    return (
      <Container>
        <Content>
          <Form>
            <Item>
              <Input
              placeholder="Username"
              onChangeText={(text) => this.setState({user: text})}
              />
            </Item>
            <Item last>
              <Input placeholder="Password"
              onChangeText={(text) => this.setState({pass: text})}/>
            </Item>
          </Form>

          <Button onPress={this.handleLogin} >

          </Button>

        </Content>
      </Container>
    );
  }
}
