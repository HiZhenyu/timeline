import React, {
  Component,
  StyleSheet,
  TouchableHighlight ,
  View,
  Text,
  TextInput,
  ScrollView,
  RefreshControl,
  Image
} from 'react-native';

import LCFocusImages from './../module/image/LCFocusImages' ;
import LCUserCats from './../module/user/LCUserCats' ;
import LCTitle from './../module/pub/LCTitle' ;
import LCTimelineList from './../module/timeline/LCTimelineList' ;

import GiftedSpinner from 'react-native-gifted-spinner' ;

export default class TodayNewsPage extends Component {
  constructor(props) {
    super(props) ;

    //需要下拉更新的锁们
    this.doUpdateStates = ['doUpdateSlideImages','doUpdateTimlineList','doUpdateUserCats'] ;
    this.state = {
      refreshing:false,
      scrollsToTop:!!this.props.scrollsToTop,
      holdOn:!!this.props.holdOn,
    } ;

    for(var i=0;i<this.doUpdateStates.length;i++) this.state[this.doUpdateStates[i]] = false ;
  }

  componentWillReceiveProps(nextProps){
    if(nextProps.scrollsToTop != this.props.scrollsToTop) this.setState({scrollsToTop:nextProps.scrollsToTop}) ;
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
    var online = global.getOnline() ;

    return (
      <LCTimelineList
          renderHeader={() => {
            return (<View>
              <LCFocusImages doUpdate={this.state.doUpdateSlideImages} updateCallback={(js)=>this._updateRefreshState({doUpdateSlideImages:false})} />
              <LCTitle title="我的机友会" />
              <LCUserCats uid={online.uid} doUpdate={this.state.doUpdateUserCats} updateCallback={(js)=>this._updateRefreshState({doUpdateUserCats:false})} />
              <LCTitle title="机友们的动态" />
            </View>)
          }}

          ref={view=>this._scrollView=view}
          doUpdate={this.state.doUpdateTimlineList}
          updateCallback={(js)=>this._updateRefreshState({doUpdateTimlineList:false})}

          loadMore={true}
          enableEmptySections={true}
          pageSize={3}
          style={[styles.mainScrollView,styles.backgroundGray]}
          scrollsToTop={this.state.scrollsToTop}
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
  backgroundGray:{
    backgroundColor:'#efefef'
  } ,
  spinner:{
    height:50,
    alignItems:'center',
    justifyContent:'center',
    flexDirection:'row',
    flex:1
  },
  mainScrollView:{

  }
}) ;
