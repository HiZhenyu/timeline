import LCPage from './../LCPage' ;
import LCShopItemDetail from './../module/shop/LCShopItemDetail' ;
import LCShopItemList from './../module/shop/LCShopItemList' ;
import LCTitle from './../module/pub/LCTitle' ;

export default class ShopItemPage extends LCPage {
  constructor(props) {
    super(props) ;

    this.theComponents = [
      {
        component : LCShopItemDetail ,
        props : {shopItem : props.shopItem } ,
      },
      {
        component : LCTitle ,
        props : {title : '推荐商品' } ,
      },
      {
        component : LCShopItemList ,
        props : {ps : 4 , itemStyleId:1 , style:{flexDirection:'row',flexWrap:'wrap'}} ,
      }
    ] ;
  }
}
