import React from 'react' ;
import {
  StyleSheet,
} from 'react-native';

import LCList from './../LCList' ;
import LCCommentItem from './LCCommentItem' ;

export default class LCCommentList extends LCList {
  static defaultProps = {
    ps:30,
    timelineId:0
  } ;

  constructor(props) {
    super(props) ;

    this.storeDefaultListSize = 10 ;
    this.storeListSize = props.loadMore ? this.storeDefaultListSize : 0 ;
    this.postKeyMap = {ps:'ps',p:'p',timelineId:'timeline_id'} ;
    this.storageKey = 'comments' ;
    this.storageExpires = 0 ;
    this.apiPath = 'reply/list' ;

    this.itemComponent = LCCommentItem ;
    this.itemComponentKey = 'id' ;
    this.itemComponentDataName = 'comment' ;
    this.itemComponentProps = {style:styles.commentItem,onPressReplyTo:this.props.onItemPressReplyTo} ;

    this.thatsAllText = '没有更多评论了' ;
    this.emptyDataSourceText = '' ;
  }

}

const styles = StyleSheet.create({
  commentItem:{

  }
}) ;
