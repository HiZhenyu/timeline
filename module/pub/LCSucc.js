import React, { Component } from 'react';
import {
  StyleSheet,
  Image,
  View,
  Text,
  TouchableOpacity,
  Modal,
} from 'react-native';

import Icon from 'react-native-vector-icons/FontAwesome';
import * as Animatable from 'react-native-animatable' ;


export default class LCSucc extends Component {
  constructor(props) {
    super(props) ;
    this.state = {
      hidden : !!this.props.hidden ,
      msg : this.props.msg ,
      btns: this.props.btns ,
      animation : 'slideInUp',
    } ;
  }

  show(){
    this.setState({hidden:false}) ;
  }

  hide(){
    this.setState({hidden:true}) ;
  }

  _onPress(fn){
    this.setState({animation:'slideOutDown'}) ;
    fn && (this.fnOnPress = fn) ;
  }

  _onAnimationEnd(){
    if(this.state.animation == 'slideInUp')  return ;
    if(this.fnOnPress){
      this.fnOnPress() ;
      delete this.fnOnPress ;
    }
  }

  _renderBtns(){
    return this.state.btns.map((it,i)=>{
      let style = [styles.op] ;
      i && style.push(styles.opRight) ;

      if(!it.iconSize) it.iconSize = 40 ;
      if(!it.iconColor) it.iconColor = '#ccc' ;

      return <TouchableOpacity key={i} style={style} onPress={this._onPress.bind(this,it.onPress)}>
        <View style={styles.op}>
          <Icon name={it.iconName} size={it.iconSize} color={it.iconColor} />
          <Text style={styles.opText} allowFontScaling={false}>{it.title}</Text>
        </View>
      </TouchableOpacity> ;
    }) ;
  }

  render(){
    if(this.state.hidden) return null ;

    return <Modal transparent={true}><Animatable.View onAnimationEnd={this._onAnimationEnd.bind(this)} animation={this.state.animation} duration={300} style={[styles.backgroundGray,styles.flex]}>
      <View style={styles.succImageWrap}>
        <Image source={require('./../../images/succ.png')} style={styles.succImage} />
      </View>
      <View style={styles.tipWrap}>
        <Icon style={styles.tipIcon} size={30} name="check-square-o" color="#ff6600" />
        <Text style={styles.tipText} allowFontScaling={false}>{this.state.msg}</Text>
      </View>

      <View style={styles.opsWrap}>
        {this._renderBtns()}
      </View>

    </Animatable.View></Modal> ;
  }
}

const styles = StyleSheet.create({
  flex:{
    flex:1,
  },
  backgroundGray:{
    backgroundColor:'#efefef',
  } ,
  succImageWrap:{
    marginTop:50,
    alignItems:'center',
    justifyContent:'center',
  },
  succImage:{
    height:180,
    resizeMode:'contain' ,
  },
  tipWrap:{
    flexDirection:'row',
    justifyContent:'center',
    alignItems:'center',
    paddingTop:30,
    paddingBottom:30,
  },
  tipIcon:{
    marginRight:10,
  },
  tipText:{
    color:'#ff6600',
    fontSize:16,
  },

  opsWrap:{
    flexDirection:'row',
    paddingTop:30,
    marginLeft:30,
    marginRight:30,
    borderTopWidth:1,
    borderTopColor:'#ccc',
  },
  opRight:{
    borderLeftWidth:1,
    borderLeftColor:'#ccc',
  },
  op:{
    flex:1,
    alignItems:'center',
  },
  opText:{
    paddingTop:10,
  }
}) ;
