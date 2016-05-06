import React, {
  Component,
  StyleSheet,
  RefreshControl,
  View,
  Text,
} from 'react-native';


import LCTitle from './../module/pub/LCTitle' ;
import LCCatMemberList from './../module/cat/LCCatMemberList' ;
import GiftedSpinner from 'react-native-gifted-spinner' ;

export default class CatDetailMemberPage extends Component {
  constructor(props) {
    super(props) ;

    //需要下拉更新的锁们
    this.doUpdateStates = ['doUpdateCatMemberList'] ;
    this.state = {
      refreshing:false,
      scrollsToTop:!!this.props.scrollsToTop,
      holdOn:!!this.props.holdOn,
      cat:this.props.cat ,
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
    let cat = this.state.cat ;

    return (
      <LCCatMemberList
          cat={cat}
          ref={view=>this._scrollView=view}
          doUpdate={this.state.doUpdateCatMemberList}
          updateCallback={(js)=>this._updateRefreshState({doUpdateCatMemberList:false})}

          itemUserProps={{styleId:1}}

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
    flex:1,
    height:50,
    alignItems:'center',
    justifyContent:'center',
    flexDirection:'row'
  },
  mainScrollView:{

  }
}) ;
