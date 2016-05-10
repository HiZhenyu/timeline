import LCShopFeedList from './../module/shop/LCShopFeedList' ;
import LCPage from './../LCPage' ;

export default class ShopFeedPage extends LCPage {
  constructor(props) {
    super(props) ;

    this.mainView = LCShopFeedList ;
    this.mainViewProps = {
      loadMore : true ,
    } ;
  }
}
