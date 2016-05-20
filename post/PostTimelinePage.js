import React,{ Component } from 'react' ;
import {
  StyleSheet,
  View,
  Text,
  ScrollView,
  TextInput,
  Modal,
  TouchableWithoutFeedback,
} from 'react-native';

import KeyboardSpacer from 'react-native-keyboard-spacer' ;

import LCSline from './../module/pub/LCSline' ;
import LCIconTextBtn from './../module/pub/LCIconTextBtn' ;

import LCEmotionSelector from './../module/post/LCEmotionSelector' ;
import LCPhotoSelector from './../module/post/LCPhotoSelector' ;
import LCLoading from './../module/pub/LCLoading' ;

import { Navigation } from 'react-native-navigation';

import * as Animatable from 'react-native-animatable' ;

export default class PostTimelinePage extends Component {
  static navigatorButtons = {
    rightButtons: [
      {
        title: '发表',
        id: 'id.posttimeline.submit',
      }
    ],
    leftButtons: [
      {
        title: '取消',
        id: 'id.posttimeline.cancel',
      }
    ] ,
  };

  static defaultProps = {
    cat : {} ,
    timeline : {} ,
  } ;

  constructor(props) {
    super(props) ;
    this.state = {
      photos : [] , //上传的图片
      userIdea: '', //用户有什么想说的
      cat : this.props.cat , //选择发表到的机友会,
      keyboardShown : false,
      emShown : false ,
    } ;

    //最多可拍照的数量
    this.maxSelectNum = 9 ;
    this.props.navigator.setOnNavigatorEvent(this._onNavigatorEvent.bind(this));
  }


  _onNavigatorEvent(event) {
    if(event.type == 'NavBarButtonPress'){
      let fns = {
        'id.posttimeline.submit' : this._onSubmit.bind(this) ,
        'id.posttimeline.cancel' : this._onCancel.bind(this) ,
      }

      fns[event.id] && fns[event.id]() ;
    }
  }

  _onCancel(){
    global.onPostTimelineSucc && (delete global.onPostTimelineSucc) ;
    this.props.navigator.dismissModal() ;
  }

  _onSucc(timeline){
    this.props.navigator.dismissModal() ;

    //发表成功之后回调..
    if(!global.onPostTimelineSucc) return ;

    global.onPostTimelineSucc(timeline) ;
    delete global.onPostTimelineSucc ;

    return ;
  }

  //提交数据
  _onSubmit(){
    let post = {} ;
    post.content = this.state.userIdea ;
    post.cat_id = this.state.cat.id ;

    this.state.photos.map((it,i)=>{
      post['imgs['+i+']'] = {
        type: 'image/jpeg',
        name: 'image_'+i+'.jpg',
        uri: it.image.uri ,
      } ;
    }) ;

    //
    if((!post.content || post.content == '') && this.state.photos.length < 1){
      global.tip('有好的想法或者立即拍一张？') ;
      return  ;
    }

    //
    if(!post.cat_id){
      global.tip('请选择一个机友会再进行发表') ;
      return  ;
    }
    
    this.refs.loading.show() ;
    global.v2iapi('timeline/upd',post,{
      succ: (js)=>{
        let timeline = {} ;
        timeline.id = js.id ;
        timeline.title = post.content ;
        timeline.content = post.content ;
        timeline.cat = this.state.cat ;
        timeline.images = {} ;
        timeline.images.sum = this.state.photos.length ;
        timeline.images.list = this.state.photos.map(it=>it.image) ;

        this._onSucc(timeline) ;
      },
      ever: ()=>{
        this.refs.loading.hide() ;
      }
    }) ;
  }

  _onPressToSelectCat(){
    //先关闭表情
    if(this.state.emShown) this.setState({emShown:false}) ;

    //没办法了..按照global的方式去回调..
    global.onSelectedMyCat = this._onSelectedMyCat.bind(this) ;

    let props = {catId:this.state.cat.id} ;
    this.props.navigator.push({
      screen: 'post.SelectMyCatPage',
      passProps: props,
      title: '以下是您加入的机友会' ,
      backButtonTitle: '取消',
    });
  }

  _onSelectedMyCat(cat){
    this.setState({cat}) ;
  }

  //键盘出现或者隐藏
  _onKeyBoardToggle(keyboardShown){
    //显示键盘
    if(keyboardShown != this.state.keyboardShown) this.setState({keyboardShown}) ;
  }

  //显示表情
  _onPressShowEmtions(){
    //隐藏键盘
    this.textInputRef.blur() ;

    //显示表情组件
    this.setState({emShown:true}) ;
  }

  //关闭表情
  _onPressHideEmtions(showKeyboard){
    //关闭表情组件
    this.setState({emShown:false},()=>{
      showKeyboard && this.textInputRef.focus() ;
    }) ;
  }

