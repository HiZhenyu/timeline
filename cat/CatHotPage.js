import React, {
  Component,
  StyleSheet,
  TouchableHighlight ,
  View,
  RefreshControl,
  ScrollView,
  Text,
} from 'react-native';

import GiftedSpinner from 'react-native-gifted-spinner' ;
import LCCatHots from './../module/cat/LCCatHots' ;
import LCTitle from './../module/pub/LCTitle' ;

export default class CatHotPage extends Component {
  constructor(props) {
    super(props) ;

    //需要下拉更新的锁们
    this.doUpdateStates = ['doUpdateCatHots'] ;
    this.state = {
      refreshing:false,
      holdOn:!!this.props.holdOn,
    } ;

    for(var i=0;i<this.doUpdateStates.length;i++) this.state[this.doUpdateStates[i]] = false ;
  }

  componentDidMount(){

  }

  componentWillReceiveProps(nextProps){
    if(nextProps.scrollsToTop != this.props.scrollsToTop) this.setState({scrollsToTop:nextProps.scrollsToTop}) ;
    if(this.props.holdOn && !nextProps.holdOn) return this._doMount() ;
  }

  _doMount(){
    this.setState({holdOn:false}) ;
  }

  _onRefresh(){
    var newState = {} ;
    newState.refreshing = true ;
    for(var i=0;i<this.doUpdateStates.length;i++) newState[this.doUpdateStates[i]] = true ;

    this.setState(newState) ;
  }

  _updateRefreshState(newState){
    for(var k in newState) this.state[k] = newState[k] ;

    //是否已经更新完毕
    if(this.state.refreshing){
      var updatedCount = 0 ;
      for(var i=0;i<this.doUpdateStates.length;i++) if(!this.state[this.doUpdateStates[i]]) updatedCount++ ;
      if(updatedCount == this.doUpdateStates.length) newState.refreshing = false ;
    }

    this.setState(newState) ;
  }

  _getLoadingView(style){
    return (<View style={[styles.spinner,style]}><GiftedSpinner /><Text allowFontScaling={false}>正在加载...</Text></View>) ;
  }


  _onPressMoreCat(m){
    console.log(m) ;
  }

  _getCatMName(m){
    let ms = {
      mkind : '机型',
      msubject: '主题',
      location: '地区',
    } ;

    return name = ms[m] ;
  }


  _renderCHeader(m){
    let title = '热门' + this._getCatMName(m) + '机友会' ;
    return (<LCTitle navigator={this.props.navigator} title={title} style={{marginTop:0}} />) ;
  }

  _renderCFooter(m){
    return (<TouchableHighlight onPress={this._onPressMoreCat.bind(this,m)} style={styles.btnMore} underlayColor="#ccc">
      <Text allowFontScaling={false} style={styles.btnMoreText}>更多{this._getCatMName(m)}机友会=></Text>
    </TouchableHighlight>) ;
  }

  render(){
    if(this.state.holdOn) return this._getLoadingView() ;

    return (
        <ScrollView
          scrollsToTop={true}
          style={styles.backgroundGray}
          refreshControl={
            <RefreshControl
              refreshing={this.state.refreshing}
              onRefresh={this._onRefresh.bind(this)}
              tintColor="#ff6600"
              title="机友会正在为您更新内容..."
              colors={['#ff6600', '#00ff66', '#0000ff']}
              progressBackgroundColor="#ff6600"
            />}
        >
          <LCCatHots
            navigator={this.props.navigator}
            
            mkind={12}
            msubject={8}
            location={4}

            doUpdate={this.state.doUpdateCatHots}
            updateCallback={(js)=>this._updateRefreshState({doUpdateCatHots:false})}


            mkindHeader={this._renderCHeader('mkind')}
            msubjectHeader={this._renderCHeader('msubject')}
            locationHeader={this._renderCHeader('location')}


            mkindFooter={this._renderCFooter('mkind')}
            msubjectFooter={this._renderCFooter('msubject')}
            locationFooter={this._renderCFooter('location')}

            itemCatProps={{styleId:1,style:styles.catItem}}
            style={styles.catListWrap}
            groupStyle={styles.catListGroupWrap} />

        </ScrollView>
    ) ;
  }
}


const styles = StyleSheet.create({
  flex:{
    flex:1,
  },
  backgroundGray:{
    backgroundColor:'#efefef'
  } ,
  spinner:{
    flex:1,
    height:50,
    alignItems:'center',
    justifyContent:'center',
    flexDirection:'row'
  },

  catListWrap:{
    backgroundColor:'#efefef',
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
    marginBottom:15,
  },
  btnMoreText:{
    color:'#516783',
  }

}) ;
