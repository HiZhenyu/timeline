import LCCatMemberList from './../module/cat/LCCatMemberList' ;
import LCPage from './../LCPage' ;

export default class CatDetailMemberPage extends LCPage {
  constructor(props) {
    super(props) ;

    let cat = props.cat ;

    this.mainView = LCCatMemberList ;
    this.mainViewProps = {
      cat : cat ,
      itemUserProps : {styleId:1} ,
      loadMore : true ,
    } ;
  }
}
