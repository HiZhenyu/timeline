import React,{ Component } from 'react' ;
import {
  StyleSheet,
  TouchableWithoutFeedback ,
  View ,
  Image ,
  Dimensions
} from 'react-native';

import {IndicatorViewPager, PagerDotIndicator} from './../pub/rn-viewpager/index';

export default class LCEmotionSelector extends Component {
  constructor(props) {
    super(props);
    this.state = {

    } ;

    //每行有几个？
    this.emRowPs = 8 ;
    this.emColumnPs = 3 ;

    this.preEmWidth = WrapWidth / this.emRowPs ;
    this.preEmHeight = WrapHeight / this.emColumnPs ;

    this.emtions = {} ;

    let emRowI = 0 ;
    let emColumnI = 0 ;
    let emGii = 0 ;

    global.getEmotionKs().map(it=>{
      if(!this.emtions[emGii]) this.emtions[emGii] = {} ;
      this.emtions[emGii]['x'+emRowI+emColumnI] = it.k ;

      emRowI++ ;
      if(emRowI >= this.emRowPs){
        emColumnI++ ;
        emRowI = 0 ;
      }

      if(emColumnI >= this.emColumnPs){
        emGii++ ;

        emRowI = 0 ;
        emColumnI = 0 ;
      }
    }) ;
  }

  _onPress(gid,e){
    let x = e.nativeEvent.locationX ;
    let y = e.nativeEvent.locationY ;

    if(x < 0) return ;

    let theX = parseInt(x/this.preEmWidth,10) ;
    let theY = parseInt(y/this.preEmHeight,10) ;

    if(!this.emtions[gid] || !this.emtions[gid]['x'+theX+theY]) return ;
    if(this.props.onSelected) this.props.onSelected(this.emtions[gid]['x'+theX+theY]) ;

    return ;
  }

  render(){
    let ems = [0,1,2] ;
    let emsImages = [
      require('./../../images/emtion_1.png') ,
      require('./../../images/emtion_2.png') ,
      require('./../../images/emtion_3.png') ,
    ] ;

    let emsTpl = ems.map(it=>
      <View style={styles.item} key={it}>
        <TouchableWithoutFeedback onPress={this._onPress.bind(this,it)} style={styles.btn}>
          <Image style={styles.image} source={emsImages[it]} />
        </TouchableWithoutFeedback>
      </View>
    ) ;

    return (
      <IndicatorViewPager
        bounces={false}
        style={[styles.wrap,{height:WrapHeight+50},this.props.style]}
        indicator={(<PagerDotIndicator pageCount={ems.length} />)}>
        {emsTpl}
      </IndicatorViewPager>
    ) ;
  }
}

const PWidth = Dimensions.get('window').width;

//设置表情集合宽度
const WrapWidth = PWidth - 20 ;
//设置表情集合高度
const WrapHeight = 126/335 * WrapWidth ;

const styles = StyleSheet.create({
  wrap:{
    backgroundColor:'#fff',
  },
  flex:{
    flex:1,
  },
  item:{
    backgroundColor:'#efefef',
    flex:1,
    padding:10,
    paddingTop:20,
    paddingBottom:20,
    alignItems:'center'
  },
  btn:{
    width:WrapWidth,
    height:WrapHeight,
  },
  image:{
    width:WrapWidth,
    height:WrapHeight,
    resizeMode:'cover'
  }
}) ;
