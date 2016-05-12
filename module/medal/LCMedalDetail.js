import React,{ Component } from 'react' ;
import {
  StyleSheet,
  TouchableHighlight ,
  View,
  Text,
  Image
} from 'react-native';

import LCDetail from './../LCDetail' ;
import LCMedalGetBtn from './../medal/LCMedalGetBtn' ;

export default class LCMedalDetail extends LCDetail {
  constructor(props) {
    super(props) ;

    this.itemKey = 'medal' ;
    this.itemIdKey = 'id' ;

    this.dataItemKey = 'medal' ;
    this.apiPath = 'medal/detail' ;
  }


  renderDetail(){
    let medal = this.state.medal ;
    medal.icon && (medal.icon = global.getUploadURL(medal.icon)) ;

    return (
      <View style={styles.medal}>
        <Image style={styles.icon} source={{uri:medal.icon}} />
        <View style={styles.inf}>
          <View style={styles.intro}><Text style={styles.introText} allowFontScaling={false}>{medal.intro}</Text></View>
          <LCMedalGetBtn medal={medal} />
        </View>
      </View>
    ) ;
  }
}

const styles = StyleSheet.create({
  medal:{
    flexDirection:'row',
    padding:10,
    backgroundColor:'#fff'
  },
  icon:{
    width: 100,
    height:100,
    resizeMode:'contain',
  },

  inf:{
    flex:1,
    paddingLeft:10,
    alignItems:'center',
  },
  intro:{
    paddingTop:15,
  },
  introText:{
    fontSize:14,
    paddingBottom:5,
    lineHeight:16,
  },


}) ;
