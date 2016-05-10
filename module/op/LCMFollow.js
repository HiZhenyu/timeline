import React, {
  Component,
  StyleSheet,
  TouchableHighlight ,
  Text
} from 'react-native';

export default class LCMFollow extends Component {
  constructor(props) {
    super(props) ;

    this.state = {
      user : this.props.user,
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
    if(!this.state.user || !this.state.user.uid) return ;
    return this._fetch() ;
  }

  //获取当前状态
  _fetch(){
    var online = global.getOnline() ;
    v2iapi('userfollow/isfollow',{uid:this.state.user.uid},{
      succ:(js)=>{
        if(!js.uid) return ;
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
    v2iapi('userfollow/add',{uid:this.state.user.uid},{
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
    if(this.unmount) return ;

    this.setState({did:true}) ;
  }

  render(){
    let addText = '＋关注' ;
    let addFollowBtnStyle = [styles.addFollowBtn] ;
    let addFollowBtnTextStyle = [styles.addFollowBtnText] ;

    if(this.state.did){
        addText = '已关注' ;
        addFollowBtnStyle.push(styles.addFollowBtnDid) ;
        addFollowBtnTextStyle.push(styles.addFollowBtnDidText) ;
    }

    return (
      <TouchableHighlight style={addFollowBtnStyle} underlayColor="#aaa" onPress={this._onPress.bind(this)}>
        <Text allowFontScaling={false} style={addFollowBtnTextStyle}>{addText}</Text>
      </TouchableHighlight>
    ) ;
  }
}

const styles = StyleSheet.create({
  addFollowBtn:{
    borderRadius:3,
    width:68,
    height:25,
    backgroundColor:'#ff6600',
  },
  addFollowBtnText:{
    color:'#fff',
    textAlign:'center',
    backgroundColor:'transparent',
    lineHeight:20,
    fontSize:14,
  },
  addFollowBtnDid:{
    backgroundColor:'#eee',
  },
  addFollowBtnDidText:{
    color:'#333'
  }
}) ;
