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

 import { Actions } from 'react-native-router-flux';
 import { connect } from 'react-redux';
 import {Col, Row, Grid} from 'react-native-easy-grid';

 import Footer from './Footer';

 import {
   fetchFriendsList,
} from '../actions/friendActions';

const mapStateToProps = (state) => ({
  user: state.userReducer.userData,
  friendsList: state.friendsReducer.friendsList,
  isFetchingList: state.friendsReducer.isFetching,
})

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

class FriendsPage extends Component {

  constructor(props) {
    super(props);
  }

  componentDidMount() {
    const { user, dispatch } = this.props;
    if(user !== undefined) {
      dispatch(fetchFriendsList(user.uid, user.token));
    }
  }

  _renderItem = ({item}) => {
    return (
      <TouchableOpacity
        style={styles.friendItem}
        >
        <Grid>
          <Col size={14} style={{justifyContent: 'center'}}>
            <View style={styles.friendImageContainer}>
              <Image
                source={{uri: item.avatar}}
                style={styles.friendImage}
                />
            </View>
          </Col>
          <Col size={51} style={{justifyContent: 'center'}}>
            <Text
              style={styles.usernameFont}
              numberOfLines={1}
              ellipsizeMode='tail'
            >
              {
                item.username
              }
            </Text>
          </Col>
        </Grid>
      </TouchableOpacity>
    )
  }

  _renderHeader = () => {
    return (
      <View style={{width: windowWidth * (61/75), height: 20}} />
    );
  }

  _renderSeparator = () => {
    return (
      <View style={styles.separator} />
    );
  }

  _keyExtractor = (item, index) => index;


  render() {
    const { user, friendsList, isFetchingList } = this.props;
    return (
      <View style={{flex: 1, backgroundColor: 'white'}}>
        <View style={styles.topBar}>
          <TouchableOpacity
            style={styles.buttonContainer}
            onPress={() => Actions.pop()}
          >
            <Image
              style={styles.backButton}
              source={require('../img/leftArrow-red.png')}
              />
          </TouchableOpacity>
          <Text
            style={styles.headerText}
            >
              好友
          </Text>
        </View>

        <View style={styles.listView}>
          <FlatList
            data={friendsList}
            renderItem={this._renderItem}
            keyExtractor={this._keyExtractor}
            showsVerticalScrollIndicator={false}
            ItemSeparatorComponent={this._renderSeparator}
            ListHeaderComponent={this._renderHeader}
            ListFooterComponent={this._renderSeparator}
            />
        </View>

        <Footer />
      </View>
    );

  }
}

const styles = StyleSheet.create({
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
  friendImageContainer: {
    height: windowHeight * (90/1334),
    width: windowHeight * (90/1334),
    borderRadius: windowHeight * (45/1334),
    overflow: 'hidden',
  },
  friendImage: {
    height: windowHeight * (90/1334),
    width: windowHeight * (90/1334),
    borderRadius: windowHeight * (45/1334),
    overflow: 'hidden',
  },
  headerText: {
    color: '#c03431',
    fontWeight: 'bold',
    fontSize: 18,
    position: 'absolute',
    bottom: windowHeight * (30/1334),
  },
  separator: {
    height: 1,
    width: windowWidth * (65/75),
    backgroundColor: "#c03431",
  },
  buttonContainer: {
    height: windowHeight * (50/1334),
    width: windowWidth * (50/1334),
    position: 'absolute',
    left: windowWidth * (50/750),
    bottom: windowHeight * (18/1334),
  },
  backButton: {
    height: windowHeight * (41/1334),
    width: windowHeight * (41/1334),
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
  friendItem: {
    height: windowHeight * (120/1334),
    width: windowWidth * (65/75),
  },
  usernameFont: {
    fontWeight: 'bold',
    fontSize: 14,
  }

});

export default connect(mapStateToProps)(FriendsPage);
