import React, {
  Component,
  StyleSheet,
  TouchableHighlight ,
  View,
  Text,
  Image
} from 'react-native';

import LCDetail from './../LCDetail' ;

export default class LCSubjectDetail extends LCDetail {
  constructor(props) {
    super(props) ;

    this.itemKey = 'subject' ;
    this.itemIdKey = 'id' ;

    this.dataItemKey = 'subject' ;

    this.apiPath = 'subject/detail' ;
  }


  renderDetail(){
    let subject = this.state.subject ;

    let style = [styles.wrap] ;
    if(this.props.style) style.push(this.props.style) ;

    return (
      <View style={style}>
        <Text style={styles.titleText} allowFontScaling={false}>#{subject.title}#</Text>
        <Text style={styles.contentText} allowFontScaling={false}>{subject.content}</Text>
      </View>
    ) ;
  }
}

const styles = StyleSheet.create({
  wrap:{
    backgroundColor:'#fff',
    padding:10,
    paddingBottom:15,
  },
  titleText:{
    color:'#0049bb',
    fontSize:16,
    paddingTop:10,
    paddingBottom:10,
    textAlign:'center',
  },
  contentText:{
    color:'#333',
    lineHeight:18,
    fontSize:15,
  },
}) ;
