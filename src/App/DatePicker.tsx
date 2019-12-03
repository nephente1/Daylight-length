import * as React from 'react';
import { observer } from 'mobx-react';
import { observable } from 'mobx';
import DayPicker from 'react-day-picker';
import moment from "moment";
import MainElements from './MainElements';
import { DayPickerWrapper, MainText, Box } from './app.styles';
import CustomElement from './CustomElement';

@observer
class DatePicker extends React.Component {
@observable selectedDay: Date | undefined;

  handleDayClick = (day: Date) => {
      this.selectedDay = day;
    }

    render() {
        const datePick = () => {
            return moment(this.selectedDay).format('YYYY-MM-DD')
        }

      return (
        <>
            <MainText>Choose date to show a daylight length</MainText>
            <DayPickerWrapper>
                <DayPicker onDayClick={this.handleDayClick} />
            </DayPickerWrapper>
            <Box>
                <MainElements datePick={datePick()}/>
                <CustomElement label='My location' datePick={datePick()}/>
            </Box>
        </>
      );
    }
  }

export default DatePicker;