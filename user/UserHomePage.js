import React, {
  Component,
  StyleSheet,
  ScrollView,
  View,
  RefreshControl
} from 'react-native';

import LCTitle from './../module/pub/LCTitle' ;
import LCMoreLine from './../module/pub/LCMoreLine' ;

import LCUserCats from './../module/user/LCUserCats' ;
import LCUserBigSP from './../module/user/LCUserBigSP' ;
import LCUserMedals from './../module/user/LCUserMedals' ;
import LCTimelineList from './../module/timeline/LCTimelineList' ;

export default class UserHomePage extends Component {

  constructor(props) {
    super(props) ;
    var user = props.user ? props.user : {} ;

    //需要下拉更新的锁们
    this.doUpdateStates = ['doUpdateTimlineList','doUpdateUserMedals','doUpdateUserBigSP','doUpdateUserCats'] ;

    this.state = {
      user : user,
      holdOn : false ,
      refreshing:false
    } ;

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

  _onPressMoreTimeline(){
    if(!global.appNavigator) return ;
    var props = {user:this.state.user} ;

    //使用Navigation方案
    global.appNavigator.push({
      screen: 'user.UserTimelinePage',
      title: undefined,
      passProps: props,
      animated: true,
      backButtonTitle: '返回',
      title: props.user.name + '的动态' ,
      backButtonHidden: false,
      navigatorStyle: {
        tabBarHidden: true,
        navBarBackgroundColor: '#f9f9f9',
        navBarBackgroundColor: '#f9f9f9',
        navBarButtonColor: '#555',
      },
      navigatorButtons: {}
    });

  }

  componentDidMount(){
    return null ;
    global.appNavigator.callback = (()=>{
      this.setState({holdOn:false}) ;
      global.appNavigator.callback = false ;
    }).bind(this) ;
  }

  //手动更新
  goUpdate(){
    this._scrollView.scrollTo({x:0, y:0, animated:true}) ;
  }

  render(){
    let user = this.state.user ;

    return (

      <View style={[styles.backgroundGray,{flex:1}]}>
        <ScrollView
          ref={(ref)=>this._scrollView=ref}
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

          <LCUserBigSP
            uid={user.uid}
            doUpdate={this.state.doUpdateUserBigSP}
            updateCallback={(js)=>this._updateRefreshState({doUpdateUserBigSP:false})}
            user={user} />

          <LCTitle title="Ta的勋章" />
          <LCUserMedals
            uid={user.uid}
            doUpdate={this.state.doUpdateUserMedals}
            updateCallback={(js)=>this._updateRefreshState({doUpdateUserMedals:false})} />

          <LCTitle title="Ta的机友会" />
          <LCUserCats
            uid={user.uid}
            doUpdate={this.state.doUpdateUserCats}
            updateCallback={(js)=>this._updateRefreshState({doUpdateUserCats:false})}
           />

          <LCTitle title="Ta的动态" />
          <LCTimelineList
            doUpdate={this.state.doUpdateTimlineList}
            updateCallback={(js)=>this._updateRefreshState({doUpdateTimlineList:false})}
            holdOn={this.state.holdOn}
            uid={user.uid}
            scrollsToTop={false}
            renderFooter={()=><LCMoreLine title="更多动态..." onPress={this._onPressMoreTimeline.bind(this)} />}
          />

        </ScrollView>
      </View>
    ) ;
  }
}

const styles = StyleSheet.create({
  backgroundGray:{
    backgroundColor:'#efefef'
  }
}) ;
