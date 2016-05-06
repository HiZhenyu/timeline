import React, {
  Component,
  StyleSheet,
  View
} from 'react-native';


import {IndicatorViewPager, PagerTitleIndicator} from 'rn-viewpager';

import TodayNewsPage from './TodayNewsPage' ;
import FollowFeedPage from './FollowFeedPage' ;
import EssencePage from './EssencePage' ;
import AskIndexPage from './AskIndexPage' ;

import LCStatus from './../module/pub/LCStatus' ;

export default class IndexPage extends Component {
  constructor(props) {
    super(props) ;

    this.tabViewNames = ['TodayNewsPage','FollowFeedPage','EssencePage','AskIndexPage'] ;
    this.state = {} ;
    this.state.holdOns = {} ;
    this.state.scrollsToTops = {} ;

    this.tabViewNames.map((stag,i)=>{
      this.state.holdOns[stag] = true ;
      this.state.scrollsToTops[stag] = false ;

      if(!i){
        this.state.holdOns[stag] = false ;
        this.state.scrollsToTops[stag] = true ;
      }
    }) ;

    if(this.props.navigator) this.props.navigator = this.props.navigator ;
  }

  _onPageSelected(event){
    var position  = event.position ;

    var newState = {} ;
    newState.holdOns = {} ;
    newState.scrollsToTops = {} ;

    Object.keys(this.tabViewNames).map((k)=>{
      var stag = this.tabViewNames[k] ;
      if(k == position){
        newState.holdOns[stag] = false ;
        newState.scrollsToTops[stag] = true ;
      }else{
        newState.holdOns[stag] = true ;
        newState.scrollsToTops[stag] = false ;
      }
    }) ;

    this.setState(newState) ;
  }

  render(){
    return (
        <IndicatorViewPager
          scrollsToTop={false}
          style={{flex:1,paddingTop:65,backgroundColor:'#f9f9f9'}}
          indicator={<PagerTitleIndicator
            style={{position:'absolute',top:20,width:React.Dimensions.get('window').width,height:45,backgroundColor:'#f9f9f9',borderBottomWidth:1,borderBottomColor:'#ddd'}}
            itemTextStyle={{fontSize:16}}
            selectedItemTextStyle={{fontSize:18}}
            selectedBorderStyle={{backgroundColor:'#f9f9f9'}}
            titles={['今日动态', '我的关注', '精华推荐','机友问答']}
          />}
          onPageSelected={this._onPageSelected.bind(this)}
        >
          <View><TodayNewsPage navigator={this.props.navigator} holdOn={this.state.holdOns.TodayNewsPage} scrollsToTop={this.state.scrollsToTops.TodayNewsPage} /></View>
          <View><FollowFeedPage navigator={this.props.navigator} holdOn={this.state.holdOns.FollowFeedPage}  scrollsToTop={this.state.scrollsToTops.FollowFeedPage} /></View>
          <View><EssencePage navigator={this.props.navigator} holdOn={this.state.holdOns.EssencePage} scrollsToTop={this.state.scrollsToTops.EssencePage} /></View>
          <View><AskIndexPage navigator={this.props.navigator} /></View>

        </IndicatorViewPager>
    ) ;
  }
}

const styles = StyleSheet.create({
  backgroundGray:{
    backgroundColor:'#efefef'
  } ,
  mainScrollView:{

  }
}) ;
