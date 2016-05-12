import React,{ Component } from 'react' ;
import {
  StyleSheet,
  TouchableHighlight ,
  View,
  Text,
  Image,
  Dimensions,
} from 'react-native';


export default class LCCatItem extends Component {
	constructor(props) {
		super(props) ;

    this.state = {
      cat : this.props.cat ,
    } ;
    if(props.uid) this.uid = props.uid ;
	}

  _onPress(){
    if(!this.props.navigator) return ;
    if(!this.state.cat || !this.state.cat.id || this.state.cat.id == '0') return ;

    var props = {cat:this.state.cat} ;

    this.props.navigator.push({
      screen: 'cat.CatDetailMainPage',
      passProps: props,
      animated: true,
      title: props.cat.name ,
      backButtonTitle: '返回',
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

	render() {
    var cat = this.state.cat ;
    if(cat.icon) cat.icon = global.getUploadURL(cat.icon) ;


    //图标形式展示
    if(this.props.styleId == 1){
      var ichairman = cat.uid == this.uid ?  (<Text style={styles.chairman} allowFontScaling={false}>会长</Text>) : '' ;
      var icatnumstyle = [styles.catnumbg] ;

      if(cat.popnum) if(cat.popnum*1 > 99) cat.popnum = 99;
      if(!cat.popnum || cat.popnum == '0') icatnumstyle.push({width:0}) ;

      var style = [styles.listItem] ;
      if(this.props.style) style.push(this.props.style) ;

  		return (
        <TouchableHighlight style={style} onPress={this._onPress.bind(this)} underlayColor="#ccc">
          <View>
            <Image style={styles.icon} source={{uri: cat.icon}} />
            <Text style={styles.name} allowFontScaling={false}>{ichairman}{cat.name}</Text>
            <Image style={icatnumstyle}>
              <Text style={styles.catnumtext} allowFontScaling={false}>{cat.popnum}</Text>
            </Image>
          </View>
        </TouchableHighlight>
      )
    }

    //列表形式展示
    if(this.props.styleId == 2){

    }


    //文字形式展示
    var style = [styles.cattext] ;
    if(this.props.style) style.push(this.props.style) ;

    return (
      <Text style={style} onPress={this._onPress.bind(this)} allowFontScaling={false}>-【机友会】{cat.name}</Text>
    ) ;
  }

}


var itemWidth = Dimensions.get('window').width/4 ;
var styles = StyleSheet.create({
  listItem:{
    justifyContent: 'center',
		padding: 5,
		width: itemWidth ,
		height: itemWidth + 35 ,
		alignItems: 'center',
		borderWidth: 1,
		borderColor: '#eee',
		borderLeftWidth: 0,
		borderTopWidth: 0,
    paddingTop:25
  } ,

  icon: {
    marginTop:-15,
		width: itemWidth*0.8,
		height:itemWidth*0.8,
		borderRadius:itemWidth*0.05,
	},

  name:{
    paddingTop: 5,
    textAlign:'center',
    fontSize:14,
    lineHeight:16,
    height:38,
  } ,

  chairman:{
    backgroundColor:'#ff6600',
    color:'#fff'
  } ,

  catnumbg:{
    width:18,
		height:18,
		backgroundColor:'#ff0000' ,
		borderRadius:9 ,
		justifyContent:'center',
    position:'absolute',
    top:-20,
    right:-5,
  } ,

  catnumtext:{
    color:'#fff',
    fontSize:11,
    textAlign:'center',
  } ,

  cattext:{
    color:'#0049bb',
    fontSize:14,
  } ,

});
