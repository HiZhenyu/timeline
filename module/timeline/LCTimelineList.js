import React, {
  StyleSheet,
} from 'react-native';

import LCList from './../LCList' ;
import LCTimelineItem from './LCTimelineItem' ;

export default class LCTimelineList extends LCList {
  static defaultProps = {
    uid: 0,
    catId: 0,
    subjectId:0,
    ps:12,
    follow:0,
    essence:0,
    orderId:'default',
  } ;

  constructor(props) {
    super(props) ;

    this.storeDefaultListSize = 4 ;
    this.storeListSize = props.loadMore ? this.storeDefaultListSize : 0 ;
    this.postKeyMap = {ps:'ps',p:'p',uid:'uid',catId:'cat_id',subjectId:'subject_id',follow:'follow',essence:'essence'} ;
    this.storageKey = 'timelines' ;
    this.storageExpires = 3600*1000 ;
    this.apiPath = 'timeline/list' ;

    this.itemComponent = LCTimelineItem ;
    this.itemComponentKey = 'id' ;
    this.itemComponentDataName = 'timeline' ;
    this.itemComponentProps = {pressButton:true,style:styles.timelineItem} ;

    this.thatsAllText = '已经没有更多动态了' ;
    this.emptyDataSourceText = '暂时没有任何动态' ;
  }

  fixAssets(ret){
    if(!ret || !ret.list) return ret ;

    //给用户做积累
    if(!global.UsersTimlineList) global.UsersTimlineList = {} ;
    ret.list.map(ajs=>{
      let auid = ajs.user.uid ;
      if(!global.UsersTimlineList[auid]) global.UsersTimlineList[auid] = {} ;
      global.UsersTimlineList[auid][ajs.id] = ajs ;
    }) ;

    return ret ;
  }
}

const styles = StyleSheet.create({
  timelineItem:{
    marginBottom:10,
  },
  timelineItemLast:{
    marginBottom:0,
  }
}) ;
