import React, {
  Component,
  StyleSheet,
  View
} from 'react-native';


import {IndicatorViewPager, PagerTitleIndicator} from 'rn-viewpager';

import CatDetailIndexPage from './CatDetailIndexPage' ;
import CatDetailTimelinePage from './CatDetailTimelinePage' ;
import CatDetailEssencePage from './CatDetailEssencePage' ;
import CatDetailEventPage from './CatDetailEventPage' ;
import CatDetailMemberPage from './CatDetailMemberPage' ;

export default class CatDetailMainPage extends Component {
  static navigatorButtons = {
    rightButtons: [
      {
        icon: require('./../images/icon_dopost.png'),
        id: 'id.cat.dopost'
      }
    ]
  };

  static defaultProps = {
    cat : {id:1},
  }

  constructor(props) {
    super(props) ;

    this.tabViewNames = ['CatDetailIndexPage','CatDetailTimelinePage','CatDetailEventPage','CatDetailEssencePage','CatDetailMemberPage'] ;
    this.state = {} ;
    this.state.holdOns = {} ;
    this.state.scrollsToTops = {} ;

    this.state.cat = this.props.cat ;

    this.tabViewNames.map((stag,i)=>{
      this.state.holdOns[stag] = true ;
      this.state.scrollsToTops[stag] = false ;

      if(!i){
        this.state.holdOns[stag] = false ;
        this.state.scrollsToTops[stag] = true ;
      }
    }) ;
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

  setPage(i){
    if(!this.viewPager) return ;
    this.viewPager.setPage(i) ;
  }

  render(){
    let cat = this.state.cat ;

    return (
        <IndicatorViewPager
          ref={(ref)=>{this.viewPager=ref;}}
          scrollsToTop={false}
          style={{flex:1,paddingTop:35,backgroundColor:'#f9f9f9'}}
          indicator={<PagerTitleIndicator
            style={{position:'absolute',top:0,width:React.Dimensions.get('window').width,height:35,backgroundColor:'#f9f9f9',borderBottomWidth:1,borderBottomColor:'#ddd'}}
            itemTextStyle={{fontSize:14}}
            selectedItemTextStyle={{fontSize:16}}
            selectedBorderStyle={{backgroundColor:'#ff6600',width:16}}
            titles={['首页', '最新', '活动','精华','成员']}
          />}
          onPageSelected={this._onPageSelected.bind(this)}
        >
          <View><CatDetailIndexPage navigator={this.props.navigator} cat={cat} holdOn={this.state.holdOns.CatDetailIndexPage} scrollsToTop={this.state.scrollsToTops.CatDetailIndexPage} mainView={this} /></View>
          <View><CatDetailTimelinePage navigator={this.props.navigator} cat={cat} holdOn={this.state.holdOns.CatDetailTimelinePage} scrollsToTop={this.state.scrollsToTops.CatDetailTimelinePage} mainView={this} /></View>
          <View><CatDetailEssencePage navigator={this.props.navigator} cat={cat} holdOn={this.state.holdOns.CatDetailEventPage} scrollsToTop={this.state.scrollsToTops.CatDetailEventPage} mainView={this} /></View>
          <View><CatDetailEssencePage navigator={this.props.navigator} cat={cat} holdOn={this.state.holdOns.CatDetailEssencePage} scrollsToTop={this.state.scrollsToTops.CatDetailEssencePage} mainView={this} /></View>
          <View><CatDetailMemberPage navigator={this.props.navigator} cat={cat} holdOn={this.state.holdOns.CatDetailMemberPage} scrollsToTop={this.state.scrollsToTops.CatDetailMemberPage} mainView={this} /></View>
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
