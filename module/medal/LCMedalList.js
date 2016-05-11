import LCList from './../LCList' ;
import LCMedalItem from './LCMedalItem' ;

export default class LCMedalList extends LCList {
  static defaultProps = {

  } ;

  constructor(props) {
    super(props) ;

    this.storeDefaultListSize = 10 ;
    this.storeListSize = props.loadMore ? this.storeDefaultListSize : 0 ;
    this.postKeyMap = {ps:'ps',p:'p'} ;
    this.storageKey = 'medals' ;
    this.storageExpires = 3600*1000 ;
    this.apiPath = 'medal/list' ;

    this.itemComponent = LCMedalItem ;
    this.itemComponentKey = 'id' ;
    this.itemComponentDataName = 'medal' ;
    this.itemComponentProps = { styleId: this.props.itemStyleId } ;

    this.thatsAllText = '全部勋章展示完毕' ;
    this.emptyDataSourceText = '' ;
  }

}
