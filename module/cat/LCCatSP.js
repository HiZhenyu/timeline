import React,{ Component } from 'react' ;
import {
  StyleSheet,
  TouchableHighlight ,
  View,
  Text,
  Image
} from 'react-native';

import LCCatSignBtn from './LCCatSignBtn' ;
import LCCatJoinBtn from './LCCatJoinBtn' ;
import LCDetail from './../LCDetail'  ;

export default class LCCatSP extends LCDetail {
  constructor(props) {
    super(props) ;

    this.itemKey = 'cat' ;

    this.itemIdKey = 'id' ;

    this.apiPath = 'cat/detail' ;

    this.dataItemKey = 'cat' ;
  }

	renderDetail() {
    var cat = this.state.cat ;
    if(!cat.icon) cat.icon = 'upfs/201511/12/f_1447322833751985.png' ;
    if(!cat.user) cat.user = {} ;

    cat.icon = global.getUploadURL(cat.icon) ;

		return (
      <View>
        <View style={styles.top}>
          <Image style={styles.icon} source={{uri:cat.icon}} />
          <View style={styles.topinf}>
            <View style={styles.topinfin}>
              <View style={styles.catTitle}>
                <Text style={styles.catTitleText} allowFontScaling={false}>会长：{cat.user.name}</Text>
              </View>

              <Text style={styles.topinfText} allowFontScaling={false}>
                热度 <Text style={styles.textColor} allowFontScaling={false}>{cat.score}  </Text>
                帖子 <Text style={styles.textColor} allowFontScaling={false}>{cat.isum_timeline} </Text>
              </Text>
            </View>
            <View style={styles.ops}>
              <LCCatSignBtn navigator={this.props.navigator} style={styles.opsBtnl} catId={this.state.cat.id} />
              <LCCatJoinBtn navigator={this.props.navigator} style={styles.opsBtnr} catId={this.state.cat.id} />
            </View>
          </View>
        </View>

        <View style={styles.intro}>
          <Text style={styles.introText} allowFontScaling={false}>
            <Text style={styles.introTitleText} allowFontScaling={false}>本会简介：</Text>
            {cat.intro}
          </Text>
        </View>
      </View>
    ) ;
	}

}

var styles = StyleSheet.create({
  top:{
    padding:10,
    flexDirection:'row',
    backgroundColor:'#fff',
  },
  icon:{
    width:100,
    height:100,
    borderRadius:5,
  },
  topinf:{
    flex:1,
    paddingLeft:10,
  },
  textColor:{
    color:'#ff6600',
  },
  catTitle:{
    paddingTop:5,
    paddingBottom:5,
  },
  catTitleText:{
    fontSize:16,
    backgroundColor:'transparent',
  },
  topinfin:{
    flex:1,
  },
  topinfText:{
    fontSize:14,
    backgroundColor:'transparent',
    paddingTop:5,
  },

  ops:{
    flexDirection:'row',
    height:28,
  },

  opsBtnr:{
    marginLeft:5,
  },
  opsBtnl:{
    marginRight:5,
  },

  intro:{
    padding:10,
    backgroundColor:'#fff',
    borderTopColor:'#eee',
    borderTopWidth:1,
  },
  introTitleText:{
    fontSize:18,
  },
  introText:{
    paddingTop:5,
    fontSize:16,
  },
});
