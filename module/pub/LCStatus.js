import React, {
  Component,
  StyleSheet,
  View,
  StatusBar
} from 'react-native';

export default class LCStatus extends Component {
  constructor(props) {
    super(props) ;
    this.state = {
    };
  }

  render(){
    let style = [styles.mtop] ;
    if(this.props.style) style.push(this.props.style) ;

    let barStyle = this.props.barStyle ? this.props.barStyle : 'default' ;

    return (
      <View style={style}>
        <StatusBar backgroundColor='#f9f9f9' barStyle={barStyle} hidden={false} />
      </View>
    ) ;
  }
}

const styles = StyleSheet.create({
  mtop:{
    paddingTop:20,
    backgroundColor:'#f9f9f9',
  }
}) ;
