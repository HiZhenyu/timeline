import React,{ Component } from 'react' ;
import {
  StyleSheet,
  TouchableHighlight ,
  View,
  Text,
  Image
} from 'react-native';

import GiftedSpinner from 'react-native-gifted-spinner' ;

import LCCatSignBtn from './LCCatSignBtn' ;
import LCCatJoinBtn from './LCCatJoinBtn' ;

export default class LCCatSP extends Component {
  constructor(props) {
    super(props) ;

    this.didMount = false ;
		this.state = {
      cat:this.props.cat
		};

    this.storageKey = 'catdetail' ;
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
    if(!this.props.cat.id) return null ;
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
    post.id = this.state.cat.id ;

    this.loading = true ;
    global.v2iapi('cat/detail',post,{
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
    newState.cat = js.cat ;

    this.didMount = true ;
    if(!this.unmount) this.setState(newState) ;
  }

	render() {
    var cat = this.state.cat ;
    if(!cat.icon) cat.icon = 'upfs/201511/12/f_1447322833751985.png' ;
    if(!cat.user) cat.user = {} ;

    cat.icon = global.getUploadURL(cat.icon) ;

		return (
      <View>
        <View style={styles.top}>
          <Image style={styles.icon} source={{uri:cat.icon}} />
          <View style={styles.topinf}>
            <View style={styles.topinfin}>
              <View style={styles.catTitle}>
                <Text style={styles.catTitleText} allowFontScaling={false}>会长：{cat.user.name}</Text>
              </View>

              <Text style={styles.topinfText} allowFontScaling={false}>
                热度 <Text style={styles.textColor} allowFontScaling={false}>{cat.score}  </Text>
                帖子 <Text style={styles.textColor} allowFontScaling={false}>{cat.isum_timeline} </Text>
              </Text>
            </View>
            <View style={styles.ops}>
              <LCCatSignBtn navigator={this.props.navigator} style={styles.opsBtnl} cat={this.state.cat} />
              <LCCatJoinBtn navigator={this.props.navigator} style={styles.opsBtnr} cat={this.state.cat} />
            </View>
          </View>
        </View>

        <View style={styles.intro}>
          <Text style={styles.introText} allowFontScaling={false}>
            <Text style={styles.introTitleText} allowFontScaling={false}>本会简介：</Text>
            {cat.intro}
          </Text>
        </View>
      </View>
    ) ;
	}

}

var styles = StyleSheet.create({
  top:{
    padding:10,
    flexDirection:'row',
    backgroundColor:'#fff',
  },
  icon:{
    width:100,
    height:100,
    borderRadius:5,
  },
  topinf:{
    flex:1,
    paddingLeft:10,
  },
  textColor:{
    color:'#ff6600',
  },
  catTitle:{
    paddingTop:5,
    paddingBottom:5,
  },
  catTitleText:{
    fontSize:16,
    backgroundColor:'transparent',
  },
  topinfin:{
    flex:1,
  },
  topinfText:{
    fontSize:14,
    backgroundColor:'transparent',
    paddingTop:5,
  },

  ops:{
    flexDirection:'row',
    height:28,
  },

  opsBtnr:{
    marginLeft:5,
  },
  opsBtnl:{
    marginRight:5,
  },

  intro:{
    padding:10,
    backgroundColor:'#fff',
    borderTopColor:'#eee',
    borderTopWidth:1,
  },
  introTitleText:{
    fontSize:18,
  },
  introText:{
    paddingTop:5,
    fontSize:16,
  },
});
