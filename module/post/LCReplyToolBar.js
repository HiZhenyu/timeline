import React, {
  Component
} from 'react';
import {
  StyleSheet,
  View,
  Image,
  TextInput,
  Text,
  TouchableHighlight,
  Modal,
  TouchableWithoutFeedback,
  ScrollView,
} from 'react-native';

import KeyboardSpacer from 'react-native-keyboard-spacer' ;
import LCPhotoSelector from './LCPhotoSelector' ;
import LCEmotionSelector from './LCEmotionSelector' ;
import * as Animatable from 'react-native-animatable' ;

import LCIconTextBtn from './../pub/LCIconTextBtn' ;
import LCLoading from './../pub/LCLoading' ;
import LCMFavorite from './../op/LCMFavorite' ;

export default class LCReplyToolBar extends Component {
  static defaultProps = {
    hidden : false ,
    sum : 0 ,
  } ;

  constructor(props) {
    super(props);
    this.state = {
      emtionShown:false ,
      keyboardShown:false,
      inToolbarShown:true ,
      photoSelectorShow:false,
      sum:this.props.sum,
      userIdea:'',
      hidden:this.props.hidden,
      submiting:false ,
      doUpdate:false,
    };

    //post data.
    this.post = {} ;
    this.photos = [] ;

    this.post.timeline_id = this.props.timelineId ;
  }

  componentWillReceiveProps(nextProps){
    if(!this.props.doUpdate && nextProps.doUpdate) this.setState({doUpdate:true},nextProps.updateCallback ? nextProps.updateCallback:null) ;
  }

  //键盘出现或者隐藏
  _onKeyBoardToggle(keyboardShown){
    if(keyboardShown != this.state.keyboardShown) this.setState({keyboardShown}) ;
  }

  //点了开始的bar
  _onPressIntoolBar(){
    let inToolbarShown = !this.state.inToolbarShown ;
    this.setState({inToolbarShown}) ;
  }

  //点了图片按钮（去选择照片或者拍照）
  _onPressToSelectPhoto(){
    this.refs.photoSelector.showSelects() ;
  }

  //成功选择了照片
  _onPhotoSuccSelected(photos){
    this.photos = photos ;
    photoSelectorShow = photos.length > 0 ;

    if(photoSelectorShow != this.state.photoSelectorShow) this.setState({photoSelectorShow}) ;
  }

  //删了照片
  _onPhotoRemoved(photos){
    return this._onPhotoSuccSelected(photos) ;
  }

  //键盘聚焦
  _onFocusTextArea(){
    this.setState({emtionShown:false}) ;
  }

  //键盘失去焦点
  _onBlurTextArea(){

  }

  //按了表情按钮
  _onPressToEmtion(){
    if(!this.refs.textarea.isFocused()){
      this.setState({emtionShown:true}) ;
      return ;
    }

    this._onBlurTextArea = ()=>{
        setTimeout(()=>{
          this.setState({emtionShown:true}) ;
        },200) ;
        this._onBlurTextArea = ()=>{} ;
    } ;

    //隐藏键盘
    this.refs.textarea.blur() ;
  }

  //表情回调
  _onEmtionSelected(emword){
    this.setState({userIdea:this.state.userIdea+'['+emword+']'})
  }

  //正式的回复框升上来
  _onAnimationEndReplyBox(){
    this.refs.textarea.focus() ;

  }

  //点了别个地方
  _onPressOtherPlace(){
    if(!this.state.inToolbarShown) this.setState({inToolbarShown:true}) ;
  }

