import React, { Component } from 'react';
import {
  View,
  StyleSheet,
  Image,
  ActivityIndicator,
  TouchableOpacity,
  Dimensions,
} from 'react-native'
import {
  Text,
  Icon,
  Header,
  Container,
  Content,
  Button,
  Thumbnail,
  Body,
} from 'native-base';
import NavBarBelow from './Footer'
import Swiper from 'react-native-swiper';
import {Actions} from 'react-native-router-flux';
import {Col, Row, Grid} from 'react-native-easy-grid';


export default class homePage extends Component {
  constructor(props) {
    super(props);
    this.state = {}
  }

  componentWillMount() {
  }

  render() {
    let image = {uri: 'http://www.bu.edu/anthrop/files/2015/09/2000px-Boston_University_Wordmark.png'};

    return (
      <Container>
        <Header/>
          <Content >
              <Swiper height={230} loop={true} dot={<View style={styles.swiperDot} />}
                      activeDot={<View style={styles.swiperActiveDot} showsButtons={true} autoplay={true}/>}>
                  <TouchableOpacity onPress={()=> Actions.newsPage()}>
                    <Image style={styles.newsPoster} source={require('./img/card-showcase.png')}/>
                  </TouchableOpacity>

                  <TouchableOpacity>
                      <Image style={styles.newsPoster} source={image} />
                  </TouchableOpacity>

              </Swiper>

              <Grid>

              <Row size={1}>
              <Col>
                <Body>
                  <TouchableOpacity onPress={() => Actions.roommate()}>
                    <Thumbnail style={{width: 80, height: 80, borderRadius: 40}}
                    source={require('../img/roommate_thumb.png')} />
                  </TouchableOpacity>
                </Body>
              </Col>
              <Col>
              <Body>
                <TouchableOpacity onPress={() => Actions.potentialList()}>
                  <Thumbnail style={{width: 80, height: 80, borderRadius: 40}}
                  source={require('../img/roommate_thumb.png')} />
                </TouchableOpacity>
              </Body>

              </Col>


              </Row>

              <Row size={1}></Row>
              <Row size={1}></Row>

              </Grid>

          </Content>
        <NavBarBelow/>
      </Container>
    );
  }
}



const styles = StyleSheet.create({
  newsPoster: {
        height: 205,
        width: Dimensions.get('window').width,
        resizeMode: 'contain',
        position: 'relative',
  },
  swiperDot: {
        backgroundColor:'rgba(4,5,3,.8)',
        width: 8,
        height: 8,
        borderRadius: 4,
        marginLeft: 3,
        marginRight: 3,
        marginTop: 3,
        marginBottom: 0
  },
  swiperActiveDot: {
        backgroundColor: 'cornflowerblue',
        width: 8,
        height: 8,
        borderRadius: 4,
        marginLeft: 3,
        marginRight: 3,
        marginTop: 3,
        marginBottom: 0
  },
})
