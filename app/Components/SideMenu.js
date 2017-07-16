import React, { Component } from 'react';
import {
  View,
  Image,
  Alert,
  StyleSheet,
  Dimensions,
  ScrollView,
  Text,
  TouchableOpacity
} from 'react-native';

import { FooterTab, Button, Left, Right, Body, Icon,
  Thumbnail, CardItem, Card, Spinner} from 'native-base';

  import Svg,{
      Circle,
      LinearGradient,
      RadialGradient,
      Line,
      Path,
      Polygon,
  } from 'react-native-svg';



export default class SideMenu extends Component {
  constructor(props) {
    super(props)

  }

  triangleStyle = function(height) {
   return {
     position: 'absolute',
     right: 0,
     bottom: height,
   }
 }

  render() {
    const height = this.props.sceneKey * 37 + 20;
    // let triangleStyle = triangleStyle(this.props.sceneKey * 35 + 20;
    return(
    <View flex={5}>
      <View flex={3.7} flexDirection={'column'}>
        <Text style={[styles.topFont, {marginTop:30}]}> BU </Text>
        <Text style={styles.topFont}> CSSA </Text>
      </View>

      <Svg
      height="20"
      width="15"
      style={{
        position: 'absolute',
        right: 0,
        bottom: height,
      }}
      >
      <Polygon
      points="0,10 15,20 15,0"
      fill="pink"
      />
      </Svg>

      <View flex={1.3} flexDirection={'column'} alignItems={'center'} >
        <TouchableOpacity>
          <Icon  name="ios-paper" style={{color:'pink', marginBottom: 5}} />
        </TouchableOpacity>
        <TouchableOpacity>
          <Icon  name="ios-bookmarks" style={{color:'pink', marginBottom: 5}} />
        </TouchableOpacity>
        <TouchableOpacity>
          <Icon  name="ios-key" style={{color:'pink', marginBottom: 5}} />
        </TouchableOpacity>
        <TouchableOpacity>
          <Icon  name="ios-heart" style={{color:'pink'}} />
        </TouchableOpacity>
      </View>
    </View>
    )
  }
}


const styles = StyleSheet.create({
  topFont: {
    fontSize: 45,
    fontWeight: 'bold',
    color: 'pink',
    fontFamily: 'AvenirNextCondensed-Heavy'
  }
})
