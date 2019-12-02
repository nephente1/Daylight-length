import * as React from 'react';
import TheGame from './TheGame';

import DayPicker from 'react-day-picker';
import moment from "moment";

export default class DatePicker extends React.Component {
    constructor(props) {
      super(props);
      this.handleDayClick = this.handleDayClick.bind(this);
      this.state = {
        selectedDay: undefined,
      };
    }
  
    handleDayClick(day) {
      this.setState({ selectedDay: day });
    }
  
    render() {
        
        const datePick = () => {
            return moment(this.state.selectedDay).format('YYYY-MM-DD')
        }
        console.log('pick',datePick())
      return (
        <div>
          <DayPicker onDayClick={this.handleDayClick} />
          {/* {this.state.selectedDay ? (
            <p>You clicked {moment(this.state.selectedDay).format('YYYY-MM-DD')}</p>
          ) : (
            <p>Please select a day.</p>
          )} */}
          <TheGame datePick={datePick()}/>
        </div>
      );
    }
  }

export const App = () => {
    
    return (
        <div className="app">
            <DatePicker />
            {/* <TheGame /> */}
        </div>
        )
    }
