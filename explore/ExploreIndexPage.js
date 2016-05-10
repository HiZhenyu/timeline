import React, {
  StyleSheet,
  TouchableHighlight ,
  Text,
} from 'react-native';

import LCTitle from './../module/pub/LCTitle' ;
import LCMoreBox from './../module/pub/LCMoreBox' ;
import LCExFindMore from './../module/explore/LCExFindMore' ;
import LCExSuperb from './../module/explore/LCExSuperb' ;
import LCCatHots from './../module/cat/LCCatHots' ;

import LCPage from './../LCPage' ;

export default class ExploreIndexPage extends LCPage {
  constructor(props) {
    super(props) ;

    this.theComponents = [
      {
        component : LCExFindMore ,
        props : {} ,
      },
      {
        component : LCTitle ,
        props : {title : '热门机友会'} ,
      },
      {
        component : LCCatHots ,
        props : {
          mkind : 8,
          msubject : 4 ,
          location : 4 ,

          locationFooter : <LCMoreBox title="更多热门机友会=>" onPress={this._onPressMoreCat.bind(this)} />,
          itemCatProps : {styleId:1 , style:styles.catItem} ,
          style : styles.catListWrap ,
          groupStyle : styles.catListGroupWrap ,
        } ,
        key : 'cathots'
      } ,
      {
        component : LCTitle ,
        props : {title : '更多精彩尽在机友会'} ,
      },
      {
        component : LCExSuperb ,
        props : {} ,
      },
    ] ;
  }

  _onPressMoreCat(){
    if(!this.props.navigator) return ;
    var props = {} ;

    //使用Navigation方案
    this.props.navigator.push({
      screen: 'cat.CatHotPage',
      passProps: props,
      animated: true,
      title: '热门机友会',
      backButtonTitle: '返回',
      backButtonHidden: false,
      navigatorStyle: {
        tabBarHidden: true,
        navBarBackgroundColor: '#f9f9f9',
        navBarBackgroundColor: '#f9f9f9',
        navBarButtonColor: '#555',
      },
      navigatorButtons: {}
    });
  }
}

const styles = StyleSheet.create({
  catListWrap:{
    backgroundColor:'#fff',
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
}) ;
