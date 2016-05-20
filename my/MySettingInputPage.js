import React,{ Component } from 'react' ;
import {
  StyleSheet,
  View,
  Text,
  TextInput,
} from 'react-native';

export default class MySettingPage extends Component {
  static defaultProps = {
      val : '',
      label : '',
      keyboardType: 'default',
      multiline: false,
  } ;

  constructor(props) {
    super(props) ;

    this.state = {
      val : this.props.val ,
    } ;
    this.props.navigator.setOnNavigatorEvent(this._onNavigatorEvent.bind(this));
  }

  static navigatorButtons= {
    rightButtons: [
      {
        title: '完成',
        id: 'id.succ',
      }
    ],
    leftButtons: [
      {
        title: '取消',
        id: 'id.cancel' ,
      }
    ] ,
  } ;

  _onNavigatorEvent(event){
    if(event.type == 'NavBarButtonPress'){
      let fns = {
        'id.succ' : this._onSucc.bind(this) ,
        'id.cancel' : this._onCancel.bind(this) ,
      }

      fns[event.id] && fns[event.id]() ;
    }
  }

  //取消
  _onCancel(){
    if(global.onSettingInputSucc) delete global.onSettingInputSucc ;
    this.refs.input.blur() ;
    this.props.navigator.dismissModal() ;
  }

  //成功
  _onSucc(){
    this.refs.input.blur() ;
    if(!global.onSettingInputSucc) return ;

    global.onSettingInputSucc(this.state.val) ;
    delete global.onSettingInputSucc ;

    this.props.navigator.dismissModal() ;
  }

  render(){
    //多行
    if(this.props.multiline){
      return <View style={[styles.flex,styles.backgroundGray,this.props.style]}>
        <TextInput ref="input" style={[styles.wrap,styles.input,this.props.inputStyle]} value={this.state.val} onChangeText={val=>this.setState({val})} autoFocus={true} multiline={this.props.multiline} keyboardType={this.props.keyboardType} />
      </View> ;
    }
    return (
      <View style={[styles.flex,styles.backgroundGray,this.props.style]}>
      <View style={[styles.wrap,styles.wrapHeight]}>
        <Text allowFontScaling={false} style={styles.text}>{this.props.label}:</Text>
        <TextInput ref="input" style={[styles.input,styles.flex,this.props.inputStyle]} value={this.state.val} onChangeText={val=>this.setState({val})} autoFocus={true} multiline={this.props.multiline} keyboardType={this.props.keyboardType} />
      </View>
      </View>
    ) ;
  }
}

const styles = StyleSheet.create({
  backgroundGray:{
    backgroundColor:'#efefef'
  } ,
  flex:{
    flex:1,
  } ,
  wrap:{
    flexDirection:'row',
    borderWidth:1,
    borderColor:'#ff6600',
    backgroundColor:'#fff',
    margin:15,
    alignItems:'center',
    padding:5,
    borderRadius:3,
  },
  wrapHeight:{
    height:40,
  },
  input:{
    padding:2,
    fontSize:16,
  },
  text:{
    fontSize:20,
    padding:2,
    fontSize:16,
    color:'#999',
  } ,

}) ;
