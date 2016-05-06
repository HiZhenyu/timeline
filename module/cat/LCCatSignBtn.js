import React, {
  Component,
  StyleSheet,
  TouchableHighlight ,
  View,
  Text,
  Image
} from 'react-native';

/**
 * 机友会签到按钮
 */
export default class LCCatSignBtn extends Component {
  constructor(props) {
    super(props) ;

    this.state = {
      cat: this.props.cat ,
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
    if(!this.state.cat || !this.state.cat.id) return ;
    return this._fetch() ;
  }

  //获取当前状态
  _fetch(){
    v2iapi('cat','hassign',{id:this.state.cat.id},{
      succ:(js)=>{
        this._doAssets(js) ;
      },
      ever:(js)=>{

      },
      fail:(js)=>{

      }
    }) ;
  }


  _onPress(){
    if(this.digXing) return ;

    var online = global.getOnline() ;
    if(!online.uid){
      global.toLogin() ;
      return ;
    }

    if(this.state.did) return ;

    this.setState({doing:true}) ;
    this.digXing = true ;
    v2iapi('cat','dosign',{id:this.state.cat.id},{
      succ:(js)=>{
        this._doAssets(js) ;
      },
      ever:(js)=>{
        this.digXing = false ;
        if(!js || !js.code || js.code != '200') this.setState({did:false}) ;
      }
    }) ;
  }

  _doAssets(js) {
    if(!js.did) return ;
    if(this.unmount) return ;

    this.setState({did:true}) ;
  }

  render(){
    let style = [styles.opsBtn] ;
    if(this.state.did) style.push(styles.opsBtnDid) ;
    if(this.props.style) style.push(this.props.style) ;

    let signText = '打卡签到' ;
    let signIcon = require('./../../images/icon_cat_sign.png') ;
    if(this.state.did){
      signText = '今日已打卡' ;
      signIcon = require('./../../images/icon_cat_sign_did.png') ;
    }

    return (
      <TouchableHighlight underlayColor="#F6F6F6" style={style} onPress={this._onPress.bind(this)}>
        <View style={styles.opsBtnView}>
          <Image style={styles.opsBtnImage} source={signIcon} />
          <Text style={styles.opsBtnText} allowFontScaling={false}>{signText}</Text>
        </View>
      </TouchableHighlight>
    ) ;
  }
}

const styles = StyleSheet.create({
  opsBtnView:{
    flexDirection:'row',
    justifyContent:'center',
    alignItems:'center',
    height:26,
  },
  opsBtn:{
    borderWidth:1,
    borderColor:'#ccc',
    borderRadius:3,
    flex:1,
    backgroundColor:'#f9f9f9'
  },
  opsBtnDid:{
    backgroundColor:'#eee',
  },
  opsBtnIm:{
    backgroundColor:'#ff6600',
    borderWidth:0,
  },
  opsBtnImText:{
    color:'#fff',
  },
  opsBtnText:{
    color:'#333',
  },

  opsBtnImage:{
    width:20,
    height:20,
    tintColor:'#555',
    marginRight:5
  },
}) ;
