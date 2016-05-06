import React, {
  Component,
  StyleSheet,
  TouchableHighlight,
  Image,
  View,
  Text
} from 'react-native';

import LCTimelineImages from './../image/LCTimelineImages' ;
import LCUser from './../user/LCUser' ;
import LCMComment from './../op/LCMComment' ;
import LCMDig from './../op/LCMDig' ;
import LCMDrop from './../op/LCMDrop' ;
import LCComments from './../comment/LCComments' ;
import LCDigs from './../dig/LCDigs' ;
import LCCatItem from './../cat/LCCatItem' ;
import LCSubjectItem from './../subject/LCSubjectItem' ;

export default class LCTimelineItem extends Component {
  constructor(props) {
    super(props);
    this.state = {
      timeline : this.props.timeline ,
    } ;
  }

  componentWillReceiveProps(nextProps){
    let otimeline = this.state.timeline ;
    let ntimeline = nextProps.timeline ;

    if(otimeline.id != ntimeline.id || otimeline.content != ntimeline.content || otimeline.digs.sum != ntimeline.digs.sum || otimeline.comments.sum != ntimeline.comments.sum){
        this.setState({timeline:nextProps.timeline}) ;
    }
  }

  _onPress(){
    if(!this.props.navigator) return ;
    var props = {timeline:this.state.timeline} ;

    //使用Navigation方案
    this.props.navigator.push({
      screen: 'timeline.TimelinePage',
      title: props.timeline.cat.name,
      backButtonTitle: '返回',
      passProps: props,
      animated: true,
      backButtonHidden: false,
      navigatorStyle: {
        tabBarHidden: true,
      } ,
      navigatorButtons: {}
    });

    return ;
  }

  render(){
    let timeline = this.state.timeline ;
    let {images,digs,comments} = timeline ;

    if(!timeline.comment) timeline.comment = {} ;
    if(!timeline.dig) timeline.dig = {} ;

    let timelineText = timeline.content ? timeline.content : timeline.title ;

    let tplSubject = timeline.subject && timeline.subject.id ? (<LCSubjectItem navigator={this.props.navigator} subject={timeline.subject} />) : null ;
    let tplTitle = timelineText ? <Text style={styles.timelineText} allowFontScaling={false}>{tplSubject}{global.getEmotionContents(timelineText)}</Text> : false ;
    let tplImages = images && images.sum ? <LCTimelineImages navigator={this.props.navigator} oneImageInCenter={true} images={images.list} /> : false ;
    let tplDigs = digs && digs.list && digs.list.length > 0  ? <LCDigs navigator={this.props.navigator} list={digs.list} sum={digs.sum} style={styles.digs} /> : false ;
    let tplComments = comments && comments.list && comments.list.length > 0 ? <LCComments navigator={this.props.navigator} timeline={timeline} list={comments.list} sum={comments.sum}  style={styles.comments} /> : false ;

    let tplDCLine = tplDigs && tplComments ? <View style={styles.dcline} /> : false ;

    let tplCommentsMore = comments && comments.sum > 0 ? (
        <View style={styles.more}>
          <Text allowFontScaling={false} style={styles.moreText} onPress={this._onPress.bind(this)}>查看全部{comments.sum}条评论=></Text>
        </View>) : null ;

    let tplDCs = tplDigs || tplComments ?
      <View style={styles.plr10}>
        <Image style={styles.commentsTop} source={require('./../../images/icon_tr.png')} />
        <View style={styles.commentsWrap}>
          {tplDigs}
          {tplDCLine}
          {tplComments}
          {tplCommentsMore}
        </View>
      </View>
      : false ;


    let tplOps = (
      <View style={[styles.flexRow,styles.timelineOps,styles.flex,styles.plr10]}>
        <LCMComment navigator={this.props.navigator} timelineId={timeline.id} isum={timeline.comment.sum} />
        <View style={{marginLeft:20}} />
        <LCMDig navigator={this.props.navigator} timelineId={timeline.id} showDigText={true} did={timeline.dig.did} isum={timeline.dig.sum} timelineObj={this} />
        <View style={styles.flex} />
        <LCMDrop navigator={this.props.navigator} timelineId={timeline.id} />
      </View>) ;


    if(this.props.hiddenCommentsAndDigs) tplDCs = null ;
    if(this.props.hiddenMCommentAndMdig) tplOps = null ;

    let style = [styles.item,styles.flex] ;
    if(this.props.style) style.push(this.props.style) ;

    //主要内容（图片和文字）
    let tplContents = (<View style={styles.flex,styles.plr10}>{tplTitle}{tplImages}</View>) ;
    if(this.props.pressButton) tplContents = (<TouchableHighlight onPress={this._onPress.bind(this)} style={{paddingTop:5,paddingBottom:5}} underlayColor="#eee">{tplContents}</TouchableHighlight>)

    return (
      <View style={style} key={timeline.id}>
        <View style={[styles.flexRow,styles.plr10]}>
          <View style={styles.userWrap}><LCUser navigator={this.props.navigator} user={timeline.user} styleId={1} style={styles.user} /></View>
          <View style={styles.postTime}>
            <Text style={styles.postTimeText} allowFontScaling={false}>{timeline.create_time}</Text>
          </View>
        </View>
        <View style={styles.timeline}>
          {timeline.content && timeline.content.indexOf(timeline.title) != 0 ?
            <Text style={styles.timelineTitle} allowFontScaling={false}>{timeline.title}</Text> : null
          }
          {tplContents}
          <LCCatItem navigator={this.props.navigator} cat={timeline.cat} style={[styles.catLine,styles.plr10]} styleId={2} />
          {tplOps}
        </View>
        {tplDCs}
      </View>
    ) ;
  }
}

const styles = StyleSheet.create({
  flex:{
    flex:1,
  } ,
  flexRow:{
    flexDirection:'row'
  } ,
  plr10:{
    paddingLeft:10,
    paddingRight:10,
  },
  item:{
    paddingTop:10,
    paddingBottom:10,
    backgroundColor:'#fff',
    borderBottomWidth:1,
    borderBottomColor:'#eee',
  } ,
  postTime:{
    width:80,
  } ,
  postTimeText:{
    fontSize:12,
    textAlign:'right',
    color:'#666',
    marginTop:9,
  } ,
  timeline:{
    marginTop:5,
  } ,
  timelineText:{
    lineHeight:23,
    color:'#333',
    fontSize:16,
  } ,
  timelineTitle:{
    fontSize:18,
    textAlign:'center',
    padding:10,
    fontWeight:'bold',
  },
  timelineOps:{
    marginTop:10,
    opacity:0.8,
    flexWrap:'wrap'
  } ,
  commentsWrap:{
    backgroundColor:'#eee',
    borderRadius:3,
  } ,
  comments:{

  } ,
  commentsTop:{
    marginTop:5,
    width:10,
    height:6,
    marginLeft:20,
  } ,
  dcline:{
    borderTopWidth:1,
    borderTopColor:'#ccc',
    height:1,
  },
  catLine:{
    marginTop:10,
    marginBottom:5,
  },
  userWrap:{
    flex:1,
  },
  more:{
    alignItems:'center',
    padding:2,
    paddingTop:10,
  },
  moreText:{
    color:'#0049bb',
    fontSize:14,
    padding:3,
  }
}) ;
