import React,{ Component } from 'react' ;
import {
  StyleSheet,
  TouchableHighlight ,
  Text
} from 'react-native';

import LCDid from './../LCDid' ;

export default class LCMFollow extends LCDid {
  constructor(props) {
    super(props) ;

    this.check = {
      api : 'userfollow/isfollow',
      data : {uid : this.props.uid} ,
    } ;

    this.dodid = {
      api : 'userfollow/add' ,
      data : {uid : this.props.uid} ,
    } ;
  }

  render(){
    let addText = '＋关注' ;
    let addFollowBtnStyle = [styles.addFollowBtn] ;
    let addFollowBtnTextStyle = [styles.addFollowBtnText] ;

    if(this.state.did){
        addText = '已关注' ;
        addFollowBtnStyle.push(styles.addFollowBtnDid) ;
        addFollowBtnTextStyle.push(styles.addFollowBtnDidText) ;
    }

    return (
      <TouchableHighlight style={addFollowBtnStyle} underlayColor="#aaa" onPress={this._onPress.bind(this)}>
        <Text allowFontScaling={false} style={addFollowBtnTextStyle}>{addText}</Text>
      </TouchableHighlight>
    ) ;
  }
}

const styles = StyleSheet.create({
  addFollowBtn:{
    borderRadius:3,
    width:68,
    height:25,
    backgroundColor:'#ff6600',
  },
  addFollowBtnText:{
    color:'#fff',
    textAlign:'center',
    backgroundColor:'transparent',
    lineHeight:20,
    fontSize:14,
  },
  addFollowBtnDid:{
    backgroundColor:'#eee',
  },
  addFollowBtnDidText:{
    color:'#333'
  }
}) ;
