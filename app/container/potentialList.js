import React, { Component } from 'react';
import { Image, TouchableOpacity } from 'react-native';
import { Header,Container, Content, Card, CardItem, Thumbnail, Text, Button, Icon, Left,Right, Body } from 'native-base';
import {Actions} from 'react-native-router-flux';
import {connect} from 'react-redux';



const mapStateToProps = (state) => ({
  potentialList: state.reducer.potentialList
})

class PotentialList extends Component {
  constructor(props) {
    super(props);

  }
  render() {
    if (this.props.potentialList.length == 0){
      return(
        <Container>
          <Header/>
          <Content>
            <Text> No Person Added </Text>
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
                  <Text> {person.name} </Text>
                </Body>
                <Right>
                  <TouchableOpacity>
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
