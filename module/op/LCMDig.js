import React, {
  Component,
  StyleSheet,
  TouchableOpacity ,
  View,
  Text,
  Image
} from 'react-native';

export default class LCMDig extends Component {
  constructor(props) {
    super(props) ;

    //timelineId
    this.timelineId = this.props.timelineId ? this.props.timelineId : '0' ;
    this.state = {
      num: this.props.isum ? this.props.isum : 0,
      did: !!this.props.did
    } ;
  }

  _onPress(){
    if(this.digXing) return ;

    var online = global.getOnline() ;
    console.log(online);
    if(!online.uid){
      global.toLogin() ;
      return ;
    }

    if(this.state.did) return ;

    this.setState({did:true}) ;

    var post = {} ;
    post.timeline_id = this.timelineId ;

    this.digXing = true ;
    v2iapi('iop','good',post,{
      succ:(js)=>{
        this.setState({num:++this.state.num,did:true}) ;
        if(js.score) global.tip('点赞成功，并获得'+js.score+'金币!') ;

        if(this.props.timelineObj){
          var atimeline = this.props.timelineObj.state.timeline ;
          atimeline.dig.did = true ;
          atimeline.digs.list.push({id:js.id,create_time:js.create_time,user:online}) ;
          atimeline.digs.sum++ ;

          this.props.timelineObj.setState(atimeline) ;
        }

      },
      ever:(js)=>{
        this.digXing = false ;
        if(js && js.code == '300') this.setState({did:true}) ;
      }
    }) ;
  }

  render(){
    let style = [styles.flexRow] ;
    if(this.props.style) style.push(this.props.style) ;

    let numText = this.state.num ? (<Text allowFontScaling={false}>({this.state.num})</Text>) : '' ;
    let didText = this.props.showDigText ? (this.state.did ? '已赞' : '点赞') : '' ;
    let digImage = this.state.did ? require('./../../images/icon_dig_did.png') : require('./../../images/icon_dig.png') ;

    let digImageStyle = [styles.icon] ;
    if(this.props.digImageStyle) digImageStyle.push(this.props.digImageStyle) ;

    let digTextStyle = [styles.text] ;
    if(this.props.digTextStyle) digTextStyle.push(this.props.digTextStyle) ;

    return (
      <TouchableOpacity underlayColor="#ccc" onPress={this._onPress.bind(this)}>
        <View style={style}>
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
