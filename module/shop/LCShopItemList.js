import React, {
  StyleSheet,
} from 'react-native';

import LCList from './../LCList' ;
import LCShopItemItem from './LCShopItemItem' ;

export default class LCShopItemList extends LCList {
  static defaultProps = {
    cateId:0,
    ps:20,
    styleItem:null,
    itemStyleId:null,
  } ;

  constructor(props) {
    super(props) ;

    this.storeDefaultListSize = 10 ;
    this.storeListSize = props.loadMore ? this.storeDefaultListSize : 0 ;
    this.postKeyMap = {ps:'ps',p:'p',cateId:'cate_id'} ;
    this.storageKey = 'shopitems' ;
    this.storageExpires = 3600*1000 ;
    this.apiPath = 'shop/items' ;

    this.itemComponent = LCShopItemItem ;
    this.itemComponentKey = 'id' ;
    this.itemComponentDataName = 'shopItem' ;
    this.itemComponentProps = {style:this.props.styleItem,styleId:this.props.itemStyleId} ;

    this.thatsAllText = '以上就是所有可兑换礼品' ;
    this.emptyDataSourceText = '该条件下，暂时没有可兑换的礼品' ;
  }

}

const styles = StyleSheet.create({

}) ;
