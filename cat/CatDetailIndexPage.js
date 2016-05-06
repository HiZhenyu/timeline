import React, {
  Component,
  StyleSheet,
  TouchableOpacity ,
  View,
  ScrollView,
  RefreshControl,
  Text,
  Image
} from 'react-native';

import GiftedSpinner from 'react-native-gifted-spinner' ;

import LCTitle from './../module/pub/LCTitle' ;
import LCMoreLine from './../module/pub/LCMoreLine' ;
import LCCatMemberList from './../module/cat/LCCatMemberList' ;
import LCCatChairmans from './../module/cat/LCCatChairmans' ;
import LCTimelineList from './../module/timeline/LCTimelineList' ;

import LCCatSP from './../module/cat/LCCatSP' ;

export default class CatDetailIndexPage extends Component {
  constructor(props) {
    super(props) ;

    //需要下拉更新的锁们
    this.doUpdateStates = ['doUpdateCatSP','doUpdateMembers','doUpdateChairmans','doUpdateTimelines'] ;
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

  _onPressToMember(){
    if(!this.props.mainView) return ;
    this.props.mainView.setPage(4) ;
  }

  _onPressToTimeline(){
    if(!this.props.mainView) return ;
    this.props.mainView.setPage(1) ;
  }

  render(){
    if(this.state.holdOn) return this._getLoadingView() ;
    let cat = this.props.cat ;

    return (
      <ScrollView
        style={[styles.backgroundGray,styles.flex]}
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
      >
        <LCCatSP
          navigator={this.props.navigator}
          cat={cat}
          doUpdate={this.state.doUpdateCatSP}
          updateCallback={(js)=>this._updateRefreshState({doUpdateCatSP:false})}
        />

        <View style={styles.flex}>
          <LCCatMemberList
            navigator={this.props.navigator}

            ref={(ref)=>this.membersView=ref}
            style={styles.members}

            itemStyleId={1}
            itemStyle={styles.memberItem}
            itemUserProps={{hiddenName:true,styleId:1}}
            cat={cat}
            ps={10}

            doUpdate={this.state.doUpdateMembers}
            updateCallback={(js)=>this._updateRefreshState({doUpdateMembers:false})}

          />
          <TouchableOpacity style={styles.membersMore} onPress={this._onPressToMember.bind(this)}>
            <Image source={require('./../images/icon_dirto.png')} style={styles.membersMoreImage} />
          </TouchableOpacity>
        </View>

        <LCTitle title="本会管理" />
        <LCCatChairmans
          navigator={this.props.navigator}

          cat={cat}
          doUpdate={this.state.doUpdateChairmans}
          updateCallback={(js)=>this._updateRefreshState({doUpdateChairmans:false})}
        />

        <LCTitle title="本会动态" />
        <LCTimelineList
          navigator={this.props.navigator}
          
          catId={cat.id}
          ps={10}
          doUpdate={this.state.doUpdateTimelines}
          updateCallback={(js)=>this._updateRefreshState({doUpdateTimelines:false})}
          scrollsToTop={false}
          renderFooter={()=><LCMoreLine title="查看最新动态..." onPress={this._onPressToTimeline.bind(this)} />}
        />

      </ScrollView>
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

  members:{
    flexDirection:'row',
    backgroundColor:'#fff',
    padding:10,
  },
  memberItem:{
    marginRight:5,
  },

  membersMore:{
    backgroundColor:'transparent',
    padding:20,
    position:'absolute',
    top:55,
    right:0,
  },
  membersMoreImage:{

  }
}) ;
