import React,{ Component } from 'react' ;
import {
  StyleSheet,
  TouchableHighlight,
  View,
  Image,
  Text
} from 'react-native';

export default class LCSline extends Component {
  constructor(props) {
    super(props) ;
    this.state = {
    };

    this.lines = [] ;
    if(props.lines) this.lines = props.lines ;
    if(props.title){
        var aline = {} ;
        aline.title = props.title ;
        if(props.icon) aline.icon = props.icon ;
        if(props.onPress) aline.onPress = props.onPress ;

        this.lines.push(aline) ;
    }
  }

  render(){
    var tpls = [] ;
    for(var i=0;i<this.lines.length;i++){
      var aline = this.lines[i] ;
      var icon = aline.icon ? <Image style={styles.icon} source={aline.icon} /> : false ;
      var styleItemOth = i == this.lines.length - 1 ? styles.itemLast:styles.itemC ;
      var onPressFn = aline.onPress ? aline.onPress : ()=>{} ;

      var atpl = (
        <TouchableHighlight key={i} onPress={onPressFn} underlayColor='#ddd' style={styles.itemWrap}>
          <View style={[styles.item,styleItemOth]}>
            {icon}
            <Text style={styles.title} allowFontScaling={false}>{aline.title}</Text>
            <Image style={styles.iconTo} source={require('./../../images/icon_dirto.png')} />
          </View>
        </TouchableHighlight>
      ) ;

      tpls.push(atpl) ;
    }

    var styleWrap = [styles.wrap] ;
    if(this.props.style) styleWrap.push(this.props.style) ;

    return (
      <View style={styleWrap}>
        {tpls}
      </View>
    ) ;
  }
}

const styles = StyleSheet.create({
  wrap:{
    borderBottomColor:'#ddd',
    borderBottomWidth:1,
    borderTopColor:'#ddd',
    borderTopWidth:1,
    backgroundColor:'#fff'
  },
  itemWrap:{
    paddingLeft:10,
  },
  item:{
    flexDirection:'row',
    paddingTop:5,
    paddingBottom:5,
    borderBottomWidth:1,
    height:40,
    borderBottomColor:'#eee',
    alignItems:'center'
  },
  itemLast:{
    borderBottomWidth:0,
  },
  title:{
    flex:1,
    fontSize:16,
  },
  icon:{
    width:20,
    height:20,
    marginRight:10,
    justifyContent:'center'
  },
  iconTo:{
    marginRight:10,
  }

}) ;
