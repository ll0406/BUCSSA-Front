import React, { Component } from 'react';
import {
  View,
  Image,
  StyleSheet,
  Dimensions,
  FlatList,
  TouchableOpacity,
  Text,
  ScrollView,
} from 'react-native';

import { connect } from 'react-redux';
import { Actions } from 'react-native-router-flux';
import {Col, Row, Grid} from 'react-native-easy-grid';

import ClassLabel from './ClassLabel';

const mapStateToProps = (state) => ({
  user: state.userReducer.userData,
});
const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

class ClassSections extends Component {
  constructor(props) {
    super(props);
  }

  _renderItem = ({item}) => {
    return (
      <ClassLabel
        code={item.code}
        name={item.name}
        hasArrow={true}
        />
    )
  }

  _renderSeparator = () => {
    return (
      <View style={styles.listSeparator} />
    );
  };

  _keyExtractor = (item, index) => index;

  _renderHeader = () => {
    return (
      <View style={styles.listHeader} />
    );
  }

  _renderFooter = () => {
    return (
      <View style={styles.footerView}>
        <View style={{
          height: 1,
          width: windowWidth * (65/75),
          backgroundColor: "#c03431",
          marginBottom: windowHeight * (15/1334),
        }}
        />
        <Text style={{fontSize: 12}}>以上就是全部结果了哦!</Text>
      </View>
    )
  }

  render() {
    return(
      <View style={{flex:1, backgroundColor: 'white', alignItems:'center'}}>
        <View style={styles.topBar}>
          <TouchableOpacity
            style={styles.buttonContainer}
            onPress={() => Actions.pop()}
          >
            <Image
              style={styles.backButton}
              source={require('../../img/leftArrow-red.png')}
              />
          </TouchableOpacity>

          <Text
            style={styles.headerText}
            >
              加入课程
          </Text>
          <View style={styles.topBarSeparator} />
        </View>

        <View style={styles.listView}>

          <FlatList
            data={[
              {
                code: 'CO201',
                name: 'Design New Media'
              },
              {
                code: 'PS101',
                name: 'Introduction to Psychology'
              }
            ]}
            renderItem={this._renderItem}
            ItemSeparatorComponent={this._renderSeparator}
            ListHeaderComponent={this._renderHeader}
            ListFooterComponent={this._renderFooter}
            keyExtractor={this._keyExtractor}
            showsVerticalScrollIndicator={false}
            />

        </View>

      </View>
    );
  }
}

const styles = StyleSheet.create({
  topBarSeparator: {
    height: 1,
    width: windowWidth * (65/75),
    backgroundColor: "#c03431",
    position: 'absolute',
    bottom: 0,
  },
  topBar: {
    height: windowHeight * (124/1334),
    backgroundColor: 'white',
    alignItems: 'center',
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
    position: 'relative',
    alignItems: 'center',
    height: windowHeight * (1214/1334),
    width: windowWidth * (65/75),
    zIndex: 3,
  },
  buttonContainer: {
    height: windowHeight * (50/1334),
    width: windowWidth * (50/1334),
    position: 'absolute',
    right: windowWidth * (300/750),
    bottom: windowHeight * (18/1334),
  },
  backButton: {
    height: windowHeight * (41/1334),
    width: windowHeight * (41/1334),
  },
  listSeparator: {
    height: windowHeight * (30/1334),
    width: windowWidth * (65/75),
  },
  listHeader: {
    height: windowHeight * (80/1334),
    width: windowWidth * (65/75),
  },
  searchBar: {
    height: windowHeight * (25/1334),
    width: windowWidth * (65/75),
  },
  footerView: {
    height: windowHeight * (40/1334),
    width: windowWidth * (65/75),
    marginTop: windowHeight * (60/1334),
    alignItems: 'flex-end',
  }
});

export default connect(mapStateToProps)(ClassSections);
