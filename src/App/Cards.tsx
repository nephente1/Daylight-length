import * as React from 'react';
import { observer } from "mobx-react";
import moment from "moment";
import { CardsWrapper, TitleText } from './game.styles';

interface ResponseItemType {
    sunrise: string | any,
    dayLength: string | any
}

@observer
class Cards extends React.Component<ResponseItemType> {

    render() {
        const { sunrise, dayLength } = this.props;
        
 const sunriseX = sunrise !==undefined ? sunrise.slice(0, sunrise.length -3) : null;
     
     console.log('x',sunriseX)

     const millisec = moment.duration(sunriseX)._milliseconds;
     const dayMiliSec = moment.duration(dayLength)._milliseconds;
     const fullDay = moment.duration('23:59:59')._milliseconds;
      return (
            <CardsWrapper>
                    
                <TitleText>{sunriseX}</TitleText>
                <TitleText>day length: {dayLength}</TitleText>
                <TitleText>S: {millisec}</TitleText>
                <TitleText>L: {dayMiliSec}</TitleText>
                <TitleText>full: {fullDay}</TitleText>
                
                
            </CardsWrapper>
       );
   }
}

export default Cards;