  //
  _onResponderGrant(e){
    if(this.state.emShown) this.setState({emShown:false}) ;
  }

  //表情回调
  _onEmtionSelected(emword){
    this.setState({userIdea:this.state.userIdea+'['+emword+']'})
  }

  //成功选择了照片
  _onPhotoSuccSelected(photos){
    this.setState({photos}) ;
  }

  //删了照片
  _onPhotoRemoved(photos){
    return this._onPhotoSuccSelected(photos) ;
  }

  //点了其他地方
  _onPressOtherPlace(){
    this._onPressHideEmtions() ;
  }

  //其他可选项
  _renderSelectOthers(){
    let lines = [] ;
    if(!this.props.cat.id) lines.push({
      title:'选择一个机友会',
      icon:require('./../images/icon_fans.png'),
      onPress:this._onPressToSelectCat.bind(this),
      rightText:this.state.cat.name ,
    }) ;

    if(lines.length < 1) return null ;

    return <LCSline navigator={this.props.navigator} style={styles.mt10} lines={lines} />
  }

  render(){
    let addBtnTpl = null ;

    //表情工具栏
    let defaultKeyboardToolBar = (<View style={[styles.keyboradToolsLine]}>
        <LCIconTextBtn iconName="smile-o" onPress={this._onPressShowEmtions.bind(this)} />
      </View>) ;

    //表情选择
    let defaultEmtionSelTool = (<Modal transparent={true}>
      <TouchableWithoutFeedback onPress={this._onPressOtherPlace.bind(this)} style={styles.flex}><View style={styles.flex}></View></TouchableWithoutFeedback>
      <Animatable.View animation="fadeInUp" duration={300}>
      <View style={[styles.keyboradToolsLine]}>
        <LCIconTextBtn iconName="keyboard-o" onPress={this._onPressHideEmtions.bind(this,true)} />
        <LCIconTextBtn iconName="angle-down" onPress={this._onPressHideEmtions.bind(this,false)} />
      </View>
      <LCEmotionSelector onSelected={this._onEmtionSelected.bind(this)} />
      </Animatable.View>
    </Modal>) ;

    let keyboardToolBar = null ;
    let emtionSelTool = null ;

    //有键盘显示的时候
    if(this.state.keyboardShown) keyboardToolBar = defaultKeyboardToolBar ;
    if(this.state.emShown){
      keyboardToolBar = null ;
      emtionSelTool = defaultEmtionSelTool ;
    }

    let selOthersTpl = this._renderSelectOthers()  ;

    return (
      <View style={[styles.flex,styles.backgroundGray]}>

        <ScrollView onResponderGrant={this._onResponderGrant.bind(this)} style={styles.flex} keyboardDismissMode="on-drag">
            <View style={styles.postWrap}>
            <TextInput
              multiline={true}
              ref={ref=>this.textInputRef=ref}
              onChangeText={userIdea=>this.setState({userIdea})}
              onFocus={()=>this.setState({emShown:false})}
              value={this.state.userIdea}
              placeholder="这一刻有话说..."
              style={styles.textInput} />

              <LCPhotoSelector
                ref="photoSelector"
                onSelected={this._onPhotoSuccSelected.bind(this)}
                onRemoved={this._onPhotoRemoved.bind(this)}
                photos={this.photos}
                navigator={this.props.navigator} />
            </View>
            {selOthersTpl}
        </ScrollView>

        <LCLoading ref="loading" />
        {emtionSelTool}
        {keyboardToolBar}
        <KeyboardSpacer onToggle={this._onKeyBoardToggle.bind(this)} />
      </View>
    ) ;
  }
}


const styles = StyleSheet.create({
  flex:{
    flex:1,
  },

  backgroundGray:{
    backgroundColor:'#efefef',
  },

  backgroundWhite:{
    backgroundColor:'#fff',
  },

  mt10:{
    marginTop:10,
  },

  postWrap:{
    backgroundColor:'#fff',
    borderBottomColor:'#ddd',
    borderBottomWidth:1,
  },

  spinner:{
    alignItems:'center',
    justifyContent:'center',
    flexDirection:'row',
  },

  textInput:{
    margin:10 ,
    backgroundColor:'#fff',
    height:60,
    fontSize:15,
  },


  keyboradToolsLine:{
    borderTopWidth:1,
    borderTopColor:'#ddd',
    backgroundColor:'#fff',
    height:45,
    alignItems:'center',
    flexDirection:'row',
    overflow:'hidden' ,
    paddingLeft:10 ,
    justifyContent:'space-between',
  } ,

  keyboradEmtionIcon:{
    width: 25,
    height:25,
  } ,

  keyboradToolsLineText:{

  } ,

  keyboradToolsLineRight:{
    paddingRight:10,
  }

}) ;
