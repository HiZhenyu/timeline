import React,{ Component } from 'react' ;
import {
  StyleSheet,
  TouchableOpacity,
  View,
  Image,
  Dimensions
} from 'react-native';

import { Navigation } from 'react-native-navigation';

export default class LCTimelineImages extends Component {
  constructor(props) {
    super(props) ;

    this.state = {
      images: this.props.images ? this.props.images : [] ,
    } ;
  }

  _onPress(aimg,i){
    let props = {images:this.state.images,defaultIndex:i} ;

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

  render(){
    let images = this.state.images ;
    if(!images) images = [] ;
    let imagesSize = images.length ;

    let PWidth = this.props.pwidth ? this.props.pwidth : Dimensions.get('window').width ;

    let wrapStyle = [styles.images,styles['images'+imagesSize]] ;
    let tplImages = [] ;
    for(let i=0;i<images.length;i++){
      let aimg = images[i] ;

      if(aimg.thumb) aimg.thumb = global.getUploadURL(aimg.thumb) ;
      if(aimg.hdimg) aimg.hdimg = global.getUploadURL(aimg.hdimg) ;
      if(!aimg.hdimg) aimg.hdimg = aimg.thumb.replace('300x300','1024x1024').replace('600x600','1024x1024') ;

      let astyle = [styles.image,{ width: (PWidth - 51)/3,height: (PWidth - 51)/3 }] ;
      if(imagesSize == 4) wrapStyle.push({paddingRight:(PWidth - 50)/3}) ;

      if(imagesSize == 1 && aimg.width && aimg.height){
          let awidth = PWidth-20 ;
          let amarginLeft = 0 ;
          if(aimg.height*1 > aimg.width*1){
            awidth = (PWidth - 20)/(aimg.height/aimg.width) ;
            if(this.props.oneImageInCenter) amarginLeft = (PWidth - awidth - 20) / 2 ;
          }

          let aheight = aimg.height / aimg.width  * awidth ;
          if(aheight > aimg.height && awidth > aimg.width){
            aheight = aimg.height*1 ;
            awidth = aimg.width*1 ;
            if(this.props.oneImageInCenter) amarginLeft = (PWidth - awidth - 20) / 2 ;
          }


          astyle.push({width:awidth,height:aheight,margin:0,marginLeft:amarginLeft}) ;
      }


      tplImages.push((
        <TouchableOpacity key={i} onPress={this._onPress.bind(this,aimg,i)}>
          <Image style={astyle} source={{uri:aimg.thumb}} />
        </TouchableOpacity>
      )) ;
    }

    return (
      <View style={wrapStyle}>
        {tplImages}
      </View>
    ) ;
  }
}


const styles = StyleSheet.create({
  images:{
    marginTop:10,
    flexDirection:'row',
    alignItems:'center',
    flexWrap:'wrap'
  } ,
  image:{
    resizeMode:'cover',
    margin: 5,
    backgroundColor: '#eee',
  } ,


}) ;
