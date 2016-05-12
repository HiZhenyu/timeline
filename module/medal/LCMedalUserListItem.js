import React,{ Component } from 'react' ;
import {
  StyleSheet,
  View,
  Text
} from 'react-native';

import LCUser from './../user/LCUser' ;

export default class LCMedalUserListItem extends Component {
  constructor(props) {
    super(props);
  }

  render(){
    let item = this.props.item ;
    let itemStyle = [styles.item] ;
    if(this.props.style) itemStyle.push(this.props.style) ;

    if(this.props.styleId == 1){
      return (
        <View style={itemStyle}>
          <LCUser navigator={this.props.navigator} key={item.id} style={styles.itemUser} hiddenName={true} user={item.user} styleId={1} {...this.props.userProps} />
        </View>) ;
    }

    return (
    <View style={itemStyle}>
      <LCUser navigator={this.props.navigator} key={item.id} style={styles.itemUser} user={item.user} styleId={1} {...this.props.userProps} />
      <View style={styles.itemTime}><Text style={styles.itemTimeText} allowFontScaling={false}>{item.create_time}</Text></View>
    </View>) ;
  }
}

const styles = StyleSheet.create({
  item:{
    flexDirection:'row',
    alignItems:'center',
    padding:10,
    borderBottomWidth:1,
    borderBottomColor:'#eee',
    backgroundColor:'#fff',
  },
  itemUser:{
    flex:1,
  },
  itemTime:{
    width:80,
  },
  itemTimeText:{
    textAlign:'center',
    fontSize:12,
  },
}) ;
