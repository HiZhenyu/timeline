import React, {
  Component,
  StyleSheet,
  TouchableHighlight ,
  View,
  Text,
  ScrollView,
  RefreshControl,
  Image,
  StatusBar
} from 'react-native';

import LCSline from './../module/pub/LCSline' ;
import LCOnlineSP from './../module/user/LCOnlineSP' ;

export default class MyHomePage extends Component {
  constructor(props) {
    super(props) ;

    //需要下拉更新的锁们
    this.doUpdateStates = ['doOnlineSP'] ;

    this.state = {} ;

    for(var i=0;i<this.doUpdateStates.length;i++) this.state[this.doUpdateStates[i]] = false ;
  }

  _onRefresh(){
    var newState = {} ;
    newState.refreshing = true ;
    for(var i=0;i<this.doUpdateStates.length;i++) newState[this.doUpdateStates[i]] = true ;

    this.setState(newState) ;
  }

  _updateRefreshState(newState){
    for(var k in newState) this.state[k] = newState[k] ;

    //是否已经更新完毕
    if(this.state.refreshing){
      var updatedCount = 0 ;
      for(var i=0;i<this.doUpdateStates.length;i++) if(!this.state[this.doUpdateStates[i]]) updatedCount++ ;
      if(updatedCount == this.doUpdateStates.length) newState.refreshing = false ;
    }

    this.setState(newState) ;
  }

  render(){
    return (
      <ScrollView
        style={[styles.backgroundGray,{flex:1}]}
        scrollsToTop={true}
        refreshControl={
          <RefreshControl
            refreshing={this.state.refreshing}
            onRefresh={this._onRefresh.bind(this)}
            tintColor="#ff6600"
            title="数据刷新中..."
            colors={['#ff6600', '#00ff66', '#0000ff']}
            progressBackgroundColor="#ff6600" />
        }
      >
        <LCOnlineSP
          navigator={this.props.navigator}
          doUpdate={this.state.doOnlineSP}
          holdOn={true}
          updateCallback={(js)=>this._updateRefreshState({doOnlineSP:false})}
        />

        <LCSline navigator={this.props.navigator} style={styles.mt10} title='我的机友会' icon={require('./../images/icon_homeji.png')}  />
        <LCSline navigator={this.props.navigator} style={styles.mt10} title='我的订单' icon={require('./../images/icon_msg.png')} />
        <LCSline navigator={this.props.navigator} style={styles.mt10} lines={[
          {title:'金币纪录',icon:require('./../images/icon_log.png')},
          {title:'获奖纪录',icon:require('./../images/icon_log.png')},
        ]} />
      </ScrollView>
    ) ;
  }
}


const styles = StyleSheet.create({
  backgroundGray:{
    backgroundColor:'#efefef'
  } ,
  mt10:{
    marginTop:10,
  }
}) ;
