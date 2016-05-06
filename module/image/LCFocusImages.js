import React, {
  Component,
  StyleSheet,
  TouchableHighlight ,
  View,
  Image,
  Text
} from 'react-native';

import {IndicatorViewPager, PagerDotIndicator} from 'rn-viewpager';
import GiftedSpinner from 'react-native-gifted-spinner' ;

export default class LCFocusImages extends Component {
  constructor(props) {
    super(props);

    this.state = {
      height:React.Dimensions.get('window').width*5/9,
      list: []
    };
  }

  componentDidMount(){
    return this._fetchDefault() ;
  }

  componentWillReceiveProps(nextProps){
    if(!this.props.doUpdate && nextProps.doUpdate) this._fetch(nextProps.updateCallback ? nextProps.updateCallback:null) ;
  }

  _onPress(data){
    //console.log(data.mod) ;
  }

  //获取初始状态的
  _fetchDefault(callback){
    if(this.loading) return false ;
    this.loading = true ;

    global.storage.sync.indexslideimages = (()=>{
      this.loading = false ;
      this._fetch(callback) ;
    }).bind(this) ;

    global.storage.load({
        key: 'indexfoucsimages' ,
        autoSync: true,
        syncInBackground: false,
    }).then( ret => {
      this._doAssets(ret) ;
      if(callback) callback(ret) ;

      this.loading = false ;
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

    this.loading = true ;
    global.v2iapi('slideimage','index',post,{
      succ:(js)=>{
        this._doAssets(js) ;
        global.storage.save({key:'indexslideimages',rawData:js,expires:3*3600*1000}) ;
      },
      ever:(js)=>{
        if(callback) callback(js) ;
        this.loading = false ;
      }
    }) ;
  }

  _doAssets(js){
    this.setState({list:js.list}) ;
    return null ;
  }

  render(){
    var list = this.state.list ;
    var listSize = list.length ;
    if(!list || listSize < 1) return (<View style={[styles.spinner,{height:this.state.height}]}><GiftedSpinner /><Text>正在加载...</Text></View>) ;

    var tpls = [] ;
    list.map((data)=>{
      if(data.icon) data.icon = global.getUploadURL(data.icon) ;

      tpls.push(
        <View key={data.id}>
          <TouchableHighlight underlayColor="#ccc"  style={[styles.slideItem]} onPress={this._onPress.bind(this,data)}>
            <Image source={{uri: data.icon}} style={[styles.img,{height:this.state.height}]} />
          </TouchableHighlight>
        </View>
      ) ;
    }) ;

    return (
      <IndicatorViewPager style={{height:this.state.height}} indicator={(<PagerDotIndicator pageCount={this.state.list.length} />)}>
        {tpls}
      </IndicatorViewPager>
    ) ;
  }
}

const styles = StyleSheet.create({
  spinner:{
    alignItems:'center',
    justifyContent:'center',
    flexDirection:'row'
  },
  img:{
    resizeMode:'stretch',
    flex:1
  } ,
  slideItem: {
    backgroundColor: 'transparent',
    flex:1
  },
  dotView:{
    backgroundColor:'rgba(255,255,255,.3)',
    width:6,
    height:6,
    borderRadius:3,
    marginLeft:3,
    marginRight:3,
  } ,
  actDotView:{
    backgroundColor: '#fff'
  }
}) ;
