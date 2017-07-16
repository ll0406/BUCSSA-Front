import React, { Component } from 'react';
import {
  View,
  Image
} from 'react-native';
import { Container, Header, Title, Content, Footer, FooterTab, Button, Left, Right, Body, Icon, Text, Thumbnail} from 'native-base';
import {Actions} from 'react-native-router-flux';

export default class NavBarBelow extends Component{
  render(){
    const goToHome = () => Actions.home();
    const goToNews = () => Actions.newsPage();
    const goToProfile = () => Actions.profilePage();
    const goToInbox = () => Actions.inbox();

    return(
      <Footer>
        <FooterTab>
            <Button transparent onPress={goToHome}>
                <Icon name="ios-apps" style={{color:'pink'}} />
            </Button>
        </FooterTab>
        <FooterTab>
            <Button transparent onPress={goToNews}>
                <Icon  name="ios-home" style={{color:'pink'}} />
            </Button>
        </FooterTab>
        <FooterTab>
            <Button transparent onPress={goToInbox}>
                <Icon name='ios-mail' style={{color:'pink'}}/>
            </Button>
        </FooterTab>

        <FooterTab>
            <Button transparent onPress={goToProfile}>
            <Icon name='ios-person' style={{color:'pink'}} />
            </Button>
        </FooterTab>
      </Footer>
    )
  }
}
