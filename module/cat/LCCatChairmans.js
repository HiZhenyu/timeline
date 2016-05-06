import React, {
  Component,
  StyleSheet,
  TouchableHighlight ,
  View,
  Text,
  Image,
} from 'react-native';


import GiftedSpinner from 'react-native-gifted-spinner' ;

import LCUser from './../user/LCUser' ;

export default class LCCatChairmans extends Component {
  static defaultProps = {
    cat: {} ,
  } ;

  constructor(props) {
    super(props) ;

    this.didMount = false ;

		this.state = {
      list:[]
		};

    this.storageKey = 'catchairmans' ;
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

  _doMount(){
    if(!this.props.cat.id) return ;
    return this._fetchDefault() ;
  }

  _getStorageId(){
    return this.props.cat.id ;
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

    var post = {} ;
    post.id = this.props.cat.id ;

    this.loading = true ;
    global.v2iapi('cat','chairmans',post,{
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
    this.setState(newState) ;
  }


  _getLoadingView(style){
    return (<View style={[styles.spinner,style]}><GiftedSpinner /><Text style={{textAlign:'center'}} allowFontScaling={false}>正在加载...</Text></View>) ;
  }


  _renderRow(item){
    return (<View style={styles.chairmanItem} key={item.id}>
      <LCUser style={styles.chairmanItemUser} hiddenName={true} styleId={1} user={item.user} />
      <Text style={styles.labelText} allowFontScaling={false}>{item.title}</Text>
      <Text style={styles.chairmanNameText} numberOfLines={1} allowFontScaling={false}>{item.user.name}</Text>
    </View>) ;
  }


  //处理申请副会长
  _onPressApply(){

  }

  //申请副会长
  _renderApplyItem(item){
    return (<TouchableHighlight underlayColor="#ccc" style={styles.chairmanItem} onPress={this._onPressApply.bind(this)} key={item.id}>
    <View style={styles.chairmanItem}>
      <Image source={item.icon} style={styles.itemApplyIcon} />
      <Text style={styles.labelText} allowFontScaling={false}>{item.title}</Text>
      <Text style={styles.chairmanNameText} numberOfLines={1} allowFontScaling={false}>{item.name}</Text>
    </View>
    </TouchableHighlight>) ;
  }

	render() {
    if(!this.didMount) return this._getLoadingView() ;

    let defaultEmptyItem = {
      title : '副会长空缺',
      icon : require('./../../images/icon_posempty.png'),
      name:'(点击申请)'
    } ;

    let tpls = this.state.list.map(item=>this._renderRow(item)) ;

    const maxChairmanSize = 3 ;
    if(this.state.list.length < maxChairmanSize){
      for(let i=this.state.list.length;i<maxChairmanSize;i++){
        var item = defaultEmptyItem ;
        item.id = i+1 ;
        tpls.push(this._renderApplyItem(item)) ;
      }
    }

    return (
      <View style={styles.chairmans}>
      {tpls}
      </View>
    ) ;
	}

}

var styles = StyleSheet.create({
  spinner:{
    height:50,
    alignItems:'center',
    justifyContent:'center',
    flexDirection:'row',
    backgroundColor:'#fff',
    flex:1,
  },
  chairmans:{
    padding:10,
    flexDirection:'row',
    backgroundColor:'#fff',
    flex:1,
  },
  chairmanItem:{
    alignItems:'center',
    flex:1,
  },
  chairmanItemUser:{
  },
  chairmanNameText:{
    fontSize:14,
  },
  labelText:{
    color:'#fff',
    backgroundColor:'#ff6600',
    fontSize:14,
    marginTop:5,
    marginBottom:5,
  },
  itemApplyIcon:{
    width:44,
    height:44,
  }
});
