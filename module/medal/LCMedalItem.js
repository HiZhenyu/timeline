import React,{ Component } from 'react' ;
import {
  StyleSheet,
  TouchableHighlight ,
  View,
  Text,
  Image,
  Dimensions
} from 'react-native';


export default class LCMedalItem extends Component {
	constructor(props) {
		super(props) ;

	}

  _onPress(){
    if(!this.props.navigator) return ;
    if(!this.props.medal || !this.props.medal.id) return ;

    let props = {medal:this.props.medal} ;

    this.props.navigator.push({
      screen: 'medal.MedalPage',
      passProps: props,
      title: props.medal.name ,
      backButtonTitle: '返回',
    });
  }

  _renderRichBody(){
    let medal = this.props.medal ;
    medal.icon && (medal.icon = global.getUploadURL(medal.icon)) ;

    return (<TouchableHighlight key={medal.id} underlayColor="#ccc" onPress={this._onPress.bind(this)}>
            <View style={styles.itemStyle}>
              <Image style={styles.itemImage} source={{uri:medal.icon}} />
              <View style={styles.itemInf}>
                <Text style={styles.itemTit} allowFontScaling={false}>{medal.name}</Text>
                <Text style={styles.itemText} allowFontScaling={false}>{medal.intro}</Text>
              </View>
            </View>
            </TouchableHighlight>)
        }

	render() {
    if(this.props.styleId == '1') return this._renderRichBody() ;

    let medal = this.props.medal ;
    medal.icon && (medal.icon = global.getUploadURL(medal.icon)) ;

    let style = [styles.listItem] ;
    this.props.style && (style.push(this.props.style)) ;

		return (
      <TouchableHighlight style={style} onPress={this._onPress.bind(this)} underlayColor="transparent">
        <View>
          <Image style={styles.icon} source={{uri: medal.icon}} />
        </View>
      </TouchableHighlight>
    ) ;
  }

}


var itemWidth = Dimensions.get('window').width/4 ;
var styles = StyleSheet.create({
  listItem:{
    justifyContent: 'center',
		padding: 5,
		width: itemWidth ,
		height: itemWidth,
		alignItems: 'center',
  } ,

  icon: {
		width: itemWidth*0.9,
		height:itemWidth*0.9,
	},

  itemStyle:{
    flexDirection:'row',
    padding:10,
    backgroundColor:'#fff',
    borderBottomWidth:1,
    borderBottomColor:'#eee',
  },

  itemImage:{
    width: 80,
    height:60,
    resizeMode:'contain',
  },

  itemInf:{
    flex:1,
    paddingLeft:10,
  },

  itemInfT:{
    flex:1,
  },

  itemText:{
    fontSize:14,
    paddingBottom:5,
    lineHeight:16,
  },
  itemTit:{
      fontSize:16,
      paddingBottom:8,
  },


});
