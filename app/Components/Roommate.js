import React, { Component } from 'react';
import { Image, View, TouchableOpacity} from 'react-native';
import { Content, Container, Icon, DeckSwiper, Card, CardItem, Left, Body, Thumbnail, Text, Header, Right, Button } from 'native-base';
import {Actions} from 'react-native-router-flux'
import NavBarBelow from './Footer'
import defaultList from './personData'
import {connect} from 'react-redux';
import {addToPoential} from '../actions/roommateDeck';
import {Col, Row, Grid} from 'react-native-easy-grid';
import _ from 'lodash';
var similarity = require( 'compute-cosine-similarity' );

/*
The DeckSwiper has two Property:
onSwipeRight()
onSwipeLeft()
When each of the function is called, pop the first element in list,
add to the end of the list.

Do not update the list immeaditely
but rather use ComponentWillDismount to call the update list function

*/

const mapStateToProps = (state) => ({
  personList: state.reducer.personList,
  potentialList: state.reducer.potentialList,
  prefObj: state.reducer.preference
})

class RoommateDeck extends Component {
  constructor(props) {
    super(props);
    this.state = {
    }
    this.index = 0;
    this.list = defaultList;
    if (this.props.personList.length > 0) {
      this.list = this.props.personList
    }
    this.pref = this.props.prefObj;
  }

  /*
  interests: ['Basketball','Game'],
  class: 2018,
  major: ['Biology'],
  numLiveWith: 2,
  preferArea: ['Allston', 'Brookline'],
  priceRange: [1400,1600],
  smoke: false,
  pet: false

  */
  calScore(person) {
    let score = 0;
    let arrayCount = 0;

    for (i = 0;i < this.pref.interests.length;i++) {
      if(_.includes(person.interests, this.pref.interests[i])){
        arrayCount++;
      }
    }
    score += arrayCount/this.pref.interests.length
    arrayCount = 0

    if(person.class == this.pref.class){
      ++score;
    }

    for (i = 0;i < this.pref.major.length;i++) {
      if(_.includes(person.major, this.pref.major[i])){
        arrayCount++;
      }
    }
    score += arrayCount/this.pref.major.length;
    arrayCount = 0;


    if(this.pref.numLiveWith > person.numLiveWith){
      score += person.numLiveWith / this.pref.numLiveWith;
    }
    else{
      score += this.pref.numLiveWith/person.numLiveWith
    }


    for (i = 0;i < this.pref.preferArea.length;i++) {
      if(_.includes(person.preferArea, this.pref.preferArea[i])){
        arrayCount++;
      }
    }
    score += arrayCount/this.pref.preferArea.length;
    arrayCount = 0;

    score += similarity(this.pref.priceRange, person.priceRange);

    if(this.pref.smoke == person.smoke){
      score++;
    }

    if(this.pref.pet == person.pet){
      score++;
    }


    return (score/8.0) * 100
  }

  //https://github.com/coolaj86/knuth-shuffle
  shuffle() {
    var array = this.list;
    var currentIndex = array.length, temporaryValue, randomIndex;

    // While there remain elements to shuffle...
    while (0 !== currentIndex) {

      // Pick a remaining element...
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex -= 1;

      // And swap it with the current element.
      temporaryValue = array[currentIndex];
      array[currentIndex] = array[randomIndex];
      array[randomIndex] = temporaryValue;
    }
    this.list = array;
  }

    swipeRight(){
      const {dispatch} = this.props;
      dispatch(addToPoential(this.list[this.index]));
      ++this.index;
      if (this.index == this.list.length) {
        this.index = 0;
      }
    }

    swipeLeft(){
      ++this.index;
      if (this.index == this.list.length) {
        this.index = 0;
      }
    }

    pushSwipeLeft() {
      this.deckSwiper.swipeLeft();
    }

    render() {
        this.shuffle();
        return (
                  <View style={{flex:5.5, flexDirection: 'column'}}>
                    <View style={{flex: 4.5}}>
                        <Header/>
                        <DeckSwiper
                            ref={(ds)=> {this.deckSwiper=ds;}}
                            onSwipeLeft={()=> this.swipeLeft()}
                            onSwipeRight={() => this.swipeRight()}
                            dataSource={this.list}
                            renderItem={item =>
                                <Card style={{ elevation: 3 }}>
                                    <CardItem>
                                        <Left>
                                            <Thumbnail source={item.image} />
                                        </Left>
                                        <Body>
                                            <Text> </Text>
                                            <Text style={{fontSize:20}}>{item.name}</Text>
                                        </Body>
                                    </CardItem>

                                    <CardItem cardBody>
                                        <Image style={{ resizeMode: 'cover', width: null, flex: 1, height: 300 }} source={item.image} />
                                    </CardItem>
                                    <CardItem>
                                        <Icon name="heart" style={{ color: '#ED4A6A' }} />
                                        <Text>匹配率: {this.calScore(item).toFixed(2)}%</Text>

                                        <Right>
                                          <TouchableOpacity onPress={() => Actions.personPage({personObj:this.list[this.index]})}>
                                           <Text style={{color: 'dodgerblue'}}>查看TA更多</Text>
                                          </TouchableOpacity>
                                        </Right>
                                    </CardItem>
                                </Card>
                            }
                        />
                      </View>
                      <View style={{flex:1, flexDirection:'row', justifyContent: 'space-around', alignItems: 'center'}}>
                        <Col>
                          <Body>
                            <TouchableOpacity onPress={()=> {this.deckSwiper._root.swipeLeft(); this.swipeLeft();}}>
                              <Thumbnail source={require('./img/left-arrow.png')} />
                            </TouchableOpacity>
                          </Body>
                        </Col>

                        <Col>
                          <Body>
                            <TouchableOpacity onPress={()=> {this.deckSwiper._root.swipeRight(); this.swipeRight();}}>
                              <Thumbnail source={{uri:'http://pre12.deviantart.net/3682/th/pre/f/2015/040/2/6/pixel_heart_by_zetype-d8hctv1.png'}} />
                            </TouchableOpacity>
                          </Body>
                        </Col>

                      </View>
                  </View>
        );
    }
}
export default connect(mapStateToProps)(RoommateDeck)
