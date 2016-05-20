import React,{ Component } from 'react' ;
import {
  StyleSheet,
  View,
  Text,
  ScrollView,
  Image,
} from 'react-native';

import LCPhotoSelector from './../module/post/LCPhotoSelector' ;
import LCSline from './../module/pub/LCSline' ;
import LCLoading from './../module/pub/LCLoading' ;
import LCPicker from './../module/pub/LCPicker' ;
import LCAreaPicker from './../module/pub/LCAreaPicker' ;

export default class MySettingPage extends Component {
  constructor(props) {
    super(props) ;

    let online = global.getOnline() ;
    this.state = {
      online : online ,
      loading: false,
    } ;

    this.jobPickerData = [{
      seleced : online.job ? online.job.id : '1' ,
      options : {
        '2' : '机主',
        '3' : '机手',
        '4' : '厂家人员',
        '5' : '代理商',
        '6' : '维修技师',
        '7' : '零配件销售',
        '99' : '工程机械其他人员'
      } ,
    }] ;

  }

  //换头像
  _onPressChangeIcon(){
    this.refs.photoSelector.showSelects() ;
    return ;
  }

  //选择系统头像
  _onPressToSelectJiyouhuiUserIcon(){
    global.onJiyouhuiUserIconSucc = this._onSelectedJiyouhuiUserIcon.bind(this) ;
    this.props.navigator.showModal({
      screen: 'my.JiyouhuiUserIconPage',
      passProps: {},
      title: '选择机友会的头像' ,
      navigatorStyle:{
        navBarBackgroundColor: '#f9f9f9',
        navBarButtonColor: '#555',
      }
    });
  }

  //选择了用户头像
  _onSelectedUserIcon(photos){
    if(photos.length < 1) return ;

    let userIcon = photos[photos.length-1].image ;

    this.setState({userIcon:userIcon,loading:true}) ;
    global.v2iapi('user/icon',{icon:{type: 'image/jpeg',name: 'icon.jpg',uri: userIcon.uri}},{
      ever : ()=>{
        this.setState({loading:false}) ;
      }
    }) ;
  }


  //选择了机友会默认头像
  _onSelectedJiyouhuiUserIcon(icon){
    let online = this.state.online ;
    online.icon = icon ;

    global.setOnline(online) ;

    this.setState({online:online,loading:true,userIcon:null}) ;
    global.v2iapi('user/aset',{key:'icon',val:icon},{
      ever : ()=>{
        this.setState({loading:false}) ;
      }
    }) ;
  }

  //去一个文本框
  _onPressToInputView(theVal,inputProps){
    if(!inputProps) inputProps = {} ;
    global.onSettingInputSucc = this._onInputed.bind(this,theVal) ;
    this.props.navigator.showModal({
      screen: 'my.MySettingInputPage',
      passProps: {val:theVal.val,label:theVal.name,...inputProps},
      title: '请填写'+theVal.name ,
      navigatorStyle:{
        navBarBackgroundColor: '#f9f9f9',
        navBarButtonColor: '#555',
      }
    });
  }

  //修改密码去
  _onPressToPasswd(){

    //没有设置手机号
    if(!this.state.online.uname){
      this.props.navigator.push({
        screen: 'my.UnameResetPage',
        passProps: {},
        title: '设置手机号和登录密码',
        backButtonTitle:'返回'
      });
      return ;
    }

    this.props.navigator.push({
      screen: 'my.MyPasswdPage',
      passProps: {},
      title: '修改登录密码',
      backButtonTitle:'返回'
    });
  }

  //回调input
  _onInputed(theVal,val){
    let online = this.state.online ;
    online[theVal.key] = val ;

    global.setOnline(online) ;

    this.setState({online:online,loading:true}) ;
    global.v2iapi('user/aset',{key:theVal.key,val:val},{
      ever : ()=>{
        this.setState({loading:false}) ;
      }
    }) ;
  }

  _onPressToSelectJob(){
    this.refs.jobSelector.show() ;
  }

  _onPressToSelectArea(){
    this.refs.areaSelector.show() ;
  }

  _onSelectedJob(d){
    let jobName = '' ;
    let JobId = '' ;

    for(let k in d){
      jobId = k ;
      jobName = d[k] ;
      break ;
    }

    let online = this.state.online ;
    online.job = {id:jobId,name:jobName} ;

    global.setOnline(online) ;
    this.setState({online:online,loading:true}) ;
    global.v2iapi('user/aset',{key:'job',val:jobId},{
      ever : ()=>{
        this.setState({loading:false}) ;
      }
    }) ;
  }

