import React, {
  Component,
  StyleSheet,
  TouchableOpacity,
  Image,
  View,
  Text
} from 'react-native';

import LCUser from './../user/LCUser' ;
import LCTimelineImages from './../image/LCTimelineImages' ;

export default class LCCommentItem extends Component {
  constructor(props) {
    super(props);
    this.state = {
      comment : this.props.comment ,
    } ;
  }

  render(){
    let comment = this.state.comment ;
    let {images,user} = comment ;

    let commentText = comment.content ? comment.content : comment.title ;

    let pwidth = React.Dimensions.get('window').width - 60 ;

    let tplTitle = commentText ? <Text style={styles.commentText} allowFontScaling={false}>{global.getEmotionContents(commentText)}</Text> : false ;
    let tplImages = images && images.sum ? <LCTimelineImages navigator={this.props.navigator} oneImageCenter={false} pwidth={pwidth} images={images.list} /> : false ;

    let style = [styles.item,styles.flex] ;
    if(this.props.style) style.push(this.props.style) ;

    let lineTpl = (this.props.rowID && this.props.rowID !='0') ? (<View style={[styles.commentLine,this.props.lineStyle]} />) : null ;

    return (
      <View style={style} key={comment.id}>
        {lineTpl}
        <View style={[styles.flexRow]}>
          <View style={styles.userWrap}><LCUser navigator={this.props.navigator} userNameStyle={styles.userNameStyle} user={comment.user} styleId={1} /></View>
          <View style={styles.postTime}>
            <Text style={styles.postTimeText} allowFontScaling={false}>{comment.create_time}</Text>
          </View>
          <TouchableOpacity style={styles.toReply}>
            <Image resizeMode="contain" style={styles.toReplyImage} source={require('./../../images/icon_reply.png')} />
          </TouchableOpacity>
        </View>
        <View style={styles.comment}>
          {tplTitle}
          {tplImages}
        </View>
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
  item:{
    padding:10,
    paddingBottom:15,
    backgroundColor:'#fff',
  } ,
  commentLine:{
    borderTopWidth:1,
    borderTopColor:'#eee',
    paddingTop:15,
    marginLeft:52,
  },
  toReply:{
    width:30,
    paddingTop:10,
  },
  toReplyImage:{
    width:20,
    height:19,
  },
  postTime:{
    position:'absolute',
    left:52,
    top:24,
  } ,
  postTimeText:{
    fontSize:12,
    textAlign:'left',
    color:'#666',
    marginTop:5,
    backgroundColor:'transparent'
  } ,
  comment:{
    marginTop:10,
    paddingLeft:52,
  } ,
  commentText:{
    lineHeight:20,
    color:'#333',
    fontSize:16,
  } ,
  commentOps:{
    marginTop:10,
    opacity:0.8,
    flexWrap:'wrap'
  } ,
  userWrap:{
    flex:1,
  },
  userNameStyle:{
    marginTop:8,
  },
}) ;
