import * as React from 'react';
import { observer } from 'mobx-react';
import { observable } from 'mobx';
import moment from "moment";
import Cards from './Cards';
import { MainText, Box , ResultsWrapper, CardsWrapper, TitleText, Button } from './game.styles';


const arr = [
    {name: 'Kraków', lat: 50.064651, lon: 19.944981},
    {name: 'Tokio', lat: 39.758602, lon: -104.997437},
    {name: 'New York', lat: 40.730610, lon: -73.935242}
];

interface ResultsPropsType {
    sunrise: string,
    day_length: string
}
interface DateItemType {
    datePick: string,
}

@observer
class TheGame extends React.Component<any, ResultsPropsType> {
    @observable datePick: string | null = moment().format('YYYY-MM-DD');
    @observable results1: any = {};
    @observable results2: any = {};
    @observable results3: any = {};
    @observable results4: any = {};
    @observable isLoading: boolean | undefined = true;
    @observable table: Array<Object> = [];
    @observable customLat: number | string = 0;
    @observable customLon: number | string = 0;
    
    componentDidMount() {
        this.loadData();  
        this.loadCustomData();
    }

    componentDidUpdate(prevProps: DateItemType): void {
        if (this.props.datePick !== prevProps.datePick) {
            this.datePick = this.props.datePick;
            this.loadData();
        }
      }

    loadData = async () => {
        let [response1, response2, response3] = await Promise.all([
          fetch('https://api.sunrise-sunset.org/json?lat='+`${arr[0].lat}`+'&lng='+`${arr[0].lon}`+'&date='+`${this.datePick}`),
          fetch('https://api.sunrise-sunset.org/json?lat='+`${arr[1].lat}`+'&lng='+`${arr[1].lon}`+'&date='+`${this.datePick}`),
          fetch('https://api.sunrise-sunset.org/json?lat='+`${arr[2].lat}`+'&lng='+`${arr[2].lon}`+'&date='+`${this.datePick}`)
        ]);
      
        const respJson1 = await response1.json();
        this.results1 = respJson1.results;
        const respJson2 = await response2.json();
        this.results2 = respJson2.results;
        const respJson3 = await response3.json();
        this.results3 = respJson3.results;

        this.isLoading = false;
      };

    loadCustomData = async() => {
        const response = await fetch('https://api.sunrise-sunset.org/json?lat='+`${this.customLat}`+'&lng='+`${this.customLon}`+'&date='+`${this.datePick}`);
        const respJson4 = await response.json();
        this.results4 = respJson4.results;
      }

    handleLat = (e: React.SyntheticEvent<any>): void => {
          this.customLat = e.currentTarget.value;
        console.log('dupa 28.034088',this.customLat)
      }
      
    handleLon = (e: React.SyntheticEvent<any>): void => {
        this.customLon = e.currentTarget.value;

      }

    handleClick = () => {
        this.loadCustomData();
    }
    

    render() {
        const table = [this.results1, this.results2, this.results3];
        const table2 = [this.results4];
        const renderResults = () => {
            if(table === null) {
                return null
            } else {
                return(
                    table.map(el => 
                    <Cards sunrise={el.sunrise} dayLength={el.day_length} />)
                )
            }
        }
        const renderResults2 = () => {
            if(table2 === null) {
                return null
            } else {
                return(
                    table2.map(el => 
                    <Cards sunrise={el.sunrise} dayLength={el.day_length} />)
                )
            }
        }

        return (
            <Box>
                <header>
                    <MainText>Day lengths</MainText>
                    <TitleText>Picked date: {this.datePick}</TitleText>
                </header>

                { this.isLoading && <div className="spinner"></div> }
                
                    <ResultsWrapper>
                        {arr.map(el => 
                            <CardsWrapper>
                                <h2>{el.name}</h2>
                            </CardsWrapper>
                        )}
                    </ ResultsWrapper>

                <ResultsWrapper>{ renderResults() } </ResultsWrapper>
                
                    <CardsWrapper>
                        <h2>Your Location</h2>
                        <input type='text' onChange={this.handleLat} placeholder='latitude'/>
                        <input type='text' onChange={this.handleLon} placeholder='longtitude'/>
                        <Button onClick={this.handleClick}>Fetch!</Button>
                    </CardsWrapper>
                
                <ResultsWrapper>{ renderResults2() } </ResultsWrapper>
            </Box>  
        )
    }
}

export default TheGame;
