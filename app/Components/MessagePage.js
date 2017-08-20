import React, { Component } from 'react';
import { View, TextInput, StyleSheet, Dimensions, KeyboardAvoidingView } from 'react-native';
import { Actions } from 'react-native-router-flux'
import { Content, Container, Item , Input , Left, Body,Card,
   CardItem ,Text, Header, Button} from 'native-base';
import { connect } from 'react-redux'
import { GiftedChat, Bubble } from 'react-native-gifted-chat';

//On Socket Implementation
import SocketIOClient from 'socket.io-client';

import { fetchMessage, fetchMessageList, requestMessageByOffset,
         replyMessage, setMessageRead} from '../actions/messageActions';
import { CLEAR_MESSAGES } from '../constants';

import MessageCard from './MessageCard';

const mapStateToProps = (state) => ({
  user: state.userReducer.userData,
  initialMessages: state.messageReducer.initialMessages,
  oldMessages: state.messageReducer.oldMessages,
  isFetchingMessage: state.messageReducer.isFetchingMessage,
})

class MessagePage extends Component {
  constructor(props) {
    super(props);

    //Deal with Socket
    this.socket = SocketIOClient('http://bucssa.net:3000');
    //On connect to server, join send a request to join a specific
    //room that will be used in chat.
    this.socket.on('connect', () => {
      this.socket.emit('room', `room-${props.plid}`);
    })
    this.socket.on('message', (message) => {
      this.onReceivedMessage(message)
    });

    this.state = {
      inputText: "",
      messages: [],
      contentOffset: 0,
      roomId: `room-${props.plid}`,
      incomingBuffer: [],
    }
  }

  //Socket needed functions
  onReceivedMessage = (message) => {
    this.storeMessage(message);
    console.log("Received this: ", message);
  }

  uuidv4 = () => {
     return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
       let r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
       return v.toString(16);
     });
    }

  storeMessage = (message) => {
    let messageObj = message;
    if (messageObj._id === undefined || messageObj._id === "") {
      messageObj._id = this.uuidv4();
    }
    if (messageObj.createdAt === undefined || messageObj.createdAt === "") {
      messageObj.createdAt = new Date();
    }
    if(this.state.contentOffset === 0) {
      this.setState((previousState) => {
        return {
          messages: GiftedChat.append(previousState.messages, messageObj),
        };
      });
    } else {
      this.setState((previousState) => {
        return {
          incomingBuffer: [messageObj].concat(previousState.incomingBuffer),
        };
      });
    }
  }


  componentDidMount() {
    const { dispatch, plid, pmType, pmNum, user } = this.props;
    dispatch(fetchMessage(user.uid, plid, 5, pmType, 0, 30, user.token, 'new'));
  }

  componentWillUnmount() {
    this.socket.emit("leave room", this.state.roomId);
    this.socket.emit("close");
    const { user, dispatch, plid, pmType, pmNum } = this.props;
    dispatch(setMessageRead(user.uid, [plid], [pmType], user.token));
    dispatch(fetchMessageList(user.uid, user.token));
    this.setState({
      messages: [],
    });
    dispatch({type: CLEAR_MESSAGES});
  }

  componentWillReceiveProps(nextProps) {
    const { dispatch, pmType, user, plid } = this.props;
    const { contentOffset, messages } = this.state;
    if (nextProps.initialMessages !== undefined) {
      this.setState({
        messages: nextProps.initialMessages,
      })
    }
    if (nextProps.oldMessages !== undefined) {
      this.setState((previousState) => {
        return {
          messages: GiftedChat.prepend(previousState.messages, nextProps.oldMessages),
          incomingBuffer: [],
        };
      });
    }
    dispatch({type: CLEAR_MESSAGES})
  }

  onSend = (newMessage) => {
    const { dispatch, user, plid } = this.props;
    //replyMessage Takes care of the database manipulation
    dispatch(
      replyMessage(user.uid, user.username, plid, newMessage[0].text, user.token)
    );
    //Emit message to the specific room
    //Need to include the room information in the message,
    //Then the server will redirect to specific room when unpacking
    newMessage[0].roomId = this.state.roomId;
    newMessage[0].user.avatar = user.avatar[2];
    this.socket.emit('message', JSON.stringify(newMessage[0]));
    this.storeMessage(newMessage);
  }

  onLoadEarlier = () => {
    const { dispatch, plid, pmType, user, currentPage } = this.props;
    //Load 20 messages before, using fetchByOffset
    const pmidOffset = this.state.messages.slice(-1)[0].pmid;
    dispatch(requestMessageByOffset(user.uid, plid, pmType, pmidOffset, 20, user.token));

  }

  onListViewScroll(event) {
        let nativeoffsetY = event.nativeEvent.contentOffset.y;
        this.setState({
            scrolled: nativeoffsetY > 0,
            contentOffset: nativeoffsetY,
        });
        if (nativeoffsetY === 0 && this.state.incomingBuffer.length !== 0) {
          this.setState((previousState) => {
            return {
              messages: GiftedChat.append(previousState.messages, this.state.incomingBuffer),
              incomingBuffer: [],
            };
          });
        }
    }

  renderBubble = (props) => {
    return (
      <Bubble
       {...props}
       textStyle={{
            left: {
              fontWeight: 'bold',
            },
            right: {
    	         fontWeight: 'bold',
    	       }
        }}
        wrapperStyle={{
            left: {
              backgroundColor: 'lightgray',
            },
            right: {
              backgroundColor: 'pink'
            }
        }} /> )
      }

  render() {
     const { user, isFetchingMessage, pmNum } = this.props;
     const { messages } = this.state;
     return (
       <Container>
          <Header />
          { (messages.length !== 0) &&
             <GiftedChat
              messages={messages}
              onSend={(newMessage) => this.onSend(newMessage)}
              user={{
                _id: eval(user.uid),
              }}
              loadEarlier={messages.length < pmNum}
              onLoadEarlier={this.onLoadEarlier}
              renderBubble={this.renderBubble}
              listViewProps={{
                    onScroll:this.onListViewScroll.bind(this),
                    ref:(ref)=>{this._listView = ref},
                }}
            />
        }
        </Container>
     )
  }
}

const styles = StyleSheet.create({
  textInputView: {
    borderColor:'pink',
    width: Dimensions.get('window').width,
    borderWidth: 4,
    borderStyle: 'solid',
    borderRadius: 25,
  },
  textInput: {
    marginLeft: 15,
    fontSize: 18,
  }

})

export default connect(mapStateToProps)(MessagePage)
