import React, {
  Component,
  StyleSheet,
  View ,
  Text ,
} from 'react-native';

import GiftedSpinner from 'react-native-gifted-spinner' ;

export default class LCDetail extends Component {

  constructor(props) {
    super(props) ;

    //1、主体key，如传入了 timeline
    this.itemKey = '' ;

    //2、主键字段
    this.itemIdKey = 'id' ;

    //3、接口路径
    this.apiPath = '' ;

    //4、通过http获取到的主体下标，通常会等于 itemKey ，如不传入，则为data本身
    this.dataItemKey = '' ;

    //5、其他post参数
    this.otherPosts = {} ;

    //6、缓存时间
    this.storageExpires = 3600 * 1000 ;

    //7、
    this.storageKey = '' ;

    //8、发送给http的post 主键子段，默认 = itemIdKey
    this.itemPostIdKey = '' ;

    this.state = {
      didMount : false ,
    }

    //存储数据
    this.dData = {} ;
  }

  componentWillReceiveProps(nextProps){
    if(!this.props.doUpdate && nextProps.doUpdate) this._doUpdate(nextProps.updateCallback ? nextProps.updateCallback:null) ;
  }

  componentDidMount() {
    !this.dataItemKey && (this.dataItemKey = this.itemKey) ;

    //缓存key
    !this.storageKey && (this.storageKey = this.itemKey) ;

    //不缓存
    !this.storageExpires && (this.useHttpFetch = true) ;

    //发送给 post 的主键
    !this.itemPostIdKey && (this.itemPostIdKey = this.itemIdKey) ;

    //赋予初始值
    if(this.props[this.itemKey]){
      let aobj = {} ;
      aobj[this.dataItemKey] = this.props[this.itemKey] ;

      this._doAssets(aobj) ;
    }

    return this._doMount(this.props.initedCallback ? this.props.initedCallback:null) ;
  }

  componentWillUnmount() {
    this.unmount = true ;
  }

  //默认执行方法
  _doMount(callback){
    return this._fetch(callback) ;
  }

  //更新方法
  _doUpdate(callback){
    //清空缓存
    global.storage.remove({
      key : this.storageKey ,
      id : this._getStorageId(),
    });

    //使用远程数据
    this.useHttpFetch = true ;

    this._doMount(callback) ;
  }

  _getStorageId(){
    return this.dData[this.itemIdKey] ;
  }

  _fetch(callback){
    if(this.loading) return false ;

    let fn = ()=>{
      var post = {} ;
      post[this.itemPostIdKey] = this._getStorageId() ;

      //其他参数
      Object.keys(this.otherPosts).map(it=>post[it]=this.otherPosts[it]) ;

      this.loading = true ;
      global.v2iapi(this.apiPath,post,{
        succ:(js)=>{
          this._doAssets(js) ;
          global.storage.save({key:this.storageKey,id:this._getStorageId(),rawData:js,expires:this.storageExpires}) ;
        },
        ever:(js)=>{
          callback && callback(js) ;
          this.loading = false ;
        }
      }) ;
    } ;

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

      this._doAssets(ret) ;
    }).catch( err => {
      this.loading = false ;
      callback && callback() ;

      fn() ;
    }) ;

  }

  _doAssets(js) {
    this.dData = js[this.dataItemKey];

    var newState = {} ;
    newState.didMount = true ;
    newState[this.itemKey] = this.dData ;

    !this.unmount && this.setState(newState) ;
  }

  _getLoadingView(style){
    return (<View style={[styles.spinner,style]}><GiftedSpinner /><Text style={{textAlign:'center'}} allowFontScaling={false}>正在加载...</Text></View>) ;
  }

  renderDetail(){
    return <View /> ;
  }

  //请自行补充完整
  render(){
    //还没开始
    if(!this.state.didMount) return this._getLoadingView({flex:1}) ;


    return this.renderDetail() ;
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
