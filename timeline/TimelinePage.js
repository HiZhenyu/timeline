import React, {
  Component,
  StyleSheet,
  TouchableHighlight ,
  View,
  ScrollView,
  RefreshControl,
  Text
} from 'react-native';

import GiftedSpinner from 'react-native-gifted-spinner' ;

import LCNavBar from './../module/pub/LCNavBar' ;
import LCCommentList from './../module/comment/LCCommentList' ;
import LCTimelineDetail from './../module/timeline/LCTimelineDetail' ;


export default class TimelinePage extends Component {
  constructor(props) {
    super(props) ;

    //需要下拉更新的锁们
    this.doUpdateStates = ['doUpdateCommentList','doUpdateTimelineDetail'] ;
    this.state = {
      timeline: this.props.timeline ,
      refreshing:false,
      holdOn:false,
    } ;

    for(var i=0;i<this.doUpdateStates.length;i++) this.state[this.doUpdateStates[i]] = false ;
  }

  componentDidMount(){
  }

  componentWillReceiveProps(nextProps){
    if(this.props.holdOn && !nextProps.holdOn) return this._doMount() ;
  }

  _doMount(){
    this.setState({holdOn:false}) ;
  }

  _getLoadingView(style){
    return (<View style={[styles.spinner,style]}><GiftedSpinner /><Text allowFontScaling={false}>正在加载...</Text></View>) ;
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
    if(this.state.holdOn) return this._getLoadingView() ;
    let timeline = this.state.timeline ;

    return (
      <View style={{flex:1}}>
        <LCCommentList
            navigator={this.props.navigator}
            timelineId={timeline.id}
            renderHeader={() => {
              return (
                <LCTimelineDetail
                  navigator={this.props.navigator}
                  style={{borderBottomWidth:1,borderBottomColor:'#ddd'}}
                  timeline={timeline}
                  doUpdate={this.state.doUpdateTimelineDetail}
                  updateCallback={(js)=>this._updateRefreshState({doUpdateTimelineDetail:false})} />
              ) ;
            }}

            list={this.props.comments}
            doUpdate={this.state.doUpdateCommentList}
            updateCallback={(js)=>this._updateRefreshState({doUpdateCommentList:false})}

            loadMore={true}
            enableEmptySections={true}
            pageSize={3}
            style={[styles.backgroundGray]}
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

}) ;
