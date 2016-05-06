import React, {
  Component,
  StyleSheet,
  TouchableHighlight ,
  View,
  Image
} from 'react-native';

export default class LCMDrop extends Component {
  constructor(props) {
    super(props) ;
    this.state = { } ;
  }

  render(){
    var style = [styles.flexRow] ;
    if(this.props.style) style.push(this.props.style) ;

    return (
      <TouchableHighlight underlayColor="#ccc" style={{width:18}}>
        <View style={style}>
          <Image style={styles.icon} source={require('./../../images/icon_drop.png')} />
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
  }
}) ;
