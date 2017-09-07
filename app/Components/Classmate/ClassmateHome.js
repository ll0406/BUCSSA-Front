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

const mapStateToProps = (state) => ({
  user: state.userReducer.userData,
});
const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

class ClassmateHome extends Component {
  constructor(props) {
    super(props);
  }

  _renderSeparator = () => {
    return (
      <View style={styles.separator} />
    );
  };

  render() {

    const hasClass = false;

    return(
      <View style={{flex:1, backgroundColor: 'white'}}>
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
              找课友
          </Text>
          <View style={styles.separator} />
        </View>

        <ScrollView contentContainerStyle={styles.scrollView}>
          <View style={styles.myClassTitleView}>
            <Grid>
              <Col />
              <Col>
                <Grid>
                  <Col size={1} backgroundColor={'gray'} />
                  <Col size={15} alignItems={'center'} justifyContent={'center'}>
                    <Text style={{fontSize: 16}}>
                      我的课程
                    </Text>
                  </Col>
                  <Col size={1} backgroundColor={'gray'} />
                </Grid>
              </Col>
              <Col alignItems={'flex-end'}>
                <TouchableOpacity
                  onPress={() => Actions.findClass()}
                  >
                  <Image
                    source={require('../../img/addMessage.png')}
                    style={styles.addButton}
                  />
                </TouchableOpacity>
              </Col>
            </Grid>
          </View>

          <View style={styles.classView}>
            {
              hasClass ?
                null
              :
                <View style={styles.noteView}>
                  <Text>当前还没有加入任何课程哦,</Text>
                  <Text>快去找找课友吧!</Text>
                </View>
            }
          </View>

          <TouchableOpacity style={styles.bigButton}>
            <Text style={styles.buttonText}>我的小组</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.bigButton}>
            <Text style={styles.buttonText}>我的话题</Text>
          </TouchableOpacity>
        </ScrollView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
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
    position: 'absolute',
    top: windowHeight * (124/1334),
    left: 0,
    right: 0,
    bottom: 0,
    alignItems: 'center',
    height: windowHeight * (1099/1334),
    zIndex: 3,
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
  separator: {
    height: 1,
    width: windowWidth * (65/75),
    backgroundColor: "#c03431",
    position: 'absolute',
    bottom: 0,
  },
  scrollView: {
    position: 'absolute',
    top: windowHeight * (214/1334),
    height: windowHeight * (1000/1334),
    width: windowWidth,
    alignItems: 'center',
    backgroundColor: 'white',
  },
  myClassTitleView: {
    width: windowWidth * (65/75),
    height: windowHeight * (50/1334),
    marginBottom: windowHeight * (50/1334),
  },
  addButton: {
    height: windowHeight * (50/1334),
    width: windowHeight * (50/1334),
  },
  classView: {
    width: windowWidth * (65/75),
    marginBottom: windowHeight * (50/1334)
  },
  noteView: {
    borderRadius: 10,
    height: windowHeight * (200/1334),
    width: windowWidth * (65/75),
    backgroundColor: '#f8ebeb',
    justifyContent: 'center',
    alignItems: 'center',
  },
  bigButton: {
    borderRadius: 10,
    height: windowHeight * (100/1334),
    width: windowWidth * (65/75),
    marginBottom: windowHeight * (50/1334),
    backgroundColor: '#d79996',
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonText: {
    fontSize: 16,
    color: 'white',
  }
});

export default connect(mapStateToProps)(ClassmateHome);
