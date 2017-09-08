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

import * as ENDPOINTS from "../../endpoints";
import { joinGroup } from '../../actions/classmateActions';


const mapStateToProps = (state) => ({
  user: state.userReducer.userData,
});
const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

class GroupPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      text: '',
    }
  }

  _renderListSeparator = () => {
    return (
      <View style={styles.listSeparator} />
    );
  };

  render() {
    const { groupObj, user } = this.props;
    return (
      <ScrollView style={{flex:1, backgroundColor:'white'}}>
        <View style={styles.topBar}>
          <View style={{backgroundColor: 'transparent', zIndex:2}}>
            <Text style={styles.headerText}>
              小组
            </Text>
          </View>
          <View style={styles.topBarInfoView}>
            <Grid>
              <Row backgroundColor='transparent'>
                <Col alignItems='center' backgroundColor='transparent'>
                  <Text
                    numberOfLines={2}
                    ellipsizeMode='tail'
                    style={styles.groupNameText}>
                    {groupObj.groupName}
                  </Text>
                </Col>
              </Row>

              <Row backgroundColor='transparent'>
                <Col alignItems='center' backgroundColor='transparent'>
                  <Text style={styles.rating}>
                    学霸指数: ★★★★★
                  </Text>
                </Col>
              </Row>
            </Grid>
          </View>
          <Image
            source={require('../../img/groupBackground.png')}
            style={styles.topBarImage}
            />
          <TouchableOpacity
            style={styles.buttonContainer}
            onPress={() => Actions.pop()}
          >
            <Image
              style={styles.backButton}
              source={require('../../img/leftArrow-white.png')}
              />
          </TouchableOpacity>
        </View>

        <View style={styles.titleView}>
          <Text style={styles.titleFont}> 小组资料 </Text>
        </View>
        <View alignItems='center'>
          <View style={styles.infoItemView}>
            <Grid>
              <Col size={2}>
                <Text style={{fontSize: 14}}>
                  创建人
                </Text>
              </Col>
              <Col size={5} alignItems='flex-end'>
                <Text style={{fontSize: 14}}>
                  {groupObj.creatorName}
                </Text>
              </Col>
            </Grid>
          </View>
          {this._renderListSeparator()}
          <View style={styles.infoItemView}>
            <Grid>
            <Col size={2}>
              <Text style={{fontSize: 14}}>
                涉及科目
              </Text>
            </Col>
            <Col size={5} alignItems='flex-end'>
              <Text style={{fontSize: 14}}>
                {groupObj.groupTag}
              </Text>
            </Col>
            </Grid>
          </View>
          {this._renderListSeparator()}
          <View style={styles.infoItemView}>
            <Grid>
            <Col size={2}>
              <Text style={{fontSize: 14}}>
                简介
              </Text>
            </Col>
            <Col size={5} alignItems='flex-end'>
              <Text style={{fontSize: 14}}>
                {groupObj.groupIntro}
              </Text>
            </Col>
            </Grid>
          </View>
          {this._renderListSeparator()}
          <View style={{height: 30, width: 1}} />
          <TouchableOpacity 
            onPress={() => joinGroup(user.uid, groupObj.groupId, user.token)}
            style={styles.button}>
            <Text style={styles.buttonText}>申请加入</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.button}>
            <Text style={styles.buttonText}>开始群聊</Text>
          </TouchableOpacity>
        </View>

      </ScrollView>
    )
  }
}

const styles = StyleSheet.create({
  button: {
    borderRadius: 5,
    width: windowWidth * (65/75),
    height: windowHeight * (60/1334),
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#c03431',
    marginBottom: windowHeight * (20/1334),
    marginTop: windowHeight * (20/1334),
  },
  buttonText: {
    fontSize: 14,
    color: 'white'
  },
  headerText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 18,
    top: windowHeight * (60/1334),
  },
  groupNameText: {
    color: 'white',
    fontSize: 18,
  },
  rating: {
    color: 'white',
    fontSize: 16,
  },
  titleView: {
    height: windowHeight * (100/1334),
    width: windowWidth,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f8ebeb'
  },
  titleFont: {
    fontSize: 16,
    color: '#c03431'
  },
  topBarImage: {
    height: windowHeight * (400/1334),
    width: windowWidth,
    position: 'absolute',
    zIndex: 1,
  },
  topBar: {
    height: windowHeight * (400/1334),
    width: windowWidth,
    marginBottom: windowHeight * (40/1334),
    zIndex: 2,
    alignItems: 'center',
  },
  topBarInfoView: {
    height: windowHeight * (250/1334),
    width: windowWidth,
    zIndex: 2,
    top: windowHeight * (150/1334),
  },
  buttonContainer: {
    height: windowHeight * (50/1334),
    width: windowWidth * (50/1334),
    position: 'absolute',
    left: windowWidth * (50/750),
    top: windowHeight * (60/1334),
    zIndex: 10,
  },
  backButton: {
    height: windowHeight * (41/1334),
    width: windowHeight * (41/1334),
  },
  listSeparator: {
    height: 1,
    width: windowWidth * (650/750),
    backgroundColor: "#c03431",
  },
  infoItemView: {
    width: windowWidth * (650/750),
    paddingTop: windowHeight * (30/1334),
    paddingBottom: windowHeight * (30/1334),
  }
})

export default connect(mapStateToProps)(GroupPage);
