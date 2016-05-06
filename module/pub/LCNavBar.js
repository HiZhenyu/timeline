import React, {
  Component,
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
} from 'react-native';

import LCStatus from './LCStatus'
export default class LCNavBar extends Component {
  constructor(props) {
    super(props) ;
    this.state = { } ;
  }

  _onPress(){
    if(this.props.navigator) return this.props.navigator.pop() ;

    if(!global.appNavigator) return ;
    return global.appNavigator.pop() ;
  }

  _onPressStatusBar(){
    if(!this.props.pageview || !this.props.pageview._scrollView) return ;
    this.props.pageview._scrollView.scrollTo({x: 0, y: 0, animated: true}) ;
    return ;
  }

  render(){
    var style = [styles.navbar] ;
    if(this.props.style) style.push(this.props.style) ;

    var backText = this.props.backText ? this.props.backText : '返回' ;
    var title = this.props.title ? this.props.title : '机友会' ;

    return (
      <View>
        <LCStatus />
        <View style={style}>
          <TouchableOpacity underlayColor="#fff" style={styles.backBtn} onPress={this._onPress.bind(this)}>
            <View>
              <Text style={styles.backBtnText} allowFontScaling={false}><Text style={{fontWeight:'bold'}} allowFontScaling={false}>く</Text>{backText}</Text>
            </View>
          </TouchableOpacity>
          <View style={styles.navbarTitle}>
            <Text style={styles.navbarTitleText} allowFontScaling={false}>{title}</Text>
          </View>
        </View>
      </View>
    ) ;
  }
}

const styles = StyleSheet.create({
  navbar:{
    height:40,
    alignItems:'flex-start',
    justifyContent:'center',
    flexDirection:'row',
    backgroundColor:'#f9f9f9',
    borderBottomWidth:1,
    borderBottomColor:'#ddd',
  } ,
  navbarTitleText:{
    color:'#333',
    fontSize:16,
    marginLeft:-60,
    height:40,
    lineHeight:30,
    fontWeight:'bold',
    backgroundColor:'transparent',
  } ,
  navbarTitle:{
    flex:1,
    alignItems:'center',
    justifyContent:'center',
  },
  backBtn:{
    width:60,
  } ,
  backBtnText:{
    color:'#333',
    height:40,
    lineHeight:28,
    fontSize:14,
    marginLeft:5,
    backgroundColor:'transparent',
  }
}) ;
