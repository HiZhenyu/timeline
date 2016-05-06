import React, {
  Component,
  StyleSheet,
  View,
  Text,
} from 'react-native';


import LCUser from './../user/LCUser' ;

export default class LCMessageItem extends Component {
  constructor(props) {
    super(props) ;

    this.state = { } ;
  }

  render(){
    var user = {
      uid:24980,
      name:'孙雷火',
      icon:'http://img.lmjx.net/iupload/t/u/22/50x50_22638.jpg'
    } ;

    return (
      <View style={[styles.item,styles.flexRow]}>
        <View style={styles.message}>
          <LCUser user={user} styleId={1} />
          <View style={styles.messageTextView}>
            <Text style={styles.messageText}>回复hi阵雨: 好的，面包会有的，也会有的，哈哈。</Text>
          </View>
        </View>
        <View style={styles.timeline}>
          <Text style={styles.timelineText}>命运作弄啊，上山前3000万，上山后100万。</Text>
        </View>
      </View>
    ) ;
  }
}

const styles = StyleSheet.create({
  flexRow:{
    flexDirection:'row',
  },
  item:{
    backgroundColor:'#fff',
    padding:10,
    borderBottomWidth:1,
    borderBottomColor:'#ccc',
  },
  message:{
    flex:1,
  },
  messageTextView:{
    paddingLeft:50,
    paddingRight:10,
    marginTop:-10,
  },
  messageText:{
    lineHeight:18,
  },
  timeline:{
    width:60,
    height:60,
    overflow:'hidden',
    marginTop:10,
  },
  timelineText:{
    lineHeight:15,
  }
}) ;
