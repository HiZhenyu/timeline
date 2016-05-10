import LCTimelineList from './../module/timeline/LCTimelineList' ;
import LCGrayLine from './../module/pub/LCGrayLine' ;
import LCSubjectDetail from './../module/subject/LCSubjectDetail' ;
import LCPage from './../LCPage' ;


export default class SubjectPage extends LCPage {
  constructor(props) {
    super(props) ;

    if(!props.subject || !props.subject.id) return ;

    let subject = props.subject ;

    this.mainView = LCTimelineList ;
    this.mainViewProps = {
      subjectId : subject.id ,
      loadMore : true ,
    } ;

    this.theComponents = [
      {
        component : LCSubjectDetail ,
        props : {subject : subject} ,
        key : 'subject',
      },
      {
        component : LCGrayLine ,
        props : {height:15} ,
      },
    ] ;
  }
}
