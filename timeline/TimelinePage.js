import LCCommentList from './../module/comment/LCCommentList' ;
import LCTimelineDetail from './../module/timeline/LCTimelineDetail' ;
import LCTitle from './../module/pub/LCTitle' ;
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

    this.fixedTopComponents = [
      {
        component : LCTitle ,
        props : {title : 'hello word'} ,
      }
    ] ;

    this.fixedBottomComponents = [
      {
        component : LCTitle ,
        props : {title : 'hello word'} ,
      }
    ] ;
  }
}
