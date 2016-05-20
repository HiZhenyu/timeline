import LCTTabPage from './../LCTTabPage' ;

import CatDetailIndexPage from './CatDetailIndexPage' ;
import CatDetailTimelinePage from './CatDetailTimelinePage' ;
import CatDetailEssencePage from './CatDetailEssencePage' ;
import CatDetailEventPage from './CatDetailEventPage' ;
import CatDetailMemberPage from './CatDetailMemberPage' ;

import { Navigation } from 'react-native-navigation';

export default class CatDetailMainPage extends LCTTabPage {
  static navigatorButtons = {
    rightButtons: [
      {
        icon: require('./../images/icon_dopost.png'),
        id: 'id.cat.dopost'
      },
    ]
  } ;

  constructor(props) {
    super(props) ;

    let cat = props.cat ;
    this.tabComponents = [
      {
        component : CatDetailIndexPage ,
        label : '首页' ,
        key : 'CatDetailIndexPage',
        props : {cat : cat} ,
      },
      {
        component : CatDetailTimelinePage ,
        label : '最新' ,
        key : 'CatDetailTimelinePage',
        props : {cat : cat} ,
      },
      {
        component : CatDetailEssencePage ,
        label : '活动' ,
        key : 'CatDetailEssencePage',
        props : {cat : cat} ,
      },
      {
        component : CatDetailEventPage ,
        label : '精华' ,
        key : 'CatDetailEventPage',
        props : {cat : cat} ,
      },
      {
        component : CatDetailMemberPage ,
        label : '成员' ,
        key : 'CatDetailMemberPage',
        props : {cat : cat} ,
      },
    ] ;

    this.style = {paddingTop:35} ;
    this.indicatorStyle = {top:0,height:35} ;
    this.indicatorProps = {
      itemTextStyle : {fontSize:14} ,
      selectedItemTextStyle : {fontSize:16} ,
      selectedBorderStyle : {backgroundColor:'#ff6600',width:16} ,
    } ;

    this.props.navigator.setOnNavigatorEvent(this._onNavigatorEvent.bind(this));
  }


  _onNavigatorEvent(event){
    if(event.type == 'NavBarButtonPress'){
      let fns = {
        'id.cat.dopost' : this._onPressToPost.bind(this) ,
      }

      fns[event.id] && fns[event.id]() ;
    }
  }

  _onPressToPost(){
    let props = {cat:this.props.cat} ;
    this.props.navigator.showModal({
      screen: 'post.PostTimelinePage',
      passProps: props,
      title: props.cat.name ,
      backButtonTitle: '取消',
      navigatorStyle:{
        navBarBackgroundColor: '#f9f9f9',
        navBarButtonColor: '#555',
      }
    });

    //global 回调
    global.onPostTimelineSucc = (timeline)=>{
      let props = {timeline:timeline,showSuccTip:true} ;

      this.props.navigator.push({
        screen: 'timeline.TimelinePage',
        title: props.timeline.cat.name,
        backButtonTitle: '返回',
        passProps: props,
        navigatorStyle: {
          tabBarHidden: true,
        } ,
      });
    } ;
  }

  setPage(i){
    if(!this.refViewPager) return ;
    this.refViewPager.setPage(i) ;
  }
}
