import React, { Component } from 'react';
import {
  Image,
  TouchableOpacity,
  View,
  StyleSheet,
  Text,
  Dimensions,
  FlatList
 } from 'react-native';

import Svg, { Circle } from 'react-native-svg';
import { Actions } from 'react-native-router-flux';
import { connect } from 'react-redux';
import {Col, Row, Grid} from 'react-native-easy-grid';
import Swipeout from 'react-native-swipeout';
import { Badge } from 'react-native-elements';
import Footer from './Footer';

import { CLEAR_MESSAGES } from '../constants';
import { fetchMessageList, requestDeleteMessage, setRead } from '../actions/messageActions';

const mapStateToProps = (state) => ({
  user: state.userReducer.userData,
  messageList: state.messageReducer.messageList,
  isFetchingList: state.messageReducer.isFetchingList,
})

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

class Inbox extends Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    const { user, dispatch } = this.props;
    dispatch({type: CLEAR_MESSAGES});
    if(user !== undefined) {
      dispatch(fetchMessageList(user.uid, user.token));
    }
  }

  handleMessagePress(plid, pmType, pmSubject, pmNum, toUsername){
    Actions.messagePage({plid, pmType, pmSubject, pmNum, toUsername});
  }

  _renderItem = ({item}) => {
    const { dispatch, user } = this.props;
    return (
      <Swipeout
        backgroundColor='transparent'
        right={[
          {
            text: '标记已读',
            backgroundColor: '#e77163',
          },
          {
            text: '删除',
            backgroundColor: 'red',
            onPress: function(){
              dispatch(requestDeleteMessage(user.uid, [item.plid], [item.pmType], user.token));
            },
          }
        ]}
        autoClose={true}
        >
          <TouchableOpacity
            style={styles.message}
            onPress={() => this.handleMessagePress(item.plid, item.pmType, item.subject, item.pmNum, item.toUsername)}
            >
            <Grid>
              <Col size={14} style={{justifyContent: 'center'}}>
              {
                item.hasNew > 0 &&
                  <View
                    style={{
                      backgroundColor: '#c03431',
                      position: 'absolute',
                      zIndex: 3,
                      top: windowHeight * (20/1334),
                      left:  windowHeight * (70/1334),
                      width: 10,
                      height: 10,
                      borderRadius: 5,
                    }}
                    />
              }
                <View style={styles.msgImageContainer}>
                  <Image
                    source={{uri: item.avatar, cache: 'force-cache'}}
                    style={styles.msgImage}
                    />
                </View>
              </Col>
              <Col size={51} style={{justifyContent: 'center'}}>
                <Text
                  style={styles.msgTitleFont}
                  numberOfLines={1}
                  ellipsizeMode='tail'
                >
                  {
                    item.pmType === 1 ?
                      `${item.toUsername}`
                      :
                      `群聊: ${item.subject}`
                  }
                </Text>
                <Text
                  style={styles.bodyFont}
                  numberOfLines={1}
                  ellipsizeMode='tail'
                >
                  {item.summary}
                </Text>
              </Col>
            </Grid>
          </TouchableOpacity>
        </Swipeout>
    )
  }

  _keyExtractor = (item, index) => index;

  _renderSeparator = () => {
    return (
      <View style={styles.separator} />
    );
  };

  _renderHeader= () => {
    return (
      <View style={{width: windowWidth * (61/75), height: 20}} />
    );
  }

  render() {
    const { user, messageList, isFetchingList, dispatch} = this.props;
    const { uid, token } = user;
      return(
        <View style={{flex: 1, backgroundColor: 'white'}}>
          <View style={styles.backgroundImageView}>
            <Image
              style={styles.backgroundImage}
              source={require('../img/iconBackground.png')}
            />
          </View>

          <View style={styles.topBar}>
            <TouchableOpacity
              style={styles.addButtonContainer}
              onPress={() => Actions.createMessage()}
              >
              <Image
                source={require('../img/addMessage.png')}
                style={styles.addButton}
              />
            </TouchableOpacity>

            <Text
              style={styles.headerText}
              >
                消息
            </Text>
          </View>

          <View style={styles.listView}>
            <FlatList
              onRefresh={() => {
                dispatch(fetchMessageList(user.uid, user.token));
              }}
              refreshing={isFetchingList}
              data={messageList}
              renderItem={this._renderItem}
              keyExtractor={this._keyExtractor}
              showsVerticalScrollIndicator={false}
              ItemSeparatorComponent={this._renderSeparator}
              ListFooterComponent={this._renderSeparator}
              ListHeaderComponent={this._renderHeader}
              />
          </View>

          <Footer />
        </View>
      );
  }
}

const styles = StyleSheet.create({
  backgroundImageView: {
    height: windowHeight,
    width: windowWidth,
    overflow: 'hidden',
    zIndex: 1,
    position: 'absolute',
  },
  backgroundImage: {
    position: 'absolute',
    height: windowWidth * (447/750),
    width: windowWidth * (447/750),
    bottom: windowHeight * (12/1334),
    left: windowWidth * (-65/750),
  },
  topBar: {
    height: windowHeight * (124/1334),
    backgroundColor: '#ededed',
    alignItems: 'center',
    shadowOpacity: 0.5,
    shadowRadius: 3,
    shadowColor: 'black',
    shadowOffset: { height: 2, width: 2 },
    zIndex: 2,
  },
  headerText: {
    color: '#c03431',
    fontWeight: 'bold',
    fontSize: 18,
    position: 'absolute',
    bottom: windowHeight * (30/1334),
  },
  listView: {
    backgroundColor: 'transparent',
    position: 'absolute',
    top: windowHeight * (124/1334),
    left: 0,
    right: 0,
    bottom: 0,
    alignItems: 'center',
    height: windowHeight * (1099/1334),
    zIndex: 3,
  },
  message: {
    height: windowHeight * (120/1334),
    width: windowWidth * (65/75),
  },
  separator: {
    height: 1,
    width: windowWidth * (65/75),
    backgroundColor: "#c03431",
  },
  msgTitleFont: {
    fontWeight: 'bold',
    fontSize: 14,
    marginBottom: 5,
  },
  bodyFont: {
    fontSize: 14,
  },
  msgImageContainer: {
    height: windowHeight * (90/1334),
    width: windowHeight * (90/1334),
    borderRadius: windowHeight * (45/1334),
    overflow: 'hidden',
  },
  msgImage: {
    height: windowHeight * (90/1334),
    width: windowHeight * (90/1334),
    position: 'absolute',
    zIndex: 2,
  },
  badge: {
    position: 'absolute',
    zIndex: 3,
    top: windowHeight * (10/1334),
    left:  windowHeight * (60/1334),
  },
  addButtonContainer: {
    position: 'absolute',
    right: windowWidth * (50/750),
    bottom: windowHeight * (25/1334),
  },
  addButton: {
    height: windowHeight * (50/1334),
    width: windowHeight * (50/1334),
  }

});


export default connect(mapStateToProps)(Inbox)
