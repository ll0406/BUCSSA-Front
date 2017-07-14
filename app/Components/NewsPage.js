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
} from 'react-native';
import {Content, Container, Header, Title, Footer,
  FooterTab, Button, Left, Right, Body, Icon, Text,
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
    }
  }

  setCurrentReadOffset = (event) => {
    let yCoord = (event.nativeEvent.contentOffset.y);
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

  render() {
    const {initialOffset, isFetching, newsList} = this.props

    return (
          <Container>
            <Drawer
              ref={(ref) => this._drawer = ref}
              content={<SideMenu />}
              openDrawerOffset={3.5/5}
              tapToClose={true}
              panOpenMask={0.05}
              panCloseMask={0.2}
            >
              <Content
                onMomentumScrollEnd={this.setCurrentReadOffset}
                contentOffset={{x:0,y:this.state.offset}}
                removeClippedSubviews={true}
                >

                {newsList.map((news, i) => (
                  <NewsCard key={i} newsObj={news} />
                ))}
                {isFetching?
                  <Spinner/>
                  :
                  <Button block onPress={()=>this.fetchButtonOnClick()}>
                    <Text>Fetch More News </Text>
                  </Button>
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
