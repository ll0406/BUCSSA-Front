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
    let demoUri = 'https://mp.weixin.qq.com/s/TZrZTEK1l4X1lkqHYmm33g'
    return (
      <View style={{flex:6.2, flexDirection: 'column'}}>
        <View style={{flex:0.2}}>
          <Text></Text>
        </View>
        <View style={{flex:2}}>
          <Swiper width={Dimensions.get('window').width} height={205} loop={true} dot={<View style={styles.swiperDot} />}
                  activeDot={<View style={styles.swiperActiveDot} showsButtons={true} autoplay={true}
                  autoplayTimeout={1}/>}>
              <TouchableOpacity>
                  <Image style={styles.newsPoster} source={image} />
              </TouchableOpacity>
              <TouchableOpacity onPress={()=> Actions.webPage({this_url:demoUri})}>
                <Image style={styles.newsPoster} source={require('./img/demo1.png')}/>
              </TouchableOpacity>

          </Swiper>
        </View>
        <View style={{flex:4, flexDirection:'row', justifyContent: 'space-around', alignItems: 'center'}}>
            <Image
              source={require('./img/final_logo.jpg')}
              style={styles.container}>
                <Row size={0.3}></Row>
                <Row size={1}>
                <Col>
                  <Body>
                    <TouchableOpacity onPress={() => Actions.roommate()}>
                      <Thumbnail style={{width: 80, height: 80, borderRadius: 40}}
                      source={{uri: 'https://media.licdn.com/mpr/mpr/shrink_200_200/AAEAAQAAAAAAAAdnAAAAJDliNGJiNDc1LWVhODktNGM4Yi1iM2E4LTU2OWRiZWM2ODgxOQ.png'}} />
                    </TouchableOpacity>
                  </Body>
                </Col>
                <Col>
                  <Body>
                    <TouchableOpacity onPress={() => Actions.potentialList()}>
                      <Thumbnail style={{width: 80, height: 80, borderRadius: 40}}
                      source={{uri: 'https://media.licdn.com/mpr/mpr/shrink_200_200/AAEAAQAAAAAAAAdnAAAAJDliNGJiNDc1LWVhODktNGM4Yi1iM2E4LTU2OWRiZWM2ODgxOQ.png'}} />
                    </TouchableOpacity>
                  </Body>
                </Col>
                <Col>
                  <Body>
                    <TouchableOpacity onPress={() => Actions.webPage({this_url:'My.pdf'})}>
                      <Thumbnail style={{width: 80, height: 80, borderRadius: 40}}
                      source={{uri: 'https://media.licdn.com/mpr/mpr/shrink_200_200/AAEAAQAAAAAAAAdnAAAAJDliNGJiNDc1LWVhODktNGM4Yi1iM2E4LTU2OWRiZWM2ODgxOQ.png'}} />
                    </TouchableOpacity>
                  </Body>
                </Col>
                </Row>

                <Row size={1}>
                  <Col>
                    <Body>
                      <TouchableOpacity>
                        <Thumbnail style={{width: 80, height: 80, borderRadius: 40}}
                        source={{uri: 'https://media.licdn.com/mpr/mpr/shrink_200_200/AAEAAQAAAAAAAAdnAAAAJDliNGJiNDc1LWVhODktNGM4Yi1iM2E4LTU2OWRiZWM2ODgxOQ.png'}} />
                      </TouchableOpacity>
                    </Body>
                  </Col>

                  <Col>
                    <Body>
                      <TouchableOpacity>
                        <Thumbnail style={{width: 80, height: 80, borderRadius: 40}}
                        source={{uri: 'https://media.licdn.com/mpr/mpr/shrink_200_200/AAEAAQAAAAAAAAdnAAAAJDliNGJiNDc1LWVhODktNGM4Yi1iM2E4LTU2OWRiZWM2ODgxOQ.png'}} />
                      </TouchableOpacity>
                    </Body>
                  </Col>

                  <Col>
                    <Body>
                      <TouchableOpacity>
                        <Thumbnail style={{width: 80, height: 80, borderRadius: 40}}
                        source={{uri: 'https://media.licdn.com/mpr/mpr/shrink_200_200/AAEAAQAAAAAAAAdnAAAAJDliNGJiNDc1LWVhODktNGM4Yi1iM2E4LTU2OWRiZWM2ODgxOQ.png'}} />
                      </TouchableOpacity>
                    </Body>
                  </Col>

                </Row>
                <Row size={0.3}></Row>

              </Image>
          </View>
        <NavBarBelow/>
      </View>
    );
  }
}



const styles = StyleSheet.create({
  newsPoster: {
        height: 205,
        width: Dimensions.get('window').width,
        resizeMode: 'cover',
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
  container: {
    flex: 1,
    width: undefined,
    height: undefined,
    backgroundColor:'transparent',
    justifyContent: 'center',
    alignItems: 'center',
    resizeMode: 'cover',
  },
})
