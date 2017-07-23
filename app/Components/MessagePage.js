import React, { Component } from 'react';
import { View, TextInput, StyleSheet, Dimensions, KeyboardAvoidingView } from 'react-native';
import { Actions } from 'react-native-router-flux'
import { Content, Container, Item , Input , Left, Body,Card,
   CardItem ,Text, Header, Button, Toast } from 'native-base';
import { connect } from 'react-redux'
import { AutoGrowingTextInput } from 'react-native-autogrow-textinput';
import { GiftedChat, Bubble } from 'react-native-gifted-chat';

import { fetchMessage, fetchMessageList, checkNewMessage, requestMessageByOffset,
         replyMessage} from '../actions/messageActions';
import { CLEAR_BUFFER } from '../constants';
import MessageCard from './MessageCard';



const mapStateToProps = (state) => ({
  user: state.userReducer.userData,
  messages: state.messageReducer.messages,
  isFetchingMessage: state.messageReducer.isFetchingMessage,
  incomingBuffer: state.messageReducer.incomingMessage,
  newNum: state.messageReducer.newNum,
})

class MessagePage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      inputText: "",
      messages: [],
      contentOffset: 0,
    }
  }

  componentDidMount() {
    const { dispatch, plid, pmType, pmNum, user } = this.props;
    dispatch(fetchMessage(user.uid, plid, 5, pmType, 0, 30, user.token, 'new'));
    let intervalId = setInterval(() => {
      this.checkNew();
    }, 5000);
    this.setState({intervalId});
  }

  componentWillUnmount() {
    clearInterval(this.state.intervalId);
    const { user, dispatch } = this.props;
    dispatch(fetchMessageList(user.uid, user.token));
    this.setState({
      messages: [],
    });
    dispatch({type: CLEAR_BUFFER});
  }

  componentWillReceiveProps(nextProps) {
    const { dispatch, pmType, user, plid } = this.props;
    const { contentOffset, messages } = this.state;

    if (nextProps.incomingBuffer !== undefined) {
      const { payload } = nextProps.incomingBuffer;
      this.setState((previousState) => {
      return {
        messages: GiftedChat.append(previousState.messages, payload),
        };
      });
      dispatch({type: CLEAR_BUFFER});
    }
  }

  checkNew = () => {
    const { dispatch, user, plid, pmType, newNum, isFetchingMessage } = this.props;
    const { messages, contentOffset } = this.state
    dispatch(checkNewMessage(user.uid, plid, eval(messages[0].pmid), user.token))

    if (newNum > 0 && contentOffset === 0 && !isFetchingMessage) {
      console.log("HAVE MORE, FETCH NOW");
      dispatch(requestMessageByOffset(user.uid, plid, pmType, 0, newNum, user.token));
    }

  }

  onSend = (newMessage) => {
    const { dispatch, user, plid } = this.props;
    dispatch(
      replyMessage(user.uid, user.username, plid, newMessage[0].text, user.token)
    );
  }

  onLoadEarlier = () => {
    const { dispatch, plid, pmType, user, currentPage } = this.props;
  }

  onListViewScroll(event) {
        let nativeoffsetY = event.nativeEvent.contentOffset.y;
        this.setState({
            scrolled: nativeoffsetY > 0,
            contentOffset: nativeoffsetY,
        });
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
