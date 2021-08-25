# Reactt Native Calendar Component

React native calendar library provides month view with event counts with in the day view can pick the date by month and choosing the year as well, in default calendar we only have month option but we added optins for year and event counts
## Platform Support
Supports react native > 0.64

## Screen shot
![header image](https://github.com/jaiobs/OBS-Calendar-Component-Reactnative/raw/main/screenshot/calendar_screen.png)
## Installation

```sh
npm install react-native-custom-calendar
```

## Usage

```js
import Calendar from '../calendar/Calendar';

// ...
const CalendarModal = ({ showModel, cancelModel, onDayClick, plannedDate, onViewChange, CalendarEventCount }) => {
var CurrentDate = new Date(plannedDate).getDate();
var CurrentMonth = new Date(plannedDate).getMonth();
var CurrentYear = new Date(plannedDate).getFullYear();

return (
        <Modal
           .....
        >
            <View style={styles.container}>
                    <Calendar style={styles.calendarStyle}
                        onDateSet={{ setDate: CurrentDate, setMonth:    CurrentMonth, setyear: CurrentYear }}
                        onDatePressed={(date, month, year) => { onDayClick(date, month, year), cancelModel(false) }}
                        onMovedMonthYear={(data) => onViewChange(data)}
                        CalendarCount={CalendarEventCount}
                    />
              
            </View>
        </Modal>
    )

}
```
## Features
 - Change Month
 - Change Year
 - Pick date
 - show event count
 - customise date view

## Report a Bug

We appreciate your feedback -- comments, questions, and bug reports. Please
[submit a GitHub issue](https://github.com/jaiobs/OBS-Calendar-Component-Reactnative/issues),
and we'll get back to you.
