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
  ScrollView
} from 'react-native';
import {Content, Container, Header, Title, Footer, FooterTab, Button, Left, Right, Body, Icon, Text, Thumbnail, CardItem, Card, Spinner} from 'native-base';

import {Actions} from 'react-native-router-flux'

import NavBarBelow from './Footer'
import NewsCard from './NewsCard'
import NewsWebScene from './NewsWebScene'

import {connect} from 'react-redux';
import {setNewsOffset, fetchNews, receiveNews} from '../actions/newsPage'
import defaultNews from './newsData'

//The props is passed to this level of newsPage
const mapStateToProps = (state) => ({
  initialOffset: state.newsPageReducer.newsOffset,
  newsList: state.newsPageReducer.newsList,
  isFetching: state.newsPageReducer.isFetching,
})

class NewsP extends Component {
  constructor(props) {
    super(props);
    console.log('Constructor', this.props);
    this.state = {
      offset: this.props.initialOffset,
      listLength: this.props.newsList.length, //Will change later
    }
  }

  setCurrentReadOffset = (event) => {
    // Log the current scroll position in the list in pixels
    let yCoord = (event.nativeEvent.contentOffset.y);
    this.setState({
      offset: yCoord
    });
  }

  componentDidMount() {
    const { dispatch } = this.props;
    const { listLength } = this.state;

    console.log("FETCH PAGE", this.props.newsList.length / 10);
    dispatch(
      fetchNews(current_page_index = this.props.newsList.length / 10)
    );

  }

  componentWillUnmount() {
    const {dispatch} = this.props
    //Do not dispatch the action when the screen is not scrolled.
    dispatch(setNewsOffset(this.state.offset))
  }

  fetchButtonOnClick() {
    const {dispatch} = this.props;
    console.log("FETCH PAGE", this.props.newsList.length / 10);
    dispatch(fetchNews(current_page_index = this.props.newsList.length / 10));
  }


  render() {
    const {initialOffset, isFetching, newsList} = this.props

    return (
          <Container>
            <Header/>
              <Content onScroll={this.setCurrentReadOffset} contentOffset={{x:0,y:this.state.offset}} removeClippedSubviews={true}>
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
              <NavBarBelow/>
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
