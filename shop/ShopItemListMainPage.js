import LCTTabPage from './../LCTTabPage' ;

import ShopItemListPage from './ShopItemListPage' ;

export default class ShopItemListMainPage extends LCTTabPage {
  constructor(props) {
    super(props) ;

    this.tabComponents = [
      {
        component : ShopItemListPage ,
        label : '全部' ,
        key : 'ShopItemListPage_0',
        props : {} ,
      },
      {
        component : ShopItemListPage ,
        label : '模型' ,
        key : 'ShopItemListPage_1',
        props : {cateId : 1} ,
      },
      {
        component : ShopItemListPage ,
        label : '生活' ,
        key : 'ShopItemListPage_2',
        props : {cateId : 2} ,
      },
      {
        component : ShopItemListPage ,
        label : '数码' ,
        key : 'ShopItemListPage_3',
        props : {cateId : 3} ,
      },
      {
        component : ShopItemListPage ,
        label : '其他' ,
        key : 'ShopItemListPage_4',
        props : {cateId : 4} ,
      },
    ] ;

    this.style = {paddingTop:35} ;
    this.indicatorStyle = {top:0,height:35} ;
    this.indicatorProps = {
      itemTextStyle : {fontSize:14} ,
      selectedItemTextStyle : {fontSize:16} ,
      selectedBorderStyle : {backgroundColor:'#ff6600',width:16} ,
    } ;

    this.viewPagerProps = {
      initialPage : this.props.cateId ? this.props.cateId : 0 ,
    }
  }
}
