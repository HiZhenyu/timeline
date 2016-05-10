import React, {
  Component,
  StyleSheet,
  View,
  Text
} from 'react-native';

export default class LCTitle extends Component {
  constructor(props) {
    super(props) ;
    this.state = {
    };
  }

  render(){
    let styleh1 = [styles.h1] ;
    if(this.props.style) styleh1.push(this.props.style) ;

    let rightTpl = null ;
    if(this.props.rightText){
        rightTpl = <Text style={styles.rightText} onPress={this.props.onRightTextPress} allowFontScaling={false}>{this.props.rightText}</Text>
    }

    return (
      <View style={styleh1}>
        <Text style={styles.text} allowFontScaling={false}>{this.props.title}</Text>
        {rightTpl}
      </View>
    ) ;
  }
}

const styles = StyleSheet.create({
  h1:{
    borderBottomWidth:1,
    borderBottomColor:'#eee',
    backgroundColor:'#fff',
    marginTop:10,
  },
  text:{
    margin:10,
    fontSize:16,
    fontWeight:'bold',
    color:'#333'
  },
  rightText:{
    position:'absolute' ,
    right:10,
    color:'#0049bb',
    top:10,
  }
}) ;
