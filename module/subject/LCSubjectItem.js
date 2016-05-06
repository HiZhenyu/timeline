import React, {
  Component,
  StyleSheet,
  TouchableHighlight ,
  View,
  Text,
  Image
} from 'react-native';

export default class LCSubject extends Component {
  constructor(props) {
    super(props) ;
    this.state = {
      subject : this.props.subject
    } ;
  }

  _onPress(){
    if(!global.appNavigator) return ;

    let props = {} ;
    global.appNavigator.push({
        name: 'SubjectPage',
        component: SubjectPage,
        params: props,
        passProps: props,
    });
  }

  render(){
    let subject = this.state.subject ;

    let style = [styles.subjectText] ;
    if(this.props.style) style.push(this.props.style) ;

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
}) ;
