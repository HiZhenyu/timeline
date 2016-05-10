import LCSubjectList from './../module/subject/LCSubjectList' ;
import LCPage from './../LCPage' ;

export default class SubjectIndexPage extends LCPage {
  constructor(props) {
    super(props) ;

    this.mainView = LCSubjectList ;
    this.mainViewProps = {
      loadMore : true ,
      ps : 10 ,
      itemStyleId : 1 ,
    } ;
  }
}
