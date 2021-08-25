import React, { Component } from 'react';
import { View, StyleSheet, Text, Image, TouchableOpacity } from 'react-native';
import { Fonts } from '../../resources';
import moment from 'moment';
import doubleLeftIcon from './assets/images/double_left.png';
import doubleRightIcon from './assets/images/double_right.png';
import leftIcon from './assets/images/single_left.png';
import rightIcon from './assets/images/single_right.png';

export default class CalendarHeader extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  renderArrowIcon(image, event) {
    return (
      <TouchableOpacity style={{ width: 50 }} onPress={event}>
        <Image style={styles.arrowImage} source={image} />
      </TouchableOpacity>
    );
  }

  renderTitle(monthAndYear) {
    const titleformat = moment(monthAndYear).format('MMMM YYYY');
    this.props.onMovedDateYear({ monthAndYear })
    return (
      <View style={styles.titleCon}>
        <Text style={styles.titleTxt}>{titleformat.toUpperCase()}</Text>
      </View>
    )
  }


  render() {
    const props = this.props;
    return (
      <View style={styles.container}>
        {this.renderArrowIcon(doubleLeftIcon, props.onDoubleLeftIconPressed)}

        {this.renderArrowIcon(leftIcon, props.onLeftIconPressed)}

        {this.renderTitle(props.title)}

        {this.renderArrowIcon(rightIcon, props.onRightIconPressed)}

        {this.renderArrowIcon(doubleRightIcon, props.onDoubleRightIconPressed)}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-evenly',
    marginTop: 10
  },
  titleCon: {
    width: 200,
    justifyContent: 'center',
    alignItems: 'center'
  },
  titleTxt: {
    fontSize: 21,
    fontFamily: Fonts.OswaldMedium,
    color: '#002856'
  },
  arrowImage: {
    height: 10
  },
});
