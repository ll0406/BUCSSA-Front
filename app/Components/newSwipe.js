'use strict';

import React, {Component} from 'react';
import {StyleSheet, View, Image} from 'react-native';

import SwipeCards from 'react-native-swipe-cards';

import NavBarBelow from './Footer'
import { Content, Container, Icon, DeckSwiper, Card, CardItem, Left, Body, Thumbnail, Text, Header, Footer, FooterTab, Button } from 'native-base';


let cardIndex = 0;
const Cards = [
    {
        text: 'Card One',
        name: 'A 子',
        image: require('./img/swiper-1.png'),
        interests:['Party','Photography','Piano'],
    },
    {
        text: 'Card One',
        name: 'B 子',
        image: require('./img/swiper-2.png'),
        interests: ['Party','Photography','Piano'],
    },
    {
        text: 'Card One',
        name: 'C 子',
        image: require('./img/swiper-3.png'),
        interests: ['Party','Photography','Piano'],
    },
    {
        text: 'Card One',
        name: 'D 子',
        image: require('./img/swiper-4.png'),
        interests: ['Party','Photography','Piano'],
    },
    {
        text: 'Card One',
        name: 'E 子',
        image: require('./img/swiper-5.png'),
        interests: ['Party','Photography','Piano'],
    },
    {
        text: 'Card One',
        name: 'F 子',
        image: require('./img/swiper-6.png'),
        interests: ['Party','Photography','Piano'],
    }
];


export default class newSwipe extends Component{
  constructor(props){
      super(props);
      this.state={cards: Cards}
  }

  handleYup (card) {
    console.log(`Yup for ${card.text}`)
  }

  handleNope (card) {
    console.log(`Nope for ${card.text}`)
  }

  render() {
    return (
    <Container>
      <Content>
        <View>
            <SwipeCards
              cards={this.state.cards}
              renderCard={(cardData) =>
                <Card style={{ elevation: 3 }}>
                    <CardItem>
                        <Left>
                            <Thumbnail source={cardData.image} />
                        </Left>
                        <Body>
                            <Text>{cardData.text}</Text>
                            <Text note>NativeBase</Text>
                        </Body>
                    </CardItem>

                    <CardItem cardBody>
                        <Image style={{ resizeMode: 'cover', width: null, flex: 1, height: 300 }} source={cardData.image} />
                    </CardItem>
                    <CardItem>
                        <Icon name="heart" style={{ color: '#ED4A6A' }} />
                        <Text>{cardData.name}</Text>
                    </CardItem>
                </Card>
              }
              loop = {true}
              handleYup={this.handleYup}
              handleNope={this.handleNope}
            />
          </View>
      </Content>
    </Container>
    )
  }
}

const styles = StyleSheet.create({
  card: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    width: 300,
    height: 300,
  }
})
