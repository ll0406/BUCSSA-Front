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
  FlatList,
  TouchableOpacity,
  TouchableHighlight,
  RefreshControl,
  Text,
  Button
} from 'react-native';

import Footer from './Footer'
import NewsCard from './NewsCard'
import NewsWebScene from './NewsWebScene'
import { LinearGradient } from 'expo';
import {setNewsOffset, fetchNews, receiveNews, refreshNews} from '../actions/newsPage'
import defaultNews from './newsData'

import {connect} from 'react-redux';
import {Thumbnail, Spinner} from 'native-base';
import { Icon } from 'react-native-elements'

import {Col, Row, Grid} from 'react-native-easy-grid';

import {Actions} from 'react-native-router-flux';
import Swiper from 'react-native-swiper';


//The props is passed to this level of newsPage
const mapStateToProps = (state) => ({
  initialOffset: state.newsPageReducer.newsOffset,
  newsList: state.newsPageReducer.newsList,
  isFetching: state.newsPageReducer.isFetching,
})

class NewsPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      offset: this.props.initialOffset,
      listLength: this.props.newsList.length, //Will change later
      contentHeight: 0,
      readyToRefresh: false,
      refreshing: false,
    }
  }

  setCurrentReadOffset = (event) => {
    const yCoord = (event.nativeEvent.contentOffset.y);
    if (yCoord < -150) {
      this.setState({
        readyToRefresh: true
      })
    }
    console.log(yCoord);
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

  goToWeb(link) {
    Actions.webPage({this_url:link});
  }

  onRefresh = () => {
    this.setState({refreshing: true});
    console.log("Start to refresh");
    setTimeout(() => {
      this.setState({refreshing: false});
      console.log("Refresh Stop")
    }, 2000);
  }

  handleListEndReach = () => {
    console.log("END Reached");
    console.log(this.props.newsList.length / 10)
    const { dispatch, isFetching} = this.props;
    if (!isFetching) {
      dispatch(fetchNews(current_page_index = this.props.newsList.length / 10));
    }
  }

  handleRelease = (event) => {
    if (this.state.readyToRefresh) {
      const { dispatch } = this.props;
      console.log("REFRESH NOW")
      this.refs.NewsList.scrollToOffset({offset: -150});
      this.setState({ refreshing: true }, () => dispatch(refreshNews()))
      setTimeout(() => {
        this.refs.NewsList.scrollToOffset({offset: 0});
        this.setState({ refreshing: false })
      }, 3000)
    }
    return this.setState({ readyToRefresh: false });
  }

  _keyExtractor = (item, index) => index;

  _renderItem = ({item}) => {
    if (Array.isArray(item)) {
      return (
        <View
          style={{backgroundColor: 'white',
                  paddingBottom: 20,
                  paddingTop: 20}}
            >
          <Swiper
            width={Dimensions.get('window').width * (61/75)}
            height={150}
            loop={true}
            autoplay={true}
            autoplayTimeout={4}
            paginationStyle={{
              bottom: 10, left: null, right: 10
            }}
            activeDot={<View style={styles.swiperActiveDot} />}
            dot={<View style={styles.swiperDot} />}
          >
              {
                item.map((swiperObj, index) => {
                  return (
                    <TouchableOpacity key={index}>
                      <Image style={styles.newsPoster} source={{uri: swiperObj.imageUrl}} />
                    </TouchableOpacity>
                  )
                })
              }
          </Swiper>
        </View>
      )
    } else {
      return (
        <NewsCard newsObj={item} />
      );
    }
    return null;
  }

  render() {
    const {initialOffset, isFetching, newsList} = this.props;
    const {refreshing} = this.state;

    const swiperDummy = [
      {
        imageUrl:'https://media.giphy.com/media/5bQtihx7wT5QI/giphy.gif',
      },
      {
        imageUrl:'https://i2.wp.com/marunews.com/wp-content/uploads/2016/12/%E7%9F%B3%E5%8E%9F%E3%81%95%E3%81%A8%E3%81%BF_%E3%83%98%E3%82%A2%E3%82%A2%E3%83%AC%E3%83%B3%E3%82%B8.jpg',
      },
      {
        imageUrl:'http://i.imgur.com/EmoheJJ.jpg',
      },
      {
        imageUrl:'http://nihongogo.com/wordpress/wp-content/uploads/2016/05/Satomi-Ishihara-Featured-as-Newest-Face-of-Tokyo-Metro-620x400.jpg',
      },
    ]

    let pageData = [swiperDummy, ...newsList];

    return (
      <View style={styles.scrollview}>
        <View
          style={styles.topBar}
        >
            <Image
            style={styles.topBarIcon}
            source={require('../img/one.png')}
              />
          <LinearGradient
          colors={['#F7931E', '#F9685D']}
          start={[0.0, 0.5]}
          end={[1.0, 0.5]}
          style={styles.topBarGradient}>
              <Text
                style={{
                  backgroundColor: 'transparent',
                  fontSize: 15,
                  color: '#fff',
                }}>
                BUCSSA
              </Text>
          </LinearGradient>
        </View>
        <View style={styles.refreshView}>
        {
          refreshing ?
          <Image
          style={styles.refreshImg}
          source={{uri: 'https://media.giphy.com/media/hVszEn2lsvdrq/giphy.gif'}}
          />
          :
          <Image
          style={styles.refreshImg}
          source={{uri:'https://68.media.tumblr.com/tumblr_m6rkikav5p1rwu15qo1_400.gif'}}
          />
        }
        </View>
        <View style={styles.listView}>
            {
            <FlatList
              data={pageData}
              renderItem={this._renderItem}
              keyExtractor={this._keyExtractor}
              showsVerticalScrollIndicator={false}
              onEndReachedThreshold={0.2}
              onEndReached={this.handleListEndReach}
              onResponderRelease={this.handleRelease}
              onScroll={this.setCurrentReadOffset}
              scrollEventThrottle={60}
              ref='NewsList'
              refreshing ={this.state.refreshing}
            />
          }
        </View>
        <View style={styles.newsBottomView}>
          <Image style={styles.newsBottom} source={require('../img/newsBottom.png')} />
          <View style={styles.iconsView}>
            <Grid>
              <Col style={{alignItems: 'center', justifyContent: 'center'}}>
                <TouchableOpacity>
                  <Image
                    style={styles.icon}
                    source={require('../img/bookmark.png')}
                   />
                </TouchableOpacity>
                <Text style={styles.iconText}>新生手册</Text>
              </Col>
              <Col style={{alignItems: 'center', justifyContent: 'center'}}>
                <TouchableOpacity>
                  <Image
                    style={styles.icon}
                    source={require('../img/dot.png')}
                   />
                </TouchableOpacity>
                 <Text style={styles.iconText}>找室友</Text>
              </Col>
              <Col style={{alignItems: 'center', justifyContent: 'center'}}>
                <TouchableOpacity>
                  <Image
                    style={styles.icon}
                    source={require('../img/book.png')}
                   />
                 </TouchableOpacity>
                <Text style={styles.iconText}>找课友</Text>
              </Col>
            </Grid>
          </View>
        </View>
        <Footer />
        <Image style={styles.doggy} source={require('../img/doggy.png')} />
      </View>

    );
  }
}


