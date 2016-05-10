import React, {
  StyleSheet,
  TouchableHighlight ,
  View,
  Text,
  Image,
} from 'react-native';

import LCUser from './../user/LCUser' ;
import LCList from './../LCList' ;

export default class LCCatChairmans extends LCList {
  constructor(props) {
    super(props);

    this.defaultStoreListSize = 100 ;
    this.postKeyMap = {'cat.id':'id'} ;
    this.storageKey = 'catchairmans' ;
    this.storageExpires = 86400*1000 ;
    this.apiPath = 'cat/chairmans' ;

    this.style = styles.chairmans ;
  }

  //补全数据
  fixAssets(ret){
    const maxChairmanSize = 3 ;
    if(ret.list.length >= maxChairmanSize) return ;

    let defaultEmptyItem = {
      title : '副会长空缺',
      user : {
        uid : 0,
        name : '(点击申请)',
        icon : require('./../../images/icon_posempty.png'),
      }
    } ;

    for(let i=ret.list.length;i<maxChairmanSize;i++){
      var item = {} ;
      for(var k in defaultEmptyItem) item[k] = defaultEmptyItem[k] ;
      item.id = i+1 ;
      ret.list.push(item) ;
    }

    return ret ;
  }

  //渲染单个
  renderRow(item){
    if(item.user.uid == 0)
      return (
        <TouchableHighlight underlayColor="#ccc" style={styles.chairmanItem} onPress={this._onPressApply.bind(this)} key={item.id}>
        <View style={styles.chairmanItem}>
          <Image source={item.user.icon} style={styles.itemApplyIcon} />
          <Text style={styles.labelText} allowFontScaling={false}>{item.title}</Text>
          <Text style={styles.chairmanNameText} numberOfLines={1} allowFontScaling={false}>{item.user.name}</Text>
        </View>
        </TouchableHighlight>
      );

    return (<View style={styles.chairmanItem} key={item.id}>
      <LCUser navigator={this.props.navigator} style={styles.chairmanItemUser} hiddenName={true} styleId={1} user={item.user} />
      <Text style={styles.labelText} allowFontScaling={false}>{item.title}</Text>
      <Text style={styles.chairmanNameText} numberOfLines={1} allowFontScaling={false}>{item.user.name}</Text>
    </View>) ;
  }


  //处理申请副会长
  _onPressApply(){
    console.log('apply ..');
  }

}

var styles = StyleSheet.create({
  chairmans:{
    padding:10,
    flexDirection:'row',
    backgroundColor:'#fff',
    flex:1,
  },
  chairmanItem:{
    alignItems:'center',
    flex:1,
  },
  chairmanItemUser:{
  },
  chairmanNameText:{
    fontSize:14,
  },
  labelText:{
    color:'#fff',
    backgroundColor:'#ff6600',
    fontSize:14,
    marginTop:5,
    marginBottom:5,
  },
  itemApplyIcon:{
    width:44,
    height:44,
  }
});
