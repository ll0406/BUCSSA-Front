import React, { Component } from 'react';
import { View } from 'react-native';
import { Container, Content, Form, Item, Input, Button, Text, Icon, Spinner } from 'native-base';
import {Actions} from 'react-native-router-flux';
import { Col, Row, Grid } from "react-native-easy-grid";
import { connect } from 'react-redux';

import * as ENDPOINTS from "../endpoints";
import { fetchLogin, userAuth } from "../actions/loginActions";

const mapStateToProps = (state) => {
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

  componentWillReceiveProps(nextProps) {
    console.log("WIll Receive Props => ", nextProps);
    const { userData, isFetching, errors } = nextProps.loginReducer;
    const { dispatch } = nextProps;
    //If user defined, then try log in with token
    if (userData && !isFetching && errors.length === 0) {
      dispatch(userAuth(userData.uid, userData.token))
    }
  }

  componentDidMount() {
    console.log("Login MOunt");
  }

  handleLogin = () => {
    const { user, pass } = this.state;
    const { dispatch } = this.props;
    dispatch(fetchLogin(user, pass));
  }

  handleGuestLogin = () => {
    Actions.newsPage();
  }



  render() {
    const {errors, isFetching} = this.props.loginReducer;

    return (
      <Container>
        <View style={{flex: 10}}>
          <View style={{flex: 3}}>
          </View>
          <View style={{flex: 5, flexDirection: 'column'}}>
            <Form>
              <Item rounded style={{marginBottom: 10, borderRadius: 25, paddingLeft:15 }}>
                <Icon name="ios-person-outline" />
                <Input
                  autoCapitalize='none'
                  placeholder="Username"
                  onChangeText={(text) => this.setState({user: text})}
                />
              </Item>
              <Item rounded style={{marginBottom: 50, borderRadius: 25, paddingLeft:15 }}>
                <Icon name="ios-unlock-outline" />
                <Input
                  autoCapitalize='none'
                  placeholder="Password"
                  secureTextEntry
                  onChangeText={(text) => this.setState({pass: text})}
                />
              </Item>
            </Form>

            <Button block onPress={this.handleLogin} style={{marginBottom: 5}}>
              <Text> 登录 </Text>
            </Button>
            <Button block onPress={this.handleGuestLogin} style={{marginBottom: 5}}>
              <Text> 游客登录 </Text>
            </Button>

          </View>
          <View style={{flex: 2, flexDirection: 'column', alignItems: 'center'}}>

            {errors !== [] &&
              errors.map(error => (
                <Text> {error} </Text>
              ))}

            {
              isFetching && <Spinner color='black' />
            }
          </View>
        </View>
      </Container>
    );
  }
}

export default connect(mapStateToProps)(Login)
