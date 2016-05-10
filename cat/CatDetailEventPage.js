import LCTimelineList from './../module/timeline/LCTimelineList' ;
import LCPage from './../LCPage' ;

export default class CatDetailEventPage extends LCPage {
  constructor(props) {
    super(props) ;

    let cat = props.cat ;

    this.mainView = LCTimelineList ;
    this.mainViewProps = {
      catId : cat.id ,
      event : 1 ,
      orderId : 'last' ,
      loadMore : true ,
    } ;
  }
}
