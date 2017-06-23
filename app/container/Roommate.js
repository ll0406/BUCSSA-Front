import React, { Component } from 'react';
import { Image, View, TouchableOpacity} from 'react-native';
import { Content, Container, Icon, DeckSwiper, Card, CardItem, Left, Body, Thumbnail, Text, Header, Right, Button } from 'native-base';
import {Actions} from 'react-native-router-flux'
import NavBarBelow from './Footer'
import defaultList from './personData'
import {connect} from 'react-redux';
import {addToPoential} from '../actions/roommateDeck';
import {Col, Row, Grid} from 'react-native-easy-grid';

const mapStateToProps = (state) => ({
  personList: state.reducer.personList,
  potentialList: state.reducer.potentialList
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
      if (this.index== this.list.length)
      {
        this.index = 0
      }
      console.log(this.index);
    }

    swipeLeft(){
      ++this.index;
      if (this.index== this.list.length)
      {
        this.index = 0
      }
      console.log(this.index);
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
                                            <Text>{item.name}</Text>
                                        </Body>
                                    </CardItem>

                                    <CardItem cardBody>
                                        <Image style={{ resizeMode: 'cover', width: null, flex: 1, height: 300 }} source={item.image} />
                                    </CardItem>
                                    <CardItem>
                                        <Icon name="heart" style={{ color: '#ED4A6A' }} />
                                        <Right>
                                          <TouchableOpacity onPress={()=> Actions.personPage({personObj:this.list[this.index]})}>
                                           <Text>More</Text>
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
                              <Thumbnail source={require('./img/heart.png')} />
                            </TouchableOpacity>
                          </Body>
                        </Col>

                      </View>
                  </View>
        );
    }
}
export default connect(mapStateToProps)(RoommateDeck)
