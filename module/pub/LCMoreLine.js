import React,{ Component } from 'react' ;
import {
  StyleSheet,
  Text,
  TouchableHighlight,
  View
} from 'react-native';

export default class LCMoreLine extends Component {
  constructor(props) {
    super(props) ;
  }

  render(){
    return (
      <View style={styles.wrap}>
        <TouchableHighlight underlayColor="#aaa" style={styles.btnMore} onPress={this.props.onPress}>
          <Text allowFontScaling={false} style={styles.btnMoreText}>{this.props.title}</Text>
        </TouchableHighlight>
      </View>
    ) ;
  }
}

const styles = StyleSheet.create({
  backgroundGray:{
    backgroundColor:'#efefef'
  },
  wrap:{
    alignItems:'center',
    padding:20,
  },
  btnMore:{
    borderWidth:1,
    borderColor:'#ccc',
    padding:3,
    backgroundColor:'#ccc',
    paddingLeft:20,
    paddingRight:20,
    borderRadius:4,
    height:30,
    justifyContent:'center'
  },
  btnMoreText:{
    textAlign:'center',
    color:'#fff',
  }
}) ;
