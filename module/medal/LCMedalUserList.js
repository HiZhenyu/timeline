import LCList from './../LCList' ;
import LCMedalUserListItem from './LCMedalUserListItem' ;

export default class LCMedalUserList extends LCList {
  static defaultProps = {
    ps:100,
    timelineId:0
  } ;

  constructor(props) {
    super(props) ;

    this.storeDefaultListSize = 10 ;
    this.storeListSize = props.loadMore ? this.storeDefaultListSize : 0 ;
    this.postKeyMap = {ps:'ps',p:'p',medalId:'medal_id'} ;
    this.storageKey = 'medaluserlist' ;
    this.storageExpires = 3600*1000 ;
    this.apiPath = 'medal/userlist' ;

    this.itemComponent = LCMedalUserListItem ;
    this.itemComponentKey = 'id' ;
    this.itemComponentDataName = 'item' ;

    this.itemComponentProps = {style:this.props.itemStyle,styleId:this.props.styleId} ;

    this.thatsAllText = '没有更多的人啦～' ;
    this.emptyDataSourceText = '还没有人领取过该胸章' ;
  }
}
