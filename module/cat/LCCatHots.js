import React from 'react' ;
import {
  StyleSheet,
  View,
} from 'react-native';

import LCList from './../LCList' ;
import LCCatItem from './LCCatItem' ;

export default class LCCatHots extends LCList {
  static defaultProps = {
    mkind:8,
    msubject:100,
    location:8,
  } ;

  constructor(props) {
    super(props) ;

    this.storeDefaultListSize = 10 ;
    this.storeListSize = props.loadMore ? this.storeDefaultListSize : 0 ;
    this.postKeyMap = {mkind:'mkind',msubject:'msubject',location:'location'} ;
    this.storageKey = 'cathots' ;
    this.storageExpires = 3600*1000 ;
    this.apiPath = 'cat/hot' ;

    this.style = styles.flex ;
  }

  //格式化数据
  fixAssets(ret){
    let oret = {p:1,psum:1,list:[]} ;
    for(let k in ret) oret.list.push({cate:k,list:ret[k]}) ;

    return oret ;
  }

  renderRow(rowData, sectionIdx, rowIdx){
    let itemList = rowData.list ;
    let cateK = rowData.cate ;

    let header = this.props[cateK+'Header'] ? this.props[cateK+'Header'] : null ;
    let footer = this.props[cateK+'Footer'] ? this.props[cateK+'Footer'] : null ;

    let groupStyle = [styles.catGourp] ;
    if(this.props.groupStyle) groupStyle.push(this.props.groupStyle) ;

    return (<View key={rowData.cate}>
      {header}
      <View style={groupStyle}>{itemList.map(aitem=>this._renderCatItem(aitem))}</View>
      {footer}
    </View>) ;
  }

  _renderCatItem(item){
    return (
      <LCCatItem navigator={this.props.navigator}
        key={item.id}
        style={[styles.catItem]}
        cat={item}
        {...this.props.itemCatProps}
      />) ;
  }

}

const styles = StyleSheet.create({
  flex:{
    flex:1,
  },
  catItem:{
    marginBottom:10,
  },
  catGourp:{

  }
}) ;
