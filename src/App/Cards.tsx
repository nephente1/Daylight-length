import * as React from 'react';
import { observer } from "mobx-react";
import moment from "moment";
import { CardsWrapper, TitleText } from './game.styles';
import styled from '@emotion/styled';
interface PropsType {
    sunriseNumber?: string,
    longingNumber?: string
}
const DataBelt = styled('div')`
    height: 60px;
    width: 100%;
    padding-bottom: 10px;
    margin-bottom: 30px;
    position: relative;
    &:after{
        content:'24:00';
        display: block;
        position: absolute;
        right: 0;
        bottom: 0;
    }
        &:before {
        content:'12:00';
        display: block;
        position: absolute;
        right: 0;
        left: 0;
        bottom: -20px;
    }
`;
const MiddleBelt = styled('div')`
    width: 1px;
    background: #f00;
    height: 100%;
    margin: auto;
    position: absolute;
    left: 0;
    right: 0;
`
const BeltWrapper = styled('div')`
    display: flex;
    background: black;
    height: 40px;
    width: 100%;
    padding-bottom: 10px;
`
const BeltSunrise = styled('div')<PropsType>`
    height: 40px;
    width: ${props => props.sunriseNumber}%;
    background: black;
    &:after{
        content:'0:00';
        display: block;
        position: absolute;
        left:0;
        bottom: 0;
    }
`
const BeltLonging = styled('div')<PropsType>`
    height: 40px;
    width: ${props => props.longingNumber}%;
    background: yellow;
`

interface ResponseItemType {
    sunrise: string,
    dayLength: string
}

@observer
class Cards extends React.Component<ResponseItemType> {

    render() {
    const { sunrise, dayLength } = this.props;
    const sunriseX = sunrise !==undefined ? sunrise.slice(0, sunrise.length -3) : null;
    //@ts-ignore
    const sunriseMillisec = moment.duration(sunriseX)._milliseconds;
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
}

export default Cards;