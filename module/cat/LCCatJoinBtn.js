import React,{ Component } from 'react' ;
import {
  StyleSheet,
  TouchableHighlight ,
  View,
  Text,
  Image
} from 'react-native';


import LCDid from './../LCDid' ;
import Prompt from 'react-native-prompt';


/**
 * 机友会加入按钮
 */
export default class LCCatJoinBtn extends LCDid {
  constructor(props) {
    super(props) ;

    this.check = {
      api : 'cat/hasjoin' ,
      data : {id:this.props.catId}
    } ;

    this.dodid = {
      api : 'cat/dojoin' ,
      data : {id:this.props.catId}
    } ;

    this.state.promptTitle = '' ;

  }

  dodidThenSucc(data){
    global.tip('恭喜您加入本机友会！') ;
  }

  //
  dodidThenEver(js){
    if(!js) js = {} ;
    js.code == '303' && this.setState({promptJoinVisible:true,'promptTitle':js.msg},()=>{
      this.digXing = true ;
    }) ;
  }

  _promptOnSubmit(val){
    this.digXing = false ;
    this.dodid.data.content = val ;
    this.setState({promptJoinVisible:false,joinMsg:val},this.onPress.bind(this)) ;
  }

  _promptOnCancel(){
    this.digXing = false ;
    this.setState({promptJoinVisible:false}) ;
  }

  _onPressBtn(){
    if(!this.state.did) return this._onPress() ;

    console.log('邀请好友');
  }

  render(){
    let style = [styles.opsBtn,styles.opsBtnIm] ;
    if(this.state.did) style.push(styles.opsBtnDid) ;
    if(this.props.style) style.push(this.props.style) ;

    let joinText = '＋加入本会' ;
    if(this.state.did) joinText = '邀请好友' ;

    return (
      <TouchableHighlight style={style} underlayColor="#aaa" onPress={this._onPressBtn.bind(this)}>
        <View style={styles.opsBtnView}>
          <Text style={[styles.opsBtnText,styles.opsBtnImText]} allowFontScaling={false}>{joinText}</Text>
          <Prompt
            title={this.state.promptTitle}
            placeholder=''
            defaultValue=''
            visible={this.state.promptJoinVisible}
            cancelText='取消'
            submitText='确认'
            onCancel={this._promptOnCancel.bind(this)}
            onSubmit={this._promptOnSubmit.bind(this)} />
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
  },
}) ;
