import React, { Component } from 'react';
import {
  View,
  Image,
  Alert,
  TouchableOpacity,
  ImagePickerIOS,
  DatePickerIOS,
  StyleSheet,
  Text
} from 'react-native';
import DateTimePicker from 'react-native-modal-datetime-picker';
import Modal from 'react-native-modalbox';
import DropdownAlert from 'react-native-dropdownalert'
import {Button, Switch,Form, Input,Header,Right,Icon,
        ListItem,Picker, Left,Thumbnail,Container, Card,CardItem,
        Body,Content, Center, Item, Radio} from 'native-base';
import {Col, Row, Grid} from 'react-native-easy-grid';
import {Actions} from 'react-native-router-flux';
import {connect} from 'react-redux';
import moment from 'moment';

import NavBarBelow from './Footer';
import {gChange, sChange, setPhoto, setBD} from '../actions/profilePage';
import { userUpdate } from '../actions/userActions';
import {INVALIDATE_USER, DISMISS_ALERT} from '../constants';



//The props is passed to this level of profilePage
const mapStateToProps = (state) => ({
  profileKeys: state.reducer.profileKeys,
  defaultName: state.reducer.name,
  defaultBirthday: state.reducer.bd,
  photoUri: state.reducer.photoUri,
  user: state.userReducer.userData,
  changeDetected: state.userReducer.changeDetected,
  alert: state.userReducer.alert,
})

class ProfilePage extends Component {
  //Probably not necessary
  constructor(props) {
      super(props);
      const {defaultBirthday, user} = this.props

      let displayBD = defaultBirthday;
      if (user !== undefined) {
        displayBD = this.parseDate(user.dateOfBirth);
        displayBD.setMinutes( displayBD.getMinutes() + displayBD.getTimezoneOffset());
      }
      this.state = {
        birthday: displayBD,
        pickerDate: displayBD,
        dateModified: false,
      }
  }

  parseDate(input) {
    let parts = input.split('-');
    // new Date(year, month [, day [, hours[, minutes[, seconds[, ms]]]]])
    return new Date(parts[0], parts[1]-1, parts[2]);
  }


  formatDate(date){
    let monthNames = [
      "January", "February", "March",
      "April", "May", "June", "July",
      "August", "September", "October",
      "November", "December"
    ];
    const day = date.getDate();
    const monthIndex = date.getMonth();
    const year = date.getFullYear();

    return day + ' ' + monthNames[monthIndex] + ' ' + year;
  }

  onGenderChange (value: string) {
    const {dispatch} = this.props
    dispatch(gChange(value))
    this.forceUpdate();
  }
  onStatusChange (value: string) {
    const {dispatch} = this.props;
    dispatch(sChange(value))
    this.forceUpdate();
  }

  pickImage() {
    // openSelectDialog(config, successCallback, errorCallback);
    ImagePickerIOS.openSelectDialog({}, imageUri => {
      const {dispatch} = this.props
      dispatch(setPhoto(imageUri))
      this.forceUpdate();
    }, error => {});
  }

  handleLogout = () => {
    const {dispatch} = this.props;
    dispatch({
      type: INVALIDATE_USER,
    });
    Actions.login();

  }

  showBdPicker = () => {
    this.refs.bdPicker.open();
  }

  handleDatePicked = () => {
    const {dispatch} = this.props;
    this.setState({
      birthday: this.state.pickerDate,
      dateModified: true,
    });
    dispatch(setBD(this.state.pickerDate));
    this.refs.bdPicker.close();
  }

  handlePickerClose = () => {
    if (!this.state.dateModified) {
      this.setState({
        pickerDate: this.state.birthday,
      })
    } else {
      this.setState({
        dateModified: false
      })
    }
  }


  onDateChange = (date) => {
    this.setState({pickerDate: date});
  };

  handleUserUpdate = () => {
    const { user, dispatch } = this.props;
    let parts = user.dateOfBirth.split('-'); //Why?
    const newInfo = {
      "uid": user.uid,
      "realname": user.realname,
      "gender": user.gender,
      "birthyear": eval(parts[0]),
      "birthmonth": eval(parts[1]),
      "birthday": eval(parts[2])
    }
    dispatch(userUpdate(newInfo));
  }

  handleAlert = (alert) => {
    const { dispatch } = this.props;
    console.log("ALERT is", alert)
    this.dropdown.alertWithType(alert.type, alert.title, alert.message)
    this.handleDismiss();
  }

  handleDismiss = () => {
    const { dispatch } = this.props;
    dispatch({
      type: DISMISS_ALERT,
    })
  }

  componentWillUpdate(nextProps){
    debugger;
    if (nextProps.alert !== undefined) {
      this.handleAlert(nextProps.alert);
    }
  }


