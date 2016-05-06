import React, {
  Component,
  StyleSheet,
  View,
  Text,
  Image
} from 'react-native';

import LCUser from './../user/LCUser' ;

export default class LCDigs extends Component {
  constructor(props) {
    super(props) ;

    this.maxDigShow = 13 ;

    this.state = {
      list : this.props.list ? this.props.list : [] ,
    };

    this.state.sum = this.props.sum ? this.props.sum : this.state.list.length ;
  }

  componentWillReceiveProps(nextProps){
    var nsum = nextProps.sum ? nextProps.sum : nextProps.list.length ;
    if(nsum != this.state.sum) this.setState({list:nextProps.list,sum:nsum}) ;
  }

  render(){
    var style = [styles.digs] ;
    if(this.props.style) style.push(this.props.style) ;

    var digs = this.state.list ;
    if(!digs) digs = [] ;
    var digSum = this.state.sum  ;

    var digTpl = [] ;

    for(var i=0;i<digs.length;i++){
      if(i > this.maxDigShow) break ;
      var adig = digs[i] ;
      var atpl = (<LCUser navigator={this.props.navigator} style={styles.itemText} user={adig.user} key={i+'-'+adig.user.uid} styleId={2} />) ;

      if(i < digs.length -1 && i < this.maxDigShow)  digTpl.push(<Text key={i} allowFontScaling={false}>{atpl}<Text style={styles.itemText} allowFontScaling={false}>、</Text></Text>) ;
      else digTpl.push(atpl) ;
    }

    digTpl.push(<Text style={[styles.itemText,styles.itemTextLast]} key="last" allowFontScaling={false}>等{digSum}人赞了</Text>) ;

    return (
      <View style={style}><Image style={styles.icon} source={require('./../../images/icon_dig.png')} key="first" /><View style={styles.digText}>{digTpl}</View></View>
    );
  }
}

const styles = StyleSheet.create({
  icon:{
    width:14,
    height:14,
    resizeMode:'contain',
    marginTop:2,
    marginRight:5,
    tintColor:'#0049bb'
  } ,
  digText:{
    flexDirection:'row',
    alignItems:'stretch',
    flexWrap:'wrap',
    flex:1,
  } ,
  itemText:{
    fontSize:14,
    lineHeight:16,
  } ,
  itemTextLast:{
    marginTop:1,
    marginLeft:3,
    color:'#555',
    fontSize:14,
  } ,
  digs:{
    padding:10,
    flexDirection:'row'
  } ,
}) ;
