import React, {
  Component,
  StyleSheet,
  TouchableHighlight ,
  View,
  ListView,
  Text,
} from 'react-native';

import GiftedSpinner from 'react-native-gifted-spinner' ;
import LCCatItem from './LCCatItem' ;

export default class LCCatList extends Component {
  static defaultProps = {
    order: 'last',
    itype: 'all',
    areaId: 0,
    ps: 20,
  } ;

  constructor(props) {
    super(props) ;

    this.defaultResListSize = 4 ;
    this.resListSize = props.loadMore ? this.defaultResListSize : 0 ;

		this.state = {
      dataSource:new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2}),
      noMore:true,
      didMount:false,
		};

    this.storageKey = 'catlist' ;
    this.storageExpires = 0 ;

    this._doClear() ;
  }

  componentWillReceiveProps(nextProps){
    if(!this.props.doUpdate && nextProps.doUpdate) this._fetch(nextProps.updateCallback ? nextProps.updateCallback:null,true) ;
    if(this.props.holdOn && !nextProps.holdOn) return this._doMount() ;
  }

  componentDidMount() {
    return this._doMount() ;
  }

  componentWillUnmount() {
    this.unmount = true ;
  }

  _doMount(){
    return this._fetchDefault() ;
  }

  _getStorageId(){
    var keys = [] ;
    for(var k in LCCatList.defaultProps) keys.push(this.props[k]) ;

    return keys.join('-') ;
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

      this.p = 2 ;
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
    post.p = this.p++ ;
    post.ps = this.props.ps ;
    post.itype = this.props.itype ;
    post.area_id = this.props.areaId ;

    this.loading = true ;
    global.v2iapi('cat','list',post,{
      succ:(ret)=>{
        if(ret.p == 1) global.storage.save({key:this.storageKey,id:this._getStorageId(),rawData:ret,expires:this.storageExpires}) ;

        this._doAssets(this._pushResList(ret)) ;
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

    this.list = this.list.concat(js.list) ;
    newState.dataSource = this.state.dataSource.cloneWithRows(this.list) ;

    newState.didMount = true ;

    if(js.p < js.psum*1) newState.noMore = false  ;
    else if(js.p >= js.psum) newState.noMore = true ;

    //reList
    if(this.resList.list.length > 0) newState.noMore = false ;

    if(!this.unmount) this.setState(newState) ;
  }

  _renderFooter() {
    if(!this.props.loadMore) return null ;
    if(!this.state.noMore || this.list.length < 1 || this.resList.list.length > 0) return this._getLoadingView({flex:1}) ;
    return this._getNoMoreText('以上是所有机友会') ;
  }

  _onEndReached(){
    if(!this.props.loadMore) return null ;
    if(!this.state.noMore) this._fetch();
    return null ;
  }

  _renderRow(item, sectionID, rowID){
    return (<LCCatItem navigator={this.props.navigator} key={item.id} style={[styles.catItem]} cat={item} {...this.props.itemCatProps} />) ;
  }

  scrollTo(...args){
    this.view.scrollTo(...args) ;
  }

  _getLoadingView(style){
    return (<View style={[styles.spinner,style]}><GiftedSpinner /><Text style={{textAlign:'center'}} allowFontScaling={false}>正在加载...</Text></View>) ;
  }

  _getNoMoreText(title){
      return (<View style={styles.spinner}><Text allowFontScaling={false} style={{color:'#ccc'}}>{title}</Text></View>) ;
  }

  //普通循环列表
  renderCList(){
    //还没开始
    if(!this.state.didMount) return this._getLoadingView({flex:1}) ;

    //没有列表
    if(this.state.dataSource.length < 1) return this._getNoMoreText('暂时没有任何动态') ;

    const header = this.props.renderHeader ? this.props.renderHeader() : null ;
    const footer = this.props.renderFooter ? this.props.renderFooter() : null ;

    let tpls = [] ;

    var allRowIDs = this.state.dataSource.rowIdentities;
    for (var sectionIdx = 0; sectionIdx < allRowIDs.length; sectionIdx++) {
        var rowIDs = allRowIDs[sectionIdx];
        if(rowIDs.length < 1) continue ;

        for (var rowIdx = 0; rowIdx < rowIDs.length; rowIdx++) {
            var rowData = this.state.dataSource.getRowData(sectionIdx, rowIdx) ;
            tpls.push(this._renderRow(rowData, sectionIdx, rowIdx)) ;
        }
    }

    return (
      <View style={[this.props.style]}>
        {header}
        {tpls}
        {footer}
      </View>
    ) ;
  }

  render(){
    //使用普通循环列表
    if(!this.props.loadMore) return this.renderCList() ;

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
        onEndReachedThreshold={220}
        {...this.props}
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
  catItem:{
    marginBottom:10,
  }
}) ;
