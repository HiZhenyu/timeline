import React, {
  Component,
  StyleSheet,
  TouchableHighlight ,
  View,
  ScrollView,
  Text,
} from 'react-native';

import LCTitle from './../module/pub/LCTitle' ;
import LCExFindMore from './../module/explore/LCExFindMore' ;
import LCExSuperb from './../module/explore/LCExSuperb' ;
import LCCatHots from './../module/cat/LCCatHots' ;

export default class PubIndexPage extends Component {
  constructor(props) {
    super(props) ;

    this.state = {

    } ;
  }

  componentDidMount(){
    console.log(333);
  }

  _onPressMoreCat(){

  }

  render(){
    return (
        <ScrollView style={[styles.flex,styles.backgroundGray]}>
          <LCTitle title="找找找" />
          <LCExFindMore />
          <LCTitle title="热门机友会" />
          <LCCatHots
            mkind={8}
            msubject={4}
            location={4}
            locationFooter={
              <TouchableHighlight onPress={this._onPressMoreCat} style={styles.btnMore} underlayColor="#ccc">
                <Text allowFontScaling={false} style={styles.btnMoreText}>更多热门机友会=></Text>
              </TouchableHighlight>
            }
            itemCatProps={{styleId:1,style:styles.catItem}}
            style={styles.catListWrap}
            groupStyle={styles.catListGroupWrap} />



          <LCTitle title="更多精彩尽在机友会" />
          <LCExSuperb />
        </ScrollView>
    ) ;
  }
}

const styles = StyleSheet.create({
  backgroundGray:{
    backgroundColor:'#efefef'
  } ,
  flex:{
    flex:1,
  },
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
  btnMore:{
    height:45,
    alignItems:'center',
    justifyContent:'center',
    backgroundColor:'#fff',
    flex:1,
  },
  btnMoreText:{
    color:'#516783',
  }
}) ;