  render() {
    const { profileKeys, defaultBirthday, defaultName, photoUri, user, changeDetected, updating } = this.props
    const displayName = user ? user.realname : defaultName;
    const genderIndex = user ? `${user.gender}` : profileKeys[0];

    const defaultPhoto = 'https://image.ibb.co/m8tG7v/123.jpg'
    const picUri = user ? user.avatar['0'] : defaultPhoto

    return (
      <Container>
          <Content>
            <View style={{height:20}}></View>
            <Grid>
              <Row size={1}>
              </Row>
              <Row size={4}>
              </Row>
            </Grid>
            <Card>
            <CardItem>
              <Left>
              <Body>
              <Right>
                <TouchableOpacity onPress={()=>this.pickImage()}>
                  <Thumbnail style={{width: 100, height: 100, borderRadius: 50}}
                  source={{uri: picUri }}
                  />
                </TouchableOpacity>

              </Right>
              </Body>
              </Left>

            </CardItem>
           </Card>

           <ListItem icon>
              <Left>
                <Icon name="person"/>
              </Left>
              <Body>
                <Text>用户名</Text>
              </Body>
              <Right>
                  <Text>{displayName}</Text>
                  <Button transparent
                    >
                    <Icon name="arrow-forward" style={{ color: '#0A69FE' }} />
                  </Button>
              </Right>
            </ListItem>

          { user &&
              <ListItem icon>
              <Left>
              <Icon name="male"/>
              </Left>
              <Body>
              <Text>性别</Text>
              </Body>
              <Right>
              <Picker
              iosHeader="性别"
              mode="dropdown"
              selectedValue={genderIndex}
              onValueChange={this.onGenderChange.bind(this)}>
              <Item label="男性" value="1" />
              <Item label="女性" value="2" />
              <Item label="未知" value="3" />
              </Picker>
              <Button transparent
              >
              <Icon name="arrow-forward" style={{ color: '#0A69FE' }} />
              </Button>
              </Right>
              </ListItem>
            }

            { user &&
              <ListItem icon>
              <Left>
              <Icon name="calendar"/>
              </Left>
              <Body>
              <Text>生日</Text>
              </Body>
              <Right>
              <Text>{this.formatDate(this.state.birthday)}</Text>
              <Button transparent
              onPress={this.showBdPicker}
              >
              <Icon name="arrow-forward" style={{ color: '#0A69FE' }} />
              </Button>
              </Right>
              </ListItem>
            }

            {
              user &&
              <ListItem icon>
              <Left>
              <Icon name="heart"/>
              </Left>
              <Body>
              <Text>感情状况</Text>
              </Body>
              <Right>
              <Picker
              iosHeader="感情状况"
              mode="dropdown"
              selectedValue={profileKeys[1]}
              onValueChange={this.onStatusChange.bind(this)}>
              <Item label="未知" value="key3" />
              <Item label="单身" value="key0" />
              <Item label="交往中" value="key1" />
              <Item label="已订婚" value="key2" />
              <Item label="已婚" value="key4" />
              <Item label="分居" value="key5" />
              <Item label="离婚" value="key6" />
              <Item label="鳏寡" value="key7" />
              </Picker>
              <Button transparent
              >
              <Icon name="arrow-forward" style={{ color: '#0A69FE' }} />
              </Button>
              </Right>
              </ListItem>
            }

            {
              user &&
              <ListItem icon>
              <Left>
              <Icon name="bulb"/>
              </Left>
              <Body>
              <Text>个人简介</Text>
              </Body>
              <Right>
              <Text>Nice Guy</Text>
              <Button transparent>
              <Icon name="arrow-forward" style={{ color: '#0A69FE' }} />
              </Button>
              </Right>
              </ListItem>
            }

              <ListItem itemDivider>
                <Text></Text>
              </ListItem>

            {
                (user && changeDetected) &&
                <ListItem icon>
                <Left>
                <Icon name="cloud-upload" style={{ color: 'blue' }}/>
                </Left>
                <Body>
                <Text style={{color: 'blue'}}> 保存信息 </Text>
                </Body>
                <Right>
                <Button transparent onPress={this.handleUserUpdate}>
                <Icon name="arrow-forward" style={{ color: 'blue' }} />
                </Button>
                </Right>
                </ListItem>
            }
            {
              user ?
                <ListItem icon>
                <Left>
                <Icon name="log-out" style={{ color: 'crimson' }}/>
                </Left>
                <Body>
                <Text style={{color: 'crimson'}}> 登出 </Text>
                </Body>
                <Right>
                <Button transparent onPress={this.handleLogout}>
                <Icon name="arrow-forward" style={{ color: 'crimson' }} />
                </Button>
                </Right>
                </ListItem>
              :
                <ListItem icon>
                <Left>
                <Icon name="log-in" style={{ color: 'blue' }}/>
                </Left>
                <Body>
                <Text style={{color: 'blue'}}> 登录 </Text>
                </Body>
                <Right>
                <Button transparent onPress={Actions.login}>
                <Icon name="arrow-forward" style={{ color: 'blue' }} />
                </Button>
                </Right>
                </ListItem>

            }
          </Content>
        <Modal
          style={styles.bdPickerModal}
          position={"bottom"}
          ref={"bdPicker"}
          onClosed={this.handlePickerClose}
          >
          <View style={styles.modalTopContainer}>
            <Text style={styles.modalTopText}> 选择你的生日 </Text>
          </View>
          <DatePickerIOS
          date={this.state.pickerDate}
          mode="date"
          onDateChange={this.onDateChange}
          />
          <View>
            <Button block primary onPress={this.handleDatePicked}>
              <Text style={styles.buttonText}>
                确认
              </Text>
             </Button>
          </View>
        </Modal>
        <NavBarBelow/>
        <DropdownAlert
        ref={(ref) => this.dropdown = ref}
        successColor={'pink'}
        />
      </Container>
    )
  }
}

const styles = StyleSheet.create({
  modalTopContainer: {
    alignItems: 'center',
  },

  modalTopText: {
    fontWeight: 'bold',
    fontSize: 20,
  },

  buttonText: {
    fontSize: 20,
    color: 'white',
  },
  wrapper: {
    paddingTop: 50,
    flex: 1
  },
  bdPickerModal: {
    justifyContent: 'flex-start',
    height: 300
  }
});




export default connect(mapStateToProps)(ProfilePage)
