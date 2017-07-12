import React, { Component } from 'react';
import {
  View,
  Image,
  DatePickerIOS
} from 'react-native';
import {Actions} from 'react-native-router-flux';
import {Content, Container, Header, Button, Text} from 'native-base';
import moment from 'moment';

class DatePick extends Component {
  constructor(props) {
      super(props);
      const { bd } = this.props;
      this.state = {
        date: bd,
      };

      debugger;
  }


  onDateChange = (date) => {
    this.setState({date: date});
  };

  onSubmit = () => {
    const { dispatch, submitAction } = this.props;
    dispatch(submitAction(this.state.date));
    Actions.pop({refresh:{}}); //triigers rerender
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
        <Button full onPress={this.onSubmit}>
          <Text>保存</Text>
        </Button>
      </Content>
    </Container>
  )
  }

}

export default DatePick;
