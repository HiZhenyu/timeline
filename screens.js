import { Navigation } from 'react-native-navigation';

import IndexMainPage from './index/IndexMainPage';
import MyHomePage from './my/MyHomePage';
import MsgPage from './my/MsgPage';

import UserHomePage from './user/UserHomePage' ;
import UserTimelinePage from './user/UserTimelinePage' ;

import TimelinePage from './timeline/TimelinePage' ;
import SlideImagesPage from './timeline/SlideImagesPage' ;
import TimelineDigsPage from './timeline/TimelineDigsPage' ;

import ExploreIndexPage from './explore/ExploreIndexPage' ;

import PostTimelinePage from './post/PostTimelinePage' ;
import SelectPhotosPage from './post/SelectPhotosPage' ;


import CatDetailMainPage from './cat/CatDetailMainPage' ;
import CatDetailIndexPage from './cat/CatDetailIndexPage' ;
import CatListPage from './cat/CatListPage' ;
import CatHotPage from './cat/CatHotPage' ;

import LoginPage from './account/LoginPage' ;
import RegisterPage from './account/RegisterPage' ;
import PasswordPage from './account/PasswordPage' ;

import ShopIndexPage from './shop/ShopIndexPage' ;
import ShopItemPage from './shop/ShopItemPage' ;
import ShopFeedPage from './shop/ShopFeedPage' ;
import ShopItemListPage from './shop/ShopItemListPage' ;
import ShopItemListMainPage from './shop/ShopItemListMainPage' ;

import SubjectIndexPage from './subject/SubjectIndexPage' ;
import SubjectPage from './subject/SubjectPage' ;

export function registerScreens() {
  Navigation.registerComponent('index.IndexMainPage', () => IndexMainPage);

  Navigation.registerComponent('my.MyHomePage', () => MyHomePage);
  Navigation.registerComponent('my.MsgPage', () => MsgPage);

  Navigation.registerComponent('user.UserHomePage', () => UserHomePage);
  Navigation.registerComponent('user.UserTimelinePage', () => UserTimelinePage);

  Navigation.registerComponent('timeline.TimelinePage', () => TimelinePage);
  Navigation.registerComponent('timeline.SlideImagesPage', () => SlideImagesPage);
  Navigation.registerComponent('timeline.TimelineDigsPage', () => TimelineDigsPage);

  Navigation.registerComponent('post.PostTimelinePage', () => PostTimelinePage);
  Navigation.registerComponent('post.SelectPhotosPage', () => SelectPhotosPage);

  Navigation.registerComponent('explore.ExploreIndexPage', () => ExploreIndexPage);

  Navigation.registerComponent('cat.CatDetailMainPage', () => CatDetailMainPage);
  Navigation.registerComponent('cat.CatDetailIndexPage', () => CatDetailIndexPage);
  Navigation.registerComponent('cat.CatListPage', () => CatListPage);
  Navigation.registerComponent('cat.CatHotPage', () => CatHotPage);

  Navigation.registerComponent('account.LoginPage', () => LoginPage);
  Navigation.registerComponent('account.RegisterPage', () => RegisterPage);
  Navigation.registerComponent('account.PasswordPage', () => PasswordPage);

  Navigation.registerComponent('shop.ShopIndexPage', () => ShopIndexPage);
  Navigation.registerComponent('shop.ShopItemPage', () => ShopItemPage);
  Navigation.registerComponent('shop.ShopFeedPage', () => ShopFeedPage);
  Navigation.registerComponent('shop.ShopItemListPage', () => ShopItemListPage);
  Navigation.registerComponent('shop.ShopItemListMainPage', () => ShopItemListMainPage);

  Navigation.registerComponent('subject.SubjectIndexPage', () => SubjectIndexPage);
  Navigation.registerComponent('subject.SubjectPage', () => SubjectPage);

}
