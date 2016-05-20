import React,{ Component } from 'react' ;
import {
  StyleSheet,
  View ,
  Image ,
  Dimensions,
  TouchableHighlight,
  Text,
  TouchableOpacity,
} from 'react-native';

var ImagePickerManager = require('NativeModules').ImagePickerManager ;
import GiftedSpinner from './../pub/GiftedSpinner' ;
import * as Animatable from 'react-native-animatable' ;
import { Navigation } from 'react-native-navigation' ;

export default class LCPhotoSelector extends Component {
  static defaultProps = {
    maxSelectNum : 9,
    hidden : false,
    photos : [],
    maxWidth : 1920,
    maxHeight : 1920,
    allowsEditing: false, //maxSelectNum ==1 时适用.
  } ;

  constructor(props) {
    super(props);
    this.state = {
      photos:this.props.photos ,
      hidden: this.props.hidden ,
    } ;

    this.maxSelectNum = this.props.maxSelectNum ;
  }

  componentWillReceiveProps(nextProps){
    if(this.props.hidden != nextProps.hidden) this.setState({hidden:nextProps.hidden}) ;
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
      if(response.customButton == 'selectFromLibrary'){
        return this._onPressToSelectPhotos() ;
      }
      if(this.props.customButtons && this.props.customButtons[response.customButton]){
        return this.props.customButtons[response.customButton].onPress() ;
      }

      return ;
    }

    response.data && (delete response.data) ;
    if(!global.onSuccPhoto) return ;

    //是从相册里选择的
    if(response.origURL){
      let photo = {image:response} ;
      photo.uri = response.origURL  ;
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
    //先关闭表情
    if(this.state.emShown) this.setState({emShown:false}) ;

    //正在照片，请稍等
    if(this.photoing) return ;

    //只能按此方式回调...
    global.onSuccPhoto = this._onSuccPhoto.bind(this) ;

    let chooseFromLibTit = '' ;
    let customButtons = {
      '从手机相册里选择' : 'selectFromLibrary'
    } ;

    if(this.props.maxSelectNum == 1){
      chooseFromLibTit = '从手机相册里选择' ;
      customButtons = {} ;
    }

    if(this.props.customButtons){
      Object.keys(this.props.customButtons).map(ik=>{
        customButtons[this.props.customButtons[ik].title] = ik ;
      }) ;
    }

    let options = {
      title: '',
      cancelButtonTitle: '取消',
      takePhotoButtonTitle: '拍照',
      chooseFromLibraryButtonTitle: chooseFromLibTit,
      customButtons: customButtons ,
      cameraType: '取消',
      mediaType: 'photo',
      videoQuality: 'high',
      durationLimit: 10,
      maxWidth: this.props.maxWidth,
      maxHeight: this.props.maxHeight,
      aspectX: 2,
      aspectY: 1,
      quality: 0.8,
      angle: 0,
      allowsEditing: this.props.allowsEditing,
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
    props.selectedPhotos = this.state.photos ;

    //最多可选择多少张照片
    props.maxSelectNum = this.maxSelectNum ;

    //没办法了..按照global的方式去回调..
    global.onPhotoSuccSelected = this._onPhotoSuccSelected.bind(this) ;

    this.props.navigator.showModal({
      screen: 'post.SelectPhotosPage',
      passProps: props,
      title: '选择照片' ,
      backButtonTitle: '取消',
      animationType: 'slide-up',
    });

    return ;
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

    //通过照相机成功选择
    if(this.props.onSelected) this.props.onSelected(this.state.photos) ;
  }

  //成功选择图片
  _onPhotoSuccSelected(photos){
    this.setState({photos:photos}) ;

    if(this.props.onSelected) this.props.onSelected(photos) ;
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

    if(this.props.onRemoved) this.props.onRemoved(this.state.photos) ;
  }

  showSelects(){
    return this._onPressTocamera() ;
  }

  render(){
    if(this.state.hidden) return null ;

    let addBtnTpl = null ;
    if(this.state.photos.length < this.maxSelectNum){
      addBtnTpl = (
        <TouchableHighlight style={styles.addPhotoBtn} onPress={this._onPressTocamera.bind(this)} underlayColor="#eee">
          <Text style={styles.addPhotoBtnText} allowFontScaling={false}>＋</Text>
        </TouchableHighlight>
      ) ;
    }

    return <View style={styles.imageWrap}>
      {this.state.photos.map((it,i)=>this._renderAPhoto(it,i))}
      {addBtnTpl}
    </View> ;
  }
}



//一个展示要上传的图片
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
          <Animatable.Image
            animation={animation}
            easing="ease-out"
            duration={900}
            iterationCount="infinite"
            source={require('./../../images/icon_photo_rm.png')}
            style={rmBtnImageStyle} />
        </TouchableOpacity>
      </View>
    </TouchableOpacity>)
  }
}



const PWidth = Dimensions.get('window').width;
const rowNum = 4 ;
const itemWidth = (PWidth - 8*(rowNum+1)) / rowNum ;

const styles = StyleSheet.create({
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
  },


}) ;
