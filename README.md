# react-native-streamamg

calendar library
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
