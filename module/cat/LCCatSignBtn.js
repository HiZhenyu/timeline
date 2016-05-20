import React,{ Component } from 'react' ;
import {
  StyleSheet,
  TouchableHighlight ,
  View,
  Text,
  Image
} from 'react-native';

import LCDid from './../LCDid' ;

/**
 * 机友会签到按钮
 */
export default class LCCatSignBtn extends LCDid {
  constructor(props) {
    super(props) ;

    this.check = {
      api : 'cat/hassign' ,
      data : {id:this.props.catId}
    } ;

    this.dodid = {
      api : 'cat/dosign' ,
      data : {id:this.props.catId}
    } ;
  }

  render(){
    let style = [styles.opsBtn] ;
    if(this.state.did) style.push(styles.opsBtnDid) ;
    if(this.props.style) style.push(this.props.style) ;

    let signText = '打卡签到' ;
    let signIcon = require('./../../images/icon_cat_sign.png') ;
    if(this.state.did){
      signText = '今日已打卡' ;
      signIcon = require('./../../images/icon_cat_sign_did.png') ;
    }

    return (
      <TouchableHighlight underlayColor="#F6F6F6" style={style} onPress={this._onPress.bind(this)}>
        <View style={styles.opsBtnView}>
          <Image style={styles.opsBtnImage} source={signIcon} key={this.state.did} />
          <Text style={styles.opsBtnText} allowFontScaling={false}>{signText}</Text>
        </View>
      </TouchableHighlight>
    ) ;
  }
}

const styles = StyleSheet.create({
  opsBtnView:{
    flexDirection:'row',
    justifyContent:'center',
    alignItems:'center',
    height:26,
  },
  opsBtn:{
    borderWidth:1,
    borderColor:'#ccc',
    borderRadius:3,
    flex:1,
    backgroundColor:'#f9f9f9'
  },
  opsBtnDid:{
    backgroundColor:'#eee',
  },
  opsBtnIm:{
    backgroundColor:'#ff6600',
    borderWidth:0,
  },
  opsBtnImText:{
    color:'#fff',
  },
  opsBtnText:{
    color:'#333',
  },

  opsBtnImage:{
    width:20,
    height:20,
    tintColor:'#555',
    marginRight:5
  },
}) ;
