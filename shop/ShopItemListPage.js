import LCShopItemList from './../module/shop/LCShopItemList' ;
import LCPage from './../LCPage' ;

export default class ShopItemListPage extends LCPage {
  static defaultProps = {
    cateId : 0 ,
  } ;
  constructor(props) {
    super(props) ;

    this.mainView = LCShopItemList ;
    this.mainViewProps = {
      loadMore : true ,
      ps : 10 ,
      cateId : this.props.cateId ,
    } ;
  }
}
