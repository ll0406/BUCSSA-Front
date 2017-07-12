import React, { Component } from 'react';
import { View } from 'react-native';
import { Container, Content, Form, Item, Input, Button, Text, Icon, Spinner } from 'native-base';
import {Actions} from 'react-native-router-flux';
import { Col, Row, Grid } from "react-native-easy-grid";
import { connect } from 'react-redux';

import * as ENDPOINTS from "../endpoints";
import { fetchLogin, userAuth, clearLoginError } from "../actions/loginActions";

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
      cookieLogin: false,
      missingField: false,
    }
  }

  componentWillReceiveProps(nextProps) {
    const { userData, isFetching, errors } = nextProps.loginReducer;
    const { dispatch } = nextProps;
    //If user defined, then try log in with token
    if (userData && !isFetching && errors.length === 0) {
      dispatch(userAuth(userData.uid, userData.token));
      this.setState({cookieLogin: true});
    }

  }

  componentDidMount() {
    console.log("Login MOunt");
  }

  handleLogin = () => {
    const { user, pass } = this.state;
    const { dispatch } = this.props;

    if (user === "" || pass === "") {
      this.setState({
        missingField: true,
      })
      return;
    }
    else {
      this.setState({
        missingField: false,
      })
      dispatch(fetchLogin(user, pass));
    }
  }

  handleGuestLogin = () => {
    const { dispatch } = this.props;
    dispatch(clearLoginError());
    Actions.newsPage();
  }



  render() {
    const {errors, isFetching} = this.props.loginReducer;
    const {cookieLogin, missingField} = this.state;

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

            {
              missingField && <Text style={{color: 'crimson'}}> 请填写完整登录信息 </Text>
            }

            { (errors !== undefined && errors.length !== 0 && !missingField) &&
              errors.map((error, i) => (
                <Text key={i} style={{color: 'crimson'}}> {error} </Text>
            ))}

            {
              isFetching && <Spinner color='black' />
            }
            {
              (isFetching && cookieLogin) &&
              <Text> Token Login </Text>
            }
          </View>
        </View>
      </Container>
    );
  }
}

export default connect(mapStateToProps)(Login)
