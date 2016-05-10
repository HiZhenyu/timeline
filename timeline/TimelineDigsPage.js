import LCDigList from './../module/dig/LCDigList' ;
import LCPage from './../LCPage' ;

export default class TimelineDigsPage extends LCPage {
  static defaultProps = {
    timelineId : 0 ,
  } ;

  constructor(props) {
    super(props) ;

    this.mainView = LCDigList ;
    this.mainViewProps = {
      loadMore : true ,
      ps : 30 ,
      list : this.props.list ,
      timelineId : this.props.timelineId ,
    } ;
  }

}
