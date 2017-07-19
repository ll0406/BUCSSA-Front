import React, { Component } from 'react';
import { Image, TouchableOpacity, View, StyleSheet, Text } from 'react-native';
import { Header,Container, Content, Card, CardItem, Thumbnail,
   Button, Icon, Spinner } from 'native-base';
import Svg, { Circle } from 'react-native-svg';
import { Actions } from 'react-native-router-flux';
import { connect } from 'react-redux'
import {Col, Row, Grid} from 'react-native-easy-grid';
import Swipeout from 'react-native-swipeout';

import InboxData from './InboxData'
import NavBarBelow from './Footer'

import { fetchMessageList, requestDeleteMessage } from '../actions/messageActions';

const mapStateToProps = (state) => ({
  user: state.userReducer.userData,
  messageList: state.messageReducer.messageList,
  isFetchingList: state.messageReducer.isFetchingList,
})

class Inbox extends Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    const { user, dispatch } = this.props;
    if(user !== undefined) {
      dispatch(fetchMessageList(user.uid, user.token));
    }
  }

  handleMessagePress(plid, pmType, pmSubject, pmNum){
    console.log(plid, pmType);
    Actions.messagePage({plid, pmType, pmSubject, pmNum});
  }

  render() {
    const { user, messageList, isFetchingList, dispatch} = this.props;
    const { uid, token } = user;
      return(
        <Container>
          <Header/>
          <Content>
            {
                (!isFetchingList && messageList !== undefined)
                 && messageList.map((message, i) => {
                  const { plid } = message;
                  return (
                    <Card key={i}>
                      <Swipeout
                        right={[
                          {
                            text: '标记已读',
                            backgroundColor: 'pink',
                          },
                          {
                            text: '置顶',
                            backgroundColor: 'white',
                            color: 'pink',
                          },
                          {
                            text: '删除',
                            backgroundColor: 'red',
                            onPress: function(){
                              dispatch(requestDeleteMessage(uid, [plid], token));
                            },
                          }
                        ]}
                        autoClose={true}
                        >
                        <CardItem>
                          <Grid>
                            <Col size={1}>
                              { message.pmType === 2 && <Icon name="ios-people" style={{color: 'pink', fontSize:40, marginLeft:6, marginTop:5}}/>}
                              { message.pmType === 1 && <Thumbnail style={{width: 50, height: 50, borderRadius: 25}}
                              source={{uri: message.avatar, cache: 'force-cache'}} />}
                            </Col>
                            <Col size={3.5}>
                              {message.pmType === 1 && <Text style={styles.nameFont}> {message.toUsername} </Text>}
                              {message.pmType === 2 && <Text style={styles.nameFont}> 创建人: {message.creatorUsername} </Text>}
                              <Text style={styles.bodyFont}> 标题: {message.subject} </Text>
                              <Text style={styles.bodyFont}> {message.summary} </Text>
                            </Col>
                            <Col size={0.2} alignItems={'center'} justifyContent={'center'}>
                              <View alignItems={'center'} justifyContent={'center'}>
                                <TouchableOpacity onPress={() => this.handleMessagePress(message.plid, message.pmType, message.subject)} >
                                  <Icon name="ios-arrow-forward" style={{color:'pink'}} />
                                </TouchableOpacity>
                              </View>
                            </Col>
                            <Col size={0.2} alignItems={'center'} justifyContent={'center'}>
                              <View alignItems={'center'} justifyContent={'center'}>
                                {message.hasNew > 0 &&
                                  <Svg height="8" width="8">
                                    <Circle cx="4" cy="4" r="4" fill="pink" />
                                  </Svg>
                                }
                              </View>
                            </Col>
                          </Grid>
                        </CardItem>
                      </Swipeout>
                    </Card>
                )}
              )
            }
            {isFetchingList && <Spinner color='black' /> }
          </Content>
          <NavBarBelow/>
        </Container>
      );
  }
}

const styles = StyleSheet.create({
  nameFont: {
    fontSize: 14,
    color: 'black',
    marginBottom: 5
  },
  bodyFont: {
    fontSize: 12,
    color: 'gray'
  },
});


export default connect(mapStateToProps)(Inbox)
