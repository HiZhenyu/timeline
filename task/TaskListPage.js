import LCTaskList from './../module/task/LCTaskList' ;
import LCPage from './../LCPage' ;

export default class TaskListPage extends LCPage {
  constructor(props) {
    super(props) ;

    let gnames = this.props.gnames ;
    if(!gnames) gnames = 'freshman' ;

    this.mainView = LCTaskList ;
    this.mainViewProps = {
      loadMore : true ,
      ps : 10 ,
      gnames : gnames
    } ;

  }
}
