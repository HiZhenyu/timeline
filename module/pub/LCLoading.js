import React,{ Component } from 'react' ;
import {
  StyleSheet,
  TouchableHighlight ,
  View,
  Text,
  Modal,
  Dimensions
} from 'react-native';

import GiftedSpinner from './GiftedSpinner' ;

export default class LCLoading extends Component {
  static defaultProps = {
    visible : false ,
    useModal : true ,
  } ;

  constructor(props) {
    super(props) ;
    this.state = {
      visible:props.visible ,
    } ;
  }

  componentWillReceiveProps(nextProps){
    if(this.props.visible != nextProps.visible) this.setState({visible:nextProps.nextProps}) ;
  }

  show(){
    this.setState({visible:true}) ;
  }

  hide(){
    this.setState({visible:false}) ;
  }

  render(){
    if(!this.state.visible) return null ;

    let tpl = <View style={styles.loadingWrap}>
      <View style={styles.loading}>
        <GiftedSpinner size="large" style={{height:60}} />
        <Text style={styles.loadingText} allowFontScaling={false}>加载中...</Text>
      </View>
    </View> ;
    if(!this.props.useModal) return tpl ;

    return <Modal visible={this.state.visible} transparent={true}>{tpl}</Modal> ;
  }
}

const PHeight = Dimensions.get('window').height;
const PWidth = Dimensions.get('window').width;

const styles = StyleSheet.create({
  loadingWrap:{
    width:PWidth,
    height:PHeight,
    flex:1,
    alignItems:'center',
    justifyContent:'center',
    backgroundColor:'transparent',
    position:'absolute',
    left:0,
    top:0,
  },

  loading:{
    width:120,
    height:120,
    backgroundColor:'rgba(51, 51, 51, 0.8)',
    borderRadius:5,
    alignItems:'center',
    justifyContent:'center',
  },

  loadingText:{
    color:'#eee',
    backgroundColor:'transparent',
    textAlign:'center',
  }
}) ;
