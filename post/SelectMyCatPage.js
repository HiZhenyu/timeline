import React , { Component } from 'react' ;
import {
  View ,
  Image ,
  TouchableHighlight ,
  StyleSheet ,
  Text
} from 'react-native' ;

import LCUserCats from './../module/user/LCUserCats' ;
import LCPage from './../LCPage' ;

export default class SelectMyCatPage extends LCPage {
  static defaultProps = {
    catId : 0 ,
  } ;
  constructor(props) {
    super(props) ;

    let online = global.getOnline() ;

    this.theComponents = [
      {
        component : LCUserCats ,
        props : {
          user : {uid:888},
          itemComponent : SelectCatItem ,
          itemComponentProps : {
            onPress:this._onPressItem.bind(this),
            selectedCatId : this.props.catId ,
          } ,
          style : styles.wrap ,
        },
        key : 'usercats',
      }
    ] ;
  }

  _onPressItem(cat){
    this.props.navigator.pop() ;

    //callback ... 由于没有解决页面之间的传递问题，所以使用 global 的方式
    if(global.onSelectedMyCat){
        global.onSelectedMyCat(cat) ;
        delete global.onSelectedMyCat ;
    }
  }
}

class SelectCatItem extends Component {
  constructor(props) {
    super(props) ;
    this.state = {
      cat : this.props.cat ,
    } ;
  }

  _onPress(){
    if(this.props.onPress) this.props.onPress(this.state.cat) ;
  }

  render(){
    let cat = this.state.cat ;
    cat.icon = global.getUploadURL(cat.icon) ;

    return (<TouchableHighlight underlayColor="#ccc" onPress={this._onPress.bind(this)}>
      <View style={styles.item}>
        <Image style={styles.itemIcon} source={{uri:cat.icon}} />
        <Text style={styles.itemName} allowFontScaling={false}>{cat.name}</Text>
      </View>
    </TouchableHighlight>) ;
  }
}

const styles = StyleSheet.create({
  wrap:{
    flexDirection:'column' ,
    backgroundColor:'#fff',
  },
  item:{
    borderBottomWidth:1,
    borderBottomColor:'#eee',
    flexDirection:'row',
    padding:10,
    flex:1,
    alignItems:'center',
    height:45 ,
    marginLeft : 10,
  },
  itemIcon:{
    width:40 ,
    height:40 ,
  },
  itemName:{
    flex:1 ,
    paddingLeft:10,
  }
}) ;
