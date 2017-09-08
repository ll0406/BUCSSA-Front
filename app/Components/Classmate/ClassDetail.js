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
import { Col, Row, Grid } from 'react-native-easy-grid';
import { Icon } from 'react-native-elements'


import { addClass, fetchCollection } from '../../actions/classmateActions';
import * as ENDPOINTS from "../../endpoints";

const mapStateToProps = (state) => ({
  user: state.userReducer.userData,
  collection: state.classmateReducer.classCollection,
});
const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

class ClassDetail extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedSection: 1,
      scrolled: false,
      topSize: 0,
      isIn: false,
      groupResult: [],
      postResult: [],
    }
  }

  componentDidMount() {
    const { classCode, classSection, collection} = this.props;
    if (collection !== undefined) {
        for (let i = 0; i < collection.length; i++) {
          if (collection[i].classCode === classCode && collection[i].classSection === classSection) {
            this.setState({isIn:true});
            break;
          }
        }
    }

    this.fetchGroupAndPost();


  }

  fetchGroupAndPost = () => {
    console.log(this.props.classId);
    fetch(`${ENDPOINTS.BASE}${ENDPOINTS.GET_GROUP}?classCode=${this.props.classCode}&pageSize=100`)
      .then(res => res.text())
      .then(
        text => {
          const json = JSON.parse(text);
          if (json.success) {
            console.log("FETCH Group Success");
            let actualPayload = json.datas;
            console.log(actualPayload);
            if (actualPayload === null) {actualPayload = [];}
            this.setState({
              groupResult: actualPayload
            });
          } else {
            console.log("FETCH Group Failed");
         }
        },
        err => {
          console.log(err);
        }
      )

      fetch(`${ENDPOINTS.BASE}${ENDPOINTS.GET_POST}?classid=${this.props.classId}&pageSize=100`)
        .then(res => res.text())
        .then(
          text => {
            const json = JSON.parse(text);
            if (json.success) {
              let actualPayload = json.datas;
              console.log("FETCH Posts Success");
              console.log(actualPayload)
              if (actualPayload === null) {actualPayload = [];}
              this.setState({
                postResult: actualPayload
              });
            } else {
              console.log("FETCH Posts Failed");
           }
          },
          err => {
            console.log(err);
          }
        )
  }

  componentWillUnmount() {
    const { user, dispatch } = this.props;
    dispatch(fetchCollection(user.uid, user.token));
  }

  _keyExtractor = (item, index) => index;

  _renderListSeparator = () => {
    return (
      <View style={styles.listSeparator} />
    );
  };

  _renderGroupItem = ({item}) => {

    return (
      <TouchableOpacity
        style={styles.groupItemView}>
        <Grid>
          <Col size={8} justifyContent={'center'}>
            <Text
              style={styles.listItemFontBold}
              numberOfLines={1}
              ellipsizeMode='tail'
              >{item.groupName}</Text>
            <Text
              style={styles.listItemFont}
              numberOfLines={1}
              ellipsizeMode='tail'
            >{item.groupIntro}</Text>
          </Col>
          <Col size={1} justifyContent={'center'}>
            <Icon
              name='ios-arrow-forward'
              type='ionicon'
              color='#c03431'
              size={25}
            />
          </Col>
        </Grid>
      </TouchableOpacity>
    )
  }

  render() {
    const { user, classCode, className, classSection, professorName, classSchedule, classLocation, classId, professorId, dispatch } = this.props;
    return (
      <ScrollView style={{flex: 1, backgroundColor: 'white'}}>
        <View onLayout={(event) => {
          let { height } = event.nativeEvent.layout;
          console.log(event.nativeEvent.layout);
          this.setState({topSize: height}, () => {console.log(height)});
          }}>
          <View style={styles.topBar}>
            <TouchableOpacity
              style={styles.buttonContainer}
              onPress={() => Actions.pop()}
            >
              <Image
                style={styles.backButton}
                source={require('../../img/leftArrow-white.png')}
                />
            </TouchableOpacity>
            <View style={styles.top1} />
            <View style={styles.top2} />
            <View style={styles.top3} />
            <View style={styles.top4} />
            <View style={styles.top5} />
            <View style={styles.idCard}>
              <View style={styles.idTextContainer}>
                <Grid>
                  <Col size={0.2} backgroundColor={'white'} />
                  <Col size={14} alignItems={'flex-end'}>
                    <Text
                      style={{
                        fontSize: 32,
                        color: 'white',
                        fontFamily:'PingFangSC-Thin'}}
                      numberOfLines={1}
                      ellipsizeMode='tail'
                      >
                      {classCode}
                    </Text>
                    <Text
                    style={{
                      fontSize: 16,
                      color: 'white',
                      fontFamily:'PingFangSC-Thin'}}
                      numberOfLines={1}
                      ellipsizeMode='tail'
                    >
                      {classSection}  {className}
                    </Text>
                  </Col>
                </Grid>
              </View>
            </View>
          </View>

          <View style={styles.detailedInfoView}>
            <View style={styles.detailedInfoContainer}>
              <Grid>
                <Col size={0.2} backgroundColor={'gray'}  />
                <Col size={0.6} />
                <Col size={11.4}>
                  <Text style={styles.infoText}>教师: {professorName}</Text>
                  <View style={{height: 5, width: windowWidth}} />
                  <Text style={styles.infoText}>时间: {classSchedule}</Text>
                  <View style={{height: 5, width: windowWidth}} />
                  <Text style={styles.infoText}>地点: {classLocation}</Text>
                </Col>
                <Col size={2} alignItems={'flex-end'} justifyContent={'flex-end'}>
                  {
                    !this.state.isIn &&
                    <TouchableOpacity
                      onPress={() => {

                        dispatch(addClass(user.uid, classId, user.token));
                      }}
                      style={styles.joinButton}>
                      <Text
                        style={{fontSize: 14, color:'white'}}
                      >加入</Text>
                    </TouchableOpacity>
                  }
                </Col>
              </Grid>
            </View>
          </View>
        </View>

        <View style={styles.tabListView}>
          <Grid>
            <Col size={50} />
            <Col size={8} backgroundColor={'#f8ebeb'} />
            <Col size={24} />
            <Col size={642}>
              <View style={styles.tabView}>
                <View style={this.state.selectedSection == 1 ? styles.selectedTabButtonView : styles.normalTabButtonView}>
                  <Grid>
                    <Col size={4} alignItems={'center'} justifyContent={'center'}>
                      <TouchableOpacity
                        onPress={() => {this.setState({selectedSection: 1})}}
                        >
                        <Text style={{
                          fontSize: 14,
                          color: '#c03431'
                        }}>
                          小组
                        </Text>
                      </TouchableOpacity>
                    </Col>

                    <Col size={1.5} alignItems={'center'} justifyContent={'center'}>
                      <TouchableOpacity>
                        {
                          this.state.selectedSection === 1 ?
                          <Image
                          resizeMode={'center'}
                          source={require('../../img/addButton-white.png')}
                            />
                          :
                          <Image
                            resizeMode={'center'}
                            source={require('../../img/addButton-pink.png')}
                            />
                        }
                      </TouchableOpacity>
                    </Col>

                  </Grid>
                </View>

                <View style={{height: '100%',
                  width: windowWidth * (6/750),
                  backgroundColor: '#c03431',
                }}/>

                <View style={this.state.selectedSection == -1 ? styles.selectedTabButtonView : styles.normalTabButtonView}>
                  <Grid>
                    <Col size={2} alignItems={'center'} justifyContent={'center'}>
                      <TouchableOpacity
                        onPress={() => {this.setState({selectedSection: -1})}}
                        >
                        <Text style={{
                          fontSize: 14,
                          color: '#c03431'
                        }}>
                          话题
                        </Text>
                      </TouchableOpacity>
                    </Col>

                    <Col size={1.5} alignItems={'center'} justifyContent={'center'}>
                      <TouchableOpacity>
                        {
                          this.state.selectedSection === -1 ?
                          <Image
                          resizeMode={'center'}
                          source={require('../../img/addButton-white.png')}
                            />
                          :
                          <Image
                            resizeMode={'center'}
                            source={require('../../img/addButton-pink.png')}
                            />
                        }
                      </TouchableOpacity>
                    </Col>
                  </Grid>
                </View>
              </View>

              <View style={styles.listView}>
                {
                  this.state.selectedSection === 1 ?
                  <FlatList
                    data={this.state.groupResult}
                    renderItem={this._renderGroupItem}
                    ItemSeparatorComponent={this._renderListSeparator}
                    keyExtractor={this._keyExtractor}
                    showsVerticalScrollIndicator={false}
                    ListFooterComponent={this._renderListSeparator}
                  />
                  :
                  null
                }
              </View>
            </Col>
            <Col size={50} />


          </Grid>

        </View>


      </ScrollView>

    )

  }


}

