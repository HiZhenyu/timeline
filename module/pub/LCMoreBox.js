import React,{ Component } from 'react' ;
import {
  StyleSheet,
  TouchableHighlight,
  Text ,
} from 'react-native';

export default class LCMoreBox extends Component {
  constructor(props) {
    super(props) ;
  }

  render(){
    let style = [styles.btnMore] ;
    this.props.style && style.push(this.props.style) ;

    return (<TouchableHighlight onPress={this.props.onPress} style={style} underlayColor="#ccc">
      <Text allowFontScaling={false} style={styles.btnMoreText}>{this.props.title}</Text>
    </TouchableHighlight>) ;
  }
}

const styles = StyleSheet.create({
  btnMore:{
    height:45,
    alignItems:'center',
    justifyContent:'center',
    backgroundColor:'#fff',
    flex:1,
  },
  btnMoreText:{
    color:'#516783',
  }
}) ;
