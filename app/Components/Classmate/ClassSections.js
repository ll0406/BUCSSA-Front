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
    console.log(this.props.className)
    return (
      <View style={styles.listItem}>
        <ClassLabel
          code={this.props.classCode}
          name={this.props.className}
          section={item.section}
          hasArrow={false}
          />
        <View style={styles.infoView}>
          <Grid>
            <Col size={0.2} backgroundColor={'gray'} marginRight={10}/>
            <Col size={14} >
              <Text>
                教师: {item.faculty}
              </Text>
              <Text>
                时间: {item.time}
              </Text>
            </Col>
          </Grid>
        </View>
      </View>
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
              {this.props.classCode}
          </Text>
          <View style={styles.topBarSeparator} />
        </View>

        <View style={styles.listView}>

          <FlatList
            data={[
              {
                section: 'A1',
                time: 'Mon., Wed. 1:15 - 5:00p.m.',
                faculty: 'Peter Rand'
              },
              {
                section: 'A2',
                time: 'Tue., Thur., 1:15 - 5:00p.m.',
                faculty: 'Li Liu'
              }
            ]}
            renderItem={this._renderItem}
            ItemSeparatorComponent={this._renderSeparator}
            ListHeaderComponent={this._renderHeader}
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
    height: windowHeight * (50/1334),
    width: windowWidth * (65/75),
  },
  listItem: {
    width: windowWidth * (65/75)
  },
  infoView: {
    marginTop: windowHeight * (20/1334),
    width: windowWidth * (65/75)
  }
});

export default connect(mapStateToProps)(ClassSections);
