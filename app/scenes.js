import {Actions, Router, Scene} from 'react-native-router-flux';
import React, { Component } from 'react';

import NewsP from './Components/NewsPage';
import NewsPage from './Components/NewsPage2';
import NewsWebScene from './Components/NewsWebScene';
import RoommateDeck from './Components/Roommate';
import ProfilePage from './Components/Profile';
import newSwipe from './Components/newSwipe';
import personPage from './Components/personPage';
import homePage from './Components/homePage';
import PotentialList from './Components/potentialList';
import DatePick from './Components/DatePicking';
import ChatPage from './Components/Chat';
import Inbox from './Components/Inbox2';
import MessagePage from './Components/MessagePage';
import Login from './Components/Login';
import AccountPage from './Components/AccountPage';
import NewsCollection from './Components/NewsCollection';
import FriendsPage from './Components/FriendsPage';
import CreateMessage from './Components/CreateMessage';

//Classmate Components
import ClassmateHome from './Components/Classmate/ClassmateHome';
import FindClass from './Components/Classmate/FindClass';
import ClassSections from './Components/Classmate/ClassSections';
import ClassDetail from './Components/Classmate/ClassDetail';
import GroupPage from './Components/Classmate/GroupPage';
import PostPage from './Components/Classmate/PostPage';
import MyGroups from './Components/Classmate/MyGroups';


const scenes = Actions.create(
  <Scene key="root">
    <Scene
      key="login"
      component={Login}
      title={"登录"}
      type='replace'
      hideNavBar={true}
      initial
      />
    <Scene
      key="newsPage"
      component={NewsPage}
      title={"BUCSSA活动推送"}
      type='replace'
      hideNavBar={true}
      />
    <Scene
      key="profilePage"
      component={AccountPage}
      type='replace'
      title={"我"}
      hideNavBar={true}
      />
    <Scene
      key="webPage"
      component={NewsWebScene}
      title={"详情"}
      hideNavBar={false}
      />
    <Scene
      key="datePick"
      component={DatePick}
      title={"你的生日"}
      hideNavBar={false}
      />
    <Scene
      key="inbox"
      component={Inbox}
      title={"收件箱"}
      type='replace'
      hideNavBar={true}
      onEnter={() => {
        console.log(Actions.refs.inbox)
      }}
      />
    <Scene
      key="messagePage"
      component={MessagePage}
      title={"信息"}
      hideNavBar={true}
      />
    <Scene
      key="collectionPage"
      component={NewsCollection}
      title={"Collection"}
      hideNavBar={true}
      />
    <Scene
      key="friendsPage"
      component={FriendsPage}
      title={"Friends"}
      hideNavBar={true}
      />
    <Scene
      key="createMessage"
      component={CreateMessage}
      title={"CreateMessage"}
      hideNavBar={true}
      />

    <Scene
      key="classmateHome"
      component={ClassmateHome}
      title={"ClassmateHome"}
      hideNavBar={true}
      />
    <Scene
      key="findClass"
      component={FindClass}
      title={"FindClass"}
      hideNavBar={true}
      />
    <Scene
      key="classSections"
      component={ClassSections}
      title={"ClassSections"}
      hideNavBar={true}
      />
    <Scene
      key="classDetail"
      component={ClassDetail}
      title={"ClassDetail"}
      hideNavBar={true}
      />
    <Scene
      key="groupPage"
      component={GroupPage}
      title={"GroupPage"}
      hideNavBar={true}
      />
    <Scene
      key="postPage"
      component={PostPage}
      title={"PostPage"}
      hideNavBar={true}
      />
    <Scene
      key="myGroups"
      component={MyGroups}
      title={"MyGroups"}
      hideNavBar={true}
      />
  </Scene>
);

export default scenes;
