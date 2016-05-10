import LCTimelineList from './../module/timeline/LCTimelineList' ;
import LCPage from './../LCPage' ;

export default class UserTimelinePage extends LCPage {
  constructor(props) {
    super(props) ;

    if(!props.user || !props.user.uid) return ;

    let user = props.user ;

    this.mainView = LCTimelineList ;
    this.mainViewProps = {
      uid : user.uid ,
      orderId : 'last' ,
      loadMore : true ,
      list : global.getUserTimelines(user.uid),
    } ;
  }
}
