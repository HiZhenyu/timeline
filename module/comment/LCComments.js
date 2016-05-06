import React, {
  Component,
  StyleSheet,
  View,
  ListView,
  Text,
  Image
} from 'react-native';

import LCUser from './../user/LCUser' ;

export default class LCComments extends Component {
  constructor(props) {
    super(props) ;

    this.state = {
      list : this.props.list ? this.props.list : [] ,
      timeline: this.props.timeline ? this.props.timeline : null ,
    };

    this.state.sum = this.props.sum ? this.props.sum : this.state.list.length ;
  }

  componentWillReceiveProps(nextProps){
    var nsum = nextProps.sum ? nextProps.sum : nextProps.list.length ;
    if(nsum != this.state.sum) this.setState({list:nextProps.list,sum:nsum}) ;
  }

  _onPressMore(){
    if(!this.props.navigator) return ;

    var props = {timeline:this.state.timeline} ;
    this.props.navigator.push({
        name: 'TimelinePage',
        component: TimelinePage,
        params: props,
        passProps: props,
    });
  }

  _renderRow(comment){
    var contents = global.getEmotionContents(comment.content) ;

    return (
      <View style={[styles.commentsItem]} key={comment.id}>
        <Text style={styles.itemText} allowFontScaling={false}>
          <LCUser navigator={this.props.navigator} user={comment.user} styleId={2} />：
          <Text style={styles.itemcText} numberOfLines={3} allowFontScaling={false}>
          {contents}
          </Text>
        </Text>
      </View>
    ) ;
  }

  render(){
    var style = [styles.comments] ;
    if(this.props.style) style.push(this.props.style) ;

    var tpls = [] ;
    for(var i=0;i<this.state.list.length;i++){
      var comment = this.state.list[i] ;
      tpls.push(this._renderRow(comment)) ;
    }

    return (
      <View style={style}>
        {tpls}
      </View>
      ) ;
  }

}

const styles = StyleSheet.create({
  commentsItem:{
    margin:3,
    marginLeft:0,
    marginRight:0,
  } ,
  comments:{
    padding:5,
    paddingTop:10,
  } ,
  itemText:{
    marginLeft:5,
    color:'#555'
  },
  itemcText:{
    fontSize:14,
  }
}) ;
