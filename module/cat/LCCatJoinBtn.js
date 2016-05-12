import React,{ Component } from 'react' ;
import {
  StyleSheet,
  TouchableHighlight ,
  View,
  Text,
  Image
} from 'react-native';

import Prompt from 'react-native-prompt';

//加入机友会
export default class LCCatJoinBtn extends Component {
  constructor(props) {
    super(props) ;

    this.state = {
      cat: this.props.cat ,
      did: !!this.props.did ,
      joinMsg: '',
      promptTitle: '提示',
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
    v2iapi('cat/hasjoin',{id:this.state.cat.id},{
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

    let post = {} ;
    post.id = this.state.cat.id ;
    if(this.state.joinMsg) post.content = this.state.joinMsg ;

    this.digXing = true ;
    v2iapi('cat/dojoin',post,{
      succ:(js)=>{
        this._doAssets(js,()=>{
          global.tip('恭喜您加入本机友会！') ;
        }) ;
      },
      ever:(js)=>{
        this.digXing = false ;

        if(js && js.code && js.code == '303'){
          this.setState({promptJoinVisible:true,'promptTitle':js.msg}) ;
        }
      }
    }) ;
  }


  _doAssets(js,cb) {
    if(!js.did) return ;
    if(this.unmount) return ;

    this.setState({did:true},cb) ;
  }

  _promptOnSubmit(val){
    this.setState({promptJoinVisible:false,joinMsg:val},this._onPress) ;
  }

  render(){
    let style = [styles.opsBtn,styles.opsBtnIm] ;
    if(this.state.did) style.push(styles.opsBtnDid) ;
    if(this.props.style) style.push(this.props.style) ;

    let joinText = '＋加入本会' ;
    if(this.state.did) joinText = '邀请好友' ;

    return (
      <TouchableHighlight style={style} underlayColor="#aaa" onPress={this._onPress.bind(this)}>
        <View style={styles.opsBtnView}>
          <Text style={[styles.opsBtnText,styles.opsBtnImText]} allowFontScaling={false}>{joinText}</Text>

          <Prompt
            title={this.state.promptTitle}
            placeholder=''
            defaultValue=''
            visible={this.state.promptJoinVisible}
            cancelText='取消'
            submitText='确认'
            onCancel={()=>this.setState({
              promptJoinVisible: false,
            })}
            onSubmit={this._promptOnSubmit.bind(this)} />
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
  },
}) ;
