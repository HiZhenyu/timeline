import React,{ Component } from 'react' ;
import {
  StyleSheet,
  TouchableOpacity ,
  View,
  Text,
  Image
} from 'react-native';

import LCIconTextBtn from './../pub/LCIconTextBtn' ;
import LCDid from './../LCDid' ;

export default class LCMDig extends LCDid {
  static defaultProps = {
    sum : 0 ,
  } ;

  constructor(props) {
    super(props) ;

    this.dodid = {
      api : 'iop/good' ,
      data : {timeline_id : this.props.timelineId}
    } ;

    this.state.num = this.props.num ;
  }

  dodidThenSucc(data){
    this.setState({num:++this.state.num}) ;
    if(data.score) global.tip('点赞成功，并获得'+data.score+'金币!') ;

    if(this.props.onSucc){
      let props = {} ;
      props.id = data.id ;
      props.create_time = data.create_time ;
      props.user = global.getOnline() ;

      this.props.onSucc(props) ;
    }
  }

  dodidThenEver(js){
    if(!js) js = {} ;
    if(js && js.code == '300'){
      this.setState({did:true}) ;
      return ;
    }
  }

  render(){
    let style = [] ;
    if(this.props.style) style.push(this.props.style) ;

    let numText = this.state.num ? (<Text allowFontScaling={false}>({this.state.num})</Text>) : '' ;
    let didText = this.props.showDigText ? (this.state.did ? '已赞' : '点赞') : '' ;
    let digImage = this.state.did ? require('./../../images/icon_dig_did.png') : require('./../../images/icon_dig.png') ;

    let digImageStyle = [styles.icon] ;
    if(this.props.digImageStyle) digImageStyle.push(this.props.digImageStyle) ;

    let digTextStyle = [styles.text] ;
    if(this.props.digTextStyle) digTextStyle.push(this.props.digTextStyle) ;

    return (
      <TouchableOpacity style={style} underlayColor="#ccc" onPress={this._onPress.bind(this)}>
        <View style={styles.flexRow}>
          <Image style={digImageStyle} source={digImage} />
          <Text style={digTextStyle} allowFontScaling={false}>{didText}{numText}</Text>
        </View>
      </TouchableOpacity>
    ) ;
  }
}

const styles = StyleSheet.create({
  flexRow:{
    flexDirection:'row',
    justifyContent:'center',
    alignItems:'center',
  } ,
  icon:{
    resizeMode:'contain',
    width:18,
    height:18,
    marginRight:5,
  } ,
  text:{
    fontSize:13,
    lineHeight:17,
  }
}) ;
