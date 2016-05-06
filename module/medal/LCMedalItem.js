import React, {
  Component,
  StyleSheet,
  TouchableHighlight ,
  View,
  Text,
  Image,
} from 'react-native';


export default class LCMedalItem extends Component {
	constructor(props) {
		super(props) ;

	}

  _onPress(){

  }

	render() {
    var medal = this.props.medal ;
    if(medal.icon) medal.icon = global.getUploadURL(medal.icon) ;

    var style = [styles.listItem] ;
    if(this.props.style) style.push(this.props.style) ;

		return (
      <TouchableHighlight style={style} onPress={this._onPress.bind(this)} underlayColor="transparent">
        <View>
          <Image style={styles.icon} source={{uri: medal.icon}} />
        </View>
      </TouchableHighlight>
    ) ;
  }

}


var itemWidth = React.Dimensions.get('window').width/4 ;
var styles = StyleSheet.create({
  listItem:{
    justifyContent: 'center',
		padding: 5,
		width: itemWidth ,
		height: itemWidth  ,
		alignItems: 'center',
  } ,

  icon: {
		width: itemWidth*0.9,
		height:itemWidth*0.9,
	},

});
