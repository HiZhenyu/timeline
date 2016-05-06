import React, {
  Component,
  StyleSheet,
  View,
  TouchableHighlight,
  Image,
  Text,
} from 'react-native';


export default class LCExSuperb extends Component {
	constructor(props) {
		super(props) ;

    this.state = {

    } ;
	}


  _onPress(item){
    console.log(item);
  }

	render() {
    let supers = [
      {
        id:'sign',
        name:'领金币',
        icon:require('./../../images/icon_s_sign.png')
      },
      {
        id:'task',
        name:'做任务',
        icon:require('./../../images/icon_s_task.png')
      },
      {
        id:'shop',
        name:'金币商城',
        icon:require('./../../images/icon_s_shop.png')
      },
      {
        id:'luck',
        name:'试下手气',
        icon:require('./../../images/icon_s_luck.png')
      },
      {
        id:'medal',
        name:'勋章专区',
        icon:require('./../../images/icon_s_medal.png')
      },
      {
        id:'invite',
        name:'邀请好友',
        icon:require('./../../images/icon_s_invite.png')
      },
      {
        id:'subject',
        name:'活动与话题',
        icon:require('./../../images/icon_s_subject.png')
      },
    ] ;

    let tpls = supers.map((item)=>{
      return (<TouchableHighlight style={styles.itemBtn} key={item.id} underlayColor="#ccc" onPress={this._onPress.bind(this,item)}>
        <View style={styles.item}>
          <Image style={styles.itemIcon} source={item.icon} />
          <Text style={styles.itemText} allowFontScaling={false}>{item.name}</Text>
        </View>
      </TouchableHighlight>) ;
    }) ;

    return (<View style={styles.wrap}>{tpls}</View>) ;
  }
}

var itemWidth = React.Dimensions.get('window').width/4 ;
var styles = StyleSheet.create({
  wrap:{
    flexDirection:'row',
    flex:1,
    alignItems:'center',
    backgroundColor:'#fff',
    flexWrap:'wrap',
  },
  itemBtn:{
    padding:10,
    width:itemWidth,
		borderWidth: 1,
		borderColor: '#eee',
		borderLeftWidth: 0,
		borderTopWidth: 0,
  },
  item:{
    alignItems:'center',
  },
  itemIcon:{
    marginBottom:10,
  },
  itemText:{
    fontSize:14,
  }
});