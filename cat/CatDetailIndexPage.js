import React from 'react' ;
import {
  StyleSheet,
  TouchableOpacity ,
  Image
} from 'react-native';


import LCTitle from './../module/pub/LCTitle' ;
import LCMoreLine from './../module/pub/LCMoreLine' ;
import LCCatMemberList from './../module/cat/LCCatMemberList' ;
import LCCatChairmans from './../module/cat/LCCatChairmans' ;
import LCTimelineList from './../module/timeline/LCTimelineList' ;
import LCCatSP from './../module/cat/LCCatSP' ;

import LCPage from './../LCPage' ;

export default class CatDetailIndexPage extends LCPage {
  constructor(props) {
    super(props) ;

    this.mainViewProps = {} ;

    let cat = props.cat ;
    this.theComponents = [
      {
        component : LCCatSP ,
        props : {cat : cat} ,
        key : 'catsp' ,
      },
      {
        component : LCCatMemberList ,
        props : {
          style : styles.members ,
          itemStyleId : 1 ,
          itemStyle : styles.memberItem ,
          itemUserProps : {hiddenName:true , styleId:1} ,
          cat : cat ,
          ps : 10 ,
          renderFooter : ()=>(
            <TouchableOpacity style={styles.membersMore} onPress={this._onPressToMember.bind(this)}>
              <Image source={require('./../images/icon_dirto.png')} style={styles.membersMoreImage} />
            </TouchableOpacity>
          )
        } ,
        key : 'memberlist'
      },
      {
        component : LCTitle ,
        props : {title : '本会管理'} ,
      },
      {
        component : LCCatChairmans ,
        props : {cat : cat} ,
        key : 'catchairmans' ,
      },
      {
        component : LCTitle ,
        props : {title : '本会动态'} ,
      },
      {
        component : LCTimelineList ,
        props : {
          catId : cat.id ,
          ps : 10 ,
          scrollsToTop : false,
          renderFooter : ()=>(<LCMoreLine title="查看最新动态..." onPress={this._onPressToTimeline.bind(this)} />) ,
        } ,
        key : 'timeline'
      },

    ] ;
  }

  _onPressToMember(){
    if(!this.props.mainView) return ;
    this.props.mainView.setPage(4) ;
  }

  _onPressToTimeline(){
    if(!this.props.mainView) return ;
    this.props.mainView.setPage(1) ;
  }

}


const styles = StyleSheet.create({
  members:{
    flexDirection:'row',
    backgroundColor:'#fff',
    padding:10,
  },
  memberItem:{
    marginRight:5,
  },
  membersMore:{
    backgroundColor:'transparent',
    padding:20,
    position:'absolute',
    top:55,
    right:0,
  },
  membersMoreImage:{

  }
}) ;
