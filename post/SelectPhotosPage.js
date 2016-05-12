import React,{ Component } from 'react' ;
import {
  StyleSheet,
  TouchableHighlight ,
  TouchableOpacity ,
  View,
  Text,
  Image,
  CameraRoll,
  ListView,
  Dimensions,
  Platform
} from 'react-native';

import InvertibleScrollView from 'react-native-invertible-scroll-view';
import GiftedSpinner from 'react-native-gifted-spinner' ;
import { Navigation } from 'react-native-navigation';

export default class SelectPhotosPage extends Component {
  static defaultProps = {
    groupTypes: 'SavedPhotos',
    batchSize: 50,
    assetType: 'Photos',
    scrollsToTop : true ,
    maxSelectNum : 9 ,
    selectedPhotos : [] ,
  } ;

  constructor(props) {
    super(props) ;

    this.state = {
      groupTypes: this.props.groupTypes,
      assetType: this.props.assetType,
      noMore: false ,
      didMount: false ,
      dataSource: new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2}),
      selectedCount:props.selectedPhotos.length ,
    };

    this.selectedItems = {} ;

    //默认值
    props.selectedPhotos.map(it=>this.selectedItems[it]={image:{uri:it},checked:true}) ;

    this.list = [] ;
    this.lastCursor = (null : ?string) ;
  }

  componentDidMount() {
    this._doMount();
  }

  //
  componentWillUnmount() {
    this.unmount = true ;
  }

  //默认执行方法
  _doMount(callback){
    return this._fetch(callback) ;
  }


  _fetch(callback){
    if(this.loading) return ;

    let params = {
      first: this.props.batchSize,
      groupTypes: this.props.groupTypes,
      assetType: this.props.assetType,
    } ;

    Platform.OS === 'android' && (delete params.groupTypes) ;
    this.lastCursor && (params.after = this.lastCursor) ;

    this.loading = true ;
    CameraRoll.getPhotos(params).then(
      ret => {
        this.loading = false ;
        this._doAssets(ret) ;
      },
      e => {
        this.loading = false ;
        global.tip('获取相册数据失败!') ;
      }
    );
  }

  _doReset(){

  }

  _onEndReached(){
    if(this.state.noMore) return ;
    return this._fetch() ;
  }

  _getLoadingView(style){
    return (<View style={[styles.spinner,styles.item,style]}><GiftedSpinner /><Text style={{textAlign:'center'}} allowFontScaling={false}>正在加载...</Text></View>) ;
  }

  _doAssets(data) {
    let newState = {} ;
    newState.didMount = true ;

    //没有更多了
    if (!data.page_info.has_next_page) newState.noMore = true;

    //
    if (data.edges.length > 0) {
      this.lastCursor = data.page_info.end_cursor ;

      this.list = this.list.concat(data.edges.map(it=>it.node)) ;
      newState.dataSource = this.state.dataSource.cloneWithRows(this.list);
    }

    !this.unmount && this.setState(newState) ;
  }

  renderRow(item,sid,i) {
    this.selectedItems[item.image.uri] && (item.checked = true) ;
    return <LCSelectPhotosPItem photo={item} key={i} mainComponent={this} />
  }

  onCheck(item){
    let pkey = item.image.uri ;

    if(item.checked){
      if(this.state.selectedCount >= this.props.maxSelectNum){
        global.tip('最多只能选择'+this.props.maxSelectNum+'张照片') ;
        return false ;
      }

      this.selectedItems[pkey] = item ;
    }else this.selectedItems[pkey] && (delete this.selectedItems[pkey]) ;

    this.setState({selectedCount:this.state.selectedCount + (item.checked ? 1 : -1) }) ;
    return true ;
  }

  getSelectedItems(){
    let ret = [] ;
    for(let k in this.selectedItems) ret.push(this.selectedItems[k]) ;

    return ret ;
  }

  onPressToReview(){
    let props = {images:this.getSelectedItems().map(it=>it.image),defaultIndex:0} ;

    Navigation.showModal({
      screen: 'timeline.SlideImagesPage',
      title: '',
      passProps: props,
      navigatorStyle: {
        navBarHidden:true,
        statusBarHidden: true,
      },
      navigatorButtons: {},
      animationType: 'slide-up'
    });

    return ;
  }

  onPressToFinish(){
    if(global.onSuccSelected){
      this.props.navigator.pop() ;
      global.onSuccSelected(this.getSelectedItems(),...arguments) ;
      delete global.onSuccSelected ;
    }
  }

  render(){
    if(!this.state.didMount) return this._getLoadingView({flex:1}) ;

    let selectNumTpl = null ;
    let styleBtnLText = [styles.btnLDisabeldText] ;
    let styleBtnRText = [styles.btnRDisabeldText] ;
    let styleBtn = [styles.btn] ;

    let btnToReview = null ;
    let btnToFinish = null ;

    if(this.state.selectedCount){
      selectNumTpl = <Image style={styles.iconBtn}><Text style={styles.iconBtnText} allowFontScaling={false}>{this.state.selectedCount}</Text></Image> ;
      styleBtnLText.push(styles.btnLText) ;
      styleBtnRText.push(styles.btnRText) ;

      btnToReview = this.onPressToReview.bind(this) ;
      btnToFinish = this.onPressToFinish.bind(this) ;
    }

    return (
      <View style={styles.wrap}>
        <ListView
          renderScrollComponent={props => <InvertibleScrollView {...props} inverted />}
          scrollsToTop={this.props.scrollsToTop}
          enableEmptySections={true}

          dataSource={this.state.dataSource}
          renderRow={this.renderRow.bind(this)}
          renderFooter={this.props.renderFooter}
          renderHeader={this.props.renderHeader}
          onEndReached={this._onEndReached.bind(this)}
          contentContainerStyle={styles.container}

          onEndReachedThreshold={220}
          pageSize={10}
        />
        <View style={styles.bottomBar}>
          <TouchableOpacity underlayColor="#ccc" style={styleBtn} onPress={btnToReview}>
            <Text style={styleBtnLText} allowFontScaling={false}>预览</Text>
          </TouchableOpacity>
          <TouchableOpacity underlayColor="#ccc" style={styleBtn} onPress={btnToFinish}>
            <View style={styles.btnRView}>
              {selectNumTpl}
              <Text style={styleBtnRText} allowFontScaling={false}>完成</Text>
            </View>
          </TouchableOpacity>
        </View>
      </View>
    ) ;
  }
}