const styles = StyleSheet.create({
  topBar: {
    height: windowHeight * (410/1334),
    width: windowWidth,
    marginBottom: windowHeight * (40/1334),
  },
  top1: {
    backgroundColor: '#cf7e7a',
    height: windowHeight * (85/1334),
    width: windowWidth,
  },
  top2: {
    backgroundColor: '#d17772',
    height: windowHeight * (220/1334),
    width: windowWidth,
  },
  top3: {
    backgroundColor: '#e4b9b7',
    height: windowHeight * (35/1334),
    width: windowWidth,
  },
  top4: {
    backgroundColor: '#f0d9d8',
    height: windowHeight * (35/1334),
    width: windowWidth,
  },
  top5: {
    backgroundColor: '#f8ebeb',
    height: windowHeight * (35/1334),
    width: windowWidth,
    marginBottom: windowHeight * (40/1334)
  },
  idCard: {
    borderRadius: 10,
    backgroundColor: '#c03431',
    height: windowHeight * (215/1334),
    width: windowWidth * (7/8),
    position: 'absolute',
    left: windowWidth * (-15/750),
    bottom: 0,
    justifyContent: 'center',
  },
  idTextContainer: {
    position: 'absolute',
    left: windowWidth * (65/750),
    height: windowHeight * (125/1334),
    width: windowWidth * (6/8),
  },
  detailedInfoView: {
    width: windowWidth * (7/8),
    left: windowWidth * (-15/750),
  },
  detailedInfoContainer: {
    left: windowWidth * (65/750),
    width: windowWidth * (6.3/8),
    marginBottom: windowHeight * (45/1334),
  },
  infoText: {
    fontSize: 14,
    color: 'black',
  },
  joinButton: {
    width: '100%',
    borderRadius: 5,
    height: windowHeight * (40/1334),
    backgroundColor: '#c03431',
    alignItems: 'center',
    justifyContent: 'center'
  },
  tabListView: {
    height: windowHeight * (1289/1334),
    width: windowWidth,
  },
  tabView: {
    height: windowHeight * (80/1334),
    width: '100%',
    backgroundColor: 'white',
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: windowHeight * (45/1334),
  },
  normalTabButtonView: {
    height: windowHeight * (80/1334),
    width: windowWidth * (250/750),
    backgroundColor: 'white',
    borderRadius: 5,
  },
  selectedTabButtonView: {
    height: windowHeight * (80/1334),
    width: windowWidth * (250/750),
    backgroundColor: '#f8ebeb',
    borderRadius: 5,
  },
  listView: {
    height: windowHeight * (1164/1334),
    width: '100%',
    alignItems: 'center',
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
    width: windowWidth * (642/750),
    backgroundColor: "#c03431",
  },
  groupItemView: {
    width: windowWidth * (642/750),
    height: windowHeight * (120/1334),
  },
  listItemFont: {
    fontSize: 14,
    marginBottom: 5,
  },
  listItemFontBold: {
    fontWeight: 'bold',
    fontSize: 14,
    marginBottom: 5,
  }
})

export default connect(mapStateToProps)(ClassDetail);
