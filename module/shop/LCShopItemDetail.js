import React,{ Component } from 'react' ;
import {
  StyleSheet,
  TouchableHighlight ,
  View,
  Dimensions,
  Text,
  Image
} from 'react-native';

import LCTitle from './../pub/LCTitle' ;

export default class LCTimelineDetail extends Component {

  constructor(props) {
    super(props) ;

    this.state = {
      shopItem : props.shopItem ? props.shopItem : {}
    } ;

    this.storageKey = 'shopitemdetail' ;
    this.storageExpires = 86400*1000 ;
  }

  componentWillReceiveProps(nextProps){
    if(!this.props.doUpdate && nextProps.doUpdate) this._fetch(nextProps.updateCallback ? nextProps.updateCallback:null,true) ;
    if(this.props.holdOn && !nextProps.holdOn) return this._doMount() ;
  }

  componentDidMount() {
    if(this.props.holdOn) return null ;
    return this._doMount() ;
  }

  componentWillUnmount() {
    this.unmount = true ;
  }

  _doMount(){
    return this._fetchDefault() ;
  }

  _getStorageId(){
    return this.state.shopItem.id ;
  }

  //获取初始状态的
  _fetchDefault(callback){
    if(this.loading) return false ;
    this.loading = true ;

    global.storage.sync[this.storageKey] = ((params)=>{
      this.loading = false ;
      this._fetch(callback) ;
    }).bind(this) ;

    global.storage.load({
        key: this.storageKey ,
        id:this._getStorageId(),
        autoSync: true,
        syncInBackground: false,
    }).then( ret => {
      this._doAssets(ret) ;
      this.loading = false ;
      if(callback) callback(ret) ;
    }).catch( err => {
        this.loading = false ;

        //没读取到
        this._fetch(callback) ;
    }) ;

    return true;
  }

  //通过远程接口获取
  _fetch(callback){
    if(this.loading) return false ;

    var post = {} ;
    post.id = this.state.shopItem.id ;

    this.loading = true ;
    global.v2iapi('shop/itemdetail',post,{
      succ:(js)=>{
        this._doAssets(js) ;
        global.storage.save({key:this.storageKey,id:this._getStorageId(),rawData:js,expires:this.storageExpires}) ;
      },
      ever:(js)=>{
        if(callback) callback(js) ;
        this.loading = false ;
      }
    }) ;
  }

  _doAssets(js) {
    var newState = {shopItem:js.item} ;

    if(!this.unmount) this.setState(newState) ;
  }

  render(){
    let shopItem = this.state.shopItem ;

    let style = [styles.wrap] ;
    if(this.props.style) style.push(this.props.style) ;

//  //<View style={styles.tit}><Text style={styles.titText} allowFontScaling={false}>{shopItem.name}</Text></View>

    return (
      <View style={style}>
        <View style={styles.icon}><Image style={styles.image} source={{uri:global.getUploadURL(shopItem.icon)}} /></View>
        <View style={styles.param}>
            <View style={styles.infLeft}>
                <View style={styles.paramKey}><Text style={style.paramKeyText} allowFontScaling={false}>金币:</Text></View>
                <View style={style.paramVal}><Text style={style.paramValText,{color:'#f60'}} allowFontScaling={false}>{shopItem.score}</Text></View>
            </View>
            <View style={styles.infRight}>
                <View style={styles.paramKey}><Text style={style.paramKeyText} allowFontScaling={false}>{'库存:'}</Text></View>
                <View style={style.paramVal}><Text style={style.paramValText,{color:'#f60'}} allowFontScaling={false}>{shopItem.num}</Text></View>
            </View>
        </View>
        <LCTitle title={'商品详情'} />
        <View style={styles.intro}><Text allowFontScaling={false}>{shopItem.info}</Text></View>
      </View>) ;
  }
}

const PWidth = Dimensions.get('window').width;
const styles = StyleSheet.create({
  wrap:{

  },
  icon:{
    height:PWidth-150,
    alignItems:'center',
    backgroundColor:'#fff',
  },
  image:{
    height:PWidth-150,
    width:PWidth-150,
  },
  tit:{
    height:30,
    width:PWidth,
    paddingLeft:10,
    backgroundColor:'#fff',
  },
  titText:{
    height:30,
    lineHeight:25,
    fontSize:18,
    fontWeight:'bold',

  },
  param:{
    height:30,
    flexDirection:'row',
    padding:10,
    paddingTop:5,
    backgroundColor:'#fff',
  },
  infLeft:{
    width:PWidth/2,
    flexDirection:'row',
  },
  infRight:{
    flex:1,
    flexDirection:'row',
  },
  paramKey:{
    width:40,
    height:20,
  },
  paramKeyText:{
    height:20,
    lineHeight:20,
    fontSize:14,
    color:'#555',
  },
  paramVal:{

  },
  paramValText:{
    fontSize:14,
    fontWeight:'bold',
  },
  intro:{
    padding:10,
    backgroundColor:'#fff',
  }
}) ;
