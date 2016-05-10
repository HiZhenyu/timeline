import LCList from './../LCList' ;
import LCSubjectItem from './LCSubjectItem' ;

export default class LCSubjectList extends LCList {
  static defaultProps = {

  } ;

  constructor(props) {
    super(props) ;

    this.storeDefaultListSize = 5 ;
    this.storeListSize = props.loadMore ? this.storeDefaultListSize : 0 ;
    this.postKeyMap = {ps:'ps',p:'p'} ;
    this.storageKey = 'subjects' ;
    this.storageExpires = 3600*1000 ;
    this.apiPath = 'subject/list' ;

    this.itemComponent = LCSubjectItem ;
    this.itemComponentKey = 'id' ;
    this.itemComponentDataName = 'subject' ;
    this.itemComponentProps = { styleId: this.props.itemStyleId } ;

    this.thatsAllText = '以上是全部主题及活动' ;
    this.emptyDataSourceText = '' ;
  }

}
