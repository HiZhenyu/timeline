import React,{ Component } from 'react' ;
import {
  StyleSheet,
  TouchableHighlight ,
  View,
  Text,
  Image
} from 'react-native';


export default class LCUser extends Component {
  constructor(props) {
    super(props) ;
    this.state = {
      user: this.props.user
    } ;
  }

  componentWillReceiveProps(nextProps){
    let ouser = this.state.user ;
    let nuser = nextProps.user ;

    if(ouser.uid != nuser.uid || ouser.name != nuser.name || ouser.icon.indexOf(nuser.icon) == -1){
      this.setState({user:nextProps.user}) ;
    }
  }

  _onPress(){
    if(!this.props.navigator) return ;
    if(!this.state.user || !this.state.user.uid || this.state.user.uid == '0') return ;

    let props = {user:this.state.user} ;
    
    this.props.navigator.push({
      screen: 'user.UserHomePage',
      passProps: props,
      title: props.user.name ,
      backButtonTitle: '返回',
      navigatorStyle: {
        tabBarHidden: true,
      } ,
    });

    return ;
  }

  render(){
    let user = this.state.user ;
    if(user.icon) user.icon = global.getUploadURL(user.icon) ;

    //style 1 : 用于timeline展示的
    if(this.props.styleId == 1){
      let style = [styles.user1] ;
      if(this.props.style) style.push(this.props.style) ;

      let userNameStyle = [styles.usernameText] ;
      if(this.props.userNameStyle) userNameStyle.push(this.props.userNameStyle) ;

      let userTextTpl = this.props.hiddenName ? null : <Text style={userNameStyle} onPress={this._onPress.bind(this)} allowFontScaling={false}>{user.name}</Text> ;
      return (
        <View style={style}>
          <TouchableHighlight underlayColor="#ccc" style={styles.usericonBtn} onPress={this._onPress.bind(this)}>
            <Image style={styles.usericon} source={{uri:user.icon}} />
          </TouchableHighlight>
          {userTextTpl}
        </View>
      ) ;
    }

    var style = [styles.user2Text] ;
    if(this.props.style) style.push(this.props.style) ;

    return (
      <Text style={style} onPress={this._onPress.bind(this)} allowFontScaling={false}>{user.name}</Text>
    ) ;
  }
}

const styles = StyleSheet.create({
  user1:{
    flexDirection:'row',
  } ,
  user2Text:{
    color:'#0049bb',
    fontSize:14,
  } ,
  usericon:{
    width:44,
    height:44,
    borderRadius:22,
    resizeMode:'cover',
  } ,
  usericonBtn:{
    width:44,
    height:44,
    borderRadius:22,
  } ,
  usernameText:{
    marginLeft:8,
    marginTop:10,
    color:'#516783',
    fontWeight:'bold',
    fontSize:16,
  } ,

}) ;
