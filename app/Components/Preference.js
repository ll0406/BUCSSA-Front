import React, { Component } from 'react';
import {
  View,
  Image,
  Alert,
  TouchableOpacity,
  ImagePickerIOS,
} from 'react-native';

import {Button, Switch,Form, Input,Header,Right,Icon, ListItem,Picker, Left,Thumbnail,Container, Card,CardItem,Body,Text,Content, Center, Item} from 'native-base';
import {Col, Row, Grid} from 'react-native-easy-grid';
import {Actions} from 'react-native-router-flux';
import NavBarBelow from './Footer'
import {connect} from 'react-redux'

/*
interests: ['Basketball','Game'],
class: 2018,
major: ['Biology'],
numLiveWith: 2,
preferArea: ['Allston', 'Brookline'],
priceRange: [1400,1600],
smoke: false,
pet: false,
alcohol:false,
likeParty: true,
gaming: true,
single: true,
ownCar: true,
topThreePriority: ['class', 'interests', 'preferArea'],
viewSameGenderOnly: true,
*/

const areaList = ['Allston', 'Brookline', 'South', 'Fenway', 'Cambridge', 'Malden', 'Back Bay']

class ProfilePage extends Component {
  constructor(props) {
      super(props);
  }
  







}
