import React, {
} from 'react-native';

import LCTitle from './../module/pub/LCTitle' ;
import LCMoreLine from './../module/pub/LCMoreLine' ;

import LCUserCats from './../module/user/LCUserCats' ;
import LCUserBigSP from './../module/user/LCUserBigSP' ;
import LCUserMedals from './../module/user/LCUserMedals' ;
import LCTimelineList from './../module/timeline/LCTimelineList' ;

import LCPage from './../LCPage' ;

export default class UserHomePage extends LCPage {
  constructor(props) {
    super(props) ;

    this.mainViewProps = {} ;

    let user = props.user ;
    this.theComponents = [
      {
        component : LCUserBigSP ,
        props : {user : user} ,
        key : 'bigsp' ,
      },
      {
        component : LCTitle ,
        props : {title : 'Ta获得的勋章'} ,
      },
      {
        component : LCUserMedals ,
        props : {user : user} ,
        key : 'usermedals' ,
      },
      {
        component : LCTitle ,
        props : {title : 'Ta的机友会'} ,
      },
      {
        component : LCUserCats ,
        props : {user : user} ,
        key : 'usercats' ,
      },
      {
        component : LCTitle ,
        props : {title : 'Ta的发表'} ,
      },
      {
        component : LCTimelineList ,
        props : {
          uid : user.uid ,
          list: global.getUserTimelines(user.uid) ,
          renderFooter : ()=><LCMoreLine navigator={this.props.navigator} title="更多动态..." onPress={this._onPressMoreTimeline.bind(this)} />
        } ,
        key : 'timelines',
      },

    ] ;
  }

  _onPressMoreTimeline(){
    if(!this.props.navigator) return ;
    var props = {user:this.props.user} ;

    //使用Navigation方案
    this.props.navigator.push({
      screen: 'user.UserTimelinePage',
      title: undefined,
      passProps: props,
      animated: true,
      backButtonTitle: '返回',
      title: props.user.name + '的动态' ,
      backButtonHidden: false,
      navigatorStyle: {
        tabBarHidden: true,
        navBarBackgroundColor: '#f9f9f9',
        navBarBackgroundColor: '#f9f9f9',
        navBarButtonColor: '#555',
      },
      navigatorButtons: {}
    });

  }
}
