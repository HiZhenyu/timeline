import React, {
  Component,
  StyleSheet,
  View,
  Image,
  Text,
  TouchableHighlight
} from 'react-native';


export default class LCShopCateIcons extends Component {
	constructor(props) {
		super(props) ;

    this.state = {

    } ;
	}

  _onPress(item){
    if(!this.props.navigator) return ;
    var props = {cateId:item.id} ;

    //使用Navigation方案
    this.props.navigator.push({
      screen: 'shop.ShopItemListMainPage',
      passProps: props,
      animated: true,
      backButtonTitle: '返回',
      title: '金币商城' ,
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
    const icons = [
      {
        id:1,
        name:'模型',
        icon:require('./../../images/icon_fd_01.png')
      },
      {
        id:2,
        name:'生活',
        icon:require('./../../images/icon_fd_02.png')
      },
      {
        id:3,
        name:'数码',
        icon:require('./../../images/icon_fd_03.png')
      },
      {
        id:4,
        name:'其他',
        icon:require('./../../images/icon_fd_04.png')
      }
    ] ;

    let tpls = icons.map((item)=>{
      return (<TouchableHighlight style={styles.item} key={item.id} underlayColor="#ccc" onPress={this._onPress.bind(this,item)}>
        <View style={styles.item}>
          <Image style={styles.itemIcon} source={item.icon} />
          <Text style={styles.itemText} allowFontScaling={false}>{item.name}</Text>
        </View>
      </TouchableHighlight>) ;
    }) ;

    return (<View style={styles.wrap}>
      {tpls}
    </View>)
  }

}

var styles = StyleSheet.create({
  wrap:{
    flexDirection:'row',
    flex:1,
    alignItems:'center',
    backgroundColor:'#fff',
    flexWrap:'wrap',
  },
  item:{
    flex:1,
    alignItems:'center',
    padding:5,
  },
  itemIcon:{
    marginBottom:10,
  },
  itemText:{
    fontSize:14,
  }
});
