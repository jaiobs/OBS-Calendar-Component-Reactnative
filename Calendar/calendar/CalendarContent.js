import React, { Component } from 'react';
import { View, StyleSheet, Text, TouchableOpacity } from 'react-native';
import moment from 'moment'

import { Fonts } from '../../resources';

export default class CalendarContent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      weekDays: ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'],
      currentDate: new Date().getDate(),
      currentMonth: new Date().getMonth(),
      currentYear: new Date().getFullYear(),
    };
  }

  renderWeekDaysHeader() {
    return this.state.weekDays.map(item => (
      <View style={styles.weekTextContainer}>
        <Text style={{ fontSize: 12, fontFamily: Fonts.OpenSansRegular }}>{item}</Text>
      </View>
    ));
  }

  onDatePressed(date) {
    this.props.onDateClicked(date.day, date.month, date.year);
    this.setState({
      currentDate: date.day,
      currentMonth: date.month,
      currentYear: date.year,
    })
  }

  renderDayView(days) {
    var setdate = this.props.onCurrent;
    const year = setdate.setyear ? setdate.setyear : this.state.currentYear;
    const month = setdate.setMonth ? setdate.setMonth : this.state.currentMonth
    const day = setdate.setDate ? setdate.setDate : this.state.currentDate

    return days.map(item => (
      <TouchableOpacity
        underlayColor={'blue'}
        onPress={() => this.onDatePressed(item)}
        style={[
          styles.dayContainer,
          { backgroundColor: item.day === 0 ? null : item.isExpired ? '#CDA3A8' : '#FFF' },
          item.year === year && item.month == month && item.day == day ? { padding: 9, backgroundColor: '#006BB6', borderWidth: 1, borderColor: '#000' } : null
        ]}>
        {item.day === 0 ? <Text></Text> : this.setcountvalue(item)}
        {item.day === 0 ? null : <Text style={[styles.dayTxt, { color: item.isExpired ? '#3F4E5E' : item.year === year && item.month == month && item.day == day ? '#FFF' : '#000' }]}>{item.day}</Text>}
      </TouchableOpacity>
    ));
  }

  onDateValue(data) {
    return moment(data).format().slice(0, 10);
  }

  setcountvalue(item) {
    const data = this.props.onCount;
    if (data.length) {
      var Count = [];
      Count = data;

      // const timeStamp = new Date(new Date(item.year, item.month, item.day).setHours(0, 0, 0, 0));
      // const filterValue = Count.filter(value => {
      //   return this.onDateValue(value.PD) == this.onDateValue(timeStamp)
      // })

      // console.log('==filterValue', filterValue)

      // return <View>
      //   {filterValue.length && filterValue[0].SN !== 0 && filterValue[0].SN !== 1 ?
      //     <View style={{ backgroundColor: 'red', position: 'absolute', left: 22, top: -9, width: 15, height: 15, borderRadius: 100, justifyContent: 'center', alignItems: 'center' }}>
      //       <Text style={{ color: '#FFF', fontSize: 8 }}>{filterValue.length ? filterValue[0].SN : null}</Text>
      //     </View> : null}
      // </View>
      const timeStamp = new Date(new Date(item.year, item.month, item.day).setHours(0, 0, 0, 0));

      const filterValue = Count.filter(value => {
        return this.onDateValue(value.PD) == this.onDateValue(timeStamp)
      })

      return <View>
        {filterValue.length && filterValue[0].SN !== 0 && filterValue[0].SN !== 1 ?
          <View style={{ backgroundColor: 'red', position: 'absolute', left: 22, top: -9, width: 15, height: 15, borderRadius: 100, justifyContent: 'center', alignItems: 'center' }}>
            <Text style={{ color: '#FFF', fontSize: 8 }}>{filterValue.length ? filterValue[0].SN : null}</Text>
          </View> : null}
      </View>
    } else {
      return null
    }

  }

  renderDays(WeekDays) {
    return WeekDays.map(item => (
      <View style={styles.weekDaysContainer}>{this.renderDayView(item)}</View>
    ));
  }

  render() {
    const props = this.props;

    return (
      <View style={styles.container}>
        <View style={styles.weekNamesContainer}>
          {this.renderWeekDaysHeader()}
        </View>
        {this.renderDays(props.dateValues)}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 10,
  },
  weekNamesContainer: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    paddingTop: 6,
    paddingBottom: 6,
  },
  weekDaysContainer: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-evenly',
  },
  weekTextContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  dayContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 10,
  },
  dayTxt: {
    color: '#000'
  },
  expiredDay: {
    backgroundColor: '#CDA3A8',
  },
});
