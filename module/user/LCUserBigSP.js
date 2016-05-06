import React, {
  Component,
  StyleSheet,
  TouchableHighlight ,
  View,
  Text,
  Image
} from 'react-native';

import LCMFollow from './../op/LCMFollow' ;

export default class LCUserBigSP extends Component {

  constructor(props) {
    super(props) ;

    this.state = {
      user : props.user ? props.user : {}
    } ;

    this.storageKey = 'userdetail' ;
    this.storageExpires = 86400*1000 ;
  }

  componentWillReceiveProps(nextProps){
    if(!this.props.doUpdate && nextProps.doUpdate){
      this.setState({doUserFollow:true}) ;
      this._fetch(nextProps.updateCallback ? nextProps.updateCallback:null,true) ;
    }
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
    return this.state.user.uid ;
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
    post.uid = this.state.user.uid ;

    this.loading = true ;
    global.v2iapi('user','detail',post,{
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
    var newState = {user:js.user} ;

    if(!this.unmount) this.setState(newState) ;
  }

  render(){
    var user = this.state.user ;
    if(user.icon) user.icon = global.getUploadURL(user.icon) ;
    if(!user.level) user.level = {} ;
    if(!user.intro) user.intro = '这个机友很懒，什么也没留下...' ;
    if(!user.homecover) user.homecover = 'http://img.lmjx.net/i/jiyouhui/images/010.jpg' ;
    else user.homecover = global.getUploadURL(user.homecover) ;

    return (
      <View>
        <Image source={{uri:user.homecover}} style={styles.topImage} />
        <View style={styles.userIntro}>
          <View style={styles.userIntroL}>
            <LCMFollow
              navigator={this.props.navigator}
              user={user}
              doUpdate={this.state.doUserFollow}
              updateCallback={(js)=>this.setState({doUserFollow:false})}
            />
          </View>
          <View style={styles.userIntroIn}>
            <Text style={styles.userIntroText} allowFontScaling={false} numberOfLines={2}>{user.intro}</Text>
          </View>
        </View>
        <View style={styles.user}>
          <Image source={{uri:user.icon}} style={styles.userIcon} />
          <View style={styles.userInf}>
            <View style={styles.userName}><Text style={styles.userNameText} allowFontScaling={false}>{user.name}</Text></View>
            <View style={styles.userScore}>
              <Image source={global.getUserLvIcon(user.level)} style={styles.userStarIcon} />
              <Text style={styles.userLvText} allowFontScaling={false}>LV{user.level.lv} {user.level.name}</Text>
              <Image source={require('./../../images/icon_gcoin.png')} style={styles.userScoreIcon} />
              <Text style={styles.userScoreText} allowFontScaling={false}>{user.score}</Text>
            </View>
          </View>
        </View>
      </View>
    ) ;
  }
}

const PWidth = React.Dimensions.get('window').width ;
const styles = StyleSheet.create({
  topImage:{
    resizeMode:'cover',
    height:PWidth*2/3,
  },
  user:{
    flexDirection:'row',
    position:'absolute',
    top:PWidth*2/3-65,
    paddingLeft:20,
  },
  userIcon:{
    width:80,
    height:80,
    borderRadius:40,
    marginTop:-20,
  },
  userInf:{
    paddingLeft:10,
  },
  userName:{

  },
  userScore:{
    flexDirection:'row',
    paddingTop:5,
  },
  userLvText:{
    color:'#fff',
    backgroundColor:'transparent',
    fontSize:14,
  },
  userScoreText:{
    color:'#fff',
    backgroundColor:'transparent',
    fontSize:14,
  },
  userStarIcon:{
    width:16,
    height:16,
  },
  userScoreIcon:{
    width:16,
    height:16,
    marginLeft:10,
  },
  userNameText:{
    backgroundColor:'transparent',
    color:'#fff',
    fontSize:16,
    fontWeight:'bold'
  },
  userIntro:{
    backgroundColor:'#fff',
    height:60,
    marginTop:-20,
    flexDirection:'row'
  },
  userIntroText:{
    paddingTop:10,
    fontSize:14,
    color:'#333',
  },
  userIntroIn:{
    flex:1,
    paddingLeft:10,
    paddingRight:10,
  },
  userIntroL:{
    alignItems:'center',
    justifyContent:'center',
    width:80,
    marginTop:10,
    marginLeft:20,
  }
}) ;
