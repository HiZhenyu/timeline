import React, { Component } from 'react';
import {
  StyleSheet,
  Image,
  View,
  Text,
} from 'react-native';

import TabNavigator from 'react-native-tab-navigator';

import IndexPage from './index/IndexPage' ;
import MyHomePage from './my/MyHomePage' ;
import PubIndexPage from './pub/PubIndexPage' ;
import PostTimelinePage from './post/PostTimelinePage' ;
import MsgPage from './my/MsgPage' ;

export default class MainPage extends Component {
  constructor(props) {
    super(props) ;
    this.state = {
      selectedTab : 'home',
      index:1,
    } ;
  }

  _onPress(js){
    this.setState(js) ;
  }


  render(){
    return (
      <TabNavigator>
        <TabNavigator.Item
          selected={this.state.selectedTab == 'home'}
          title='首页'
          key='home'
          renderIcon={() => <Image source={require('./images/icon_b_h.png')} key='icon_b_h' />}
          renderSelectedIcon={() => <Image source={require('./images/icon_b_h_a.png')} key='icon_b_h_a' />}
          allowFontScaling={false}
          selectedTitleStyle={{color:'#ff6600'}}
          onPress={this._onPress.bind(this,{selectedTab:'home'})}>
          <IndexPage />
        </TabNavigator.Item>

        <TabNavigator.Item
          selected={this.state.selectedTab == 'pub'}
          title='广场'
          key='pub'
          renderIcon={() => <Image source={require('./images/icon_b_c.png')} key='icon_b_c' />}
          renderSelectedIcon={() => <Image source={require('./images/icon_b_c_a.png')} key='icon_b_c_a' />}
          allowFontScaling={false}
          selectedTitleStyle={{color:'#ff6600'}}
          onPress={this._onPress.bind(this,{selectedTab:'pub'})}>
          <PubIndexPage />
        </TabNavigator.Item>

        <TabNavigator.Item
          selected={this.state.selectedTab == 'post'}
          title='发动态'
          key='post'
          renderIcon={() => <Image source={require('./images/icon_b_p.png')} style={{width:38,height:32}} />}
          renderSelectedIcon={() => <Image source={require('./images/icon_b_p.png')} style={{width:38,height:32}} />}
          allowFontScaling={false}
          selectedTitleStyle={{color:'#ff6600'}}
          onPress={this._onPress.bind(this,{selectedTab:'post'})}>
          <PostTimelinePage />
        </TabNavigator.Item>

        <TabNavigator.Item
          selected={this.state.selectedTab == 'msg'}
          title='消息'
          key='msg'
          renderIcon={() => <Image source={require('./images/icon_b_m.png')} key='icon_b_m' />}
          renderSelectedIcon={() => <Image source={require('./images/icon_b_m_a.png')} key='icon_b_m_a' />}
          allowFontScaling={false}
          selectedTitleStyle={{color:'#ff6600'}}
          onPress={this._onPress.bind(this,{selectedTab:'msg'})}>
          <MsgPage />
        </TabNavigator.Item>

        <TabNavigator.Item
          selected={this.state.selectedTab == 'my'}
          title='我的'
          key='my'
          renderIcon={() => <Image source={require('./images/icon_b_y.png')} key='icon_b_y' />}
          renderSelectedIcon={() => <Image source={require('./images/icon_b_y_a.png')} key='icon_b_y_a' />}
          allowFontScaling={false}
          selectedTitleStyle={{color:'#ff6600'}}
          onPress={this._onPress.bind(this,{selectedTab:'my'})}>
          <MyHomePage />
        </TabNavigator.Item>

      </TabNavigator>
    ) ;
  }
}

const styles = StyleSheet.create({


}) ;
