import React,{ Component } from 'react' ;
import {
  StyleSheet,
  TouchableHighlight ,
  View,
  Text,
  Image,
  ScrollView,
  TextInput,
} from 'react-native';

//设置手机号（用户名）
export default class UnameResetPage extends Component {
  constructor(props) {
    super(props) ;

    this.state = {
      smscaptcha : '',
      uname : '',
      passwd:'',
      smscaptchaText:'获取验证码',
      smsCaptchaXing:false,
      submitXing:false
    } ;
  }

  componentWillUnmount(){
    if(this.smsCaptchaInterval) clearInterval(this.smsCaptchaInterval) ;
    if(this.timer) clearTimeout(this.timer) ;
  }

  //获取验证码
  _presssToSmsCaptcha(){
    if(this.state.smsCaptchaXing) return ;
    var post = {} ;
    post.phone = this.state.uname ;
    post.to = 'passwd' ;

    if(!post.phone){
      global.tip('请输入您的手机号') ;
      return ;
    }

    var maxSecond = 60 ;
    var doa = ()=>{
      this.setState({smscaptchaText:maxSecond+'秒可发送',smsCaptchaXing:true}) ;
      maxSecond-- ;
      if(maxSecond < 1){
        this.setState({smscaptchaText:'获取验证码',smsCaptchaXing:false}) ;
        clearInterval(this.smsCaptchaInterval) ;
      }
    } ;

    this.setState({smsCaptchaXing:true}) ;
    v2iapi('account/smscaptcha',post,{
      succ:(js)=>{
          global.tip('验证码已发送到您的手机') ;
          this.smsCaptchaInterval = setInterval(doa,1000) ;
          doa() ;
      },
      ever:()=>{
        this.setState({smscaptchaText:'获取验证码',smsCaptchaXing:false}) ;
      }
    }) ;
  }

  _onSubmit(){
    if(this.state.submitXing) return ;

    var post = {} ;
    post.uname = this.state.uname ;
    post.passwd = this.state.passwd ;
    post.smscaptcha = this.state.smscaptcha ;

    if(!post.uname)  return global.tip('请填写您的手机号码！') ;
    if(!post.smscaptcha)  return global.tip('请填写手机验证码！') ;
    if(!post.passwd) return global.tip('请填写您的登录密码！') ;

    this.setState({submitXing:true}) ;
    global.v2iapi('user/resetuname',post,{
      succ:(js)=>{
        global.tip('恭喜！设置密码成功!') ;
        this.timer = setTimeout(()=>{
          this.props.navigator.pop() ;
        },1000) ;
      } ,
      ever:(js)=>{
        this.setState({submitXing:false}) ;
        if(js && js.code && js.code == '203'){
          global.setOnline({uname:js.data.uname}) ;
          this.timer = setTimeout(()=>{
            this.props.navigator.pop() ;
          },1000) ;
        }
      }
    }) ;
  }


  render(){
    return (
      <ScrollView style={[styles.backgroundGray]}>

        <View style={styles.form}>
          <View style={[styles.formItem]}>
            <Text allowFontScaling={false} style={styles.label}>手机号码</Text>
            <TextInput style={[styles.input]} value={this.state.uname} onChangeText={(text) => this.setState({uname:text})} clearButtonMode='while-editing' placeholder="输入您的手机号" keyboardType="numeric" />
          </View>

          <View style={[styles.formItem,styles.formItemLine]}>
            <Text allowFontScaling={false} style={styles.label}>短信验证码</Text>
            <TextInput style={[styles.input]} value={this.state.smscaptcha} onChangeText={(text) => this.setState({smscaptcha:text})} clearButtonMode='while-editing' keyboardType="numeric" placeholder="短信验证码" />
            <TouchableHighlight underlayColor='#ccc' style={styles.smscaptchaBtn} disabled={this.state.smsCaptchaXing} onPress={this._presssToSmsCaptcha.bind(this)}><Text style={styles.smscaptchaText} allowFontScaling={false}>{this.state.smscaptchaText}</Text></TouchableHighlight>
          </View>

          <View style={[styles.formItem,styles.formItemLine]}>
            <Text allowFontScaling={false} style={styles.label}>登录密码</Text>
            <TextInput style={[styles.input]} value={this.state.passwd} onChangeText={(text) => this.setState({passwd:text})} secureTextEntry={true} clearButtonMode='while-editing' placeholder="请输入您的登录密码" />
          </View>
        </View>

        <TouchableHighlight style={styles.btnSubmit} underlayColor='#ccc' onPress={this._onSubmit.bind(this)}>
          <View>
            <Text style={styles.btnSubmitText} allowFontScaling={false}>确认设置</Text>
          </View>
        </TouchableHighlight>

      </ScrollView>

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
    marginTop:20,
    marginLeft:20,
    marginRight:20,
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
    marginTop:30,
    backgroundColor:'#ff6600',
    height:35,
    borderRadius:3,
    marginLeft:40,
    marginRight:40,
    padding:5,
  },
  btnSubmitText:{
    color:'#fff',
    lineHeight:19,
    fontSize:14,
    textAlign:'center'
  },
  smscaptchaText:{
    lineHeight:26,
    height:40,
    fontSize:14,
    textAlign:'center',
  },
  smscaptchaBtn:{
    backgroundColor:'#eee',
    width:90,
    height:40,
    paddingLeft:5,
    paddingRight:5,
  },
}) ;
