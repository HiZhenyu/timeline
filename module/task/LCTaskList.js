import LCList from './../LCList' ;
import LCTaskListItem from './LCTaskListItem' ;

export default class LCTaskList extends LCList {
  static defaultProps = {

  } ;

  constructor(props) {
    super(props) ;

    this.storeDefaultListSize = 10 ;
    this.storeListSize = props.loadMore ? this.storeDefaultListSize : 0 ;
    this.postKeyMap = {ps:'ps',p:'p'} ;
    this.storageKey = 'task'+this.props.gnames ;
    this.storageExpires = 3600*1000 ;
    this.apiPath = 'task/'+this.props.gnames ;

    this.itemComponent = LCTaskListItem ;
    this.itemComponentKey = 'id' ;
    this.itemComponentDataName = 'task' ;
    this.itemComponentProps = {} ;

    this.thatsAllText = '全部任务展示完毕' ;
    this.emptyDataSourceText = '' ;
  }

}
