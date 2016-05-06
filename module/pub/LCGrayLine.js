import React, {
  Component,
  StyleSheet,
  View
} from 'react-native';

export default class LCGrayLine extends Component {
  constructor(props) {
    super(props) ;
    this.state = { } ;
  }

  render(){
    return (
      <View style={[styles.grayline,{height:this.props.height}]} />
    ) ;
  }
}

const styles = StyleSheet.create({
  grayline:{
    backgroundColor:'#efefef' ,
  }
}) ;
