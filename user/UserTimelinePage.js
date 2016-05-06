import React, {
  Component,
  StyleSheet,
  View,
  ScrollView,
  RefreshControl,
  Image
} from 'react-native';

import LCTimelineList from './../module/timeline/LCTimelineList' ;

export default class UserTimelinePage extends Component {
  constructor(props) {
    super(props) ;

    //需要下拉更新的锁们
    this.doUpdateStates = ['doUpdateTimlineList'] ;
    this.state = {
      refreshing:false
    } ;

    for(var i=0;i<this.doUpdateStates.length;i++) this.state[this.doUpdateStates[i]] = false ;

    this.user = this.props.user ;

    if(this.user && this.user.uid) this.timelines = global.getUserTimelines(this.user.uid) ;
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
    if(!this.props.user || !this.props.user.uid) return <View></View> ;
    var user = this.user ;

    return (
      <View style={{flex:1}}>
        <LCTimelineList
            uid={user.uid}
            list={this.timelines}
            doUpdate={this.state.doUpdateTimlineList}
            updateCallback={(js)=>this._updateRefreshState({doUpdateTimlineList:false})}

            loadMore={true}
            enableEmptySections={true}
            pageSize={3}
            style={[styles.mainScrollView,styles.backgroundGray]}
            scrollsToTop={true}
            refreshControl={
              <RefreshControl
                refreshing={this.state.refreshing}
                onRefresh={this._onRefresh.bind(this)}
                tintColor="#ff6600"
                title="机友会正在为您更新内容..."
                colors={['#ff6600', '#00ff66', '#0000ff']}
                progressBackgroundColor="#ff6600"
              />}
           />

      </View>
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
