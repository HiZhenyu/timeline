import React, {
  Component,
  StyleSheet,
} from 'react-native';

import LCList from './../LCList' ;
import LCMedalItem from './../medal/LCMedalItem' ;

export default class LCUserMedals extends LCList {
  static defaultProps = {
    user: {},
  } ;

  constructor(props) {
    super(props) ;

    this.storeDefaultListSize = 10 ;
    this.storeListSize = props.loadMore ? this.storeDefaultListSize : 0 ;
    this.postKeyMap = {'user.uid':'uid'} ;
    this.storageKey = 'usermedals' ;
    this.storageExpires = 3600*1000 ;
    this.apiPath = 'user/medals' ;

    this.itemComponent = LCMedalItem ;
    this.itemComponentKey = 'id' ;
    this.itemComponentDataName = 'medal' ;
    this.itemComponentProps = {} ;

    this.thatsAllText = '' ;
    this.emptyDataSourceText = '暂时没有获得任何勋章...' ;

    this.styleEmptyView = styles.emptyView ;
    this.style = styles.hlist ;
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
