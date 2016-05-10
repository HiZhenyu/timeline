import LCList from './../LCList' ;
import LCDigItem from './LCDigItem' ;

export default class LCDigList extends LCList {
  static defaultProps = {
    ps:100,
    timelineId:0
  } ;

  constructor(props) {
    super(props) ;

    this.storeDefaultListSize = 10 ;
    this.storeListSize = props.loadMore ? this.storeDefaultListSize : 0 ;
    this.postKeyMap = {ps:'ps',p:'p',timelineId:'id'} ;
    this.storageKey = 'digs' ;
    this.storageExpires = 3600*1000 ;
    this.apiPath = 'timeline/digs' ;

    this.itemComponent = LCDigItem ;
    this.itemComponentKey = 'id' ;
    this.itemComponentDataName = 'dig' ;
    this.itemComponentProps = { } ;

    this.thatsAllText = '以上就是所有点赞的用户' ;
    this.emptyDataSourceText = '还没有人点赞' ;
  }
}
