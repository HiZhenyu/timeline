import React, {
  StyleSheet,
  TouchableHighlight ,
  View,
  Image
} from 'react-native';

import {IndicatorViewPager, PagerDotIndicator} from 'rn-viewpager';
import LCList from './../LCList' ;

export default class LCFocusImages extends LCList {
  constructor(props) {
    super(props);

    this.height = React.Dimensions.get('window').width*5/9 ;

    this.defaultStoreListSize = 100 ;
    this.postKeyMap = {} ;
    this.storageKey = 'focusimages' ;
    this.storageExpires = 3600*1000 ;
    this.apiPath = 'slideimage/index' ;
  }

  _onPressItem(item){
    console.log(item) ;
  }

  renderCList(){
    let tpls = this.mapDataSource(item=>{
      if(item.icon) item.icon = global.getUploadURL(item.icon) ;
      return (
        <View key={item.id}>
          <TouchableHighlight underlayColor="#ccc" style={[styles.slideItem]} onPress={this._onPressItem.bind(this,item)}>
            <Image source={{uri: item.icon}} style={[styles.img,{height:this.height}]} />
          </TouchableHighlight>
        </View>
      ) ;
    }) ;

    return (
      <IndicatorViewPager style={{height:this.height}} indicator={(<PagerDotIndicator pageCount={tpls.length} />)}>
        {tpls}
      </IndicatorViewPager>
    ) ;
  }
}

const styles = StyleSheet.create({
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
