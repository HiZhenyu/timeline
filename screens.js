import { Navigation } from 'react-native-navigation';

import IndexPage from './index/IndexPage';
import MyHomePage from './my/MyHomePage';
import MsgPage from './my/MsgPage';
import UserHomePage from './user/UserHomePage' ;
import UserTimelinePage from './user/UserTimelinePage' ;
import TimelinePage from './timeline/TimelinePage' ;
import SlideImagesPage from './timeline/SlideImagesPage' ;
import ExploreIndex from './explore/ExploreIndex' ;
import PostTimelinePage from './post/PostTimelinePage' ;

import CatDetailMainPage from './cat/CatDetailMainPage' ;
import CatDetailIndexPage from './cat/CatDetailIndexPage' ;
import CatListPage from './cat/CatListPage' ;

import LoginPage from './account/LoginPage' ;
import RegisterPage from './account/RegisterPage' ;
import PasswordPage from './account/PasswordPage' ;



export function registerScreens() {
  Navigation.registerComponent('index.IndexPage', () => IndexPage);
  Navigation.registerComponent('my.MyHomePage', () => MyHomePage);
  Navigation.registerComponent('my.MsgPage', () => MsgPage);
  Navigation.registerComponent('user.UserHomePage', () => UserHomePage);
  Navigation.registerComponent('user.UserTimelinePage', () => UserTimelinePage);
  Navigation.registerComponent('timeline.TimelinePage', () => TimelinePage);
  Navigation.registerComponent('timeline.SlideImagesPage', () => SlideImagesPage);
  Navigation.registerComponent('post.PostTimelinePage', () => PostTimelinePage);
  Navigation.registerComponent('explore.ExploreIndex', () => ExploreIndex);
  Navigation.registerComponent('cat.CatDetailMainPage', () => CatDetailMainPage);
  Navigation.registerComponent('cat.CatDetailIndexPage', () => CatDetailIndexPage);
  Navigation.registerComponent('cat.CatListPage', () => CatListPage);

  Navigation.registerComponent('account.LoginPage', () => LoginPage);
  Navigation.registerComponent('account.RegisterPage', () => RegisterPage);
  Navigation.registerComponent('account.PasswordPage', () => PasswordPage);
}
