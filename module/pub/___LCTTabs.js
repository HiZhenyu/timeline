import React, {
  Component,
  StyleSheet,
  View,
  Text
} from 'react-native';

export default class LCTTabs extends Component {
  static defaultProps = {
    tabs : [] ,
    selectedIndex : 0 ,
  } ;

  constructor(props) {
    super(props) ;
    this.state = {
      selectedIndex : this.props.selectedIndex ,
    } ;
  }

  componentWillReceiveProps(nextProps){
    if(this.props.selectedIndex != nextProps.selectedIndex) this.setState({selectedIndex:nextProps.selectedIndex}) ;
  }

  render(){
    let tpls = this.props.tabs.map(it=>{
      let itemStyle = styles.item ;
      if(this.props.itemStyle) itemStyle.push(this.props.itemStyle) ;

      let itemTextStyle = style.itemText ;
      

    }) ;
  }
}

const styles = StyleSheet.create({


}) ;
