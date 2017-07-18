/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
  View,
  Image,
  Alert,
  StyleSheet,
  Dimensions,
  ScrollView,
  TouchableOpacity
} from 'react-native';
import {Content, Container, Header, Title, Footer,
  FooterTab, Button, Left, Right, Body, Text,
  Thumbnail, CardItem, Card, Spinner} from 'native-base';

import Drawer from 'react-native-drawer'

import {Col, Row, Grid} from 'react-native-easy-grid';

import {Actions} from 'react-native-router-flux'

import NavBarBelow from './Footer'
import NewsCard from './NewsCard'
import NewsWebScene from './NewsWebScene'

import {connect} from 'react-redux';
import {setNewsOffset, fetchNews, receiveNews} from '../actions/newsPage'
import defaultNews from './newsData'
import SideMenu from './SideMenu'

//The props is passed to this level of newsPage
const mapStateToProps = (state) => ({
  initialOffset: state.newsPageReducer.newsOffset,
  newsList: state.newsPageReducer.newsList,
  isFetching: state.newsPageReducer.isFetching,
})

class NewsP extends Component {
  constructor(props) {
    super(props);
    this.state = {
      offset: this.props.initialOffset,
      listLength: this.props.newsList.length, //Will change later
      contentHeight: 0,
    }
  }

  setCurrentReadOffset = (event) => {
    const yCoord = (event.nativeEvent.contentOffset.y);
    if (yCoord + Dimensions.get('window').height > this.state.contentHeight + 100
        && !this.props.isFetching) {
      const {dispatch} = this.props;
      dispatch(fetchNews(current_page_index = this.props.newsList.length / 10));
    }

    this.setState({
      offset: yCoord
    });



  }

  componentDidMount() {
    const { dispatch } = this.props;
    const { listLength } = this.state;

    //Do not load every time!!
    if (listLength === 0){
      dispatch(
        fetchNews(current_page_index = this.props.newsList.length / 10)
      );
    }
  }

  componentWillUnmount() {
    const {dispatch} = this.props
    //Do not dispatch the action when the screen is not scrolled.
    dispatch(setNewsOffset(this.state.offset))
  }

  fetchButtonOnClick() {
    const {dispatch} = this.props;
    dispatch(fetchNews(current_page_index = this.props.newsList.length / 10));
  }

  closeControlPanel = () => {
    this._drawer.close()
  };
  openControlPanel = () => {
    this._drawer.open()
  };

  goToWeb(link) {
  return Actions.webPage({this_url:link});
}


  render() {
    const {initialOffset, isFetching, newsList} = this.props

    return (
          <Container>
            <Drawer
              ref={(ref) => this._drawer = ref}
              content={<SideMenu sceneKey={3}/>}
              openDrawerOffset={3.5/5}
              tapToClose={true}
              panOpenMask={0.2}
              panCloseMask={0.4}
            >
              <Content
                onScroll={this.setCurrentReadOffset}
                scrollEventThrottle={300}
                contentOffset={{x:0,y:initialOffset}}
                removeClippedSubviews={true}
                style={{backgroundColor:'pink'}}
                onContentSizeChange={(contentWidth, contentHeight) => {this.setState({contentHeight})}}
                >

                <Card style={{ shadowOpacity:0, borderColor: 'pink', top: 20, marginBottom:10}}>
                      <CardItem style={{ backgroundColor: 'pink'}}>
                          <Body>
                          <Image
                          style={{width: 340, height: 300, resizeMode: 'cover', marginBottom:10, borderRadius:25 }}
                          source={{uri: 'http://i.imgur.com/EmoheJJ.jpg'}}/>
                          <Text style={{fontSize:12, marginBottom:5}}>
                            XXXXX
                          </Text>
                          <Text style={{fontSize:16, marginBottom:10, fontWeight:'bold'}}>
                            Title
                          </Text>
                          <TouchableOpacity transparent textStyle={{color: '#87838B'}}
                            onPress={() => this.goToWeb(
                              `https://www.youtube.com`
                            )}
                          >
                              <Text style={{fontSize:14, color:'white', left:300, fontWeight:'bold'}}>详情</Text>
                          </TouchableOpacity>
                          </Body>
                      </CardItem>
                 </Card>

                <Grid>
                  {newsList.filter((news, i) => {
                    return (i % 2 == 0);
                  }).map((news, evenIndex) => {
                    if (evenIndex*2+1 < newsList.length) {
                      return(
                          <Row key={evenIndex}>
                            <Col >
                              <NewsCard newsObj={newsList[evenIndex*2]} index={evenIndex*2} />
                            </Col>
                            <Col >
                              <NewsCard newsObj={newsList[evenIndex*2+1]} index={evenIndex*2+1} />
                            </Col>
                          </Row>
                      )
                    } else {
                      return (
                        <Row key={evenIndex}>
                        <Col>
                        <NewsCard key={evenIndex} newsObj={newsList[evenIndex*2]} />
                        </Col>
                        <Col>
                        </Col>
                        </Row>
                      )
                    }
                  })}
                </Grid>

                <View style={{height: 20}}>
                </View>

                  { isFetching &&
                    <Spinner white top={20}/>
                  }
                  </Content>
              </Drawer>
            <NavBarBelow />
          </Container>
      );
  }
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height,
    backgroundColor:'transparent',
    justifyContent: 'center',
    alignItems: 'center',
    resizeMode: 'cover',
  },
})





export default connect(mapStateToProps)(NewsP)
