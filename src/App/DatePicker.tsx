import * as React from 'react';
import { observer } from 'mobx-react';
import { observable } from 'mobx';
import TheGame from './TheGame';

import DayPicker from 'react-day-picker';
import moment from "moment";

import { DayPickerWrapper, MainText } from './game.styles';

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
            <TheGame datePick={datePick()}/>
        </>
      );
    }
  }

  export default DatePicker;