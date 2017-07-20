import React, { Component } from 'react';
import { View, TextInput, StyleSheet, Dimensions, KeyboardAvoidingView } from 'react-native';
import { Actions } from 'react-native-router-flux'
import { Content, Container, Item , Input , Left, Body,Card,
   CardItem ,Text, Header, Button, Toast } from 'native-base';
import { connect } from 'react-redux'
import { AutoGrowingTextInput } from 'react-native-autogrow-textinput';

import { fetchMessage, fetchMessageList } from '../actions/messageActions';
import MessageCard from './MessageCard';


const mapStateToProps = (state) => ({
  user: state.userReducer.userData,
  messages: state.messageReducer.messages,
  currentPage: state.messageReducer.currentPage,
  isFetchingMessage: state.messageReducer.isFetchingMessage,
})

class MessagePage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      inputText: "",
      contentHeight: 0,
    }
  }

  componentDidMount() {
    const { dispatch, plid, pmType, pmNum, user } = this.props;
    dispatch(fetchMessage(user.uid, plid, 5, pmType, 0, 20, user.token));
  }

  componentWillUnmount() {
    const { user, dispatch } = this.props;
    dispatch(fetchMessageList(user.uid, user.token));
  }

  componentDidUpdate() {
    const { messages, isFetchingMessage } = this.props
    if (messages && !isFetchingMessage) {
      setTimeout(() => {
        if (this.state.contentHeight > Dimensions.get('window').height-50) {
          this.refs._scrollView._root.scrollToEnd({animated: false});
        }
      }, 100);
    }
  }

  handleFetchUpdate() {

  }

  render() {
    const { user, messages, isFetchingMessage } = this.props
    const { uid } = user;

    return (
      <Container>
        <Header />
        <Content
          ref='_scrollView'
          onContentSizeChange={(contentWidth, contentHeight) => {this.setState({contentHeight})}}
          >
          {
            (!isFetchingMessage && messages!== undefined) &&
              messages.map((m, i) => {
                return (
                  <MessageCard
                    key={i}
                    uid={uid}
                    messageObject={m}
                    />
              )
            })
          }
        </Content>
        <KeyboardAvoidingView
          behavior="padding"
        >
          <View style={styles.textInputView}>
            <AutoGrowingTextInput
              style={styles.textInput}
              placeholder={'Your Message'}
              onChangeText={(text) => this.setState({inputText: text})}
              />
          </View>
        </KeyboardAvoidingView>
      </Container>
    );
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
