import * as React from 'react';
import moment from "moment";
import { CardsWrapper, TitleText, DataBelt, MiddleBelt, BeltWrapper, BeltSunrise, BeltLonging } from './app.styles';

interface ResponseItemType {
    sunrise: string,
    dayLength: string
}

const Cards = ( {sunrise, dayLength}: ResponseItemType) => {
    const sunriseFormated = sunrise !==undefined ? sunrise.slice(0, sunrise.length -3) : null;
    //@ts-ignore
    const sunriseMillisec = moment.duration(sunriseFormated)._milliseconds;
    //@ts-ignore
    const dayMiliSec = moment.duration(dayLength)._milliseconds;
    //@ts-ignore
    const fullDay = moment.duration('23:59:59')._milliseconds;

    const sunriseStart = ((sunriseMillisec/fullDay)* 100).toFixed(2);
    const longDay = ((dayMiliSec/fullDay)* 100).toFixed(2);
    const sunriseHour = moment(sunriseMillisec).format("hh:mm a");

    return (
        <CardsWrapper>
            <TitleText>{name}</TitleText>
            <TitleText>Daylight is {longDay}% of 24h</TitleText>
            <DataBelt>
                <MiddleBelt />
                <BeltWrapper>
                    <BeltSunrise sunriseNumber={sunriseStart} />
                    <BeltLonging longingNumber={longDay}/>
                </BeltWrapper>  
            </DataBelt>
            <TitleText>Sunrise: {sunriseHour}</TitleText>
        </CardsWrapper>
    );
}

export default Cards;