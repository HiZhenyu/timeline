import React, {
  Component,
  StyleSheet,
  TouchableHighlight ,
  View,
  RefreshControl,
  Text,
} from 'react-native';

import GiftedSpinner from 'react-native-gifted-spinner' ;
import LCTimelineList from './../module/timeline/LCTimelineList' ;

export default class CatDetailTimelinePage extends Component {
  constructor(props) {
    super(props) ;

    //需要下拉更新的锁们
    this.doUpdateStates = ['doUpdateTimelineList'] ;
    this.state = {
      cat: this.props.cat ,
      refreshing:false,
      scrollsToTop:!!this.props.scrollsToTop,
      holdOn:!!this.props.holdOn,
    } ;

    for(var i=0;i<this.doUpdateStates.length;i++) this.state[this.doUpdateStates[i]] = false ;
  }

  componentDidMount(){

  }

  componentWillReceiveProps(nextProps){
    if(nextProps.scrollsToTop != this.props.scrollsToTop) this.setState({scrollsToTop:nextProps.scrollsToTop}) ;
    if(this.props.holdOn && !nextProps.holdOn) return this._doMount() ;
  }

  _doMount(){
    this.setState({holdOn:false}) ;
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

  _getLoadingView(style){
    return (<View style={[styles.spinner,style]}><GiftedSpinner /><Text allowFontScaling={false}>正在加载...</Text></View>) ;
  }

  render(){
    if(this.state.holdOn) return this._getLoadingView() ;

    return (
        <LCTimelineList
          doUpdate={this.state.doUpdateTimelineList}
          updateCallback={(js)=>this._updateRefreshState({doUpdateTimelineList:false})}
          scrollsToTop={this.state.scrollsToTop}

          loadMore={true}
          enableEmptySections={true}
          pageSize={3}

          catId={this.state.cat.id}
          orderId='last'

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
    ) ;
  }
}


const styles = StyleSheet.create({
  flex:{
    flex:1,
  },
  backgroundGray:{
    backgroundColor:'#efefef'
  } ,
  spinner:{
    flex:1,
    height:50,
    alignItems:'center',
    justifyContent:'center',
    flexDirection:'row'
  },
}) ;
