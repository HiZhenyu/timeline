import React, {
  Component,
  StyleSheet,
  TouchableHighlight ,
  View,
  Text,
  Image
} from 'react-native';

export default class LCMComment extends Component {
  constructor(props) {
    super(props) ;

    var num = this.props.isum ? this.props.isum : 0 ;

    this.state = {
      num: num
    } ;
  }

  render(){
    var style = [styles.flexRow] ;
    if(this.props.style) style.push(this.props.style) ;

    var numText = this.state.num ? (<Text allowFontScaling={false}>({this.state.num})</Text>) : '' ;

    return (
      <TouchableHighlight underlayColor="#ccc">
        <View style={style}>
          <Image style={styles.icon} source={require('./../../images/icon_comment.png')} />
          <Text style={styles.text} allowFontScaling={false}>评论{numText}</Text>
        </View>
      </TouchableHighlight>
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
