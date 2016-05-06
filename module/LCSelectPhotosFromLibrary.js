import React, {
  Component,
  StyleSheet,
  TouchableHighlight ,
  View,
  Text,
  Image,
  CameraRoll,
  ListView,
  Platform,
} from 'react-native';

import GiftedSpinner from 'react-native-gifted-spinner' ;

export default class LCSelectPhotosFromLibrary extends Component {
  static defaultProps = {
    groupTypes: 'SavedPhotos',
    batchSize: 5,
    assetType: 'Photos'
  } ;

  constructor(props) {
    super(props) ;

    var ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2}) ;

    this.state = {
      assets: ([]: Array<Image>),
      groupTypes: this.props.groupTypes,
      lastCursor: (null : ?string),
      assetType: this.props.assetType,
      noMore: false,
      loadingMore: false,
      dataSource: ds,
      selectedItems: {},
    };

  }

  componentDidMount() {
    this.fetch();
  }

  fetch(clear?: boolean) {
    if (!this.state.loadingMore) {
      this.setState({loadingMore: true}, () => { this._fetch(clear); });
    }
  }

  _fetch(clear?: boolean) {
    if (clear) {
      this.setState(LCSelectPhotosFromLibrary.defaultProps, this.fetch);
      return;
    }

    var fetchParams: Object = {
      first: this.props.batchSize,
      groupTypes: this.props.groupTypes,
      assetType: this.props.assetType,
    };
    if (Platform.OS === "android") {
      // not supported in android
      delete fetchParams.groupTypes;
    }
    if (this.state.lastCursor) {
      fetchParams.after = this.state.lastCursor;
    }

    CameraRoll.getPhotos(fetchParams)
      .then((data) => this._appendAssets(data), (e) => console.log(e));
  }


  _appendAssets(data) {
    var assets = data.edges;
    var newState = { loadingMore: false } ;

    if (!data.page_info.has_next_page) {
      newState.noMore = true;
    }

    if (assets.length > 0) {
      newState.lastCursor = data.page_info.end_cursor;
      newState.assets = this.state.assets.concat(assets);
      newState.dataSource = this.state.dataSource.cloneWithRows(newState.assets);
    }

    this.setState(newState);
  }

  _onEndReached() {
    if (!this.state.noMore) {
      this.fetch();
    }
  }

  _renderFooterSpinner() {
    if (!this.state.noMore) {
      return (<GiftedSpinner style={styles.spinner} />) ;
    }
    return null;
  }

  _renderRow(asset) {
    var popNum = []  ;
    const pkey = asset.node.image.uri ;
    const itemI = this.state.selectedItems[pkey] ;

    if(itemI){
      popNum = (<Image style={styles.itemPopNum}><Text style={styles.itemPopNumText} allowFontScaling={false}>{itemI}</Text></Image>) ;
    }

    return (
      <TouchableHighlight key={asset} underlayColor="#eee" onPress={this._press.bind(this,asset)}>
        <View style={styles.item}>
          <Image source={asset.node.image} style={styles.itemImage} />
          {popNum}
        </View>
      </TouchableHighlight>
    );
  }

  _press(asset){
    const pkey = asset.node.image.uri ;
    if(this.state.selectedItems[pkey]) delete this.state.selectedItems[pkey] ;
    else this.state.selectedItems[pkey] = 1;

    var i = 0 ;
    for(var k in this.state.selectedItems){
      if(!this.state.selectedItems[k]) continue ;
      this.state.selectedItems[k] = ++i ;
    }
    this.setState(this.state) ;
  }

  render(){
    return (
      <ListView
        renderRow={this._renderRow.bind(this)}
        renderFooter={this._renderFooterSpinner.bind(this)}
        onEndReached={this._onEndReached.bind(this)}
        contentContainerStyle={[styles.container]}
        dataSource={this.state.dataSource}
      />
    ) ;
  }
}

const rowNum = 3 ;
const itemWidth = (global.PWidth - 8*(rowNum+1)) / rowNum ;
const styles = StyleSheet.create({
  container:{
    flex: 1,
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
    borderRadius:11,
    width:22,
    height:22,
    borderColor:'#fff',
    borderWidth:2,
    position:'relative',
    top:-itemWidth + 5,
    left:itemWidth - 25,
  } ,

  itemPopNumText:{
    color:'#fff',
    textAlign:'center',
    lineHeight:16,
    fontSize:12
  }

}) ;
