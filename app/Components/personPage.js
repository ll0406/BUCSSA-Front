import React, { Component } from 'react';
import { Image, View } from 'react-native';
import { Badge, Content, Container, Icon, DeckSwiper, Card, CardItem, Left, Body, Thumbnail, Text, Header, Button } from 'native-base';
import { Actions } from 'react-native-router-flux';

export default class personPage extends Component {
  constructor(props) {
    super(props);
    this.person = this.props.personObj
  }

  renderBoolean(condition){
    if(condition){
      return(
        <Badge danger>
            <Text>Yes</Text>
        </Badge>
      )
    }
    return(
      <Badge danger>
          <Text>No</Text>
      </Badge>
    )
  }

  render() {
    return(
      <Container>
          <Header/>
          <Content>
              <Card style={{ flex: 0 }}>
                  <CardItem bordered>
                      <Left>
                          <Thumbnail source={this.person.image} />
                          <Body>
                              <Text>{this.person.name}</Text>
                              <Text note>{'Class: '.concat(this.person.class)}</Text>
                          </Body>
                      </Left>
                  </CardItem>
                  <CardItem bordered>
                        <View style={{width: 345, height: 345}}>
                          <Image style={{width: 345, height: 345, resizeMode: 'contain' }} source={this.person.image} />
                        </View>
                  </CardItem>

                  <CardItem bordered>
                    <Left>
                      <Text>专业: </Text>
                    </Left>
                    <Body>
                      {this.person.major.map((major) => (
                      <Badge primary key={major}>
                          <Text>{major}</Text>
                      </Badge>
                      ))}
                    </Body>
                  </CardItem>

                  <CardItem bordered>
                    <Left>
                      <Text>兴趣: </Text>
                    </Left>
                    <Body>
                      {this.person.interests.map((interest) => (
                      <Badge success key={interest}>
                          <Text>{interest}</Text>
                      </Badge>
                      ))}
                    </Body>
                  </CardItem>

                  <CardItem bordered>
                    <Left>
                      <Text>理想室友人数: </Text>
                    </Left>
                    <Body>
                      <Badge info>
                          <Text>{this.person.numLiveWith}</Text>
                      </Badge>
                    </Body>
                  </CardItem>

                  <CardItem bordered>
                    <Left>
                      <Text>理想住房区域: </Text>
                    </Left>
                    <Body>
                      {this.person.preferArea.map((area) => (
                      <Badge warning key={area}>
                          <Text>{area}</Text>
                      </Badge>
                      ))}
                    </Body>
                  </CardItem>

                  <CardItem bordered>
                    <Left>
                      <Text>理想价格幅度: </Text>
                    </Left>
                    <Body>
                      <Badge info>
                          <Text>{this.person.priceRange[0].toString().concat(' - '.concat(this.person.priceRange[1].toString()))}</Text>
                      </Badge>
                    </Body>
                  </CardItem>

                  <CardItem bordered>
                    <Left>
                      <Text>🚬: </Text>
                    </Left>
                    <Body>
                    {this.renderBoolean(this.person.smoke)}

                    </Body>
                  </CardItem>

                  <CardItem bordered>
                    <Left>
                      <Text>🐱🐶: </Text>
                    </Left>
                    <Body>
                      {this.renderBoolean(this.person.pet)}
                    </Body>
                  </CardItem>

                  <CardItem bordered>
                    <Left>
                      <Text>微信号: </Text>
                    </Left>
                    <Body>
                      <Badge primary>
                          <Text>{this.person.wechat}</Text>
                      </Badge>
                    </Body>
                  </CardItem>

                  <CardItem bordered>
                              <Button transparent textStyle={{color: '#87838B'}}>
                                  <Text>联系TA</Text>
                              </Button>
                  </CardItem>
             </Card>
          </Content>
      </Container>
    )
  }
}
