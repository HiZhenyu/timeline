import LCPage from './../LCPage' ;
import LCShopItemDetail from './../module/shop/LCShopItemDetail' ;

export default class ShopItemPage extends LCPage {
  constructor(props) {
    super(props) ;

    this.theComponents = [
      {
        component : LCShopItemDetail ,
        props : {shopItem : props.shopItem } ,
        key : 'shopItemDetail' ,
      }
    ] ;
  }
}
