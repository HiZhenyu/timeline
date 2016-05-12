import React,{ Component } from 'react' ;
import {
  StyleSheet,
  TouchableHighlight ,
  View,
  Text,
  ScrollView,
  RefreshControl,
  Image
} from 'react-native';


export default class MsgPage extends Component {
  constructor(props) {
    super(props) ;

    this.state = {

    } ;

  }

  _onRefresh(){

  }

  _updateRefreshState(newState){

  }

  render(){
    return (
      <ScrollView style={styles.flex}>
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
  }
}) ;
