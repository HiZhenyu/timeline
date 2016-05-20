/**
 * Created by tangzhibin on 16/2/28.
 */

'use strict';

import React, { Component,PropTypes } from 'react' ;
import { StyleSheet, View, Text, TouchableOpacity} from 'react-native';
import IndicatorViewPager from './../IndicatorViewPager';

export default class PagerTitleIndicator extends Component {
    static propTypes = {
        ...View.propTypes,
        initialPage: PropTypes.number,
        titles: PropTypes.arrayOf(PropTypes.string).isRequired,
        pager: PropTypes.instanceOf(IndicatorViewPager),
        itemStyle: View.propTypes.style,
        itemTextStyle: Text.propTypes.style,
        selectedItemTextStyle: Text.propTypes.style,
        selectedBorderStyle: View.propTypes.style
    };

    static defaultProps = {
        titles: [],
        initialPage: 0
    };

    state = {
        selectedIndex: this.props.initialPage
    };

    shouldComponentUpdate(nextProps, nextState) {
        return this.state.selectedIndex != nextState.selectedIndex ||
            this.props.titles + '' != nextProps.titles + '' ||
            this.props.style != nextProps.style ||
            this.props.itemStyle != nextProps.itemStyle ||
            this.props.itemTextStyle != nextProps.itemTextStyle ||
            this.props.selectedItemTextStyle != nextProps.selectedItemTextStyle ||
            this.props.selectedBorderStyle != nextProps.selectedBorderStyle;
    }

    _onPress(isSelected,index){
      if(isSelected) return ;
      this.props.pager.setPage(index) ;
      this.setState({selectedIndex: index});
    }

    render() {
        let {titles, pager, itemStyle, itemTextStyle, selectedItemTextStyle, selectedBorderStyle} = this.props;
        if (!titles || titles.length === 0)return null;

        let titleViews = titles.map((title, index)=> {
            let isSelected = this.state.selectedIndex === index;
            return (
                <TouchableOpacity
                    style={[styles.titleContainer, itemStyle]}
                    activeOpacity={0.6}
                    key={index}
                    onPress={this._onPress.bind(this,isSelected,index)}
                >
                    <View style={[styles.titleContainer, itemStyle]}>
                    <View style={styles.textView}>
                      <Text allowFontScaling={false} style={isSelected ? [styles.titleTextSelected, selectedItemTextStyle]: [styles.titleText, itemTextStyle]}
                      >
                          {title}
                      </Text>
                    </View>
                    {isSelected ? <View style={[styles.selectedBorder, selectedBorderStyle]}/> : null}
                    </View>
                </TouchableOpacity>
            );
        });
        return (
            <View style={[styles.indicatorContainer, this.props.style]}>
                {titleViews}
            </View>
        );
    }

    onPageSelected(e) {
        this.setState({selectedIndex: e.position});
    }
}

const styles = StyleSheet.create({
    indicatorContainer: {
        height: 40,
        flexDirection: 'row',
        backgroundColor: '#F6F6F6'
    },
    titleText: {
        color: '#333333',
        fontSize: 15,
        textAlign:'center',
    },
    titleTextSelected: {
        color: '#FF7200',
        fontSize: 15,
        textAlign:'center',
    },
    titleContainer: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    },
    textView:{
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center'
    },
    selectedBorder: {
        backgroundColor: '#FF7200',
        height: 2,

    }
});
