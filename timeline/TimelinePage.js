import LCCommentList from './../module/comment/LCCommentList' ;
import LCTimelineDetail from './../module/timeline/LCTimelineDetail' ;
import LCPage from './../LCPage' ;


export default class TimelinePage extends LCPage {
  constructor(props) {
    super(props) ;


    if(!props.timeline || !props.timeline.id) return ;

    let timeline = props.timeline ;

    this.mainView = LCCommentList ;
    this.mainViewProps = {
      timelineId : timeline.id ,
      loadMore : true ,
      list : this.props.comments ,
    } ;

    this.theComponents = [
      {
        component : LCTimelineDetail ,
        props : {timeline : timeline} ,
        key : 'timelinedetail',
      }
    ] ;
  }
}
