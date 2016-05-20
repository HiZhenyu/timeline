import React,{ Component } from 'react' ;
import {
  StyleSheet,
  TouchableHighlight ,
  View,
  Text,
  Image,
} from 'react-native';


export default class LCCatItem extends Component {
	constructor(props) {
		super(props) ;
	}

  _onPress(){
    if(!this.props.navigator) return ;
    let feed = this.props.feed ;
    var props = {shopItem:{id:feed.item_id,name:feed.name,icon:feed.icon}} ;

    //使用Navigation方案
    this.props.navigator.push({
      screen: 'shop.ShopItemPage',
      passProps: props,
      title: props.shopItem.name ,
      backButtonTitle: '返回',
    });

  }

	render() {
    let feed = this.props.feed ;
    let itemStyle = [styles.item] ;
    if(this.props.itemStyle) itemStyle.push(this.props.itemStyle) ;

    feed.icon = global.getUploadURL(feed.icon) ;

    return (
      <TouchableHighlight key={feed.id} underlayColor="#ccc" onPress={this._onPress.bind(this)}>
      <View style={itemStyle}>
        <Image style={styles.itemImage} source={{uri:feed.icon}} />
        <View style={styles.itemInf}>
          <View style={styles.itemInfT}>
            <Text style={styles.itemText} allowFontScaling={false}>{feed.user.name} {feed.create_time}</Text>
            <Text style={styles.itemText} allowFontScaling={false}>兑换了{feed.num}件 <Text style={styles.itemTextB} allowFontScaling={false}>{feed.name}</Text></Text>
          </View>

          <View style={styles.itemBtn}>
            <Text style={styles.itemBtnText} allowFontScaling={false}>我也要换</Text>
          </View>

        </View>
      </View>
      </TouchableHighlight>
    ) ;
  }

}

var styles = StyleSheet.create({
  item:{
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
  },
  itemTextB:{
    color:'#516783'
  },
  itemBtn:{
    backgroundColor:'#ff6600',
    padding:5,
    borderRadius:3,
    alignItems:'center',
    justifyContent:'center',
    position:'absolute',
    bottom:0,
    right:0,
  },
  itemBtnText:{
    color:'#fff',
  }

});
