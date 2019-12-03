import * as React from 'react';
import { observer } from 'mobx-react';
import { observable } from 'mobx';
import moment from "moment";
import Cards from './Cards';
import { ResultsWrapper, CardsWrapper, Button } from './app.styles';

interface ResultsPropsType {
    sunrise: string,
    day_length: string,
}
interface CustomElementPropsType {
    label: string,
    datePick: string,
}
@observer
class CustomElement extends React.Component<CustomElementPropsType, ResultsPropsType> {
    @observable datePick: string | null = moment().format('YYYY-MM-DD');
    @observable resultsCustom: any = null;
    @observable table: Array<Object> = [];
    @observable customLat: number | string = 0;
    @observable customLon: number | string = 0;
    
    componentDidMount() {
        this.loadCustomData();
    }

    componentDidUpdate(prevProps: CustomElementPropsType): void {
        if (this.props.datePick !== prevProps.datePick) {
            this.datePick = this.props.datePick;
            this.loadCustomData();
        }
      }

    loadCustomData = async() => {
        const response = await fetch('https://api.sunrise-sunset.org/json?lat='+`${this.customLat}`+'&lng='+`${this.customLon}`+'&date='+`${this.datePick}`);
        const respJsonCust = await response.json();
        this.resultsCustom = respJsonCust.results;
      }

    handleLat = (e: React.ChangeEvent<HTMLInputElement>): void => {
          this.customLat = e.currentTarget.value;
      }
      
    handleLon = (e: React.ChangeEvent<HTMLInputElement>): void => {
        this.customLon = e.currentTarget.value;
      }

    handleClick = () => {
        this.loadCustomData();
    }

    render() {
        const tableCustom = [this.resultsCustom];
        const renderCustomResults = () => {
            if(tableCustom === null) {
                return null
            } else {
                return(
                    tableCustom.map( (el, id) => 
                    <Cards key={id} sunrise={el.sunrise} dayLength={el.day_length} />)
                )
            }
        }

        return (
            <>
                <CardsWrapper>
                    <h2>{this.props.label}</h2>
                    <input type='text' onChange={this.handleLat} placeholder='latitude'/>
                    <input type='text' onChange={this.handleLon} placeholder='longtitude'/>
                    <Button onClick={this.handleClick}>Fetch!</Button>
                </CardsWrapper>
                <ResultsWrapper>{ renderCustomResults() } </ResultsWrapper> 
            </>
        )
    }
}

export default CustomElement;
