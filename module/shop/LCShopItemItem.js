import React,{ Component } from 'react' ;
import {
  StyleSheet,
  TouchableHighlight ,
  View,
  Text,
  Image,
  Dimensions
} from 'react-native';


export default class LCCatItem extends Component {
	constructor(props) {
		super(props) ;
	}

  _onPress(){
    if(!this.props.navigator) return ;
    var props = {shopItem:this.props.shopItem} ;

    //使用Navigation方案
    this.props.navigator.push({
      screen: 'shop.ShopItemPage',
      passProps: props,
      title: props.shopItem.name ,
      backButtonTitle: '返回',
    });

  }

	render() {
    let item = this.props.shopItem ;
    item.icon = global.getUploadURL(item.icon) ;

    if(this.props.styleId == '1'){
      let itemStyle = [styles.item] ;
      this.props.style && itemStyle.push(this.props.style) ;

      return (
        <View style={styles.itemWrap} key={item.id}>
          <TouchableHighlight underlayColor="#ccc" onPress={this._onPress.bind(this,item)}>
          <View style={itemStyle}>
            <Image style={styles.itemImage} source={{uri:item.icon}} />
            <Text style={styles.itemText} numberOfLines={2} allowFontScaling={false}>{item.name}</Text>
            <View style={styles.itemB}>
              <Text style={styles.itemBSText} allowFontScaling={false}>{item.score}金币</Text>
              <Text style={styles.itemBDText} allowFontScaling={false}>立即兑换</Text>
            </View>
          </View>
          </TouchableHighlight>
        </View>
      ) ;
    }

    let itemStyle = [styles.hitem] ;
    this.props.style && itemStyle.push(this.props.style) ;

    return (
      <TouchableHighlight key={item.id} underlayColor="#ccc" onPress={this._onPress.bind(this,item)}>
      <View style={itemStyle}>
        <Image style={styles.hitemImage} source={{uri:item.icon}} />
        <View style={styles.hitemR}>
          <Text style={styles.hitemText} numberOfLines={2} allowFontScaling={false}>{item.name}</Text>
          <View style={styles.hitemB}>
            <Text style={styles.hitemBSText} allowFontScaling={false}>{item.score}金币</Text>
            <View style={styles.hitemBD}><Text style={styles.hitemBDText} allowFontScaling={false}>立即兑换</Text></View>
          </View>
        </View>
      </View>
      </TouchableHighlight>
    ) ;
  }

}

const itemWidth = (Dimensions.get('window').width) / 2;
var styles = StyleSheet.create({
  wrap:{
    flexDirection:'row',
    flexWrap:'wrap',
  },

  itemWrap:{
    width:itemWidth,

  },

  item:{
    padding:10,
    borderWidth:1,
    borderTopWidth:0,
    borderLeftWidth:0,
    borderColor:'#eee',
    backgroundColor:'#fff',
  },

  itemImage:{
    width:itemWidth-12,
    height:(itemWidth-12)*0.8,
    resizeMode:'stretch',
  },

  itemText:{
    paddingTop:5,
    height:36,
    fontSize:14,
  },
  itemB:{
    flexDirection:'row',
  },
  itemBSText:{
    flex:1,
    color:'#ff0000'
  },
  itemBDText:{
    width:60,
    fontSize:12,
    textAlign:'right',
  },

  hitem:{
    padding:5,
    borderBottomWidth:1,
    borderBottomColor:'#eee',
    backgroundColor:'#fff',
    flexDirection:'row',
  },

  hitemImage:{
    width: 100,
    height:80,
    resizeMode:'contain',
  },

  hitemR:{
    flex:1,
    paddingLeft:10,
  },

  hitemText:{
    paddingTop:5,
    height:36,
    fontSize:14,
  },
  hitemB:{
    height:35,
    flexDirection:'row',
    alignItems:'flex-end',
  },
  hitemBSText:{
    flex:1,
    color:'#ff0000'
  },
  hitemBD:{
    backgroundColor:'#ff6600',
    padding:5,
    borderRadius:3,
    marginRight:10,
  },
  hitemBDText:{
    fontSize:12,
    color:'#fff',
  },

});
