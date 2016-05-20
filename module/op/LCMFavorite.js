import React,{ Component } from 'react' ;

import LCIconTextBtn from './../pub/LCIconTextBtn' ;
import LCDid from './../LCDid' ;

export default class LCMFavorite extends LCDid {
  constructor(props) {
    super(props) ;

    this.check = {
      api : 'favorite/is',
      data : {timeline_id : this.props.timelineId} ,
    } ;

    this.dodid = {
      api : 'favorite/add' ,
      data : {timeline_id : this.props.timelineId} ,
    } ;
  }

  render(){
    let iconName = 'star-o' ;
    let iconColor = '#ccc' ;
    if(this.state.did){
      iconName = 'star' ;
      iconColor = '#ff6600' ;
    }

    return <LCIconTextBtn iconName={iconName} iconColor={iconColor} onPress={this._onPress.bind(this)} /> ;
  }
  
}
