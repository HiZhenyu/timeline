import React from 'react' ;
import {
  StyleSheet,
} from 'react-native';

import LCList from './../LCList' ;
import LCShopFeedItem from './LCShopFeedItem' ;

export default class LCShopFeedList extends LCList {
  static defaultProps = {
    cateId:0,
    ps:30,
  } ;

  constructor(props) {
    super(props) ;

    this.storeDefaultListSize = 10 ;
    this.storeListSize = props.loadMore ? this.storeDefaultListSize : 0 ;
    this.postKeyMap = {ps:'ps',p:'p',cateId:'cate_id'} ;
    this.storageKey = 'shopfeeds' ;
    this.storageExpires = 3600*1000 ;
    this.apiPath = 'shop/feed' ;

    this.itemComponent = LCShopFeedItem ;
    this.itemComponentKey = 'id' ;
    this.itemComponentDataName = 'feed' ;
    this.itemComponentProps = {} ;

    this.thatsAllText = '以上就是全部兑换' ;
    this.emptyDataSourceText = '暂时还没有人兑换' ;
  }

}

const styles = StyleSheet.create({

}) ;
