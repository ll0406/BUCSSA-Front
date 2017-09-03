import React, { Component } from 'react';
import {
  View,
  Image,
  Text,
  TouchableOpacity,
  StyleSheet,
  Dimensions
} from 'react-native';
import { Container, Header, Title, Content, Button, Left, Right, Body, Icon, Thumbnail} from 'native-base';
import {Actions} from 'react-native-router-flux';
import {Col, Row, Grid} from 'react-native-easy-grid';

export default class Footer extends Component{
  render(){
    const goToHome = () => Actions.home();
    const goToNews = () => Actions.newsPage();
    const goToProfile = () => Actions.profilePage();
    const goToInbox = () => Actions.inbox();

    return(
      <View style={styles.footerView}>
        <Grid>
          <Col style={{justifyContent: 'center', alignItems: 'center'}}>
            <TouchableOpacity
              onPress={() => Actions.newsPage()}
              >
              <Image
                style={styles.footerIcon}
                source={require('../img/home-white.png')}
                />
            </TouchableOpacity>
            <Text style={styles.footerFont}>主页</Text>
          </Col>
          <Col style={{justifyContent: 'center', alignItems: 'center'}}>
            <TouchableOpacity
              onPress={() => Actions.inbox()}
              >
              <Image
                style={styles.footerIcon}
                source={require('../img/message-white.png')}
                />
            </TouchableOpacity>
            <Text style={styles.footerFont}>消息</Text>
          </Col>
          <Col style={{justifyContent: 'center', alignItems: 'center'}}>
            <TouchableOpacity
              onPress={() => Actions.profilePage()}
              >
              <Image
                style={styles.footerIcon}
                source={require('../img/me-white.png')}
                />
            </TouchableOpacity>
            <Text style={styles.footerFont}>账号</Text>
          </Col>
        </Grid>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  footerView: {
    height:  Dimensions.get('window').height * (100/1334),
    width: Dimensions.get('window').width,
    backgroundColor: '#c03431',
    zIndex: 3,
    position: 'absolute',
    top: Dimensions.get('window').height * (1234/1334),
  },
  footerIcon: {
    height: Dimensions.get('window').height * (30/1334),
    width: Dimensions.get('window').width * (90/750),
    marginBottom: Dimensions.get('window').height * (15/1334),
  },
  footerFont: {
    fontSize: 8,
    color: 'white',
  }
})
