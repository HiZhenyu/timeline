import React, {
  Component,
  StyleSheet,
  TouchableHighlight ,
  View
} from 'react-native';

import {IndicatorViewPager,PagerDotIndicator} from 'rn-viewpager';
import LCSlideImageItem from './../module/image/LCSlideImageItem' ;

export default class SlideImagesPage extends Component {
  constructor(props) {
    super(props) ;

    this.state = {
      images:this.props.images ? this.props.images : [],
      holdOns:[] ,
    } ;

    this.defaultIndex = this.props.defaultIndex ? this.props.defaultIndex : 0 ;
    if(this.defaultIndex >= this.state.images.length || this.defaultIndex < 1) this.defaultIndex = 0 ;

    this.state.images.map((image,i)=>{
      this.state.holdOns[i] = i != this.defaultIndex ;
    }) ;
  }

  _onPageSelected(event){
    var position  = event.position ;

    var newState = {} ;
    newState.holdOns = {} ;

    this.state.images.map((image,i)=>{
      if(i == position){
        newState.holdOns[i] = false ;
      }else{
        newState.holdOns[i] = true ;
      }
    }) ;

    this.setState(newState) ;
  }

  render(){
    let views = this.state.images.map((image,i)=>{
      return (
        <LCSlideImageItem navigator={this.props.navigator} holdOn={this.state.holdOns[i]} key={i} image={image} />
      ) ;
    }) ;

    if(this.state.images.length == 1){
      return (
        <View style={styles.wrap}>
          {views}
        </View>
      ) ;
    }

    return (
      <View style={styles.wrap}>
        <IndicatorViewPager
          initialPage={this.defaultIndex}
          style={styles.wrap}
          indicator={(<PagerDotIndicator pageCount={this.state.images.length} />)}
          onPageSelected={this._onPageSelected.bind(this)}>
            {views}
        </IndicatorViewPager>
      </View>
    ) ;
  }
}

const styles = StyleSheet.create({
  wrap:{
    flex:1,
    backgroundColor:'#000'
  },
  item:{
    flex:1,
    backgroundColor:'#000'
  }
}) ;
