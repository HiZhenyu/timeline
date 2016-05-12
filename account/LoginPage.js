import React,{ Component } from 'react' ;
import {
  StyleSheet,
  TouchableHighlight ,
  View,
  Text,
  Image,
  ScrollView,
  TextInput,
  Navigator
} from 'react-native';

import { Navigation } from 'react-native-navigation';

export default class LoginPageIn extends Component {
  constructor(props) {
    super(props) ;
    this.state = {
      uname : '',
      passwd:'',
      submitXing:false
    } ;

    if(this.props.navigator) this.props.navigator.setOnNavigatorEvent(this._onNavigatorEvent.bind(this));
  }

  static navigatorButtons= {
    leftButtons:[
      {
        title:'关闭',
        id:'id.account.close'
      }
    ],
    rightButtons: [
      {
        title: '注册',
        id: 'id.account.register',
      }
    ]
  } ;

  _onNavigatorEvent(event) {
    if (event.type == 'NavBarButtonPress') {
      if (event.id == 'id.account.close') {
        Navigation.dismissModal({
          animationType: 'slide-down',
          navigatorStyle:{
            statusBarHidden: true,
          }
        });
        return ;
      }

      if (event.id == 'id.account.register') {
        this._pressToRegister() ;
        return ;
      }

      return ;
    }
  }

  _pressToRegister(){
    this.props.navigator.push({
      screen: 'account.RegisterPage',
      passProps: {},
      animated: true,
      title: '注册',
      backButtonTitle: '登录',
      backButtonHidden: false,
      navigatorStyle: {
        tabBarHidden: true,
        navBarBackgroundColor: '#f9f9f9',
        navBarBackgroundColor: '#f9f9f9',
        navBarButtonColor: '#555',
      },
      navigatorButtons: {}
    }) ;
  }

  _pressToPassword(){
    this.props.navigator.push({
      screen: 'account.PasswordPage',
      passProps: {},
      animated: true,
      title: '重设密码',
      backButtonTitle: '登录',
      backButtonHidden: false,
      navigatorStyle: {
        tabBarHidden: true,
        navBarBackgroundColor: '#f9f9f9',
        navBarBackgroundColor: '#f9f9f9',
        navBarButtonColor: '#555',
      },
      navigatorButtons: {}
    }) ;
  }

  _submit(){
    if(this.state.submitXing) return ;

    var post = {} ;
    post.uname = this.state.uname ;
    post.passwd = this.state.passwd ;

    if(!post.uname)  return global.tip('请填写您的手机号码！') ;
    if(!post.passwd) return global.tip('请填写您的登录密码！') ;

    this.setState({submitXing:true}) ;
    global.v2iapi('account/login',post,{
      succ:(js)=>{
        if(js.skey){
          global.onlineKey = js.key ;
          storage.save({key: 'onlineKey',rawData: js.skey , expires: null }) ;
        }

        if(js.online){
            global.online = js.online ;
            storage.save({key: 'online',rawData: js.online , expires: null }) ;
        }

        global.tip('登录成功',{hidden:()=>{
          Navigation.dismissModal({
            animationType: 'slide-down',
            navigatorStyle:{
              statusBarHidden: true,
            }
          });
          return ;
        }}) ;
      } ,
      ever:(js)=>{
        (!js || js.code != '200') && this.setState({submitXing:false}) ;
      }
    }) ;
  }

  render(){
    var submitBtnStyle = [styles.btnSubmit] ;
    if(this.state.submitXing) submitBtnStyle.push(styles.btnSubmitIng) ;

    return (
      <View style={{flex:1}}>
        <ScrollView style={[styles.backgroundGray]}>

          <View style={styles.form}>
            <View style={styles.formItem}>
              <Text allowFontScaling={false} style={styles.label}>手机号码</Text>
              <TextInput style={[styles.input]} value={this.state.uname} keyboardType='phone-pad' onChangeText={(text) => this.setState({uname:text})} autoFocus={true} clearButtonMode='while-editing' placeholder="请输入您注册时的手机号" />
            </View>

            <View style={[styles.formItem,styles.formItemLine]}>
              <Text allowFontScaling={false} style={styles.label}>登录密码</Text>
              <TextInput style={[styles.input]} value={this.state.passwd} onChangeText={(text) => this.setState({passwd:text})} secureTextEntry={true} clearButtonMode='while-editing' placeholder="请输入您的登录密码" />
            </View>
          </View>

          <TouchableHighlight style={submitBtnStyle} disabled={this.state.submitXing} underlayColor='#ccc' onPress={this._submit.bind(this)}>
            <View>
              <Text style={[styles.btnSubmitText]} allowFontScaling={false}>立即登录</Text>
            </View>
          </TouchableHighlight>

          <View style={styles.tips}>
            <View style={styles.tipsl}>
              <Text style={styles.tipsText} allowFontScaling={false}>还没有帐号？<Text onPress={this._pressToRegister.bind(this)} style={styles.tipsa} allowFontScaling={false}>点击注册</Text></Text>
            </View>
            <View style={styles.tipsr}>
              <Text style={styles.tipsText} allowFontScaling={false}><Text onPress={this._pressToPassword.bind(this)} style={styles.tipsa} allowFontScaling={false}>忘记密码？</Text></Text>
            </View>
          </View>

        </ScrollView>
      </View>
    ) ;
  }
}

const styles = StyleSheet.create({
  backgroundGray:{
    backgroundColor:'#efefef'
  } ,
  input:{
    height:35,
    flex:1,
    fontSize:14,
  } ,
  form:{
    marginTop:40,
    marginLeft:25,
    marginRight:25,
    borderWidth:1,
    borderColor:'#ccc',
    borderRadius:5,
    backgroundColor:'#fff'
  },
  formItem:{
    flexDirection:'row',
    padding:5,
  },
  formItemLine:{
    borderTopWidth:1,
    borderTopColor:'#ccc'
  },
  label:{
      paddingLeft:10,
      width:90,
      color:'#333',
      height:30,
      lineHeight:23,
      fontSize:14,
  },
  btnSubmit:{
    marginTop:50,
    backgroundColor:'#ff6600',
    height:35,
    borderRadius:3,
    marginLeft:40,
    marginRight:40,
    padding:3,
  },
  btnSubmitIng:{
    backgroundColor:'#ccc'
  },
  btnSubmitText:{
    color:'#fff',
    lineHeight:21,
    height:31,
    fontSize:14,
    textAlign:'center'
  },
  tips:{
    flexDirection:'row',
    marginTop:20,
    marginLeft:40,
    marginRight:40,
  },
  tipsl:{
    alignSelf:'flex-start',
    flex:1
  },
  tipsr:{
    alignSelf:'flex-end',
  },
  tipsa:{
    color:'#0000EE',
  },
  tipsText:{
    fontSize:14,
    height:30,
    lineHeight:20
  }
}) ;
