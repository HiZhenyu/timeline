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


/**
 * 热门机友会，获取热门机友会
 */
export default class LCCatHots extends Component {
  static defaultProps = {
    mkind:8,
    msubject:8,
    location:8,
  } ;

  constructor(props) {
    super(props) ;

		this.state = {
      list:[],
      didMount:false,
		};

    this.storageKey = 'cathotlist' ;
    this.storageExpires = 0 ;
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
    for(var k in LCCatHots.defaultProps) keys.push(this.props[k]) ;

    return keys.join('-') ;
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

      this._doAssets(ret) ;
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

    var post = {} ;
    post.mkind = this.props.mkind ;
    post.msubject = this.props.msubject ;
    post.location = this.props.location ;

    this.loading = true ;
    global.v2iapi('cat','hot',post,{
      succ:(ret)=>{
        this._doAssets(ret) ;
        global.storage.save({key:this.storageKey,id:this._getStorageId(),rawData:ret,expires:this.storageExpires}) ;
      },
      ever:(js)=>{
        if(callback) callback(js) ;
        this.loading = false ;
      }
    }) ;
  }

  _doAssets(js) {
    var newState = {} ;
    newState.list = js ;
    newState.didMount = true ;
    if(!this.unmount) this.setState(newState) ;
  }

  _renderRow(item, sectionID, rowID){
    return (<LCCatItem key={item.id} style={[styles.catItem]} cat={item} {...this.props.itemCatProps} />) ;
  }

  _getLoadingView(style){
    return (<View style={[styles.spinner,style]}><GiftedSpinner /><Text style={{textAlign:'center'}} allowFontScaling={false}>正在加载...</Text></View>) ;
  }

  _getNoMoreText(title){
      return (<View style={styles.spinner}><Text allowFontScaling={false} style={{color:'#ccc'}}>{title}</Text></View>) ;
  }

  render(){
    //还没开始
    if(!this.state.didMount) return this._getLoadingView({flex:1}) ;

    //没有列表
    //if(this.state.list.length < 1) return this._getNoMoreText('没有任何机友会') ;

    let tpls = [] ;
    for(let k in this.state.list){
      let itemList = this.state.list[k] ;

      let header = this.props[k+'Header'] ? this.props[k+'Header'] : null ;
      let footer = this.props[k+'Footer'] ? this.props[k+'Footer'] : null ;

      let groupStyle = [styles.catGourp] ;
      if(this.props.groupStyle) groupStyle.push(this.props.groupStyle) ;

      tpls.push(<View key={k}>{header}<View style={groupStyle}>{itemList.map(aitem=>this._renderRow(aitem))}</View>{footer}</View>) ;
    }

    let style = [styles.flex] ;
    if(this.props.style) style.push(this.props.style) ;

    return <View style={style}>{tpls}</View> ;
  }

}

const styles = StyleSheet.create({
  flex:{
    flex:1,
  },
  spinner:{
    height:50,
    alignItems:'center',
    justifyContent:'center',
    flexDirection:'row'
  },
  catItem:{
    marginBottom:10,
  },
  catGourp:{

  }
}) ;
