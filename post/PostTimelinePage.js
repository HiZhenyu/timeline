import React, {
  Component,
  StyleSheet,
  TouchableHighlight ,
  View,
  Text,
  ScrollView,
  Image,
  CameraRoll
} from 'react-native';


var ImagePickerManager = require('NativeModules').ImagePickerManager ;
import LCSelectPhotosFromLibrary from './../module/LCSelectPhotosFromLibrary' ;

export default class PostTimelinePage extends Component {
  constructor(props) {
    super(props) ;
    this.state = {

    } ;
  }


  _selectFromLibrary(){

  }

  _doSelectFromLibrary(){
    console.log(1) ;
  }

  _press(){
    var _this = this ;

    var options = {
      title: '', // specify null or empty string to remove the title
      cancelButtonTitle: '取消',
      takePhotoButtonTitle: '拍照', // specify null or empty string to remove this button
      chooseFromLibraryButtonTitle: '', // specify null or empty string to remove this button
      customButtons: {
        '从手机相册里选择' : 'selectFromLibrary'
        //'Choose Photo from Facebook': 'fb', // [Button Text] : [String returned upon selection]
      },
      cameraType: '取消', // 'front' or 'back'
      mediaType: 'photo', // 'photo' or 'video'
      videoQuality: 'high', // 'low', 'medium', or 'high'
      durationLimit: 10, // video recording max time in seconds
      maxWidth: 300, // photos only
      maxHeight: 300, // photos only
      aspectX: 2, // android only - aspectX:aspectY, the cropping image's ratio of width to height
      aspectY: 1, // android only - aspectX:aspectY, the cropping image's ratio of width to height
      quality: 0.8, // 0 to 1, photos only
      angle: 0, // android only, photos only
      allowsEditing: false, // Built in functionality to resize/reposition the image after selection
      noData: false, // photos only - disables the base64 `data` field from being generated (greatly improves performance on large photos)
      storageOptions: { // if this key is provided, the image will get saved in the documents directory on ios, and the pictures directory on android (rather than a temporary directory)
        skipBackup: true, // ios only - image will NOT be backed up to icloud
        path: 'images' // ios only - will save image at /Documents/images rather than the root
      }
    };

    /**
    * The first arg will be the options object for customization, the second is
    * your callback which sends object: response.
    *
    * response.didCancel will inform you if the user cancelled the process
    * response.error will contain an error message, if there is one
    * response.data is the base64 encoded image data (photos only)
    * response.uri is the uri to the local file asset on the device (photo or video)
    * response.isVertical will be true if the image is vertically oriented
    * response.width & response.height give you the image dimensions
    */

    ImagePickerManager.showImagePicker(options, (response) => {
      console.log('Response = ', response);

      if (response.didCancel) {
        console.log('User cancelled image picker');
      }
      else if (response.error) {
        console.log('ImagePickerManager Error: ', response.error);
      }
      else if (response.customButton) {
        console.log('User tapped custom button: ', response.customButton);
        if(response.customButton == 'selectFromLibrary'){
          //选择照片
          //CameraRoll.getPhotos({first:0}) ;
          //console.log(a);
        }
      }
      else {
        // You can display the image using either data:
        const source = {uri: 'data:image/jpeg;base64,' + response.data, isStatic: true};

        // uri (on iOS)
        //const source = {uri: response.uri.replace('file://', ''), isStatic: true};
        // uri (on android)
        //const source = {uri: response.uri, isStatic: true};

        this.setState({
          avatarSource: source
        });
      }
    });
  }

  render(){
    return (
      <ScrollView style={[styles.backgroundGray,{marginTop:130}]}>

        <LCSelectPhotosFromLibrary />
        <TouchableHighlight onPress={this._press.bind(this)}>
        <Text>PostTimelinePage</Text>
        </TouchableHighlight>

        <Image source={this.state.avatarSource} style={styles.uploadAvatar} />
      </ScrollView>
    ) ;
  }
}

const styles = StyleSheet.create({
  backgroundGray:{
    backgroundColor:'#efefef'
  },
  uploadAvatar:{
    width:300,
    height:300,
    resizeMode:'contain'
  }
}) ;
