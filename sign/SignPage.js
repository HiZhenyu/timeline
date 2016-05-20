import React,{ Component } from 'react' ;
import {
  StyleSheet,
  TouchableHighlight ,
  View,
  Text,
  Image,
} from 'react-native';


/**
 * 签到领金币
 */
export default class SignPage extends Component {
  constructor(props) {
    super(props) ;
    this.state = {

    } ;
  }

  //签到领金币
  _onPressSign(){
    
  }

  render(){
    <View>
      <TouchableOpacity onPress={this._onPressSign.bind(this)}>
        <Text allowFontScaling={false}>签到，领金币！</Text>
      </TouchableOpacity>
    </View>
  }
}

const styles = StyleSheet.create({

}) ;
