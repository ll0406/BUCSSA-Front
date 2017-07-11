import React, { Component } from 'react';
import {
  View,
  Image,
  DatePickerIOS
} from 'react-native';
import {Actions} from 'react-native-router-flux';
import {Content, Container, Header, Button, Text} from 'native-base';
import {connect} from 'react-redux'
import moment from 'moment';

import {setBD} from '../actions/profilePage'

const mapStateToProps = (state) => ({
  birthday: state.reducer.bd,
  user: state.loginReducer.userData
})

class DatePick extends Component {

  constructor(props) {
      super(props);
      const { user, birthday } = this.props;
      this.state = {
        date:  user ? moment(user.dateOfBirth)._d : birthday,
      };
  }


  onDateChange = (date) => {
    this.setState({date: date});
  };

  onSubmit = () => {
    const {dispatch} = this.props;
    dispatch(setBD(this.state.date));
    Actions.pop();
  }

  render() {


    return(
    <Container>
      <Header/>
      <Content>
        <DatePickerIOS
          date={this.state.date}
          mode="date"
          onDateChange={this.onDateChange}
        />
        <Button full onPress={() => this.onSubmit()}>
          <Text>保存</Text>
        </Button>
      </Content>
    </Container>
  )
  }

}

export default connect(mapStateToProps)(DatePick)
