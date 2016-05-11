import React, {
  Component,
  StyleSheet,
  TouchableOpacity ,
  View,
  Text,
  ScrollView,
  Image,
  CameraRoll,
  TextInput,
  TouchableHighlight
} from 'react-native';

import GiftedSpinner from 'react-native-gifted-spinner' ;
import * as Animatable from 'react-native-animatable' ;
import { Navigation } from 'react-native-navigation';


var ImagePickerManager = require('NativeModules').ImagePickerManager ;

export default class PostTimelinePage extends Component {
  static navigatorButtons = {
    rightButtons: [
      {
        title: '发表',
        id: 'id.cat.dopost'
      }
    ]
  };

  constructor(props) {
    super(props) ;
    this.state = {
      photos : [] ,
    } ;

    //最多可拍照的数量
    this.maxSelectNum = 9 ;
  }


  _doImagePicker(response){
    //清理
    !response.uri && global.onSuccPhoto && (delete global.onSuccPhoto) ;

    //用户取消
    if(response.didCancel) return ;

    //有错误
    if(response.error){
      global.tip('出错了：'+response.error) ;
      return ;
    }

    //按了自定义按钮
    if(response.customButton){
      if(response.customButton == 'selectFromLibrary')  this._onPressToSelectPhotos() ;

      return ;
    }

    response.data && (delete response.data) ;
    if(!global.onSuccPhoto) return ;

    //是从相册里选择的
    if(response.origURI){
      let photo = {image:response} ;
      photo.uri = response.origURI  ;
      global.onSuccPhoto('did',photo,global.onSuccPhoto('doing')) ;
      delete global.onSuccPhoto ;
      return ;
    }

    //先做一个
    let iPosition = global.onSuccPhoto('doing') ;

    //保存到相册
    CameraRoll.saveImageWithTag(response.uri)
      .then(ret=>{

        if(!global.onSuccPhoto) return ;

        let photo = {image:response} ;
        photo.image.uri = ret ;

        global.onSuccPhoto('did',photo,iPosition) ;
        delete global.onSuccPhoto ;
      })
      .catch(error=>{
        global.tip('出错了：'+response.error) ;
        global.onSuccPhoto('delete',{},iPosition) ;
      }) ;
  }

  _onPressTocamera(){
    //正在照片，请稍等
    if(this.photoing) return ;

    //只能按此方式回调...
    global.onSuccPhoto = this._onSuccPhoto.bind(this) ;

    let options = {
      title: '',
      cancelButtonTitle: '取消',
      takePhotoButtonTitle: '拍照',
      chooseFromLibraryButtonTitle: '选一张',
      customButtons: {
        '从手机相册里选择' : 'selectFromLibrary'
      },
      cameraType: '取消',
      mediaType: 'photo',
      videoQuality: 'high',
      durationLimit: 10,
      maxWidth: 1920,
      maxHeight: 1920,
      aspectX: 2,
      aspectY: 1,
      quality: 0.8,
      angle: 0,
      allowsEditing: false,
      noData: false,
      storageOptions: {
        skipBackup: true,
        path: 'images'
      }
    };


    ImagePickerManager.showImagePicker(options, (response)=>this._doImagePicker(response));
  }

  _onPressToSelectPhotos(){
    if(!this.props.navigator) return ;

    let props = {} ;

    //选中的数据
    props.selectedPhotos = this.state.photos.map(it=>it.image.uri) ;

    //最多可选择多少张照片
    props.maxSelectNum = this.maxSelectNum ;

    //没办法了..按照global的方式去回调..
    global.onSuccSelected = this._onSuccSelected.bind(this) ;

    this.props.navigator.push({
      screen: 'post.SelectPhotosPage',
      passProps: props,
      animated: true,
      title: '选择照片' ,
      backButtonTitle: '取消',
      backButtonHidden: false,
      navigatorStyle: {
        tabBarHidden: true,
        navBarBackgroundColor: '#f9f9f9',
        navBarBackgroundColor: '#f9f9f9',
        navBarButtonColor: '#555',
      },
      navigatorButtons: {}
    });
  }

  _getLoadingView(style,args){
    return (<View style={[styles.spinner,style]} {...args}><GiftedSpinner /><Text style={{textAlign:'center'}} allowFontScaling={false}>正在加载...</Text></View>) ;
  }


  //成功拍照
  _onSuccPhoto(dstatus,photo,iPosition){
    //拍照要存照片，比较慢，先占个位置
    if(dstatus == 'doing'){
      let thePosition = this.state.photos.length ;

      this.state.photos.push({doing:true}) ;
      this.setState({photos:this.state.photos}) ;

      this.photoing = true ;
      return thePosition ;
    }

    this.photoing = false ;

    if(dstatus == 'delete'){
      for(let i=0;i<this.state.photos.length;i++){
        if(iPosition != i) continue ;

        //删除改占位符
        this.state.photos.splice(i,1) ;
        break ;
      }
      this.setState({photos:this.state.photos}) ;
      return ;
    }

    //正确返回...
    this.state.photos[iPosition] = photo ;
    this.setState({photos:this.state.photos}) ;
  }

  //成功选择图片
  _onSuccSelected(photos){
    this.setState({photos:photos}) ;
  }


