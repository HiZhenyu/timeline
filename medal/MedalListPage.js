import LCMedalList from './../module/medal/LCMedalList' ;
import LCPage from './../LCPage' ;

export default class MedalListPage extends LCPage {
  constructor(props) {
    super(props) ;

    this.mainView = LCMedalList ;
    this.mainViewProps = {
      loadMore : true ,
      ps : 10 ,
      itemStyleId : 1,
    } ;

  }
}
