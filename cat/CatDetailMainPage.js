import LCTTabPage from './../LCTTabPage' ;

import CatDetailIndexPage from './CatDetailIndexPage' ;
import CatDetailTimelinePage from './CatDetailTimelinePage' ;
import CatDetailEssencePage from './CatDetailEssencePage' ;
import CatDetailEventPage from './CatDetailEventPage' ;
import CatDetailMemberPage from './CatDetailMemberPage' ;

export default class CatDetailMainPage extends LCTTabPage {
  static navigatorButtons = {
    rightButtons: [
      {
        icon: require('./../images/icon_dopost.png'),
        id: 'id.cat.dopost'
      }
    ]
  };

  constructor(props) {
    super(props) ;

    this.tabComponents = [
      {
        component : CatDetailIndexPage ,
        label : '首页' ,
        key : 'CatDetailIndexPage',
        props : {cat : this.props.cat} ,
      },
      {
        component : CatDetailTimelinePage ,
        label : '最新' ,
        key : 'CatDetailTimelinePage',
        props : {cat : this.props.cat} ,
      },
      {
        component : CatDetailEssencePage ,
        label : '活动' ,
        key : 'CatDetailEssencePage',
        props : {cat : this.props.cat} ,
      },
      {
        component : CatDetailEventPage ,
        label : '精华' ,
        key : 'CatDetailEventPage',
        props : {cat : this.props.cat} ,
      },
      {
        component : CatDetailMemberPage ,
        label : '成员' ,
        key : 'CatDetailMemberPage',
        props : {cat : this.props.cat} ,
      },
    ] ;

    this.style = {paddingTop:35} ;
    this.indicatorStyle = {top:0,height:35} ;
    this.indicatorProps = {
      itemTextStyle : {fontSize:14} ,
      selectedItemTextStyle : {fontSize:16} ,
      selectedBorderStyle : {backgroundColor:'#ff6600',width:16} ,
    } ;
  }

  setPage(i){
    if(!this.refViewPager) return ;
    this.refViewPager.setPage(i) ;
  }
}
