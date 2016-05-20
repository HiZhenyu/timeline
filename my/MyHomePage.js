import React,{ Component } from 'react' ;
import {
  StyleSheet,
  TouchableHighlight ,
  View,
  Text,
  ScrollView,
  RefreshControl,
  Image,
  StatusBar
} from 'react-native';

import LCSline from './../module/pub/LCSline' ;
import LCOnlineSP from './../module/user/LCOnlineSP' ;

import LCPage from './../LCPage' ;

export default class MyHomePage extends LCPage {
  constructor(props) {
    super(props) ;

    let online = global.getOnline() ;
    if(!online || !online.uid) online = {uid:0} ;

    this.theComponents = [
      {
        component : LCOnlineSP ,
        props : { online : online} ,
        key : 'onlinesp',
      } ,
      {
        component : LCSline ,
        props : {
          style : styles.mt10 ,
          lines: [
            {title:'我的机友会',icon:require('./../images/icon_homeji.png')} ,
          ]
        }
      } ,
      {
        component : LCSline ,
        props : {
          style : styles.mt10 ,
          lines : [
            {title:'金币纪录',icon:require('./../images/icon_log.png')},
            {title:'获奖纪录',icon:require('./../images/icon_log.png')},
          ]
        }
      } ,
    ] ;
  }
}


const styles = StyleSheet.create({
  backgroundGray:{
    backgroundColor:'#efefef'
  } ,
  mt10:{
    marginTop:10,
  }
}) ;
