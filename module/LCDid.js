import React,{ Component } from 'react' ;

/**
 * 查询是否有，并且可获得
 */
export default class LCDid extends Component {
  constructor(props) {
    super(props) ;

    this.state = {
      did: !!this.props.did ,
    } ;

    //1、检查接口
    this.check = {
      api : '',
      data : {} ,
    } ;

    //2、获取接口
    this.dodid = {
      api : '' ,
      data : {}
    } ;
  }

  componentWillReceiveProps(nextProps){
    if(!this.props.doUpdate && nextProps.doUpdate) this._fetch(nextProps.updateCallback ? nextProps.updateCallback:null) ;
    if(this.props.holdOn && !nextProps.holdOn) return this._doMount() ;
    if(nextProps.did != this.props.did) this.setState({did:nextProps.did}) ;
  }

  componentDidMount() {
    if(this.props.holdOn) return null ;
    return this._doMount() ;
  }

  componentWillUnmount() {
    this.unmount = true ;
  }

  _doMount(){
    return this._fetch() ;
  }

  //使用检查接口
  _fetch(){
    if(!this.check.api) return ;
    v2iapi(this.check.api,this.check.data,{
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

    this.digXing = true ;
    v2iapi(this.dodid.api,this.dodid.data,{
      succ:(js)=>{
        this._doAssets(js) ;

        if(this.dodidThenSucc) this.dodidThenSucc(js) ;
      },
      ever:(js)=>{
        this.digXing = false ;
        if(!js || !js.code || js.code != '200') if(!this.unmount) this.setState({did:false}) ;

        //一个回调
        if(this.dodidThenEver) this.dodidThenEver(js) ;
      }
    }) ;
  }

  _doAssets(js) {
    if(!js.did) return ;
    if(this.unmount) return ;

    this.setState({did:true}) ;
  }

  //自行实现render..
  render(){
    return null ;
  }
}
