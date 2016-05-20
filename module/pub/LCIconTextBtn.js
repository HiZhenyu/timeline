import React,{ Component } from 'react' ;
import {
  StyleSheet,
  TouchableOpacity ,
  View,
  Text,
} from 'react-native';

import Icon from 'react-native-vector-icons/FontAwesome';

export default class LCIconTextBtn extends Component {
  static defaultProps = {
    iconSize : 25 ,
    iconName : 'photo',
    iconColor: '#ccc',
    name : ''
  } ;

  constructor(props) {
    super(props) ;
    this.state = {

    } ;
  }

  shouldComponentUpdate(nextProps){
    let shouldUpdate = false ;
    for(let ik in nextProps){
      if(nextProps[ik] == this.props[ik]) continue ;
      shouldUpdate = true ;
      break ;
    }

    return shouldUpdate ;
  }

  render(){
    let tpl = null ;
    if(this.props.name){
      tpl = <View style={styles.view}>
        <Icon name={this.props.iconName} size={this.props.iconSize} color={this.props.iconColor} />
        <Text style={[styles.text,this.props.styleText]} allowFontScaling={false}>{this.props.name}</Text>
      </View> ;
    }else{
      tpl = <Icon name={this.props.iconName} size={this.props.iconSize} color={this.props.iconColor} /> ;
    }

    return <TouchableOpacity style={[styles.btn,this.props.style]} onPress={this.props.onPress}>
      <View style={styles.view}>
        <Icon name={this.props.iconName} size={this.props.iconSize} color={this.props.iconColor} />
        <Text style={[styles.text,this.props.styleText]} allowFontScaling={false}>{this.props.name}</Text>
      </View>
    </TouchableOpacity>
  }
}

const styles = StyleSheet.create({
  btn:{
    flexDirection:'row',
    justifyContent:'flex-start',
    alignItems:'center',
  },
  view:{
    flexDirection:'row',
    justifyContent:'flex-start',
    alignItems:'center',
  },
  text:{
    marginLeft:5,
  },
}) ;
