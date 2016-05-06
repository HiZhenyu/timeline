import React, {
  Component,
  StyleSheet,
  View,
  Image,
  Text,
  TextInput,
  TouchableHighlight
} from 'react-native';

export default class AskIndexPage extends Component {
  constructor(props) {
    super(props) ;
    this.state = {
    };
  }

  render(){
    return (
      <View style={[styles.backgroundGray,styles.flex]}>
        <View style={styles.search}>
          <TextInput style={styles.searchInput} placeholder="请输入您所遇到的问题" />
          <TouchableHighlight style={styles.searchBtn}>
            <Text allowFontScaling={false} style={styles.searchBtnText}>搜索</Text>
          </TouchableHighlight>
        </View>
        <TouchableHighlight underlayColor="#ccc" onPress={()=>{}} style={styles.iconAreaBtn}>
          <View style={styles.iconArea}>
            <View style={styles.iconl}>
              <Text allowFontScaling={false} style={styles.l1}>立即提问<Text allowFontScaling={false} style={styles.l11}>(五分钟必有回答)</Text></Text>
              <Text allowFontScaling={false} style={styles.l2}>当前有3万热心机友在线</Text>
            </View>
            <Image style={styles.iconr} source={require('./../images/ask_bg.png')} />
          </View>
        </TouchableHighlight>
      </View>
    ) ;
  }
}

const styles = StyleSheet.create({
  flex:{
    flex:1,
  },
  backgroundGray:{
    backgroundColor:'#efefef'
  } ,
  search:{
    flexDirection:'row',
    borderWidth:1,
    borderColor:'#ff6600',
    height:35,
    margin:20,
  },
  searchInput:{
    flex:1,
    fontSize:16,
    backgroundColor:'#fff',
    padding:3,
  },
  searchBtn:{
    width:60,
    backgroundColor:'#ff6600',
    justifyContent:'center'
  },
  searchBtnText:{
    textAlign:'center',
    fontSize:16,
    color:'#fff'
  },
  iconAreaBtn:{
    margin:20,
  },
  iconArea:{
    backgroundColor:'#ffb400',
    flexDirection:'row',
  },
  iconl:{
    flex:1,
    padding:10,
  },
  iconr:{
    width:66,
    height:55,
  },
  l1:{
    color:'#fff',
    fontSize:16,
    fontWeight:'bold',
  },
  l11:{
    fontSize:12,
  },
  l2:{
    fontSize:14,
    paddingTop:2,
  }
}) ;
