import React, {
  Component,
  StyleSheet,
  TouchableHighlight ,
  View,
  Text,
  Image
} from 'react-native';

import LCTimelineItem from './LCTimelineItem' ;
import LCMDig from './../op/LCMDig' ;
import LCUser from './../user/LCUser' ;


export default class LCTimelineDetail extends Component {

  constructor(props) {
    super(props) ;

    this.state = {
      timeline : props.timeline ? props.timeline : {}
    } ;

    this.storageKey = 'timelinedetail' ;
    this.storageExpires = 86400*1000 ;
  }

  componentWillReceiveProps(nextProps){
    if(!this.props.doUpdate && nextProps.doUpdate) this._fetch(nextProps.updateCallback ? nextProps.updateCallback:null,true) ;
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
    return this._fetchDefault() ;
  }

  _getStorageId(){
    return this.state.timeline.id ;
  }

  //获取初始状态的
  _fetchDefault(callback){
    if(this.loading) return false ;
    this.loading = true ;

    global.storage.sync[this.storageKey] = ((params)=>{
      this.loading = false ;
      this._fetch(callback) ;
    }).bind(this) ;

    global.storage.load({
        key: this.storageKey ,
        id:this._getStorageId(),
        autoSync: true,
        syncInBackground: false,
    }).then( ret => {
      this._doAssets(ret) ;
      this.loading = false ;
      if(callback) callback(ret) ;
    }).catch( err => {
        this.loading = false ;

        //没读取到
        this._fetch(callback) ;
    }) ;

    return true;
  }

  //通过远程接口获取
  _fetch(callback){
    if(this.loading) return false ;

    var post = {} ;
    post.id = this.state.timeline.id ;

    this.loading = true ;
    global.v2iapi('timeline','detail',post,{
      succ:(js)=>{
        this._doAssets(js) ;
        global.storage.save({key:this.storageKey,id:this._getStorageId(),rawData:js,expires:this.storageExpires}) ;
      },
      ever:(js)=>{
        if(callback) callback(js) ;
        this.loading = false ;
      }
    }) ;
  }

  _doAssets(js) {
    var newState = {timeline:js.timeline} ;

    if(!this.unmount) this.setState(newState) ;
  }

  render(){
    let timeline = this.state.timeline ;
    if(!timeline.digs) timeline.digs = {list:[],sum:0} ;
    let digsTpl = null ;

    if(timeline.digs.list.length > 0){
      let digsUserTpls = timeline.digs.list.map((adig,i)=><LCUser navigator={this.props.navigator} style={styles.digUser} hiddenName={true} key={i} styleId={1} user={adig.user} />) ;

      digsTpl = (
        <View style={styles.digsWrap}>
          <Image style={styles.digsIcon} source={require('./../../images/icon_dig.png')} />
          <View style={styles.digs}>
            {digsUserTpls}
          </View>
        </View>
      ) ;
    }


    let style = [styles.wrap] ;
    if(this.props.style) style.push(this.props.style) ;

    return (
      <View style={style}>
        <LCTimelineItem navigator={this.props.navigator} style={styles.timelineDetail} timeline={timeline} hiddenCommentsAndDigs={true} hiddenMCommentAndMdig={true} />

        <View style={styles.mdig}>
          <LCMDig navigator={this.props.navigator} digImageStyle={{width:25,height:25,marginRight:5}} digTextStyle={{fontSize:16}} timelineId={timeline.id} isum={timeline.dig.sum} />
        </View>
        {timeline.digs.list.length > 0 ?
          <View style={styles.drline}>
            <Image style={styles.drimage} source={require('./../../images/icon_dr.png')} />
          </View>
          :null
        }
        {digsTpl}
      </View>
    ) ;
  }
}

const styles = StyleSheet.create({
  wrap:{
    backgroundColor:'#fff',
  },
  timelineDetail:{
    borderBottomWidth:0,
  },
  mdig:{
    flexDirection:'row',
    flex:1,
    justifyContent:'center',
    paddingBottom:15,
  },
  drimage:{
    width:22,
    height:11,
    position:'relative',
    bottom:-1,
    marginLeft:30,
  },
  drline:{
    borderBottomWidth:1,
    borderBottomColor:'#ddd',
  },
  digsWrap:{
    padding:10,
    flexDirection:'row',
  },
  digsIcon:{
    width:24,
    height:24,
    resizeMode:'contain',
    marginTop:10,
    marginRight:5,
  },
  digs:{
    flex:1,
    flexDirection:'row',
    flexWrap:'wrap',
  },
  digUser:{
    marginRight:2,
    marginBottom:3,
  },
  noDigsWrap:{
    alignItems:'center',
    justifyContent:'center',
    height:40,
  }
}) ;
