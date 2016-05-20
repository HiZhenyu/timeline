import React, {
  Component
} from 'react';
import {
  StyleSheet,
  View,
  Image,
  Text,
  Modal,
  TouchableWithoutFeedback,
  TouchableOpacity,
} from 'react-native';

import * as Animatable from 'react-native-animatable' ;
import LCLoading from './LCLoading' ;

export default class LCShare extends Component {
  static defaultProps = {
    hidden : false ,
  } ;

  constructor(props) {
    super(props);
    this.state = {
      hidden:this.props.hidden,
      animation:'fadeInUp',
    } ;

    //分享.
    this.shareMs = [
      {
        title:'分享到微信朋友圈',
        icon:require('./../../images/icon_share_wxtimeline.png'),
        id:'share.weixin.timeline' ,
      },
      {
        title:'分享给微信好友',
        icon:require('./../../images/icon_share_wxmessage.png'),
        id:'share.weixin.message' ,
      },
      {
        title:'分享到QQ空间',
        icon:require('./../../images/icon_share_qzone.png'),
        id:'share.qq.qzone' ,
      },
      {
        title:'分享QQ好友',
        icon:require('./../../images/icon_share_qqmessage.png'),
        id:'share.qq.message' ,
      },
    ] ;
  }

  //- 显示
  show(){
    this.setState({hidden:false}) ;
  }

  //- 隐藏
  hide(){
    this.setState({animation:'fadeOutDown',showing:false}) ;
  }


  //点了其他地方
  _onPressOtherPlace(){
    this.hide() ;
  }

  //取消
  _onPressToCancel(){
    this.hide() ;
  }

  //动画完毕
  _onAnimationEndBox(){
    if(this.state.animation == 'fadeInUp'){
      this.setState({showing:true}) ;
      return ;
    }
    this.setState({hidden:true,animation:'fadeInUp'}) ;
  }

  //单个分享图标
  _renderASharIcon(ashare){
    return <TouchableOpacity key={ashare.id} style={styles.ashareBtn}><View>
      <Image style={styles.ashareImage} source={ashare.icon} />
      <Text style={styles.ashareText} allowFontScaling={false}>{ashare.title}</Text>
    </View></TouchableOpacity>
  }

  render() {
    if(this.state.hidden) return null ;

    let placeOtherStyle = { backgroundColor:'rgba(51,51,51,0.3)' } ;
    if(!this.state.showing) placeOtherStyle = null ;

    let sharebtns = this.shareMs.map(it=>this._renderASharIcon(it)) ;
    return  <Modal transparent={true}>
      <TouchableWithoutFeedback onPress={this._onPressOtherPlace.bind(this)} style={styles.flex}><View style={[styles.flex,placeOtherStyle]}></View></TouchableWithoutFeedback>
      <Animatable.View animation={this.state.animation} onAnimationEnd={this._onAnimationEndBox.bind(this)} duration={200} style={styles.wrap}>
        <View style={styles.btns}>
          {sharebtns}
        </View>
        <TouchableOpacity activeOpacity={0.6} style={styles.cancelBtn} onPress={this._onPressToCancel.bind(this)}>
          <Text style={styles.cancelText} allowFontScaling={false}>取消</Text>
        </TouchableOpacity>
      </Animatable.View>
    </Modal> ;
  }
}

const styles = StyleSheet.create({
  flex:{
    flex:1,
  },
  wrap:{
    backgroundColor:'#eee',
  },
  cancelBtn:{
    backgroundColor:'#fff',
    height:40,
    justifyContent:'center',
    alignItems:'center',
  },
  cancelText:{
    fontSize:16,
    color:'#333',
  },

  btns:{
    flexDirection:'row',
    flexWrap:'wrap',
    padding:10,
    paddingTop:10,
    paddingBottom:10,
  },

  ashareBtn:{
    margin:8,
    width:60,
    height:100,
  },
  ashareText:{
    fontSize:12,
    marginTop:5,
    textAlign:'center',
    backgroundColor:'transparent',
  },
  ashareImage:{
    width:60,
    height:60,
  }
});
