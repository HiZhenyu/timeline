import React, {
  Component,
  StyleSheet,
  TouchableHighlight ,
  View,
  Text,
  Image
} from 'react-native';


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

    console.log(shopItem);

    let style = [styles.wrap] ;
    if(this.props.style) style.push(this.props.style) ;

    return (
      <View style={style}>

      </View>
    ) ;
  }
}

const styles = StyleSheet.create({
  wrap:{
    backgroundColor:'#fff',
  },
}) ;
