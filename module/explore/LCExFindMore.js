import React, {
  Component,
  StyleSheet,
  View,
  Image,
  Text,
  TouchableHighlight
} from 'react-native';


export default class LCExFindMore extends Component {
	constructor(props) {
		super(props) ;

    this.state = {

    } ;
	}

  _onPress(item){
    console.log(item);
  }

	render() {
    const finds = [
      {
        id:'equipment',
        name:'找设备',
        icon:require('./../../images/icon_fd_01.png')
      },
      {
        id:'project',
        name:'找工程',
        icon:require('./../../images/icon_fd_02.png')
      },
      {
        id:'rent',
        name:'找二手',
        icon:require('./../../images/icon_fd_03.png')
      },
      {
        id:'used',
        name:'找租赁',
        icon:require('./../../images/icon_fd_04.png')
      }
    ] ;

    let tpls = finds.map((item)=>{
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
