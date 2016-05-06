import React, {
  Component,
  StyleSheet,
  TouchableHighlight ,
  View,
  Text,
  ScrollView,
  RefreshControl,
  Image
} from 'react-native';

import LCNavBar from './../module/pub/LCNavBar' ;

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