  //渲染一张图片
  _renderAPhoto(photo,i){
    if(photo.doing) return this._getLoadingView(styles.itemPhoto,{key:i}) ;

    return <PostAPhoto onPress={this._onPressAPhoto.bind(this,i)} onRemove={this._onRemoveAPhoto.bind(this,i)} photo={photo} key={photo.image.uri} />
  }

  //当点击这张图片的时候
  _onPressAPhoto(i){
    let props = {images:this.state.photos.map(it=>it.image),defaultIndex:i} ;

    Navigation.showModal({
      screen: 'timeline.SlideImagesPage',
      title: '',
      passProps: props,
      navigatorStyle: {
        navBarHidden:true,
        statusBarHidden: true,
      },
      navigatorButtons: {},
      animationType: 'slide-up'
    });

    return ;
  }

  //删除一张照片回调
  _onRemoveAPhoto(iPosition){
    for(let i=0;i<this.state.photos.length;i++){
      if(i != iPosition) continue ;
      this.state.photos.splice(i,1) ;
      break ;
    }
    this.setState({photos:this.state.photos}) ;
  }


  onSubmit(){
    let post = {} ;

    post.photo = [] ;
    this.state.photos.map((it,i)=>post.photo.push({type: "image/jpeg", name: i+'x', uri: it.image.uri })) ;

    global.v2iapi('timeline/post',post) ;
  }

  render(){
    let addBtnTpl = null ;
    if(this.state.photos.length < this.maxSelectNum){
      addBtnTpl = (
        <TouchableHighlight style={styles.addPhotoBtn} onPress={this._onPressTocamera.bind(this)} underlayColor="#eee">
          <Text style={styles.addPhotoBtnText} allowFontScaling={false}>＋</Text>
        </TouchableHighlight>
      ) ;
    }

    return (
      <ScrollView style={styles.wrap}>
        <TextInput multiline={true} placeholder="这一刻有话说..." style={styles.textInput} />
        <View style={styles.imageWrap}>
          {this.state.photos.map((it,i)=>this._renderAPhoto(it,i))}
          {addBtnTpl}
        </View>

        <TouchableHighlight onPress={this.onSubmit.bind(this)}>
          <Text>确认提交</Text>
        </TouchableHighlight>
      </ScrollView>
    ) ;
  }
}


class PostAPhoto extends Component {
  constructor(props) {
    super(props) ;
    this.state = {
      photo : props.photo ,
    } ;
  }

  componentWillReceiveProps(nextProps){
    if(!nextProps.photo) return ;
    if(nextProps.photo !== this.state.photo) this.setState({photo:nextProps.photo}) ;
  }

  _onPressToRemove(){
    if(!this.state.willRemovePhoto){
      this.setState({willRemovePhoto:true}) ;
      return ;
    }

    this.setState({removed:true},()=>{
      if(this.props.onRemove) this.props.onRemove(this.state.photo) ;
    })
  }


  _onPress(){
    if(this.state.willRemovePhoto){
      this.setState({willRemovePhoto:false}) ;
      return ;
    }

    if(this.props.onPress) this.props.onPress() ;
  }


  render(){
    let style = [styles.itemPhoto] ;
    if(this.state.removed) return <View />

    let animation = null ;
    let rmBtnImageStyle = [styles.itemRemoveImage] ;
    if(this.state.willRemovePhoto){
      animation = 'wobble' ;
      rmBtnImageStyle.push(styles.itemWillRemoveImage) ;
    }

    let photo = this.state.photo ;
    return (<TouchableOpacity underlayColor="#ccc" style={style} onPress={this._onPress.bind(this)}>
      <View>
        <Image source={photo.image} style={styles.itemPhotoImage} />
        <TouchableOpacity underlayColor="#ccc" style={styles.itemRemoveBtn} onPress={this._onPressToRemove.bind(this)}>
          <Animatable.Image animation={animation} easing="ease-out" duration={900} iterationCount="infinite" source={require('./../images/icon_photo_rm.png')} style={rmBtnImageStyle} />
        </TouchableOpacity>
      </View>
    </TouchableOpacity>)
  }
}


const rowNum = 4 ;
const itemWidth = (React.Dimensions.get('window').width - 8*(rowNum+1)) / rowNum ;
const styles = StyleSheet.create({
  wrap:{
    flex:1,
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
    fontSize:14,
  },

  imageWrap:{
    flexDirection:'row',
    padding:10,
    paddingLeft:4,
    paddingRight:4,
    flexWrap:'wrap',
  } ,

  itemPhoto:{
    width: itemWidth ,
    height: itemWidth ,
    margin: 4 ,
  },

  itemPhotoImage:{
    resizeMode: 'cover' ,
    width: itemWidth ,
    height: itemWidth ,
    backgroundColor:'#eee',
  },

  itemRemoveBtn:{
    position:'absolute',
    right:-5,
    top:-5,
  },

  itemWillRemoveImage:{
    opacity:1,
  },

  itemRemoveImage:{
    width:22,
    height:22,
    opacity:0.6,
  },

  addPhotoBtn:{
    borderWidth:1,
    borderColor:'#ccc',
    height:itemWidth,
    width:itemWidth,
    alignItems:'center',
    justifyContent:'center',
    margin: 4 ,
  },

  addPhotoBtnText:{
    fontSize:itemWidth-20,
    color:'#ccc',
  }
}) ;
