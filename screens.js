import { Navigation } from 'react-native-navigation';

import IndexMainPage from './index/IndexMainPage';

import MyHomePage from './my/MyHomePage';
import MySettingPage from './my/MySettingPage';
import MsgPage from './my/MsgPage';
import JiyouhuiUserIconPage from './my/JiyouhuiUserIconPage';
import MySettingInputPage from './my/MySettingInputPage';
import MyPasswdPage from './my/MyPasswdPage';
import UnameResetPage from './my/UnameResetPage';


import UserHomePage from './user/UserHomePage' ;
import UserTimelinePage from './user/UserTimelinePage' ;

import TimelinePage from './timeline/TimelinePage' ;
import SlideImagesPage from './timeline/SlideImagesPage' ;
import TimelineDigsPage from './timeline/TimelineDigsPage' ;

import ExploreIndexPage from './explore/ExploreIndexPage' ;

import PostTimelinePage from './post/PostTimelinePage' ;
import SelectPhotosPage from './post/SelectPhotosPage' ;
import SelectMyCatPage from './post/SelectMyCatPage' ;

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


import MedalListPage from './medal/MedalListPage' ;
import MedalPage from './medal/MedalPage' ;
import MedalUserListPage from './medal/MedalUserListPage' ;

import TaskListPage from './task/TaskListPage' ;



export function registerScreens() {
  Navigation.registerComponent('index.IndexMainPage', () => IndexMainPage);

  Navigation.registerComponent('my.MyHomePage', () => MyHomePage);
  Navigation.registerComponent('my.MsgPage', () => MsgPage);
  Navigation.registerComponent('my.MySettingPage', () => MySettingPage);
  Navigation.registerComponent('my.JiyouhuiUserIconPage', () => JiyouhuiUserIconPage);
  Navigation.registerComponent('my.MySettingInputPage', () => MySettingInputPage);
  Navigation.registerComponent('my.MyPasswdPage', () => MyPasswdPage);
  Navigation.registerComponent('my.UnameResetPage', () => UnameResetPage);


  Navigation.registerComponent('user.UserHomePage', () => UserHomePage);
  Navigation.registerComponent('user.UserTimelinePage', () => UserTimelinePage);

  Navigation.registerComponent('timeline.TimelinePage', () => TimelinePage);
  Navigation.registerComponent('timeline.SlideImagesPage', () => SlideImagesPage);
  Navigation.registerComponent('timeline.TimelineDigsPage', () => TimelineDigsPage);

  Navigation.registerComponent('post.PostTimelinePage', () => PostTimelinePage);
  Navigation.registerComponent('post.SelectPhotosPage', () => SelectPhotosPage);
  Navigation.registerComponent('post.SelectMyCatPage', () => SelectMyCatPage);

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

  Navigation.registerComponent('medal.MedalListPage', () => MedalListPage);
  Navigation.registerComponent('medal.MedalPage', () => MedalPage);
  Navigation.registerComponent('medal.MedalUserListPage', () => MedalUserListPage);

  Navigation.registerComponent('task.TaskListPage', () => TaskListPage);

}
