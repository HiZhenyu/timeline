import React, {
  Component,
  StyleSheet,
  TouchableHighlight ,
  View,
  Text,
} from 'react-native';

import LCCatItem from './../cat/LCCatItem' ;
import GiftedSpinner from 'react-native-gifted-spinner' ;


export default class LCUserCats extends Component {
  static defaultProps = {
    uid: 0,
  } ;

  constructor(props) {
    super(props) ;

    this.didMount = false ;

		this.state = {
      list:[]
		};

    this.uid = props.uid ;
    if(!this.uid || props.uid == '0') this.uid = 0 ;

    this.storageKey = 'usercats' ;
    this.storageExpires = 86400*1000 ;
  }

  componentWillReceiveProps(nextProps){
    if(!this.props.doUpdate && nextProps.doUpdate) this._fetch(nextProps.updateCallback ? nextProps.updateCallback:null) ;
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
    if(!this.uid) return null ;
    return this._fetchDefault() ;
  }

  _getStorageId(){
    return this.uid ;
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

    if(!this.uid){
      if(callback) callback() ;
      return ;
    }

    var post = {} ;
    post.uid = this.props.uid ;

    this.loading = true ;
    global.v2iapi('user','cats',post,{
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
    var newState = {} ;
    newState.list = js.list ;

    this.didMount = true ;
    if(!this.unmount) this.setState(newState) ;
  }

  _noLoginView(){
    return <View style={styles.noLogin}><Text allowFontScaling={false}>更多精彩，请登录到机友会</Text></View> ;
  }

	render() {
    if(!this.uid) return this._noLoginView() ;

    if(!this.didMount) return (<View style={styles.spinner}><GiftedSpinner /><Text allowFontScaling={false}>正在加载...</Text></View>) ;
    if(this.state.list.length < 1) return <View style={styles.spinner}><Text allowFontScaling={false}>暂时没有加入任何机友会...</Text></View>

    var tpls = [] ;
    for(var i=0;i<this.state.list.length;i++){
      var cat = this.state.list[i] ;
      var borderStyle = i%4 == 3 ? {borderRightWidth:0} : {} ;
      tpls.push(<LCCatItem navigator={this.props.navigator} cat={cat} style={borderStyle} uid={this.props.uid} key={cat.id} styleId={1} />) ;
    }

		return <View style={styles.hlist}>{tpls}</View>
	}
}

var styles = StyleSheet.create({
  hlist:{
    flex:1,
		justifyContent: 'flex-start',
		flexDirection: 'row',
		flexWrap: 'wrap',
		alignItems: 'center',
    backgroundColor: '#fff'
	},
  spinner:{
    height:50,
    alignItems:'center',
    justifyContent:'center',
    flexDirection:'row',
    backgroundColor:'#fff'
  },
  noLogin:{
    backgroundColor:'#fff',
    padding:10,
    alignItems:'center',
  }
});
