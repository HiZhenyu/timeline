import React, {
  Component,
  StyleSheet,
  TouchableHighlight ,
  View,
  ListView,
  Text,
  ActivityIndicatorIOS
} from 'react-native';

import LCCommentItem from './LCCommentItem' ;
import GiftedSpinner from 'react-native-gifted-spinner' ;

export default class LCCommentList extends Component {
  static defaultProps = {
    ps:50,
    timelineId:0,
    p:1,
  } ;

  constructor(props) {
    super(props) ;

    this.resListSize = 10 ;

		this.state = {
      dataSource:new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2}),
      noMore:true,
      didMount:false,
		};

    this.storageKey = 'commentlista' ;
    this.storageExpires = 30*24*3600*1000 ;

    this._doClear() ;
  }

  componentWillReceiveProps(nextProps){
    if(!this.props.doUpdate && nextProps.doUpdate) this._fetch(nextProps.updateCallback ? nextProps.updateCallback:null,true) ;
    if(this.props.holdOn && !nextProps.holdOn) return this._doMount() ;
  }

  componentDidMount() {
    if(this.props.holdOn){
      if(!this.didMount && this.props.list && this.props.list.length > 0){
        var newState = {} ;
        newState.dataSource = this.state.dataSource.cloneWithRows(this.props.list.slice(0,this.defaultResListSize)) ;
        newState.didMount = true ;
        this.timer = setTimeout(()=>{
          this.setState(newState) ;
        },0) ;
      }

      return null ;
    }
    return this._doMount() ;
  }


  componentWillUnmount() {
    this.timer && clearTimeout(this.timer) ;

    this.unmount = true ;
  }

  _doMount(){
    return this._fetchDefault() ;
  }

  _getStorageId(){
    return this.props.timelineId ;
  }

  //切割获取
  _popResList(callback){
    if(!this.resListSize) return false ;
    if(this.resList.list.length > 0){
      var js = {p:this.resList.p,psum:this.resList.psum,list:[]} ;

      var i = 0 ;
      while(this.resList.list.length > 0){
        if(i++ >= this.resListSize) break ;
        js.list.push(this.resList.list.shift()) ;
      }

      this._doAssets(js) ;
      if(callback) callback(js) ;
      return true;
    }

    return false ;
  }

  //加入后备资源
  _pushResList(ret){
    if(!this.resListSize) return ret ;
    var js = {p:ret.p,psum:ret.psum,list:[]} ;

    this.resList.p = ret.p ;
    this.resList.psum = ret.psum ;
    if(!this.resList.list) this.resList.list = [] ;

    var i = 0 ;
    while(ret.list.length > 0){
      if(i++ >= this.resListSize) break ;
      js.list.push(ret.list.shift()) ;
    }

    while(ret.list.length > 0){
      this.resList.list.push(ret.list.shift()) ;
    }

    return js ;
  }

  //获取初始状态的
  _fetchDefault(callback){
    if(this.loading) return false ;
    this.loading = true ;

    global.storage.sync[this.storageKey] = (()=>{
      this.loading = false ;
      this._fetch(callback) ;
    }).bind(this) ;

    global.storage.load({
        key: this.storageKey ,
        id:this._getStorageId(),
        autoSync: true,
        syncInBackground: false,
    }).then( ret => {
      if(callback) callback(ret) ;

      this._doAssets(this._pushResList(ret)) ;
      this.loading = false ;

    }).catch( err => {
        this.loading = false ;

        //没读取到
        this._fetch(callback) ;
    }) ;

    return true;
  }

  //通过远程接口获取
  _fetch(callback,clear){
    if(this.loading) return false ;
    if(!clear) clear = false ;
    if(clear) this._doClear() ;

    //获取到切割数据
    if(this._popResList(callback)) return ;

    var post = {} ;
    post.p = this.p ;
    post.last_id = this.lastId ;

    post.timeline_id = this.props.timelineId ;
    post.ps = this.props.ps ;

    this.loading = true ;
    global.v2iapi('reply','list',post,{
      succ:(ret)=>{
        let list = [] ;
        this.list.map(item=>list.push(item)) ;
        ret.list.map(item=>list.push(item)) ;

        this._doAssets(this._pushResList(ret)) ;

        //
        ret.list = list ;
        if(ret.p < ret.psum) global.storage.save({key:this.storageKey,id:this._getStorageId(),rawData:ret,expires:this.storageExpires}) ;
      },
      ever:(js)=>{
        if(callback) callback(js) ;
        this.loading = false ;
      }
    }) ;
  }

  _doClear(){
    this.p = 1 ;
    this.lastId = 0 ;
    this.list = [] ;
    this.resList = {p:1,psum:2,list:[]} ;
  }

  _doAssets(js) {
    var newState = {} ;

    this.lastId = js.list[js.list.length-1] ? js.list[js.list.length-1].id : 0 ;

    this.list = this.list.concat(js.list) ;
    newState.dataSource = this.state.dataSource.cloneWithRows(this.list) ;

    newState.didMount = true ;

    if(js.p < js.psum*1 && this.state.noMore) newState.noMore = false  ;
    else if(js.p >= js.psum && !this.state.noMore) newState.noMore = true ;

    //reList
    if(this.resList.list.length > 0 && this.state.noMore) newState.noMore = false ;

    this.p = js.p+1 ;
    console.log('list');
    if(!this.unmount) this.setState(newState) ;
  }

  _renderFooter() {
    if(!this.state.noMore || (this.list.length < 1 && !this.state.didMount)) return this._getLoadingView({flex:1}) ;
    return this._getNoMoreText('没有更多评论了') ;
  }

  _onEndReached(){
    if(!this.state.noMore) this._fetch();
    return null ;
  }

  _renderRow(comment, sectionID, rowID){
    let style=[styles.commentItem] ;
    if(this.props.itemStyle) style.push(this.props.itemStyle) ;

    let lineStyle = rowID == 0 ? {borderTopWidth:0} : null ;
    return (<LCCommentItem navigator={this.props.navigator} key={comment.id} style={style} lineStyle={lineStyle} comment={comment} />) ;
  }

  scrollTo(...args){
    this.view.scrollTo(...args) ;
  }

  _getLoadingView(style){
    return (<View style={[styles.spinner,style]}><GiftedSpinner /><Text allowFontScaling={false}>正在加载...</Text></View>) ;
  }

  _getNoMoreText(title){
      return (<View style={styles.spinner}><Text allowFontScaling={false} style={{color:'#ccc'}}>{title}</Text></View>) ;
  }

  render(){
    //还没开始
    if(!this.state.didMount) return this._getLoadingView({flex:1}) ;

    return (
			<ListView
        ref={view=>this.view=view}
        scrollsToTop={this.props.scrollsToTop}
        enableEmptySections={true}
        removeClippedSubviews={true}
        dataSource={this.state.dataSource}
        renderRow={this._renderRow.bind(this)}
        renderFooter={this._renderFooter.bind(this)}
        onEndReached={this._onEndReached.bind(this)}
        contentContainerStyle={[this.props.style]}
        {...this.props}
        onEndReachedThreshold={220}
      />
		);
  }
}

const styles = StyleSheet.create({
  spinner:{
    height:50,
    alignItems:'center',
    justifyContent:'center',
    flexDirection:'row'
  },
  commentItem:{

  },
  commentItemLast:{
    marginBottom:0,
  }
}) ;
