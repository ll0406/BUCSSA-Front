import React, { Component } from 'react';
import { Image, TouchableOpacity, View } from 'react-native';
import { Header,Container, Content, Card, CardItem, Thumbnail, Text, Button, Icon, Left,Right, Body } from 'native-base';
import {Actions} from 'react-native-router-flux';
import {connect} from 'react-redux';
var similarity = require( 'compute-cosine-similarity' );


const mapStateToProps = (state) => ({
  potentialList: state.reducer.potentialList,
  prefObj: state.reducer.preference
})

class PotentialList extends Component {
  constructor(props) {
    super(props);
    this.pref = this.props.prefObj;
  }
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
  render() {
    if (this.props.potentialList.length == 0){
      return(
        <Container>
          <Header/>
          <Content>
            <View style={{
                    flex:1, flexDirection: 'column',
                    justifyContent: 'center',
                    alignItems: 'center'}}>
                  <Image source={require('./img/questionMark.png')} style={{resizeMode:'contain', width: 345, height: 345}} />
            </View>
          </Content>
        </Container>
      );
    }
      return(
        <Container>
          <Header/>
          <Content>
            {this.props.potentialList.map((person) => (
            <Card key={person.image}>
              <CardItem>
                <Left>
                    <Thumbnail style={{width: 80, height: 80, borderRadius: 40}}
                      source={person.image} />
                </Left>
                <Body>
                  <Text> Name: {person.name} </Text>
                  <Text> Class:  {person.class} </Text>
                  <Text> Matching: {this.calScore(person).toFixed(0)}% </Text>
                </Body>
                <Right>
                  <TouchableOpacity onPress={() => Actions.personPage({personObj:person})}>
                    <Icon name="arrow-forward" style={{ color: '#0A69FE' }} />
                  </TouchableOpacity>
                </Right>
              </CardItem>
            </Card>
            ))}
          </Content>
        </Container>
      );
  }

}


export default connect(mapStateToProps)(PotentialList)