  _onSelectedArea(provinceId,cityId,area){
    let online = this.state.online ;
    online.area = area ;
    online.province_id = provinceId ;
    online.city_id = cityId ;

    let area_ids = provinceId + ',' + cityId ;

    global.setOnline(online) ;
    this.setState({online:online,loading:true}) ;
    global.v2iapi('user/aset',{key:'area_id',val:area_ids},{
      ever : ()=>{
        this.setState({loading:false}) ;
      }
    }) ;
  }

  render(){
    let online = this.state.online ;
    online.icon && (online.icon = global.getUploadURL(online.icon)) ;

    let userIcon = <Image style={styles.userIcon} source={{uri:online.icon}} /> ;
    if(this.state.userIcon) userIcon = <Image style={styles.userIcon} source={this.state.userIcon} /> ;

    return (
      <ScrollView style={[styles.flex,styles.backgroundGray]}>
        <LCLoading visible={this.state.loading} />
        <LCPhotoSelector
          ref="photoSelector"
          hidden={true}
          maxSelectNum={1}
          customButtons={{
            'chooseIconFromJiyouhui':{
              title : '选择系统头像' ,
              onPress : this._onPressToSelectJiyouhuiUserIcon.bind(this),
            }
          }}
          allowsEditing={true}
          maxWidth={1024}
          maxHeight={1024}
          onSelected={this._onSelectedUserIcon.bind(this)}
          navigator={this.props.navigator} />

        <LCSline style={styles.mt10} lines={[
          {
            title:'头像',
            rightComponent: userIcon,
            onPress: this._onPressChangeIcon.bind(this)
          },
          {
            title:'昵称',
            rightText:online.name ,
            onPress: this._onPressToInputView.bind(this,{key:'name',name:'昵称',val:online.name},{}) ,
          },
          {
            title:'身份',
            rightText:online.job ? online.job.name : '请选择' ,
            rightComponent:null ,
            onPress: this._onPressToSelectJob.bind(this),
          }
        ]}/>

        <LCPicker ref="jobSelector"
          hidden={true}
          data={this.jobPickerData}
          onSelected={this._onSelectedJob.bind(this)} />

        <LCSline style={styles.mt10} lines={[
          {
            title:'个性签名',
            rightText:online.intro ,
            onPress: this._onPressToInputView.bind(this,
                {key:'intro',name:'个性签名',val:online.intro},
                {multiline:true,inputStyle:{height:60,padding:5,}}) ,
          }
        ]}/>

        <LCSline style={styles.mt10} lines={[
          {
            title:'QQ号',
            rightText:online.qq ,
            onPress: this._onPressToInputView.bind(this,{key:'qq',name:'QQ号码',val:online.qq},{keyboardType:'numeric'}) ,
          },
          {
            title:'微信',
            rightText:online.weixin ,
            onPress: this._onPressToInputView.bind(this,{key:'weixin',name:'微信号码',val:online.weixin},{}) ,
          },
          {
            title:'手机',
            rightText:online.mphone ,
            onPress: this._onPressToInputView.bind(this,{key:'mphone',name:'手机号码',val:online.mphone},{keyboardType:'numeric'}) ,
          },
        ]}/>

        <LCSline style={styles.mt10} lines={[
          {
            title:'所在地区',
            rightText:(online.area && online.area.name) ? online.area.name : '请选择' ,
            onPress: this._onPressToSelectArea.bind(this),
          },
        ]}/>

        <LCAreaPicker hidden={true}
          ref="areaSelector"
          provinceId={online.province_id}
          cityId={online.city_id}
          onSelected={this._onSelectedArea.bind(this)} />

        <LCSline style={styles.mt10} lines={[
          {
            title:'修改登录密码',
            onPress: this._onPressToPasswd.bind(this),
          },
        ]}/>

      </ScrollView>
    ) ;
  }
}

const styles = StyleSheet.create({
  backgroundGray:{
    backgroundColor:'#efefef'
  } ,
  flex:{
    flex:1,
  } ,
  mt10:{
    marginTop:10,
  },
  userIcon:{
    height:40,
    width:40,
    borderRadius:20,
  }
}) ;