  //提交数据
  _submit(){
    let online = global.getOnline() ;
    if(!online.uid){
      global.toLogin() ;
      return false ;
    }

    //详情
    this.post.content = this.state.userIdea ;
    if(!this.post.content || this.post.content == ''){
      global.tip('请说点什么吧.') ;
      return  ;
    }

    while(this.post.reply_uid && this.replyComment){
      if(this.post.content.indexOf(this.replyComment.user.name) > -1) break ;
      this.post.comment_id = 0 ;
      this.post.reply_uid = 0 ;
      break ;
    }

    this.photos.map((it,i)=>{
      this.post['imgs['+i+']'] = {
        type: 'image/jpeg',
        name: 'image_'+i+'.jpg',
        uri: it.image.uri ,
      } ;
    }) ;

    this.setState({submiting:true}) ;
    this.refs.loading.show() ;
    global.v2iapi('reply/upd',this.post,{
      succ:(js)=>{
        let msg = '回复成功！' ;
        if(js.score) msg = '恭喜你回复成功，并获得' + js.score + '金币' ;

        global.tip(msg) ;

        if(this.props.onSucc){
          let comment = {} ;
          comment.id = js.id ;
          comment.content = this.post.content ;
          comment.create_time = '刚刚' ;
          comment.user = online ;
          if(this.replyComment && this.replyComment.user) comment.reply_user = this.replyComment.user ;

          comment.images = {} ;
          comment.images.sum = this.photos.length ;
          comment.images.list = this.photos.map(it=>it.image) ;

          this.props.onSucc(comment) ;
        }
        this.reclear() ;
      },
      ever:()=>{
        this.refs.loading.hide() ;
      }
    }) ;
  }

  //清理
  reclear(){
    let newState = {
      emtionShown:false ,
      keyboardShown:false,
      inToolbarShown:true ,
      photoSelectorShow:false,
      sum:this.state.sum+1,
      userIdea:'',
      submiting:false,
    } ;
    this.photos = [] ;
    this.post = {} ;

    this.replyComment = {} ;
    this.setState(newState) ;
  }

  _onLayoutWrapView(){
    if(this.didUpdateCallback){
      this.didUpdateCallback() ;
      delete this.didUpdateCallback ;
    }
  }

  //- 显示
  show(cb){
    cb && (this.didUpdateCallback = cb) ;
    this.setState({hidden:false}) ;
  }

  //- 回复别人
  reply(comment){
    let newState = {} ;
    newState.userIdea = '回复' + comment.user.name + '：' ;
    newState.inToolbarShown = false ;

    this.setState(newState) ;

    this.post.comment_id = comment.id ;
    this.post.reply_uid = comment.user.uid ;

    this.replyComment = comment ;
  }

  //- 打开回复
  focus(){
    this._onPressIntoolBar() ;
  }


