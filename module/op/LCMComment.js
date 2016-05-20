import React,{ Component } from 'react' ;
import {
  StyleSheet,
  TouchableOpacity ,
  View,
  Text,
  Image
} from 'react-native';

export default class LCMComment extends Component {
  constructor(props) {
    super(props) ;

    this.state = {
      timeline: this.props.timeline ,
    } ;
  }

  _onPress(){
    if(!this.props.navigator) return ;
    var props = {timeline:this.state.timeline,openReplyBar:true} ;

    this.props.navigator.push({
      screen: 'timeline.TimelinePage',
      title: props.timeline.cat.name,
      backButtonTitle: '返回',
      passProps: props,
      navigatorStyle: {
        tabBarHidden: true,
      } ,
    });

    return ;
  }

  render(){
    var style = [] ;
    if(this.props.style) style.push(this.props.style) ;

    var numText = this.state.timeline.comments.sum ? (<Text allowFontScaling={false}>({this.state.timeline.comments.sum})</Text>) : '' ;

    return (
      <TouchableOpacity onPress={this._onPress.bind(this)} style={style} underlayColor="#ccc">
        <View style={styles.flexRow}>
          <Image style={styles.icon} source={require('./../../images/icon_comment.png')} />
          <Text style={styles.text} allowFontScaling={false}>评论{numText}</Text>
        </View>
      </TouchableOpacity>
    ) ;
  }
}

const styles = StyleSheet.create({
  flexRow:{
    flexDirection:'row',
  } ,
  icon:{
    resizeMode:'contain',
    width:18,
    height:18,
    marginRight:5,
  },
  text:{
    fontSize:13,
    lineHeight:17,
  }
}) ;
