import React, { Component } from 'react';
import {
  View,
  Image,
  Text,
} from 'react-native';
import { Header,Container, Content, Card, CardItem, Thumbnail,
   Button, Icon, Spinner } from 'native-base';
import { Col, Row, Grid } from 'react-native-easy-grid';

export default class MessageCard extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { messageObject, uid } = this.props;
    const { author, authorId, dateline, message } = messageObject;

    const viewStyle = {
      alignItems: uid == authorId ? 'flex-end' : 'flex-start',
      marginBottom: 10,
    }

    const cardStyle = {
      width: 180,
      shadowOpacity: 0,
      borderColor: 'pink',
      borderWidth: 10,
    }

    const itemStyle = {
      backgroundColor: uid == authorId ? 'pink' : 'white',
    }

    const authorStyle = {
      fontSize: 16,
      fontWeight: 'bold',
    }

    const messageStyle = {
      fontSize: 14,
    }

    return(
      <View style={viewStyle}>
        <Card style={cardStyle}>
          <CardItem style={itemStyle}>
            <Grid>
              <Row size={1}>
                <Text style={authorStyle}> {author} </Text>
              </Row>
              <Row size={3}>
                <Text style={messageStyle}> {message} </Text>
              </Row>
            </Grid>
          </CardItem>
        </Card>
      </View>
    )
  }
}
