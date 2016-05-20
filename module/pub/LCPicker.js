import React, { Component } from 'react' ;
import {
	StyleSheet,
	View,
	Picker,
	Modal,
	Text,
	TouchableOpacity,
	TouchableWithoutFeedback
} from 'react-native';

import * as Animatable from 'react-native-animatable' ;

export default class LCPicker extends Component {
	static defaultProps = {
		data : [],
	};

	constructor(props){
		super(props) ;

		this.state = {
			hidden:this.props.hidden,
			data : this.props.data ,
			animation:'fadeInUp',
		} ;
	}

	componentWillReceiveProps(nextProps){
		if(nextProps.hidden != this.props.hidden) this.setState({hidden:nextProps.hidden}) ;
	}

	_onValueChange(dataIndex,val){
		this.state.data[dataIndex].selected = val ;
		this.setState({data:this.state.data}) ;

		if(this.props.onValueChange) this.props.onValueChange(dataIndex,val) ;
	}

	_onSucc(){
		let result = {} ;
		this.state.data.map(it=>result[it.selected]=it.options[it.selected]) ;

		this.props.onSelected && this.props.onSelected(result) ;

		this.hide() ;
	}


	//- 显示
  show(){
    this.setState({hidden:false}) ;
  }

  //- 隐藏
  hide(){
    this.setState({animation:'fadeOutDown',showing:false}) ;
  }

  //点了其他地方
  _onPressOtherPlace(){
    this.hide() ;
  }

  //取消
  _onPressToCancel(){
    this.hide() ;
  }

  //动画完毕
  _onAnimationEndBox(){
    if(this.state.animation == 'fadeInUp'){
      this.setState({showing:true}) ;
      return ;
    }
    this.setState({hidden:true,animation:'fadeInUp'}) ;
  }


	render(){
		if(this.state.hidden) return null ;

		let placeOtherStyle = { backgroundColor:'rgba(51,51,51,0.3)' } ;
    if(!this.state.showing) placeOtherStyle = null

		return <Modal transparent={true}><View style={styles.flex}>
			<TouchableWithoutFeedback onPress={this._onPressOtherPlace.bind(this)} style={styles.flex}><View style={[styles.flex,placeOtherStyle]}></View></TouchableWithoutFeedback>

			<Animatable.View animation={this.state.animation} onAnimationEnd={this._onAnimationEndBox.bind(this)} duration={200}>
			<View style={styles.menu}>
				<TouchableOpacity onPress={this._onPressToCancel.bind(this)}><Text style={styles.cancelText} allowFontScaling={false}>取消</Text></TouchableOpacity>
				<TouchableOpacity onPress={this._onSucc.bind(this)}><Text style={styles.closeText} allowFontScaling={false}>确认</Text></TouchableOpacity>
			</View>
			<View style={styles.wrap}>
				{this.state.data.map((it,i)=>{
					return <Picker
						key={i}
						style={styles.item}
						selectedValue={it.selected}
						onValueChange={this._onValueChange.bind(this,i)}>
						{Object.keys(it.options).map(ik=>{
							return <Picker.Item key={ik} label={it.options[ik]} value={ik} />
						})}
					</Picker>
				})}
			</View>
			</Animatable.View>
		</View></Modal> ;
	}
}

const styles = StyleSheet.create({
	flex:{
		flex:1,
	},
	wrap:{
		flexDirection:'row',
		backgroundColor:'#eee'
	},
	item:{
		flex:1,
	},
	menu:{
		flexDirection:'row',
		justifyContent:'space-between',
		height:40,
		alignItems:'center',
		padding:10,
		backgroundColor:'#fff',
	},
	cancelText:{
		fontSize:16,
		color:'#999',
		backgroundColor:'transparent',
	},
	closeText:{
		fontSize:16,
		color:'#ff6600',
		backgroundColor:'transparent',
	}
});
