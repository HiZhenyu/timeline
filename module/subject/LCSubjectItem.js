import React,{ Component } from 'react' ;
import {
  StyleSheet,
  TouchableHighlight ,
  View,
  Text,
  Image,
  Dimensions
} from 'react-native';

export default class LCSubject extends Component {
  constructor(props) {
    super(props) ;
    this.state = {
      subject : this.props.subject
    } ;
  }

  _onPress(){
    if(!this.props.navigator) return ;

    let props = {subject:this.state.subject} ;

    //使用Navigation方案
    this.props.navigator.push({
      screen: 'subject.SubjectPage',
      passProps: props,
      animated: true,
      title: '话题与活动' ,
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


  //丰富的样式
  _renderRichBody(){
    let subject = this.state.subject ;
    subject.icon = global.getUploadURL(subject.icon) ;

    let style = [styles.item] ;
    this.props.style && style.push(this.props.style) ;

    let dateText = [] ;
    subject.startdate && dateText.push(subject.startdate) ;
    subject.enddate && dateText.push(subject.enddate) ;
    dateText = dateText.join(' 到 ') ;

    return (
      <TouchableHighlight style={style} underlayColor="#ccc" onPress={this._onPress.bind(this)}>
        <View style={styles.itemin}>
          <Image source={{uri:subject.icon}} style={styles.image} />
          <Text style={styles.titleText} allowFontScaling={false}>#{subject.title}#</Text>
          {dateText ? (<Text style={styles.infText} allowFontScaling={false}>活动时间：{dateText}</Text>) : null}
          <Text style={styles.infText} allowFontScaling={false}>参与人数：{subject.isum}</Text>
          <View style={styles.btn}><Text style={styles.btnText} allowFontScaling={false}>我要参与</Text></View>
        </View>
      </TouchableHighlight>) ;
  }

  render(){
    //返回图文样式
    if(this.props.styleId == '1') return this._renderRichBody() ;

    //返回普通文字样式
    let subject = this.state.subject ;

    let style = [styles.subjectText]
    this.props.style && style.push(this.props.style) ;

    return (
      <Text style={style} onPress={this._onPress.bind(this)} allowFontScaling={false}>#{subject.title}#</Text>
    ) ;
  }
}

const styles = StyleSheet.create({
  subjectText:{
    color:'#0049bb',
    fontSize:16,
  } ,
  item:{
    marginBottom:15 ,
    backgroundColor:'#fff',
  },
  itemin:{

  },
  image:{
    resizeMode:'stretch',
    flex:1,
    height:Dimensions.get('window').width/2,
  },
  titleText:{
    color:'#0049bb',
    fontSize:16,
    padding:5,
  },
  infText:{
    color:'#333',
    fontSize:14,
    padding:5,
    paddingTop:0,
  },
  btn:{
    position:'absolute' ,
    right:10,
    bottom:10,
    backgroundColor:'#ff6600',
    alignItems:'center',
    padding:6,
    borderRadius:2,
    paddingLeft:8,
    paddingRight:8,
  },
  btnText:{
    color:'#fff',
  }
}) ;
