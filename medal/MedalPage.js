import React,{ Component } from 'react' ;
import {
  StyleSheet,
  View,
  Text
} from 'react-native';


import LCPage from './../LCPage' ;
import LCMedalDetail from './../module/medal/LCMedalDetail' ;
import LCMedalUserList from './../module/medal/LCMedalUserList' ;
import LCTitle from './../module/pub/LCTitle' ;
import LCMoreBox from './../module/pub/LCMoreBox' ;
import LCMedalGetBtn from './../module/medal/LCMedalGetBtn' ;

export default class MedalPage extends LCPage {
  constructor(props) {
    super(props) ;

    if(!props.medal || !props.medal.id) return ;

    let medal = props.medal ;

    this.theComponents = [
      {
        component : LCMedalDetail ,
        props : {medal : medal} ,
        key : 'medal',
      },
      {
        component : LCTitle ,
        props : {title : '获得该勋章的机友们'} ,
      },
      {
        component : LCMedalUserList ,
        props : {
          ps :42,
          p:1,
          medalId:medal.id,
          style:styles.medalUserList,
          itemStyle:styles.medalUserListItem,
          styleId:1,
          renderFooter:()=>{
            return <LCMoreBox title={'查看更多拥有该勋章的机友～'} onPress={this._onPressToMoreMedalUserlist.bind(this)} />
          }
        } ,
        key : 'medaluserlist',
      }
    ] ;
  }


  _onPressToMoreMedalUserlist(){
    if(!this.props.navigator) return ;
    var props = {} ;
    if(this.props.medal) props.medal = this.props.medal ;

    //使用Navigation方案
    this.props.navigator.push({
      screen: 'medal.MedalUserListPage',
      passProps: props,
      animated: true,
      title: '拥有该勋章的机友们',
      backButtonTitle: '返回',
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

const styles = StyleSheet.create({
  medalUserList:{
    backgroundColor:'#fff',
    flex:1,
    flexDirection:'row',
    flexWrap:'wrap',
    padding:10,
    borderBottomWidth:0,
    backgroundColor:'#fff',
  },
  medalUserListItem:{
    width:55,
    height:55,
  }
}) ;
