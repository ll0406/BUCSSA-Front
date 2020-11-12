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
      this.state = {
        date: new Date(),
      };
  }

  parseDate(input) {
    let parts = input.split('-');
    // new Date(year, month [, day [, hours[, minutes[, seconds[, ms]]]]])
    return new Date(eval(parts[0]), eval(parts[1]-1), eval(parts[2]));
  }

  componentDidMount () {
    const { bd } = this.props;
    this.setState({
      date: this.parseDate(bd),
    })
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
        <Text> {this.props.bd} </Text>
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
