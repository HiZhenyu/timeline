import React,{ Component } from 'react' ;
import {
  StyleSheet,
  View,
  Text,
  Image,
  Dimensions,
  TouchableWithoutFeedback
} from 'react-native';

import * as Animatable from 'react-native-animatable' ;
import LCIconTextBtn from './../module/pub/LCIconTextBtn' ;

//系统默认的头像
export default class JiyouhuiUserIconPage extends Component {
  constructor(props) {
    super(props) ;

    this.icons = [
      {uri:'http://img.lmjx.net/iupload/u/u1.jpg'} ,
      {uri:'http://img.lmjx.net/iupload/u/u2.jpg'} ,
      {uri:'http://img.lmjx.net/iupload/u/u3.jpg'} ,
      {uri:'http://img.lmjx.net/iupload/u/u4.jpg'} ,
      {uri:'http://img.lmjx.net/iupload/u/u5.jpg'} ,
      {uri:'http://img.lmjx.net/iupload/u/u6.jpg'} ,
      {uri:'http://img.lmjx.net/iupload/u/u7.jpg'} ,
      {uri:'http://img.lmjx.net/iupload/u/u8.jpg'} ,
      {uri:'http://img.lmjx.net/iupload/u/u9.jpg'} ,
      {uri:'http://img.lmjx.net/iupload/u/u10.jpg'} ,
    ] ;

    this.state = {
      selectIndex : -1 ,
    } ;

    this.props.navigator.setOnNavigatorEvent(this._onNavigatorEvent.bind(this));
  }

  static navigatorButtons= {
    rightButtons: [
      {
        title: '完成',
        id: 'id.succ',
      }
    ],
    leftButtons: [
      {
        title: '取消',
        id: 'id.cancel' ,
      }
    ] ,
  } ;

  _onNavigatorEvent(event){
    if(event.type == 'NavBarButtonPress'){
      let fns = {
        'id.succ' : this._onSucc.bind(this) ,
        'id.cancel' : this._onCancel.bind(this) ,
      }

      fns[event.id] && fns[event.id]() ;
    }
  }

  //取消
  _onCancel(){
    if(global.onJiyouhuiUserIconSucc) delete global.onJiyouhuiUserIconSucc ;
    this.props.navigator.dismissModal() ;
  }

  //成功
  _onSucc(){
    if(this.state.selectIndex == -1 || !this.icons[this.state.selectIndex]){
      global.tip('请选择一个头像!') ;
      return false ;
    }

    if(!global.onJiyouhuiUserIconSucc) return ;

    let icon = this.icons[this.state.selectIndex].uri.replace('http://img.lmjx.net/iupload/','') ;
    global.onJiyouhuiUserIconSucc(icon) ;
    delete global.onJiyouhuiUserIconSucc ;

    this.props.navigator.dismissModal() ;
  }

  _onPress(i){
    this.setState({selectIndex:i}) ;
  }

  render(){
    return <View style={[styles.wrap,styles.backgroundGray]}>
    {this.icons.map((it,i)=>{
      let selectedIcon = null ;
      if(this.state.selectIndex == i) selectedIcon = <Animatable.View animation="bounceIn" style={styles.itemIcon}><LCIconTextBtn iconSize={20} iconName="check-square-o" iconColor="#ff6600" /></Animatable.View>
      return <TouchableWithoutFeedback key={i} onPress={this._onPress.bind(this,i)}>
        <View style={styles.item}>
          <Image style={styles.iconImage} source={{uri:it.uri}} />
          {selectedIcon}
        </View>
      </TouchableWithoutFeedback>
    })}
    </View> ;
  }
}

const PWidth = Dimensions.get('window').width ;
const ItemWidth = (PWidth - 20) / 5 ;
const styles = StyleSheet.create({
  wrap : {
    flexDirection:'row',
    flexWrap:'wrap',
    padding:10 ,
    flex:1,
  },
  backgroundGray:{
    backgroundColor:'#efefef'
  } ,
  item:{
    width: ItemWidth,
    height:ItemWidth,
    padding:5,
  } ,
  iconImage:{
    width: ItemWidth-10,
    height:ItemWidth-10,
  },
  itemIcon:{
    position:'absolute' ,
    right: 2,
    bottom:2,
    backgroundColor:'transparent',
  }
}) ;
