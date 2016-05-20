import React,{ Component } from 'react' ;
import {
  StyleSheet,
  TouchableHighlight ,
  View,
  Text,
  Image,
} from 'react-native';

import LCTaskDidBtn from './LCTaskDidBtn' ;

export default class LCTaskListItem extends Component {
	constructor(props) {
		super(props) ;

	}

	render() {
    let task = this.props.task ;
    let style = [styles.listItem] ;
    this.props.style && (style.push(this.props.style)) ;

		return (
      <View style={style}>
        <View style={styles.tit}><Text style={styles.titText} allowFontScaling={false}>{task.title}</Text></View>
        <View style={styles.con}><Text style={styles.conText} allowFontScaling={false}>{task.intro}</Text></View>
        <View style={styles.btm}>
          <View style={styles.score}><Text style={styles.scoreText} allowFontScaling={false}>金币 <Text style={{color:'#f60',fontWeight:'bold'}} allowFontScaling={false}>{task.score}</Text> 个</Text></View>
          <View style={styles.btn}>
            <LCTaskDidBtn task={task} did={task.hasget} />
          </View>
        </View>
      </View>) ;
  }
}

var styles = StyleSheet.create({
  listItem:{
    margin:8,
		padding: 10,
    borderWidth:1,
    borderRadius:10,
    borderColor:'#ddd',
		backgroundColor:'#fff',
  } ,
  tit: {
    height:16,
    marginBottom:5,
	},
  titText:{
    height:16,
    lineHeight:16,
    fontSize:14,
    fontWeight:'bold',
    color:'#000',
    textAlign:'left',
    overflow:'hidden',
  },
  con:{
    marginBottom:5,
  },
  conText:{
    lineHeight:18,
    fontSize:12,
    color:'#555'
  },
  btm:{
    height:40,
    flexDirection:'row',
  },
  score:{
    flex:1,
  },
  scoreText:{
    height:40,
    lineHeight:30,
    fontSize:12,
    color:'#555',
  },
  btn:{
    width:90,
    paddingRight:10,
  },

});
