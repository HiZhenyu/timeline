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

//修改密码
export default class MyPasswdPage extends Component {
  constructor(props) {
    super(props) ;

    this.state = {
      passwd:'',
      oldPasswd:'',
      againPasswd:'',
      submitXing:false
    } ;
  }

  componentWillUnmount(){
    if(this.smsCaptchaInterval) clearInterval(this.smsCaptchaInterval) ;
    if(this.timer) clearTimeout(this.timer) ;
  }

  //成功
  _onSubmit(){
    if(this.state.submitXing) return ;

    var post = {} ;
    post.passwd = this.state.passwd ;
    post.oldpasswd = this.state.oldPasswd ;

    if(!post.passwd) return global.tip('请填写新的密码！') ;
    if(!post.oldpasswd) return global.tip('请填写原密码！') ;

    if(post.passwd != this.state.againPasswd) return global.tip('两次密码输入不一致') ;

    this.setState({submitXing:true}) ;
    global.v2iapi('user/passwd',post,{
      succ:(js)=>{
        global.tip('恭喜！设置密码成功!') ;
        this.timer = setTimeout(()=>{
          this.props.navigator.pop() ;
        },1000) ;
      } ,
      ever:(js)=>{
        this.setState({submitXing:false}) ;
      }
    }) ;
  }

  render(){
    return <ScrollView style={[styles.backgroundGray]}>

      <View style={styles.form}>
        <View style={[styles.formItem]}>
          <Text allowFontScaling={false} style={styles.label}>原密码</Text>
          <TextInput style={[styles.input]} value={this.state.oldPasswd} onChangeText={(text) => this.setState({oldPasswd:text})} secureTextEntry={true} clearButtonMode='while-editing' placeholder="请输入您的登录密码" />
        </View>

        <View style={[styles.formItem,styles.formItemLine]}>
          <Text allowFontScaling={false} style={styles.label}>新的密码</Text>
          <TextInput style={[styles.input]} value={this.state.passwd} onChangeText={(text) => this.setState({passwd:text})} secureTextEntry={true} clearButtonMode='while-editing' placeholder="请输入新的密码" />
        </View>

        <View style={[styles.formItem,styles.formItemLine]}>
          <Text allowFontScaling={false} style={styles.label}>重复密码</Text>
          <TextInput style={[styles.input]} value={this.state.againPasswd} onChangeText={(text) => this.setState({againPasswd:text})} secureTextEntry={true} clearButtonMode='while-editing' placeholder="请重复输入新的密码" />
        </View>
      </View>

      <TouchableHighlight style={styles.btnSubmit} underlayColor='#ccc' onPress={this._onSubmit.bind(this)}>
        <View>
          <Text style={styles.btnSubmitText} allowFontScaling={false}>重置登录密码</Text>
        </View>
      </TouchableHighlight>


    </ScrollView> ;
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
}) ;