  render() {
    if(this.state.hidden) return null ;
    let sum = this.state.sum ;

    let toolbar = null ;

    if(!this.state.inToolbarShown){
      //选择照片组件
      let photoSelectorTpl = <LCPhotoSelector
        ref="photoSelector"
        hidden={!this.state.photoSelectorShow}
        onSelected={this._onPhotoSuccSelected.bind(this)}
        onRemoved={this._onPhotoRemoved.bind(this)}
        photos={this.photos}
        navigator={this.props.navigator} /> ;

      //选择表情
      let emtionSelectorTpl = null ;
      if(this.state.emtionShown){
          emtionSelectorTpl = <Animatable.View animation="fadeInUp" duration={300}>
            <LCEmotionSelector onSelected={this._onEmtionSelected.bind(this)} />
          </Animatable.View> ;
      }

      let phIconColor = '#ccc' ;
      let emIconColor = '#ccc' ;

      let styleSubmitBtn = null ;
      if(this.state.submiting) styleSubmitBtn = {backgroundColor:'#ccc'} ;

      if(this.state.emtionShown) emIconColor = '#ff6600' ;

      toolbar = <Modal transparent={true}>
        <TouchableWithoutFeedback onPress={this._onPressOtherPlace.bind(this)} style={styles.replyBoxFix}><View style={styles.flex}></View></TouchableWithoutFeedback>
        <Animatable.View animation="fadeInUp" duration={200} onAnimationEnd={this._onAnimationEndReplyBox.bind(this)} style={styles.replyBox}>
          <TextInput
            onChangeText={userIdea=>this.setState({userIdea})}
            value={this.state.userIdea}
            onBlur={this._onBlurTextArea.bind(this)}
            onFocus={this._onFocusTextArea.bind(this)}
            ref="textarea"
            multiline={true}
            style={styles.textarea}
            placeholder="说两句" />

          <View style={styles.replayTool}>
            <View style={styles.replayToolL}>
              <LCIconTextBtn name="照片" iconColor={phIconColor} iconName="photo" onPress={this._onPressToSelectPhoto.bind(this)} />
              <LCIconTextBtn name="表情" iconColor={emIconColor} iconName="smile-o" onPress={this._onPressToEmtion.bind(this)} style={{marginLeft:10}} />
            </View>

            <TouchableHighlight style={[styles.replayToolSubmitBtn,styleSubmitBtn]} underlayColor="#ccc" onPress={this._submit.bind(this)}>
              <Text style={styles.replayToolSubmitText} allowFontScaling={false}>发表回复</Text>
            </TouchableHighlight>
          </View>
          {emtionSelectorTpl}
          {photoSelectorTpl}

          <KeyboardSpacer onToggle={this._onKeyBoardToggle.bind(this)} />
        </Animatable.View>
        <LCLoading useModal={false} ref="loading" />
      </Modal> ;
    }else{
      toolbar = <View style={styles.intoolbar}>
        <View style={styles.intoolbarC}>
          <LCMFavorite doUpdate={this.state.doUpdate} updateCallback={()=>this.setState({doUpdate:false})} timelineId={this.props.timelineId} />
        </View>
        <TouchableHighlight onPress={this._onPressIntoolBar.bind(this)} style={styles.intoolbarInBtn} underlayColor="transparent">
          <View style={styles.intoolbarIn}>
            <Text style={styles.intoolbarLText} allowFontScaling={false}>回复楼主</Text>
            <Text style={styles.intoolbarRText} allowFontScaling={false}>共有{sum}条回复</Text>
          </View>
        </TouchableHighlight>
      </View> ;
    }

    return <View style={styles.wrap} onLayout={this._onLayoutWrapView.bind(this)}>
        {toolbar}
    </View>
  }
}

const styles = StyleSheet.create({
  flex:{
    flex:1,
  },
  wrap:{
    backgroundColor:'transparent',
    flex:1,
  },

  replyBox:{
    backgroundColor:'#efefef',
    padding:10,
    paddingLeft:0,
    paddingRight:0,
    borderTopWidth:1,
    borderTopColor:'#ccc',
  },

  replyBoxFix:{
    flex:1,
    backgroundColor:'transparent',
  },

  intoolbar:{
    flexDirection:'row',
    justifyContent:'space-between',
    alignItems:'center',
    borderTopWidth:1,
    borderTopColor:'#ccc',
  },
  intoolbarC:{
    flexDirection:'row',
    paddingLeft:10,
  },
  intoolbarBtn:{
    flex:1,
    alignItems:'center',
    justifyContent:'center',
  },
  intoolbarBtnImage:{
    width:25,
    height:25,
  },
  intoolbarInBtn:{
    flex:1,
  },
  intoolbarIn:{
    height:35,
    backgroundColor:'#fff',
    borderWidth:1,
    borderColor:'#ccc',
    margin:10,
    padding:4,
    borderRadius:4,
    flex:1,
    flexDirection:'row',
    justifyContent:'space-between',
    alignItems:'center',
  },
  intoolbarLText:{
    color:'#ccc',
  },
  intoolbarRText:{
    color:'#eee',
    fontSize:12,
  },
  textarea:{
    height:60,
    backgroundColor:'#fff',
    borderWidth:1,
    borderColor:'#ccc',
    padding:4,
    borderRadius:4,
    marginLeft:10,
    marginRight:10,
    fontSize:16,
  },

  replayTool:{
    flexDirection:'row',
    paddingTop:10,
    marginLeft:10,
    marginRight:10,
  },
  replayToolL:{
    flex:1,
    flexDirection:'row',
  },
  replayToolSubmitBtn:{
    backgroundColor:'#ff6600',
    borderRadius:3,
    width:80,
    height:30,
    alignItems:'center',
    justifyContent:'center',
  },
  replayToolSubmitText:{
    fontSize:14,
    color:'#fff',
  },


});
