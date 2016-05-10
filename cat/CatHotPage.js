import React, {
  StyleSheet,
} from 'react-native';

import GiftedSpinner from 'react-native-gifted-spinner' ;
import LCCatHots from './../module/cat/LCCatHots' ;
import LCTitle from './../module/pub/LCTitle' ;
import LCMoreBox from './../module/pub/LCMoreBox' ;

import LCPage from './../LCPage' ;

export default class CatHotPage extends LCPage {
  constructor(props) {
    super(props) ;

    this.theComponents = [
      {
        component : LCCatHots ,
        props : {
          mkind : 12,
          msubject : 8 ,
          location : 4 ,

          mkindHeader : this._renderCHeader('mkind') ,
          msubjectHeader : this._renderCHeader('msubject') ,
          locationHeader : this._renderCHeader('location') ,

          mkindFooter : this._renderCFooter('mkind') ,
          msubjectFooter : this._renderCFooter('msubject') ,
          locationFooter : this._renderCFooter('location') ,

          itemCatProps : {styleId:1 , style:styles.catItem} ,
          style : styles.catListWrap ,
          groupStyle : styles.catListGroupWrap ,
        } ,
        key : 'cathots'
      } ,
    ] ;
  }

  _onPressMoreCat(m){
    console.log(m) ;
  }

  _getCatMName(m){
    let ms = {
      mkind : '机型',
      msubject: '主题',
      location: '地区',
    } ;

    return name = ms[m] ;
  }

  _renderCHeader(m){
    let title = '热门' + this._getCatMName(m) + '机友会' ;
    return (<LCTitle navigator={this.props.navigator} title={title} style={{marginTop:0}} />) ;
  }

  _renderCFooter(m){
    let title = '更多' + this._getCatMName(m) + '机友会' ;
    return  <LCMoreBox style={styles.btnMore} title={title} onPress={this._onPressMoreCat.bind(this,m)} /> ;
  }

}


const styles = StyleSheet.create({
  flex:{
    flex:1,
  },
  backgroundGray:{
    backgroundColor:'#efefef'
  } ,
  spinner:{
    flex:1,
    height:50,
    alignItems:'center',
    justifyContent:'center',
    flexDirection:'row'
  },

  catListWrap:{
    backgroundColor:'#efefef',
    flex:1,
  },
  catListGroupWrap:{
    flexDirection:'row',
    flexWrap: 'wrap',
    backgroundColor:'#fff',
    flex:1,
  },
  catItem:{

  },
  btnMore:{
    marginBottom:15,
  }
}) ;
