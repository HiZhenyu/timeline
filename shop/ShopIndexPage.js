import React from 'react' ;
import {
  StyleSheet,
} from 'react-native';


import LCPage from './../LCPage' ;

import LCTitle from './../module/pub/LCTitle' ;
import LCMoreBox from './../module/pub/LCMoreBox' ;
import LCShopCateIcons from './../module/shop/LCShopCateIcons' ;
import LCShopFeedList from './../module/shop/LCShopFeedList' ;
import LCShopItemList from './../module/shop/LCShopItemList' ;


export default class ExploreIndexPage extends LCPage {
  constructor(props) {
    super(props) ;

    this.theComponents = [
      {
        component : LCShopCateIcons ,
        props : {} ,
      },
      {
        component : LCTitle ,
        props : {
          title : '机友都在换',
        } ,
      },
      {
        component : LCShopFeedList ,
        props : {ps : 5} ,
        key : 'feedlist'
      } ,
      {
        component : LCMoreBox ,
        props : {
          title : '更多机友在兑换',
          onPress : this._onPressToShopFeed.bind(this) ,
        } ,
      },
      {
        component : LCTitle ,
        props : {title : '最新上架'} ,
      },
      {
        component : LCShopItemList ,
        props : {
          itemStyleId : 1 ,
          style : styles.shopItemList ,
          ps : 10 ,
        } ,
      },
      {
        component : LCMoreBox ,
        props : {
          title : '全部兑换礼品',
          onPress : this._onPressToShopItems.bind(this) ,
        } ,
      },
    ] ;
  }

  //去商城列表页面
  _onPressToShopItems(){
    if(!this.props.navigator) return ;

    //使用Navigation方案
    this.props.navigator.push({
      screen: 'shop.ShopItemListMainPage',
      backButtonTitle: '返回',
      title: '金币商城' ,
    });
  }

  _onPressToShopFeed(){
    if(!this.props.navigator) return ;

    //使用Navigation方案
    this.props.navigator.push({
      screen: 'shop.ShopFeedPage',
      backButtonTitle: '返回',
      title: '机友们都在换' ,
    });
  }

}


const styles = StyleSheet.create({
  shopItemList:{
    flex:1,
    flexWrap:'wrap',
    flexDirection:'row',
  },
}) ;
