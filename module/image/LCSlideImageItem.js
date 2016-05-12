import React,{ Component } from 'react' ;
import {
  StyleSheet,
  View,
  ScrollView,
  Dimensions,
  Image,
  Text,
  TouchableWithoutFeedback
} from 'react-native';

import GiftedSpinner from 'react-native-gifted-spinner' ;
import { Navigation } from 'react-native-navigation';

export default class LCSlideImageItem extends Component {
  constructor(props) {
    super(props) ;

    let image = this.props.image ? this.props.image : {} ;
    this.state = {
      error: false,
      loading: false,
      progress: 0
    } ;

    if(!image.icon && image.thumb) image.icon = image.thumb ;
    this.state.image = image ;
  }

  componentWillReceiveProps(nextProps){
    if(this.props.holdOn && !nextProps.holdOn) return this._doMount() ;
  }

  componentDidMount() {
    if(this.props.holdOn) return null ;
    return this._doMount() ;
  }

  _doMount(){
    var image = this.state.image ;
    this.setState({image:image},()=>{
      if(!image.hdimg) return ;

      image.icon = image.hdimg ;
      this.setState({image:image}) ;
    }) ;
  }


  _onLoadStart(e){
    this.setState({loading: true}) ;
  }

  _onError(e){
    this.setState({loading: false}) ;
  }

  _onProgress(e){
    this.setState({progress: Math.round(100 * e.nativeEvent.loaded / e.nativeEvent.total)}) ;
  }

  _onLoad(e){
    this.setState({loading: false, error: false}) ;
  }

  _onPress(){
    Navigation.dismissModal({
      animationType: 'slide-down',
      navigatorStyle:{
        statusBarHidden: true,
      }
    });
  }

  render(){
    var image = this.state.image ;

    let twidth = image.width*1 ;
    if(twidth > PWidth) twidth = PWidth ;

    let theight = twidth/image.width * image.height ;
    if(theight < PHeight) theight = PHeight ;

    let imageSource = image.icon ? {uri:global.getUploadURL(image.icon)} : image ;
    var loader = this.state.loading ?  <GiftedSpinner /> : null ;

    return (
      <ScrollView
        alwaysBounceVertical={false}
        alwaysBounceHorizontal={false}
        contentContainerStyle={this.props.style}
        showsHorizontalScrollIndicator={false}
        showsVerticalScrollIndicator={false}
        minimumZoomScale={1.0}
        maximumZoomScale={2.0}>
        <TouchableWithoutFeedback onPress={this._onPress.bind(this)}>
        <Image
          resizeMode="contain"
          source={imageSource}
          style={[styles.image,{width:twidth,height:theight}]}
          onLoadStart={this._onLoadStart.bind(this)}
          onError={this._onError.bind(this)}
          onProgress={this._onProgress.bind(this)}
          onLoad={this._onLoad.bind(this)}>
          {loader}
        </Image>
        </TouchableWithoutFeedback>
      </ScrollView>
    ) ;
  }
}


const PHeight = Dimensions.get('window').height;
const PWidth = Dimensions.get('window').width;

const styles = StyleSheet.create({
  wrap:{
    flex:1,
    width:PWidth,
    alignItems:'center',
    justifyContent:'center'
  },
  image:{
    justifyContent:'center'
  }
}) ;
