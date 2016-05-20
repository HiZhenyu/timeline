import React,{ Component } from 'react' ;
import {
  StyleSheet,
  TouchableHighlight ,
  View,
  Text,
  Image,
  Dimensions
} from 'react-native';

import LCMFollow from './../op/LCMFollow' ;
import LCDetail from './../LCDetail' ;

export default class LCUserBigSP extends LCDetail {

  constructor(props) {
    super(props) ;

    this.itemKey = 'user' ;
    this.itemIdKey = 'uid' ;

    this.apiPath = 'user/detail' ;
  }

  renderDetail(){
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
              uid={user.uid}
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

const PWidth = Dimensions.get('window').width ;
const styles = StyleSheet.create({
  topImage:{
    resizeMode:'cover',
    height:PWidth*2/3,
  },
  user:{
    flexDirection:'row',
    position:'absolute',
    top:PWidth*2/3-68,
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
