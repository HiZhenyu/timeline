import LCTimelineList from './../module/timeline/LCTimelineList' ;
import LCPage from './../LCPage' ;

export default class FollowFeedPage extends LCPage {
  constructor(props) {
    super(props) ;

    this.mainView = LCTimelineList ;

    this.mainViewProps = {
      loadMore : true ,
      follow : 1 ,
    } ;
  }
}
