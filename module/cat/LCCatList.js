import React,{ Component } from 'react' ;
import {
  StyleSheet,
  TouchableHighlight ,
  View,
  ListView,
  Text,
} from 'react-native';

import LCCatItem from './LCCatItem' ;
import LCCatItem from './../LCList' ;

export default class LCCatList extends LCList {
  static defaultProps = {
    order: 'last',
    itype: 'all',
    areaId: 0,
    ps: 20,
  } ;

  constructor(props) {
    super(props) ;
  }

  render(){
    return null ;
  }
}

const styles = StyleSheet.create({
  spinner:{
    height:50,
    alignItems:'center',
    justifyContent:'center',
    flexDirection:'row'
  },
  catItem:{
    marginBottom:10,
  }
}) ;
