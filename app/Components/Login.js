import React, { Component } from 'react';
import { View } from 'react-native';
import { Container, Content, Form, Item, Input, Button, Text, Icon, Spinner } from 'native-base';
import {Actions} from 'react-native-router-flux';
import { Col, Row, Grid } from "react-native-easy-grid";
import { connect } from 'react-redux';

import * as ENDPOINTS from "../endpoints";
import { fetchLogin } from "../actions/loginActions";

const mapStateToProps = (state) => {
  console.log(state);
  const {loginReducer} = state;
  return {loginReducer};
}

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user:"",
      pass:"",
    }
  }

  handleLogin = () => {
    const { user, pass } = this.state;
    const { dispatch } = this.props;
    dispatch(fetchLogin(user, pass));
  }

  render() {
    console.log("PRops", this.props);
    const {errors, isFetching} = this.props.loginReducer;

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

            <Button block onPress={this.handleLogin} style={{marginBottom: 20}}>
              <Text> 登录 </Text>
            </Button>

            {errors !== [] &&
              errors.map(error => (
                <Text> {error} </Text>
              ))}

            {
              isFetching && <Spinner />
            }

          </View>
        </View>
      </Container>
    );
  }
}

export default connect(mapStateToProps)(Login)
