import React, {
  StyleSheet,
  TouchableHighlight ,
  View,
  ListView,
  Text,
} from 'react-native';


import LCList from './../LCList' ;
import LCUser from './../user/LCUser' ;
import LCTitle from './../../module/pub/LCTitle' ;

export default class LCCatMemberList extends LCList {

  static defaultProps = {
    itemUserProps: {},
    style: null,
    itemStyle: null ,
    itemStyleId: null ,
    cat:{id:0},
    ps:20,
  } ;

  constructor(props) {
    super(props) ;

    this.storeDefaultListSize = 10 ;
    this.storeListSize = props.loadMore ? this.storeDefaultListSize : 0 ;
    this.postKeyMap = {'cat.id':'id',p:'p'} ;
    this.storageKey = 'catmembers' ;
    this.storageExpires = 3600*1000 ;
    this.apiPath = 'cat/members' ;

    this.thatsAllText = '以上就是本会全部机友' ;
    this.emptyDataSourceText = '本会居然还没有任何机友' ;
  }

  renderHeader(){
    if(this.props.loadMore) return ;
    let titleMemberSum = '本会机友' + (this.state.sum ? '(' + this.state.sum + ')' : '') ;
    return <LCTitle navigator={this.props.navigator} title={titleMemberSum} /> ;
  }

  renderRow(item, sectionID, rowID){
    //使用简单样式
    if(this.props.itemStyleId == '1'){
      let itemStyle = [] ;
      if(this.props.itemStyle) itemStyle.push(this.props.itemStyle) ;
      return (<LCUser navigator={this.props.navigator} key={item.id} style={itemStyle} user={item.user} {...this.props.itemUserProps} />) ;
    }

    //使用完全样式
    let itemStyle = [styles.item] ;
    if(this.props.itemStyle) itemStyle.push(this.props.itemStyle) ;

    let tplChairman = item.chairman_title ? <View style={[styles.itemTitle,styles.itemTitleC]}><Text style={[styles.itemTitleText]} allowFontScaling={false}>{item.chairman_title}</Text></View> : null ;
    let tplTitle = item.title && item.title.name ? <View style={styles.itemTitle}><Text style={styles.itemTitleText} allowFontScaling={false}>{item.title.name}</Text></View> : null ;

    let tplTitles = tplChairman || tplTitle ?
      (<View style={styles.itemTitles}>
        {tplChairman}{tplTitle}
      </View>) : null ;

    return (
      <View style={itemStyle}>
        <LCUser navigator={this.props.navigator} key={item.id} style={styles.itemUser} user={item.user} {...this.props.itemUserProps} />
        <View style={styles.itemTime}><Text style={styles.itemTimeText} allowFontScaling={false}>{item.create_time} 加入</Text></View>
        {tplTitles}
      </View>) ;
  }

}

const styles = StyleSheet.create({
  item:{
    flexDirection:'row',
    alignItems:'center',
    padding:10,
    borderBottomWidth:1,
    borderBottomColor:'#eee',
    backgroundColor:'#fff',
  },
  itemTH:{
    backgroundColor:'#eee',
  },
  itemUser:{
    flex:1,
  },
  itemTime:{
    width:80,
  },
  itemTimeText:{
    textAlign:'center',
    fontSize:12,
  },
  itemTitles:{
    position:'absolute' ,
    bottom:10,
    left:63,
    flexDirection:'row',
  },
  itemTitle:{
    backgroundColor:'#FFC107',
    marginRight:5,
    padding:2,
    height:16,
    borderWidth:0,
    borderColor:'#FFC107',
    borderRadius:3,
  },
  itemTitleC:{
    backgroundColor:'#ff6600',
  },
  itemTitleText:{
    color:'#fff',
    fontSize:12,
  }

}) ;
