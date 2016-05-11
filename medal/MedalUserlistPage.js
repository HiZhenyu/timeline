import LCMedalUserList from './../module/medal/LCMedalUserList' ;
import LCPage from './../LCPage' ;

export default class MedaluserListPage extends LCPage {
  constructor(props) {
    super(props) ;

    this.mainView = LCMedalUserList ;
    this.mainViewProps = {
      loadMore : true ,
      ps : 10 ,
      medalId:this.props.medal.id
    } ;

  }
}
