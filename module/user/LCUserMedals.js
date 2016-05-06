import React, {
  Component,
  StyleSheet,
  TouchableHighlight ,
  View,
  Text,
} from 'react-native';

import LCMedalItem from './../medal/LCMedalItem' ;
import GiftedSpinner from 'react-native-gifted-spinner' ;


export default class LCUserMedals extends Component {
  static defaultProps = {
    uid: {},
  } ;

  constructor(props) {
    super(props) ;

    this.didMount = false ;

		this.state = {
      list:[]
		};

    this.storageKey = 'usermedals' ;
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
    if(!this.props.uid) return null ;
    return this._fetchDefault() ;
  }

  _getStorageId(){
    return this.props.uid ;
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
    post.uid = this.props.uid ;

    this.loading = true ;
    global.v2iapi('user','medals',post,{
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

	render() {
    if(!this.didMount) return (<View style={styles.spinner}><GiftedSpinner /><Text>正在加载...</Text></View>) ;
    if(this.state.list.length < 1) return <View style={styles.spinner}><Text>暂时没有获得任何勋章...</Text></View>

    var tpls = [] ;
    for(var i=0;i<this.state.list.length;i++){
      var medal = this.state.list[i] ;
      tpls.push(<LCMedalItem navigator={this.props.navigator} medal={medal} key={medal.id} />) ;
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
});
