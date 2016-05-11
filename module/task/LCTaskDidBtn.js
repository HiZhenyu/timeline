import React, {
  Component,
  StyleSheet,
  TouchableHighlight ,
  View,
  Text,
  Image
} from 'react-native';

/**
 * 勋章获取按钮
 */
export default class LCTaskDidBtn extends Component {
  constructor(props) {
    super(props) ;

    this.state = {
      task: this.props.task ,
      did: !!this.props.did ,
    } ;
  }

  componentWillReceiveProps(nextProps){
    if(!this.props.doUpdate && nextProps.doUpdate) this._fetch(nextProps.updateCallback ? nextProps.updateCallback:null) ;
    if(this.props.holdOn && !nextProps.holdOn) return this._doMount() ;
  }

  componentDidMount() {
    if(this.props.holdOn) return null ;
    return this._doMount() ;
  }

  componentWillUnmount() {
    this.unmount = true ;
  }

  _doMount(){
    if(!this.state.task || !this.state.task.id) return ;
    return this._fetch() ;
  }

  //获取当前状态
  _fetch(){
    if(this.state.did) this._doAssets({did:true}) ;
  }


  _onPress(){
    if(this.digXing) return ;

    var online = global.getOnline() ;
    if(!online.uid){
      global.toLogin() ;
      return ;
    }

    if(this.state.did){
      return ;
    }

    this.digXing = true ;
    v2iapi('task/did',{id:this.state.task.id},{
      succ:(js)=>{
        this._doAssets(js) ;
      },
      ever:(js)=>{
        this.digXing = false ;
        if(!js || !js.code || js.code != '200') if(!this.unmount) this.setState({did:false}) ;
      }
    }) ;
  }

  _doAssets(js) {
    if(!js.did) return ;
    !this.unmount && this.setState({did:true}) ;
  }

  render(){
    let style = [styles.opsBtn] ;
    if(this.state.did) style.push(styles.opsBtnDid) ;
    if(this.props.style) style.push(this.props.style) ;

    let btnText = '领取奖励' ;
    if(this.state.did){
      btnText = '已完成' ;
      style.push(styles.opsBtnBgc) ;
    }

    return (
      <TouchableHighlight underlayColor="#F6F6F6" style={style} onPress={this._onPress.bind(this)}>
        <View style={styles.opsBtnView}>
          <Text style={styles.opsBtnText} allowFontScaling={false}>{btnText}</Text>
        </View>
      </TouchableHighlight>
    ) ;
  }
}

const styles = StyleSheet.create({

  opsBtnView:{
    justifyContent:'center',
    width:80,
    height:25,
  },
  opsBtn:{
    marginTop:10,
    width:80,
    height:25,
    backgroundColor:'#f60',
  },
  opsBtnBgc:{
    backgroundColor:'#999'
  },
  opsBtnText:{
    textAlign:'center',
    color:'#fff',
    fontWeight:'bold',
  }

}) ;
