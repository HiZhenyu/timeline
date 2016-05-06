import React, {
  Component,
  StyleSheet,
  TouchableHighlight ,
  View,
  ListView,
  Text,
} from 'react-native';

import GiftedSpinner from 'react-native-gifted-spinner' ;
import LCUser from './../user/LCUser' ;
import LCTitle from './../../module/pub/LCTitle' ;

export default class LCCatMmberList extends Component {

  static defaultProps = {
    itemProps: {},
    style: null,
    itemStyle: null ,
    cat:{id:0},
    ps:20,
  } ;


  constructor(props) {
    super(props) ;

    this.defaultResListSize = 10 ;
    this.resListSize = props.loadMore ? this.defaultResListSize : 0 ;

		this.state = {
      dataSource:new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2}),
      noMore:true,
      didMount:false,
      cat:this.props.cat ,
		};

    this.storageKey = 'catmembers' ;
    this.storageExpires = 1 * 3600 * 1000 ;

    this._doClear() ;
  }

  componentWillReceiveProps(nextProps){
    if(!this.props.doUpdate && nextProps.doUpdate) this._fetch(nextProps.updateCallback ? nextProps.updateCallback:null,true) ;
    if(this.props.holdOn && !nextProps.holdOn) return this._doMount() ;
  }

  componentDidMount() {
    if(this.props.list && this.props.list.length > 0){
      var newState = {} ;
      var initListSize = this.props.initListSize ? this.props.initListSize : this.defaultResListSize ;
      newState.dataSource = this.state.dataSource.cloneWithRows(this.props.list.slice(0,initListSize)) ;
      newState.didMount = true ;
      this.setState(newState) ;
    }

    return this._doMount() ;
  }


  componentWillUnmount() {
    this.unmount = true ;
  }

  _doMount(){
    return this._fetchDefault() ;
  }

  _getStorageId(){
    return this.state.cat.id ;
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
    if(clear) this._doClear() ;

    //获取到切割数据
    if(this._popResList(callback)) return ;

    var post = {} ;
    post.id = this.state.cat.id ;
    post.p = this.p++ ;
    post.ps = this.props.ps ;

    this.loading = true ;
    global.v2iapi('cat','members',post,{
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
    this.list = [] ;
    this.resList = {p:1,psum:2,list:[]} ;
  }

  _doAssets(js) {
    var newState = {} ;

    this.list = this.list.concat(js.list) ;
    newState.dataSource = this.state.dataSource.cloneWithRows(this.list) ;

    newState.didMount = true ;

    if(js.sum) newState.sum = js.sum ;

    //当前页小于
    if(js.p < js.psum*1) newState.noMore = false  ;
    else if(js.p >= js.psum) newState.noMore = true ;

    //reList
    if(this.resList.list.length > 0) newState.noMore = false ;

    if(!this.unmount) this.setState(newState) ;
  }

  _renderFooter() {
    if(!this.props.loadMore) return null ;
    if(!this.state.noMore || this.list.length < 1 || this.resList.list.length > 0) return this._getLoadingView({flex:1}) ;
    return this._getNoMoreText('以上就是全部机友') ;
  }

  _renderHeader(){
    return null ;

    let itemStyle = [styles.item,styles.itemTH] ;
    if(this.props.itemStyle) itemStyle.push(this.props.itemStyle) ;

    return (
      <View style={itemStyle}>
        <View style={styles.itemUser}><Text allowFontScaling={false}>机友</Text></View>
        <View style={styles.itemTime}><Text style={styles.itemTimeText} allowFontScaling={false}>加入时间</Text></View>
      </View>) ;
  }

  _onEndReached(){
    if(!this.props.loadMore) return null ;
    if(!this.state.noMore) this._fetch();
    return null ;
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

  _renderRow(item, sectionID, rowID){
    //使用简单样式
    if(this.props.itemStyleId == '1'){
      let itemStyle = [] ;
      if(this.props.itemStyle) itemStyle.push(this.props.itemStyle) ;
      return (<LCUser navigator={this.props.navigator} key={item.id} style={itemStyle} user={item.user} {...this.props.itemUserProps} />) ;
    }

    //使用完全样式
    let itemStyle = [styles.item] ;
    if(this.props.itemStyle) itemStyle.push(this.props.itemStyle) ;

    let tplChairman = item.chairman_title ? <View style={[styles.itemTitle,styles.itemTitleC]}><Text style={[styles.itemTitleText]} allowFontScaling={false}>{item.chairman_title}</Text></View> : null ;
    let tplTitle = item.title && item.title.name ? <View style={styles.itemTitle}><Text style={styles.itemTitleText} allowFontScaling={false}>{item.title.name}</Text></View> : null ;

    let tplTitles = tplChairman || tplTitle ?
      (<View style={styles.itemTitles}>
        {tplChairman}{tplTitle}
      </View>) : null ;

    return (
      <View style={itemStyle}>
        <LCUser navigator={this.props.navigator} key={item.id} style={styles.itemUser} user={item.user} {...this.props.itemUserProps} />
        <View style={styles.itemTime}><Text style={styles.itemTimeText} allowFontScaling={false}>{item.create_time}</Text></View>
        {tplTitles}
      </View>) ;
  }

  //普通循环列表
  renderCList(){
    //还没开始
    if(!this.state.didMount) return this._getLoadingView({flex:1}) ;

    //没有列表
    if(this.state.dataSource.length < 1) return this._getNoMoreText('居然没有任何机友！') ;

    let titleMemberSum = '本会机友' + (this.state.sum ? '(' + this.state.sum + ')' : '') ;

    const header = this.props.renderHeader ? this.props.renderHeader() : <LCTitle navigator={this.props.navigator} title={titleMemberSum} /> ;
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
      <View>
      {header}
      <View style={[this.props.style]}>
        {tpls}
      </View>
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
        renderHeader={this._renderHeader.bind(this)}
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
  item:{
    flexDirection:'row',
    alignItems:'center',
    padding:10,
    borderBottomWidth:1,
    borderBottomColor:'#eee',
    backgroundColor:'#fff',
  },
  itemTH:{
    backgroundColor:'#eee',
  },
  itemUser:{
    flex:1,
  },
  itemTime:{
    width:80,
  },
  itemTimeText:{
    textAlign:'center',
    fontSize:12,
  },
  itemTitles:{
    position:'absolute' ,
    bottom:10,
    left:63,
    flexDirection:'row',
  },
  itemTitle:{
    backgroundColor:'#FFC107',
    marginRight:5,
    padding:2,
    height:16,
    borderWidth:0,
    borderColor:'#FFC107',
    borderRadius:3,
  },
  itemTitleC:{
    backgroundColor:'#ff6600',
  },
  itemTitleText:{
    color:'#fff',
    fontSize:12,
  }

}) ;
