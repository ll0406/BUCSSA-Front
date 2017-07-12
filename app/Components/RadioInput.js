import React, { Component } from 'react';
import {connect} from 'react-redux'

import { Container, Content, ListItem, Text, Radio, Right } from 'native-base';



export default class RadioButtonExample extends Component {

  constructor(props) {
    super(props);
  }


  render() {
    return (
      <Container>
        <Content>
          <ListItem>

            <Text>Daily Stand Up</Text>
            <Right>
              <Radio selected={false} />
            </Right>
          </ListItem>
          <ListItem>
            <Text>Discussion with Client</Text>
            <Right>
              <Radio selected={true} />
            </Right>
          </ListItem>
        </Content>
      </Container>
    );
  }
}
