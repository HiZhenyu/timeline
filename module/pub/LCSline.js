import React,{ Component } from 'react' ;
import {
  StyleSheet,
  TouchableHighlight,
  View,
  Image,
  Text,
  Dimensions
} from 'react-native';

export default class LCSline extends Component {
  static defaultProps = {
    lines : [],
  } ;

  constructor(props) {
    super(props) ;
    this.state = {} ;
    this.state.lines = this.props.lines ;
  }

  componentWillReceiveProps(nextProps){
    if(this.props.lines !== nextProps.lines) this.setState({lines:nextProps.lines}) ;
  }

  render(){
    let styleIcon = [styles.icon] ;
    if(this.props.styleIcon) styleIcon.push(this.props.styleIcon) ;

    let tpls = this.state.lines.map((aline,i)=>{
      let icon = aline.icon ? <Image style={styleIcon} source={aline.icon} /> : null ;
      let styleItemOth = (i == this.state.lines.length - 1) ? styles.itemLast:styles.itemC ;
      let rightText = aline.rightText ? <Text numberOfLines={1} style={styles.rightText} allowFontScaling={false}>{aline.rightText}</Text> : null ;
      let rightIcon = aline.onPress ? <Image style={styles.iconTo} source={require('./../../images/icon_dirto.png')} /> : <View style={styles.iconTo} /> ;

      let akey = i+'_'+aline.title+'_'+ (aline.rightText ? aline.rightText:'') ;
      return (
        <TouchableHighlight key={akey} onPress={aline.onPress} underlayColor='#ddd' style={styles.itemWrap}>
          <View style={[styles.item,styleItemOth]}>
            {icon}
            <Text style={styles.titleText} allowFontScaling={false}>{aline.title}</Text>
            {rightText}
            {aline.rightComponent}
            {rightIcon}
          </View>
        </TouchableHighlight>
      ) ;
    }) ;

    let styleWrap = [styles.wrap] ;
    if(this.props.style) styleWrap.push(this.props.style) ;

    return (
      <View style={styleWrap}>
        {tpls}
      </View>
    ) ;
  }
}



const PWidth = Dimensions.get('window').width;
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
    height:45,
    borderBottomColor:'#eee',
    alignItems:'center'
  },
  itemLast:{
    borderBottomWidth:0,
  },
  titleText:{
    flex:1,
    fontSize:16,
  },
  rightText:{
    fontSize:14,
    color:'#999',
    width:PWidth*0.6,
    textAlign:'right',
  },
  icon:{
    width:20,
    height:20,
    marginRight:10,
    justifyContent:'center'
  },
  iconTo:{
    marginLeft:10,
    marginRight:10,
    width:8,
  }

}) ;
