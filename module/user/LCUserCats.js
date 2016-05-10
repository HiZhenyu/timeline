import React, {
  Component,
  StyleSheet,
} from 'react-native';

import LCList from './../LCList' ;
import LCCatItem from './../cat/LCCatItem' ;

export default class LCUserCats extends LCList {
  static defaultProps = {
    user: {},
  } ;

  constructor(props) {
    super(props) ;

    this.storeDefaultListSize = 10 ;
    this.storeListSize = props.loadMore ? this.storeDefaultListSize : 0 ;
    this.postKeyMap = {'user.uid':'uid'} ;
    this.storageKey = 'usercats' ;
    this.storageExpires = 3600*1000 ;
    this.apiPath = 'user/cats' ;

    this.itemComponent = LCCatItem ;
    this.itemComponentKey = 'id' ;
    this.itemComponentDataName = 'cat' ;
    this.itemComponentProps = {styleId:1,style:styles.catItem,uid:this.props.uid} ;

    this.thatsAllText = '' ;
    this.emptyDataSourceText = '暂时没有加入任何机友会...' ;

    this.styleEmptyView = styles.emptyView ;
    this.style = [styles.hlist,this.state.astyle] ;
  }

  setStyleTop(style){
    this.setState({astyle:style}) ;
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
