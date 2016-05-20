import LCTTabPage from './../LCTTabPage' ;

import TodayNewsPage from './TodayNewsPage' ;
import FollowFeedPage from './FollowFeedPage' ;
import EssencePage from './EssencePage' ;
import AskIndexPage from './AskIndexPage' ;

export default class IndexMainPage extends LCTTabPage {
  constructor(props) {
    super(props) ;

    this.tabComponents = [
      {
        component : TodayNewsPage ,
        label : '今日动态' ,
        key : 'TodayNewsPage',
      },
      {
        component : FollowFeedPage ,
        label : '我的关注' ,
        key : 'FollowFeedPage'
      },
      {
        component : EssencePage ,
        label : '精华推荐' ,
        key : 'EssencePage'
      },
      {
        component : AskIndexPage ,
        label : '机友问答' ,
        key : 'AskIndexPage'
      },
    ] ;
  }
}