class LCSelectPhotosPItem extends Component {
  constructor(props) {
    super(props) ;

    this.state = {
      photo : this.props.photo ,
    }
  }

  render(){
    let photo = this.state.photo ;
    let checkImageIcon = require('./../images/icon_check.png') ;
    photo.checked && (checkImageIcon = require('./../images/icon_checked.png'));

    return (
      <TouchableHighlight style={styles.item} underlayColor="#eee" onPress={this._onPress.bind(this)}>
        <View>
          <Image source={photo.image} style={styles.itemImage} />
          <Image style={styles.itemCheckIcon} source={checkImageIcon} />
        </View>
      </TouchableHighlight>
    ) ;
  }


  _onPress(){
    let photo = this.state.photo ;
    photo.checked = !photo.checked ;

    if(!this.props.mainComponent.onCheck(photo)) return false ;
    this.setState({photo:photo}) ;
  }
}


const rowNum = 4 ;
const itemWidth = (Dimensions.get('window').width - 8*(rowNum+1)) / rowNum ;
const styles = StyleSheet.create({
  spinner:{
    width: itemWidth ,
    height: itemWidth ,
    alignItems:'center',
    justifyContent:'center',
    flexDirection:'row',
  },
  wrap:{
    flex:1,
  } ,
  container:{
    flexDirection:'row',
    flexWrap:'wrap',
    padding:4,
  },

  item:{
    width: itemWidth ,
    height: itemWidth ,
    margin: 4 ,
  } ,

  itemImage:{
    width: itemWidth ,
    height: itemWidth ,
    resizeMode: 'cover' ,
  } ,

  itemPopNum:{
    backgroundColor:'#ff6600',
    borderRadius:12,
    width:24,
    height:24,
    borderColor:'#fff',
    borderWidth:1,
    position:'relative',
    top:-itemWidth + 5,
    left:itemWidth - 25,
  } ,

  itemCheckIcon:{
    width:18,
    height:18,
    position:'relative',
    top:-itemWidth + 5,
    left:itemWidth - 25,
  } ,

  itemPopNumText:{
    color:'#fff',
    textAlign:'center',
    lineHeight:16,
    fontSize:12
  },

  bottomBar:{
    height:45,
    borderTopWidth:1,
    borderTopColor:'#ccc',
    flexDirection:'row',
    justifyContent:'space-between',
    alignItems:'center',
    paddingLeft:10,
    paddingRight:10,
    backgroundColor:'#f9f9f9',
  },

  btn:{
    alignItems:'center',
    justifyContent:'center',
  },


  btnLText:{
    color:'#333',
  },
  btnRText:{
    color:'#ff6600',
  },
  btnLDisabeldText:{
    color:'rgba(51, 51, 51, 0.5)',
  },
  btnRDisabeldText:{
    color:'rgba(255, 102, 0, 0.5)',
  },

  btnRView:{
    flexDirection:'row',
    justifyContent:'center',
  },

  iconBtn:{
    width:18,
    height:18,
    alignItems:'center',
    justifyContent:'center',
    backgroundColor:'#ff6600',
    marginRight:5,
    borderRadius:9,
    marginTop:-2,
  },
  iconBtnText:{
    color:'#fff',
    fontSize:12,
  },

}) ;
