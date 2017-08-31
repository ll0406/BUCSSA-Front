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

import InboxData from './InboxData'
import Footer from './Footer'

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
    console.log("renderItem");
    console.log(item)
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
              dispatch(requestDeleteMessage(uid, [plid], [pmType], token));
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
                <Badge
                containerStyle={{
                  backgroundColor: '#e77163',

                }}
                wrapperStyle={styles.badge}
                value={item.hasNew}
                textStyle={{ fontSize: 12 }}
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

  render() {
    const { user, messageList, isFetchingList, dispatch} = this.props;
    const { uid, token } = user;
      return(
        <View style={{flex: 1}}>
          <View style={styles.backgroundImageView}>
            <Image
              style={styles.backgroundImage}
              source={require('../img/messageBackground.png')}
            />
          </View>

          <View style={styles.header}>
            <TouchableOpacity style={styles.addButtonContainer}>
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
              data={messageList}
              renderItem={this._renderItem}
              keyExtractor={this._keyExtractor}
              showsVerticalScrollIndicator={true}
              ItemSeparatorComponent={this._renderSeparator}
              ListHeaderComponent={this._renderSeparator}
              ListFooterComponent={this._renderSeparator}
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
    height: windowHeight * (3/4),
    width: windowWidth,
  },
  header: {
    top: windowHeight * (35/1334),
    height: windowHeight * (100/1334),
    width: windowWidth,
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 2,
    position: 'absolute',
  },
  headerText: {
    color: '#e77163',
    fontWeight: 'bold',
    fontSize: 18
  },
  listView: {
    backgroundColor: 'transparent',
    position: 'absolute',
    top: windowHeight * (135/1334),
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
    backgroundColor: "#e77163",
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
  },
  addButton: {
    height: windowHeight * (50/1334),
    width: windowHeight * (50/1334),
  }

});


export default connect(mapStateToProps)(Inbox)
