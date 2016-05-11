import React, {
  Component,
  StyleSheet,
  TouchableHighlight ,
  View,
  Text,
  Image
} from 'react-native';

import LCDetail from './../LCDetail' ;

import LCTimelineItem from './LCTimelineItem' ;
import LCMDig from './../op/LCMDig' ;
import LCUser from './../user/LCUser' ;


export default class LCTimelineDetail extends LCDetail {
  constructor(props) {
    super(props) ;

    this.itemKey = 'timeline' ;
    this.itemIdKey = 'id' ;

    this.dataItemKey = 'timeline' ;

    this.apiPath = 'timeline/detail' ;
  }


  _renderDigs(digs){
    if(!digs || !digs.list || digs.list.length < 1) return ;

    return (
      <View>
        <View style={styles.drline}>
          <Image style={styles.drimage} source={require('./../../images/icon_dr.png')} />
        </View>
        <View style={styles.digsWrap}>
          <Image style={styles.digsIcon} source={require('./../../images/icon_dig.png')} />
          <View style={styles.digs}>
            {digs.list.map((adig,i)=>
              <LCUser
                navigator={this.props.navigator}
                style={styles.digUser}
                hiddenName={true}
                key={i}
                styleId={1}
                user={adig.user} />
            )}
          </View>
        </View>
      </View>
    ) ;
  }

  renderDetail(){
    let timeline = this.state.timeline ;
    let digsTpl = this._renderDigs(timeline.digs) ;

    let style = [styles.wrap] ;
    if(this.props.style) style.push(this.props.style) ;

    return (
      <View style={style}>
        <LCTimelineItem
          navigator={this.props.navigator}
          style={styles.timelineDetail}
          timeline={timeline}
          hiddenCommentsAndDigs={true}
          hiddenMCommentAndMdig={true} />

        <View style={styles.mdig}>
          <LCMDig
            navigator={this.props.navigator}
            digImageStyle={{width:25,height:25,marginRight:5}}
            digTextStyle={{fontSize:16}}
            timelineId={timeline.id}
            isum={timeline.dig.sum} />
        </View>
        {digsTpl}
      </View>
    ) ;
  }
}



const styles = StyleSheet.create({
  wrap:{
    backgroundColor:'#fff',
    borderBottomWidth:1,
    borderBottomColor:'#ddd',
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
