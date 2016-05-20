import React,{ Component } from 'react' ;
import {
  StyleSheet,
  TouchableHighlight ,
  View,
  Text,
  Image
} from 'react-native';

import LCLoading from './../pub/LCLoading' ;
import * as WechatAPI from 'react-native-wx';

export default class LCWeixinLogin extends Component {
  constructor(props) {
    super(props) ;
    this.state = {
      loadingVisible : false ,
    } ;
  }


  _onPress(){
    WechatAPI.login({
      scope: 'snsapi_userinfo'
    }).then((userInfo)=>{
      this.setState({loadingVisible:true}) ;
      console.log(userInfo);
    }).catch(e=>{
      global.tip('用户登录微信失败') ;
    }) ;
  }

  render(){
    let style = [styles.wrap,this.props.style] ;
    return (
      <View style={style}>
        <LCLoading visible={this.state.loadingVisible} />
        <TouchableHighlight onPress={this._onPress.bind(this)} underlayColor="#ccc" style={styles.btn}>
          <Image style={styles.image} source={require('./../../images/icon32_wx_button.png')} />
        </TouchableHighlight>
      </View>
    ) ;
  }
}


const styles = StyleSheet.create({
  wrap:{
    alignItems:'center',
    justifyContent:'space-around',
    flexDirection:'row',
    padding:20,
  },
  image:{
    height:28,
    width:140,
  },

}) ;
