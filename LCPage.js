import React, { Component } from 'react';
import {
  StyleSheet,
  ScrollView,
  RefreshControl,
  View,
  Text,
} from 'react-native';

import GiftedSpinner from './module/pub/GiftedSpinner' ;

class IScrollView extends Component {
  constructor(props) {
    super(props) ;
    this.state = {
      didMount : false ,
    } ;
  }

  componentWillReceiveProps(nextProps){
    //更新，更新完毕之后可反馈
    if(!this.props.doUpdate && nextProps.doUpdate) this._doUpdate(nextProps.updateCallback ? nextProps.updateCallback:null) ;

    //之前停止请求数据，则当再次传入时，则开始请求数据
    if(this.props.holdOn && !nextProps.holdOn) return this._doMount() ;
  }

  _doMount(){

  }

  _doUpdate(cb){
    if(!this.state.didMount && this.props.onDidMount){
      this.setState({didMount:true}) ;
      this.props.onDidMount() ;
    }
    cb && cb() ;
  }

  render(){
    let header = this.props.renderHeader ? this.props.renderHeader() : null ;
    let footer = this.props.renderFooter ? this.props.renderFooter() : null ;

    let TheComponent = this.props.component ? this.props.component : ScrollView ;

    return (<TheComponent style={[styles.backgroundGray,{flex:1}]} {...this.props}>{header}{footer}</TheComponent>) ;
  }
}

/**
 * 提供的统一带下拉刷新的页面
 */
export default class LCPage extends Component {
  static defaultProps = {
    scrollsToTop : true ,
  } ;

  constructor(props) {
    super(props) ;

    //1、主模块或组件
    this.mainView = IScrollView ;

    //2、主组建参数
    this.mainViewProps = {} ;

    //3、其他模块
    //格式是 [{component:View,props:{id:'id'},key:'cview'}] ;
    this.theComponents = [] ;

    //4、外围样式
    this.styleComponents = null ;

    //5、固定在顶部的模块
    this.fixedTopComponents = [] ;

    //6、固定在底部的模块
    this.fixedBottomComponents = [] ;

    //7、样式
    this.styleFixedTopComponents = null ;

    this.styleFixedBottomComponents = null ;

    this.state = {
      refreshing:false,
      scrollsToTop:props.scrollsToTop ,
      holdOn:!!props.holdOn,
    } ;

    //下拉刷新更新状态
    this.state.ups = {} ;

    //是否使用下拉刷新的功能
    this.useRefreshControl = true ;
  }

  componentWillReceiveProps(nextProps){
    if(nextProps.scrollsToTop != this.props.scrollsToTop) this.setState({scrollsToTop:nextProps.scrollsToTop}) ;
    if(this.props.holdOn && !nextProps.holdOn) return this._doMount() ;
  }

  componentDidMount(){
    this.doUpdates = [] ;
    this.doUpdates.push('mainView') ;

    let cs = [this.theComponents,this.fixedTopComponents,this.fixedBottomComponents] ;
    cs.map(ic=>ic.map(it=>it.key && (this.doUpdates.push(it.key)))) ;
  }

  _doMount(){
    this.setState({holdOn:false}) ;
  }

  _getLoadingView(style){
    return (<View style={[styles.spinner,style]}><GiftedSpinner /><Text allowFontScaling={false}>正在加载...</Text></View>) ;
  }

  _onRefresh(){
    let states = {} ;
    states.refreshing = true ;
    states.ups = {} ;

    this.setState({refreshing:true}) ;
    this.doUpdates.map(it=>states.ups[it]=true) ;

    this.setState(states) ;
  }

  _updateRefreshUp(ups){
    if(!this.state.refreshing) return ;

    for(let k in ups) this.state.ups[k] = ups[k] ;

    //是否已经更新完毕
    let updatedCount = 0 ;

    this.doUpdates.map(it=>!this.state.ups[it] && updatedCount++) ;
    updatedCount == this.doUpdates.length && this.setState({refreshing:false}) ;
  }


  //将一组组件
  _renderComponents(components){
    return components.map((it,i)=>{
      if(it.key){
        let up = {} ;
        up[it.key] = false ;

        it.props.doUpdate = this.state.ups[it.key] ;
        it.props.updateCallback = (()=>this._updateRefreshUp(up)) ;
      }

      it.props.navigator = this.props.navigator ;
      it.props.key = it.key ? it.key : i ;

      return <it.component {...it.props}  />
    }) ;
  }

  renderHeader(){
    return <View style={this.styleComponents}>{this._renderComponents(this.theComponents)}</View> ;
  }

  render(){
    if(this.state.holdOn) return this._getLoadingView() ;

    let refreshControl = null ;
    if(this.useRefreshControl){
      refreshControl = (<RefreshControl
        refreshing={this.state.refreshing}
        onRefresh={this._onRefresh.bind(this)}
        tintColor="#ff6600"
        title="机友会正在为您更新内容..."
        colors={['#ff6600', '#00ff66', '#0000ff']}
        progressBackgroundColor="#ff6600"
      />) ;
    } ;

    let listViewTpl = (<this.mainView
      navigator={this.props.navigator}
      renderHeader={this.renderHeader.bind(this)}
      scrollsToTop={this.state.scrollsToTop}
      style={styles.backgroundGray}

      doUpdate={this.state.ups.mainView}
      updateCallback={(js)=>this._updateRefreshUp({mainView:false})}

      refreshControl={refreshControl}
      {...this.mainViewProps}
     />) ;

     //
     if(this.fixedTopComponents.length < 1 && this.fixedBottomComponents.length < 1){
       return listViewTpl ;
     }

     let fixedTopTpl = null ;
     if(this.fixedTopComponents.length > 0){
       fixedTopTpl = (<View style={this.styleFixedTopComponents}>
          {this._renderComponents(this.fixedTopComponents)}
        </View>) ;
     }

     let fixedBottomTpl = null ;
     if(this.fixedBottomComponents.length > 0){
       fixedBottomTpl = (<View style={this.styleFixedBottomComponents}>
          {this._renderComponents(this.fixedBottomComponents)}
        </View>) ;
     }

     return (
       <View style={[styles.backgroundGray,{flex:1}]}>
       {fixedTopTpl}
       {listViewTpl}
       {fixedBottomTpl}
      </View>
     ) ;
  }
}

const styles = StyleSheet.create({
  backgroundGray:{
    backgroundColor:'#efefef',
  } ,
  spinner:{
    height:50,
    alignItems:'center',
    justifyContent:'center',
    flexDirection:'row',
    flex:1
  },
}) ;
