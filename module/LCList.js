import React, {
  Component,
  StyleSheet,
  View,
  ListView,
  Text,
} from 'react-native';

import GiftedSpinner from 'react-native-gifted-spinner' ;

/**
 * 提供统一功能的列表模块
 */
export default class LCList extends Component {
  constructor(props) {
    super(props) ;

    //以下为需要定义的内置变量
    //1、初始化时展示的数量（不要太多，影响渲染，如一次获取到20条，可分两次渲染）
    this.storeDefaultListSize = 10 ;
    this.storeListSize = this.storeDefaultListSize ;

    //2、提交的参数，如 catId 需要对应 post 的cat_id 则记为 catId:'cat_id'
    this.postKeyMap = {ps:'ps',p:'p'} ;

    //3、缓存的key
    this.storageKey = '' ;

    //4、缓存的时间 (选填)
    this.storageExpires = 3*3600*1000 ;

    //5、接口路径
    this.apiPath = '' ;

    //6、item组件
    this.itemComponent = View ;

    //7、item其他参数
    this.itemComponentProps = {} ;

    //8、
    this.thatsAllText = '以上是全部数据' ;

    //9、
    this.emptyDataSourceText = '暂时获得没有任何数据' ;

    //10、
    this.style = null ;

    //11、
    this.styleEmptyView = null ;

    //12、
    this.pageSize = this.props.pageSize ? this.props.pageSize : 1 ;

    //-- 完毕 --
		this.state = {
      dataSource:new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2}),
      noMore:true,
      sum:0,
		};

    this._doReset() ;
  }

  componentWillReceiveProps(nextProps){
    //更新，更新完毕之后可反馈
    if(!this.props.doUpdate && nextProps.doUpdate) this._doUpdate(nextProps.updateCallback ? nextProps.updateCallback:null) ;
  }

  componentDidMount() {
    //如果有传入，暂时展示出来，同时请求数据，数据完成之后进行更新
    if(this.props.list && this.props.list.length > 0){
      let newState = {} ;
      let initListSize = this.props.initListSize ? this.props.initListSize : this.storeDefaultListSize ;

      newState.dataSource = this.state.dataSource.cloneWithRows(this.props.list.slice(0,initListSize)) ;
      newState.didMount = true ;
      newState.noMore = false ;
      this.setState(newState) ;
    }

    //不缓存
    !this.storageExpires && (this.useHttpFetch = true) ;

    return this._doMount(this.props.initedCallback ? this.props.initedCallback:null) ;
  }

  //
  componentWillUnmount() {
    this.unmount = true ;
  }

  //默认执行方法
  _doMount(callback){
    return this._fetch(callback) ;
  }

  //更新方法
  _doUpdate(callback){
    for(let i=0;i<this.storeList.psum*1;i++){
      //清空缓存
      global.storage.remove({
        key : this.storageKey ,
        id : this._getStorageId({p:i}),
      });
    }

    //使用远程数据
    this.useHttpFetch = true ;

    this._doReset() ;
    this._doMount(callback) ;
  }

  _getPropsByK(k){
    if(k.indexOf('.') < 0) return this.props[k] ? this.props[k]:'' ;
    let ks = k.split('.') ;

    let i = 0 ;
    let val = this.props[ks[i]] ;

    for(i=1;i<ks.length;i++){
      if(!val) break ;
      val = val[ks[i]] ;
    }

    if(i < ks.length) return '' ;
    return val ;
  }

  //获取本地缓存的key-id
  _getStorageId(op){
    let ops = {} ;
    for(let k in this.postKeyMap) ops[k] = this._getPropsByK(k) ;
    if(op) for(let k in op) ops[k] = op[k] ;

    //p 是特殊的
    this.p && (ops.p = this.p) ;

    let keys = [] ;
    for(let k in ops) keys.push(ops[k]) ;

    return keys.join('-') ;
  }

  //尝试获取临时存储内容
  _popStoreList(){
    if(!this.storeListSize) return false ;
    if(this.storeList.list.length < 1) return false ;

    let jslist = [] ;

    let i = 0 ;
    while(this.storeList.list.length > 0){
      if(i++ >= this.storeListSize) break ;
      jslist.push(this.storeList.list.shift()) ;
    }

    return { p:this.storeList.p , psum:this.storeList.psum , list:jslist , sum: this.storeList.sum } ;
  }

  //将获取到的数据，先放到临时存储
  _pushStoreList(ret){
    //放这里可以一次修理完毕
    this.fixAssets && (ret = this.fixAssets(ret)) ;

    //不需要做临时缓存
    if(!this.storeListSize) return ret ;

    //先弹出部分需要使用的
    let jslist = [] ;

    let i = 0 ;
    while(ret.list.length > 0){
      if(i++ >= this.storeListSize) break ;
      jslist.push(ret.list.shift()) ;
    }

    //存起来过冬
    this.storeList.p = ret.p ;
    this.storeList.psum = ret.psum ;
    this.storeList.sum = ret.sum*1 ;
    while(ret.list.length > 0){
      this.storeList.list.push(ret.list.shift()) ;
    }

    return { p:ret.p , psum:ret.psum , list:jslist , sum:ret.sum*1 } ;
  }

  //通过远程接口获取
  _fetch(callback){
    if(this.loading) return false ;

    //获取到切割数据
    let storeRet = this._popStoreList() ;
    if(storeRet){
      this._doAssets(storeRet) ;
      callback && callback(storeRet) ;
      return ;
    }

    let fn = ()=>{
      let post = {} ;
      for(let k in this.postKeyMap) post[this.postKeyMap[k]] = this._getPropsByK(k) ;

      //p是特殊的，因为会增长
      this.p && (post.p = this.p) ;

      this.loading = true ;
      global.v2iapi(this.apiPath,post,{
        succ:(ret)=>{
          global.storage.save({key:this.storageKey,id:this._getStorageId(),rawData:ret,expires:this.storageExpires}) ;
          this._doAssets(this._pushStoreList(ret)) ;

          this.p && this.p++ ;
        },
        ever:(js)=>{
          callback && callback(js) ;
          this.loading = false ;
        }
      }) ;
    } ;

    //return fn() ;
    if(this.useHttpFetch) return fn() ;

    //获取本地数据
    global.storage.sync[this.storageKey] = fn ;

    global.storage.load({
      key: this.storageKey ,
      id: this._getStorageId(),
      autoSync: true,
      syncInBackground: false,
    }).then( ret => {
      this.loading = false ;
      callback && callback(ret) ;

      this._doAssets(this._pushStoreList(ret)) ;
      this.p && this.p++ ;
    }).catch( err => {
      this.loading = false ;
      callback && callback() ;

      fn() ;
    }) ;
  }

  _doReset(){
    if(this.postKeyMap.p) this.p = this.props.p ? this.props.p : 1 ;

    this.list = [] ;
    this.storeList = { p:1 , psum:2 , list:[] , sum:0 } ;
  }

  _doAssets(js) {
    let newState = {} ;
    newState.didMount = true ;

    this.list = this.list.concat(js.list) ;
    newState.dataSource = this.state.dataSource.cloneWithRows(this.list) ;

    //当前页码小于总页码
    if(js.p < js.psum*1) newState.noMore = false  ;
    else newState.noMore = true ;

    //还有库存
    this.storeList.list.length > 0 && (newState.noMore = false) ;

    //总数为0
    if(typeof js.sum != 'undefined' && (js.sum == '0' || !js.sum)) newState.noMore = true ;

    //将总数也存起来吧
    newState.sum = js.sum ;

    !this.unmount && this.setState(newState) ;
  }

  _onEndReached(){
    if(!this.props.loadMore) return null ;
    if(!this.state.noMore) this._fetch();
    return null ;
  }

  //只用于listview的footer
  _renderFooter() {
    if(!this.props.loadMore) return null ;

    //还有数据
    if(!this.state.noMore) return this._getLoadingView({flex:1}) ;

    //还有库存
    if(this.storeList.list.length > 0) return this._getLoadingView({flex:1}) ;

    //
    if(!this.thatsAllText) return null ;

    return this._getNoMoreText(this.thatsAllText) ;
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

  renderEmptyDataSourceView(){
    if(!this.emptyDataSourceText) return <View />
    return (<View style={[styles.spinner,this.styleEmptyView]}><Text allowFontScaling={false} style={{color:'#ccc'}}>{this.emptyDataSourceText}</Text></View>) ;
  }

  //修理数据
  fixAssets(ret){
    return ret ;
  }

  mapDataSource(fn){
    let allRowIDs = this.state.dataSource.rowIdentities ;
    let ret = [] ;
    for (let sectionIdx = 0; sectionIdx < allRowIDs.length; sectionIdx++) {
      let rowIDs = allRowIDs[sectionIdx];
      if(rowIDs.length < 1) continue ;

      for (let rowIdx = 0; rowIdx < rowIDs.length; rowIdx++) {
          let rowData = this.state.dataSource.getRowData(sectionIdx, rowIdx) ;
          fn && ret.push(fn(rowData, sectionIdx, rowIdx)) ;
      }
    }
    return ret ;
  }

  renderRow(item, sectionID, rowID){
    let props = this.itemComponentProps ;
    props.navigator = this.props.navigator ;
    props.rowID = rowID ;
    props.sectionID = sectionID ;

    props.key = item[this.itemComponentKey] ;
    props[this.itemComponentDataName] = item ;

    return (<this.itemComponent {...props} />) ;
  }

  //普通循环列表
  renderCList(){
    //没有列表
    let tpls = this.mapDataSource((rowData, sectionIdx, rowIdx)=>this.renderRow(rowData, sectionIdx, rowIdx)) ;
    if(tpls.length < 1) return this.renderEmptyDataSourceView() ;

    const header = this.props.renderHeader ? this.props.renderHeader() : (this.renderHeader ? this.renderHeader.bind(this)() : null) ;
    const footer = this.props.renderFooter ? this.props.renderFooter() : (this.renderFooter ? this.renderFooter.bind(this)() : null) ;

    let style = [this.style] ;
    this.props.style && style.push(this.props.style) ;

    let ctpl = <View style={style} {...this.props}>{tpls}</View> ;
    if(!header && !footer) return ctpl ;

    return <View>{header}{ctpl}{footer}</View>;
  }

  render(){
    //还没开始
    if(!this.state.didMount) return this._getLoadingView({flex:1}) ;

    //使用普通循环列表
    if(!this.props.loadMore) return this.renderCList() ;

    let style = [this.style] ;
    this.props.style && style.push(this.props.style) ;

    const header = this.props.renderHeader ? this.props.renderHeader : (this.renderHeader ? this.renderHeader.bind(this) : null) ;
    const footer = this.props.renderFooter ? this.props.renderFooter : (this.renderFooter ? this.renderFooter.bind(this) : this._renderFooter.bind(this)) ;

    return (
			<ListView
        ref={view=>this.view=view}
        scrollsToTop={this.props.scrollsToTop}
        enableEmptySections={true}
        removeClippedSubviews={true}
        dataSource={this.state.dataSource}
        renderRow={this.renderRow.bind(this)}
        renderFooter={footer}
        renderHeader={header}
        onEndReached={this._onEndReached.bind(this)}
        contentContainerStyle={style}
        onEndReachedThreshold={220}

        pageSize={this.pageSize}

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
    flexDirection:'row',
  }
}) ;
