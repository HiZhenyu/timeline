import React, {
  Component,
  StyleSheet,
  TouchableHighlight ,
  View,
  Text,
  Image
} from 'react-native';


export default class LCOnlineSP extends Component {

  constructor(props) {
    super(props) ;

    this.state = {
      online : global.getOnline()
    } ;

    this.storageKey = 'onlinedetail' ;
    this.storageExpires = 3600*1000 ;
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
    return this.state.online.uid ;
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
  _fetch(callback,clear){
    if(this.loading) return false ;

    var post = {} ;

    this.loading = true ;
    global.v2iapi('online/detail',post,{
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
    var newState = {online:js.online} ;

    if(!this.unmount) this.setState(newState) ;
  }

  render(){
    var online = this.state.online ;
    if(online.icon) online.icon = global.getUploadURL(online.icon) ;
    if(!online.level) online.level = {id:1,lv:1,name:'江小白'} ;

    return (
      <View>
        <View style={styles.top}>
          <Image style={styles.topImg} source={require('./../../images/home_topbg.png')}>
            <View style={styles.settingIcon}>
              <Image source={require('./../../images/icon_setting.png')} style={styles.settingIconImg} />
              <Text style={styles.settingIconText} allowFontScaling={false}>设置</Text>
            </View>

            <View style={styles.user}>
              <View style={styles.userIcon}><Image style={styles.userIconImg} source={{uri:online.icon}} /></View>
              <View style={styles.userName}><Text style={styles.userNameText} allowFontScaling={false}>{online.name}</Text></View>
              <View style={styles.userStar}>
                <Image source={global.getUserLvIcon(online.level)} style={styles.userStarImg} />
                <Text style={styles.userStarText} allowFontScaling={false}>LV{online.level.lv} {online.level.name}</Text>
              </View>
            </View>

            <View style={styles.tip}><Text style={styles.tipText} allowFontScaling={false}>今天还没有纪录机友生活，不要偷懒哦~</Text></View>

          </Image>
        </View>
        <View style={styles.udin}>
          <TouchableHighlight underlayColor="#fff" style={[styles.udinItem,styles.udinSign]} onPress={()=> {console.log('1');}}>
            <View>
              <View style={styles.udinCn}><Image source={require('./../../images/icon_sign.png')} style={styles.udinImg} /></View>
              <View style={styles.udinCn}><Text allowFontScaling={false} style={styles.udinText}>签到 0</Text></View>
            </View>
          </TouchableHighlight>
          <TouchableHighlight underlayColor="#fff" style={[styles.udinItem]}>
            <View>
              <View style={styles.udinCn}><Image source={require('./../../images/icon_follow.png')} style={styles.udinImg} /></View>
              <View style={styles.udinCn}><Text allowFontScaling={false} style={styles.udinText}>关注 0</Text></View>
            </View>
          </TouchableHighlight>
          <TouchableHighlight underlayColor="#fff" style={[styles.udinItem]}>
            <View>
              <View style={styles.udinCn}><Image source={require('./../../images/icon_fans.png')} style={styles.udinImg} /></View>
              <View style={styles.udinCn}><Text allowFontScaling={false} style={styles.udinText}>粉丝 0</Text></View>
            </View>
          </TouchableHighlight>
          <TouchableHighlight underlayColor="#fff" style={[styles.udinItem]}>
            <View>
              <View style={styles.udinCn}><Image source={require('./../../images/icon_coin.png')} style={styles.udinImg} /></View>
              <View style={styles.udinCn}><Text allowFontScaling={false} style={styles.udinText}>金币 {online.score}</Text></View>
            </View>
          </TouchableHighlight>
        </View>
      </View>
    ) ;
  }
}


const PWidth = React.Dimensions.get('window').width ;
const styles = StyleSheet.create({
    top:{
      backgroundColor:'#ff6600',
      paddingTop:280,
      marginTop:-250,
    } ,
    topImg:{
      paddingBottom:15,
      paddingTop:15,
      alignItems:'center',
      width:PWidth,
    },
    userIcon:{
      alignItems:'center'
    },
    userIconImg:{
      width:80,
      height:80,
      borderRadius:40,
      resizeMode:'cover',
    },
    userName:{
      height:30,
      alignItems:'center',
      paddingTop:10,
    },
    userNameText:{
      height:20,
      overflow:'hidden',
      textAlign:'center',
      color:'#fff',
      fontSize:15
    },
    settingIcon:{
      position:'absolute',
      top:0,
      right:10,
      flexDirection:'row',
      alignItems:'flex-end'
    },
    settingIconImg:{
      width:18,
      height:18,
      tintColor:'#fff',
      marginRight:3,
    },
    settingIconText:{
      height:18,
      lineHeight:17,
      fontSize:16,
      color:'#fff',
      textAlign:'right'
    },
    userStar:{
      marginTop:10,
      width:90,
      height:20,
      borderRadius:6,
      borderColor:'yellow',
      borderWidth:1,
      alignItems:'center',
      paddingTop:2,
      paddingBottom:2,
    },
    userStarImg:{
      width:20,
      height:20,
      position:'absolute',
      top:-8,
      left:-8,
    },
    userStarText:{
      color:'yellow',
      fontSize:12,
      backgroundColor:'transparent',
    },
    tip:{
      marginTop:20,
    },
    tipText:{
      fontSize:13,
      backgroundColor:'transparent',
      color:'#eee'
    },
    udin:{
      flexDirection:'row',
      borderBottomWidth:1,
      borderBottomColor:'#ccc',
      backgroundColor:'#fff'
    },
    udinItem:{
      flex:1,
      borderLeftWidth:1,
      borderLeftColor:'#ccc',
      paddingTop:10,
      paddingBottom:10,
    },
    udinSign:{
      borderLeftWidth:0
    },
    udinCn:{
      alignItems:'center',
    },
    udinImg:{
      width:32,
      height:27,
    },
    udinText:{
      paddingTop:10,
      color:'#555',
      fontSize:13
    }
  }) ;
