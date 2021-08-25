import React, { Component } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import CalendarHeader from './CalendarHeader';
import CalenderContent from './CalendarContent';
import { dateStringYYYYMMDD } from "../../utilities/CommonUtility"

import moment from 'moment';

export default class Calendar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentDate: new Date(),
      currentMonth: new Date().getMonth(),
      currentYear: new Date().getFullYear(),
    };
  }

  getDaysArray(year, month) {
    var monthIndex = month;
    var names = ['sun', 'mon', 'tue', 'wed', 'thu', 'fri', 'sat'];
    var date = new Date(year, monthIndex, 1);
    var result = [];
    while (date.getMonth() === monthIndex) {
      if (date.getDate() === 1) {

        for (var i = 0; i < date.getDay(); i++) {
          result.push({ day: 0, label: names[i], isExpired: true });
        }
      }

      result.push({
        year: date.getFullYear(),
        month: date.getMonth(),
        day: date.getDate(),
        label: names[date.getDay()],
        isExpired: date.getFullYear() == new Date().getFullYear() && date.getMonth() == new Date().getMonth() && date.getDate() < new Date().getDate() ? true : false,
      });

      date.setDate(date.getDate() + 1);
    }

    const dayItems = new Array(Math.ceil(result.length / 7))
      .fill()
      .map(_ => result.splice(0, 7));
    let objLength = dayItems[dayItems.length - 1].length;
    if (objLength < 7) {
      for (var count = objLength; count < 7; count++) {
        dayItems[dayItems.length - 1].push({
          day: 0,
          label: names[count],
          isExpired: false
        });
      }
    }
    return dayItems;
  }

  //check if the date is expired
  isDateIsExpired(date, month, year) {
    let givenDate = new Date();
    givenDate.setDate(date);
    givenDate.setMonth(month);
    givenDate.setFullYear(year);

    let currentDate = new Date();
    givenDate.setHours(0, 0, 0, 0);
    currentDate.setHours(0, 0, 0, 0);
    return givenDate < currentDate;
  }

  showNextMonth() {
    //show next month
    let currentDate = new Date(
      this.state.currentDate.setMonth(this.state.currentDate.getMonth() + 1),
    );

    this.setState({
      currentMonth: currentDate.getMonth(),
      currentYear: currentDate.getFullYear(),
      currentDate,
    });
    const current_Month = this.state.currentMonth; const current_Year = this.state.currentYear;
    this.props.onMovedMonthYear({ current_Month, current_Year })
  }

  showNextYear() {
    //show next year
    let currentDate = new Date(
      this.state.currentDate.setFullYear(
        this.state.currentDate.getFullYear() + 1,
      ),
    );

    this.setState({
      currentMonth: currentDate.getMonth(),
      currentYear: currentDate.getFullYear(),
      currentDate,
    });
    const current_Month = this.state.currentMonth; const current_Year = this.state.currentYear;
    this.props.onMovedMonthYear({ current_Month, current_Year })
  }

  isDateIsLesser(givenDate, currentDate) {
    givenDate.setHours(0, 0, 0, 0);
    currentDate.setHours(0, 0, 0, 0);
    return givenDate <= currentDate;
  }

  showPreviousMonth() {
    //show previous month
    if (this.isDateIsLesser(this.state.currentDate, new Date())) {
      return;
    }

    let currentDate = new Date(
      this.state.currentDate.setMonth(this.state.currentDate.getMonth() - 1),
    );

    if (currentDate.getTime() < new Date().getTime) return;

    this.setState({
      currentMonth: currentDate.getMonth(),
      currentYear: currentDate.getFullYear(),
      currentDate,
    });
    const current_Month = this.state.currentMonth; const current_Year = this.state.currentYear;
    this.props.onMovedMonthYear({ current_Month, current_Year })
  }

  showPreviousYear() {
    if (this.isDateIsLesser(this.state.currentDate, new Date())) {
      return;
    }

    var given = this.state.currentDate; var current = new Date();
    var givenYear = given.getFullYear(); var currentYear = current.getFullYear();

    if (currentYear === givenYear - 1) {
      this.setState({
        currentMonth: new Date().getMonth(),
        currentYear: new Date().getFullYear(),
        currentDate: new Date()
      });
      const current_Month = this.state.currentMonth; const current_Year = this.state.currentYear;
      this.props.onMovedMonthYear({ current_Month, current_Year })
      return;
    }

    //show previous year
    let currentDate = new Date(
      this.state.currentDate.setFullYear(
        this.state.currentDate.getFullYear() - 1,
      ),
    );

    this.setState({
      currentMonth: currentDate.getMonth(),
      currentYear: currentDate.getFullYear(),
      currentDate,
    });
    const current_Month = this.state.currentMonth; const current_Year = this.state.currentYear;
    this.props.onMovedMonthYear({ current_Month, current_Year })
  }

  render() {

    const titleformat = moment(this.state.currentDate).format('MMMM YYYY');

    return (
      <View style={[styles.container]}>
        {/* RENDER CALENDAR HEADER */}
        <CalendarHeader
          title={this.state.currentDate}
          onMovedDateYear={this.props.onMovedMonthYear}
          // title={titleformat.toUpperCase()}
          onDoubleLeftIconPressed={() => {
            this.showPreviousYear();
          }}
          onLeftIconPressed={() => {
            this.showPreviousMonth();
          }}
          onRightIconPressed={() => {
            this.showNextMonth();
          }}
          onDoubleRightIconPressed={() => {
            this.showNextYear();
          }}
          style={{ backgroundColor: 'red' }}
        />

        {/* RENDER CALENDAR WEEK */}
        <CalenderContent
          dateValues={this.getDaysArray(
            this.state.currentYear,
            this.state.currentMonth,
          )}
          onDateClicked={this.props.onDatePressed}
          onCurrent={this.props.onDateSet}
          onCount={this.props.CalendarCount}

        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',

  },
});
