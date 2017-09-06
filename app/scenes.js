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
      key="home"
      component={homePage}
      title={"必优爱批批"}
      type='replace'
       hideNavBar={true}
      />

    <Scene
      key="roommate"
      component={RoommateDeck}
      title={"找室友"}
      hideNavBar={false}
      />
    <Scene
      key="potentialList"
      component={PotentialList}
      title={"你的潜在室友"}
      hideNavBar={false}
      />
    <Scene
      key="personPage"
      component={personPage}
      title={"TA的概要"}
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
        onExit={() => console.log(Actions)}
        />
  </Scene>
);

export default scenes;
