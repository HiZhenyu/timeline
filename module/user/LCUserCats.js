import React,{ Component } from 'react' ;
import {
  StyleSheet,
} from 'react-native';

import LCList from './../LCList' ;
import LCCatItem from './../cat/LCCatItem' ;

export default class LCUserCats extends LCList {
  static defaultProps = {
    user: {},
    itemStyleId : 1,
    itemComponent : LCCatItem ,
    itemComponentProps : {},
  } ;

  constructor(props) {
    super(props) ;

    this.storeDefaultListSize = 10 ;
    this.storeListSize = props.loadMore ? this.storeDefaultListSize : 0 ;
    this.postKeyMap = {'user.uid':'uid'} ;
    this.storageKey = 'usercats' ;
    this.storageExpires = 3600*1000 ;
    this.apiPath = 'user/cats' ;

    this.itemComponent = this.props.itemComponent ;
    this.itemComponentKey = 'id' ;
    this.itemComponentDataName = 'cat' ;
    this.itemComponentProps = {styleId:this.props.itemStyleId,style:styles.catItem,uid:this.props.user.uid} ;

    //可以通过参数传进来
    Object.keys(this.props.itemComponentProps).map(it=>this.itemComponentProps[it]=this.props.itemComponentProps[it]) ;

    this.thatsAllText = '' ;
    this.emptyDataSourceText = '暂时没有加入任何机友会...' ;

    this.styleEmptyView = styles.emptyView ;
    this.style = [styles.hlist,this.state.astyle,this.props.style] ;
  }
}


var styles = StyleSheet.create({
  emptyView:{
    backgroundColor:'#fff',
  },
  hlist:{
    flex:1,
		justifyContent: 'flex-start',
		flexDirection: 'row',
		flexWrap: 'wrap',
		alignItems: 'center',
    backgroundColor: '#fff'
	},
});
