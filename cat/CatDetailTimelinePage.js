import LCTimelineList from './../module/timeline/LCTimelineList' ;
import LCPage from './../LCPage' ;

export default class CatDetailTimelinePage extends LCPage {
  constructor(props) {
    super(props) ;

    let cat = props.cat ;

    this.mainView = LCTimelineList ;
    this.mainViewProps = {
      catId : cat.id ,
      orderId : 'last' ,
      loadMore : true ,
    } ;
  }
}
