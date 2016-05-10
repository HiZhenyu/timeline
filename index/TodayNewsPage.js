import LCFocusImages from './../module/image/LCFocusImages' ;
import LCUserCats from './../module/user/LCUserCats' ;
import LCTitle from './../module/pub/LCTitle' ;
import LCTimelineList from './../module/timeline/LCTimelineList' ;

import LCPage from './../LCPage' ;

export default class TodayNewsPage extends LCPage {
  constructor(props) {
    super(props) ;

    this.mainView = LCTimelineList ;

    this.mainViewProps = {
      loadMore : true ,
    } ;

    let online = global.getOnline() ;
    this.theComponents = [
      {
        component : LCFocusImages ,
        props : {} ,
        key : 'focusImages' ,
      },
      {
        component : LCTitle ,
        props : {title:'我的机友会'} ,
      },
      {
        component : LCUserCats ,
        props : {uid:online.uid} ,
        key : 'usercats'
      },
      {
        component : LCTitle ,
        props : {title:'机友们的动态'} ,
      },
    ] ;
  }

  /*
  _onUserCatsViewLayout(e){
    this.holdOnTopY = e.nativeEvent.layout.y ;
  }

  _onScroll(e){
    let y = e.nativeEvent.contentOffset.y ;
    if(y >= this.holdOnTopY){
      console.log(y);
      this.userCatsView.setStyleTop({top:-y}) ;
    }
  }
  */
}