const styles = StyleSheet.create({
  scrollview: {
    flex: 1,
  },
  listView: {
    backgroundColor: 'transparent',
    position: 'absolute',
    top: 60,
    left: 0,
    right: 0,
    bottom: 0,
    alignItems: 'center',
    height: Dimensions.get('window').height * (840/1334),
    marginBottom: Dimensions.get('window').height * (24/1334),
    zIndex: 3,
  },
  refreshView: {
    backgroundColor: 'transparent',
    position: 'absolute',
    top: 60,
    left: 0,
    right: 0,
    bottom: 0,
    alignItems: 'center',
    zIndex: 3,
  },
  refreshImg: {
    height: 150,
    width: Dimensions.get('window').width * (61/75),
  },
  newsBottomView: {
    backgroundColor: 'transparent',
    position: 'absolute',
    top: Dimensions.get('window').height * (984/1334),
    left: 0,
    right: 0,
    bottom: 0,
    height: Dimensions.get('window').height * (250/1334),
    zIndex: 3,
  },
  topBar: {
    marginTop: Dimensions.get('window').height * (35/1334),
    height: Dimensions.get('window').height * (85/1334),
    overflow: 'hidden',
  },
  topBarGradient: {
    height: Dimensions.get('window').height * (85/1334),
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 1,
  },
  topBarIcon: {
    position: 'absolute',
    height: 75,
    width: 75,
    opacity: 0.3,
    top: -5,
    left: -10,
    right: 0,
    bottom: 0,
    zIndex: 2,
    overflow: 'hidden',
  },
  row: {
    padding: 10,
    height: 125,
    backgroundColor: '#ffffff',
    borderTopWidth: 1,
    marginBottom:-1,
    borderBottomColor: '#E5EDF5',
    borderTopColor: '#E5EDF5',
    borderBottomWidth: 1,
  },
  text: {
    textAlign: 'center',
    color: '#A4C8D9'
  },
  navText: {
    color: '#A4C8D9',
    fontSize: 20,
    fontWeight: "700",
    textAlign: 'center',
    paddingTop: 30
  },
  newsPoster: {
        height: 150,
        resizeMode: 'cover',
        position: 'relative',
  },
  swiperDot: {
        backgroundColor:'rgba(4,5,3,.8)',
        width: 6,
        height: 6,
        borderRadius: 3,
        marginLeft: 2,
        marginRight: 2,
        marginTop: 2,
        marginBottom: 0
  },
  swiperActiveDot: {
        backgroundColor: 'cornflowerblue',
        width: 6,
        height: 6,
        borderRadius: 3,
        marginLeft: 2,
        marginRight: 2,
        marginTop: 2,
        marginBottom: 0
  },
  newsBottom: {
    width: Dimensions.get('window').width,
    height:  Dimensions.get('window').height * (90/1334),
    position: 'absolute',
    top: Dimensions.get('window').height * (160/1334),
    zIndex: 4,
  },
  doggy: {
    height:  Dimensions.get('window').height * (255/1334),
    width: Dimensions.get('window').height * (255/1334) * (297/237),
    position: 'absolute',
    bottom: Dimensions.get('window').height * (80/1334),
    left: Dimensions.get('window').width * (20 / 750),
    zIndex: 99,
  },
  footer: {
    height:  Dimensions.get('window').height * (100/1334),
    width: Dimensions.get('window').width,
    backgroundColor: '#f2b7b0',
    zIndex: 3,
    position: 'absolute',
    top: Dimensions.get('window').height * (1234/1334),
  },
  iconsView: {
    height:  Dimensions.get('window').height * (120/1334),
    width: Dimensions.get('window').width * (330/750),
    position: 'absolute',
    right: Dimensions.get('window').width * (50/750),
    top: Dimensions.get('window').height * (20/1334),
    backgroundColor: 'transparent'
  },
  icon: {
    height: 40,
    width: 40,
    marginBottom: 10,
  },
  iconText: {
    fontSize: 12,
    color: '#F7931E',
  }
})

export default connect(mapStateToProps)(NewsPage)
