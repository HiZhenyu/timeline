import React, {
  Component,
  StyleSheet,
  View
} from 'react-native';


import {IndicatorViewPager, PagerTitleIndicator} from 'rn-viewpager';

export default class LCTTabPage extends Component {
  constructor(props) {
    super(props) ;

    //请定义组件及名称，{component:component,label:'',key:'',props:{}}
    this.tabComponents = [] ;

    //viewpager props
    this.viewPagerProps = {} ;

    //定义tab的一些参数，如 itemTextStyle 、selectedItemTextStyle 、selectedBorderStyle
    this.indicatorProps = {} ;


    //
    this.state = {} ;
    this.state.holdOns = {} ;
    this.state.scrollsToTops = {} ;

  }

  componentDidMount(){
    let newState = {} ;
    newState.holdOns = {} ;
    newState.scrollsToTops = {} ;

    this.tabComponents.map((it,i)=>{
      newState.holdOns[it.key] = !!i ;
      newState.scrollsToTops[it.key] = !i ;
    }) ;

    this.setState(newState) ;
  }

  _onPageSelected(event){
    var position  = event.position ;

    var newState = {} ;
    newState.holdOns = {} ;
    newState.scrollsToTops = {} ;

    this.tabComponents.map((it,i)=>{
      newState.holdOns[it.key] = position != i ;
      newState.scrollsToTops[it.key] = position == i ;
    }) ;

    this.setState(newState) ;
  }

  render(){
    let style = [styles.wrap] ;
    if(this.style) style.push(this.style) ;
    if(this.props.style) style.push(this.props.style) ;

    let indicatorStyle = [styles.indicator] ;
    if(this.indicatorStyle) indicatorStyle.push(this.indicatorStyle) ;

    return (
        <IndicatorViewPager
          ref={ref=>this.refViewPager=ref}
          scrollsToTop={false}
          style={style}
          indicator={<PagerTitleIndicator
            style={indicatorStyle}
            itemTextStyle={{fontSize:16}}
            selectedItemTextStyle={{fontSize:18}}
            selectedBorderStyle={{backgroundColor:'#f9f9f9'}}
            titles={this.tabComponents.map(it=>it.label)}
            {...this.indicatorProps}
          />}
          onPageSelected={this._onPageSelected.bind(this)}
          {...this.viewPagerProps}
        >
        {this.tabComponents.map(it=>{
            if(!it.props) it.props = {} ;
            it.props.navigator = this.props.navigator ;
            it.props.mainView = this ;
            it.props.holdOn = this.state.holdOns[it.key] ;
            it.props.scrollsToTop = this.state.scrollsToTops[it.key] ;

            return (<View key={it.key}><it.component {...it.props} /></View>) ;
        })}
        </IndicatorViewPager>
    ) ;
  }
}

const styles = StyleSheet.create({
  wrap:{
    flex:1,
    paddingTop:65,
    backgroundColor:'#f9f9f9',
  } ,
  indicator:{
    position:'absolute',
    top:20,
    width:React.Dimensions.get('window').width,
    height:45,
    backgroundColor:'#f9f9f9',
    borderBottomWidth:1,
    borderBottomColor:'#ddd',
  }
}) ;
