import React, { Component } from 'react';
import {
  View,
  Image,
  Alert,
  TouchableOpacity,
  ImagePickerIOS,
} from 'react-native';

import {Button, Switch,Form, Input,Header,Right,Icon, ListItem,Picker, Left,Thumbnail,Container, Card,CardItem,Body,Text,Content, Center, Item} from 'native-base';
import {Col, Row, Grid} from 'react-native-easy-grid';
import {Actions} from 'react-native-router-flux';
import NavBarBelow from './Footer'
import {connect} from 'react-redux'
import {gChange, sChange, setPhoto} from '../actions/profilePage'


//The props is passed to this level of profilePage
const mapStateToProps = (state) => ({
  profileKeys: state.reducer.profileKeys,
  name: state.reducer.name,
  birthday: state.reducer.bd,
  photoUri: state.reducer.photoUri
})

class ProfilePage extends Component {
  //Probably not necessary
  constructor(props) {
      super(props);
  }


  formatDate(date){
    var monthNames = [
      "January", "February", "March",
      "April", "May", "June", "July",
      "August", "September", "October",
      "November", "December"
    ];

    var day = date.getDate();
    var monthIndex = date.getMonth();
    var year = date.getFullYear();

    return day + ' ' + monthNames[monthIndex] + ' ' + year;
  }

  onGenderChange (value: string) {
    const {dispatch} = this.props
    dispatch(gChange(value))
    this.forceUpdate();
  }
  onStatusChange (value: string) {
    const {dispatch} = this.props
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



  componentWillMount() {
  }



  render() {
    const {profileKeys, name, birthday, photoUri} = this.props
    let actualUri = 'http://s3.amazonaws.com/37assets/svn/765-default-avatar.png'

    if(photoUri != null) {
        actualUri = photoUri
    }

    return (
      <Container>
        <Header/>
          <Content>
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
                  source={{uri: actualUri }}
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
                  <Text>{this.props.name}</Text>
                  <Button transparent
                    >
                    <Icon name="arrow-forward" style={{ color: '#0A69FE' }} />
                  </Button>
              </Right>
            </ListItem>

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
                  selectedValue={profileKeys[0]}
                  onValueChange={this.onGenderChange.bind(this)}>
                  <Item label="男性" value="key0" />
                  <Item label="女性" value="key1" />
                  <Item label="未知" value="key3" />
                </Picker>
                <Button transparent
                  >
                  <Icon name="arrow-forward" style={{ color: '#0A69FE' }} />
                </Button>
               </Right>
            </ListItem>


            <ListItem icon>
               <Left>
                 <Icon name="calendar"/>
               </Left>
               <Body>
                 <Text>生日</Text>
               </Body>
               <Right>
                 <Text>{this.formatDate(birthday)}</Text>
                 <Button transparent
                  onPress={() => Actions.datePick()}
                   >
                   <Icon name="arrow-forward" style={{ color: '#0A69FE' }} />
                 </Button>
               </Right>
             </ListItem>

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

            <ListItem icon>
               <Left>
                 <Icon name="bulb"/>
               </Left>
               <Body>
                 <Text>个人简介</Text>
               </Body>
               <Right>
                 <Text>Nice Guy</Text>
                 <Button transparent
                   >
                   <Icon name="arrow-forward" style={{ color: '#0A69FE' }} />
                 </Button>
               </Right>
             </ListItem>

             <ListItem icon>
               <Left>
                 <Icon name="pulse"/>
               </Left>
               <Body>
                 <Text>公开信息</Text>
               </Body>
               <Right>
                <Switch value={true} />
              </Right>
             </ListItem>
          </Content>
        <NavBarBelow/>
      </Container>
    )
  }
}

export default connect(mapStateToProps)(ProfilePage)
