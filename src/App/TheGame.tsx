import * as React from 'react';
import { observer } from 'mobx-react';
import { observable } from 'mobx';
import Cards from './Cards';
import { MainText, NamesBox , ResultsWrapper, CardsWrapper } from './game.styles';


const arr = [
    {name: 'Kraków', lat: 50.064651, lon: 19.944981},
    {name: 'Tokio', lat: 39.758602, lon: -104.997437},
    {name: 'New York', lat: 40.730610, lon: -73.935242}
];

const date = '2019-12-02';

interface ResultsPropsType {
    sunrise: string,
    day_length: string
}

@observer
class TheGame extends React.Component<any, ResultsPropsType> {
    private datePick = this.props.datePick;
    @observable results1: any = {};
    @observable results2: any = {};
    @observable results3: any = {};
    @observable isLoading: boolean | undefined = true;
    @observable table: Array<Object> = [];
    
    componentDidMount() {
        this.loadData();  
        console.log('datepick',this.datePick)
    }

    // componentDidUpdate() {
    //     this.datePick = this.props.datePick;
    // }
    
    loadData = async () => {

        const response1 = await fetch('https://api.sunrise-sunset.org/json?lat='+`${arr[0].lat}`+'&lng='+`${arr[0].lon}`+'&date='+`${date}`);
        const respJson1 = await response1.json();
        this.results1 = respJson1.results;

        const response2 = await fetch('https://api.sunrise-sunset.org/json?lat='+`${arr[1].lat}`+'&lng='+`${arr[1].lon}`+'&date='+`${date}`);
        const respJson2 = await response2.json();
        this.results2 = respJson2.results;

        const response3 = await fetch('https://api.sunrise-sunset.org/json?lat='+`${arr[2].lat}`+'&lng='+`${arr[2].lon}`+'&date='+`${date}`);
        const respJson3 = await response3.json();
        this.results3 = respJson3.results;

        this.isLoading = false;
    }

    render() {
        const table = [this.results1, this.results2, this.results3];
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

    return (
            <NamesBox>
                <header>
                    <MainText>Day lengths</MainText>
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
            </NamesBox>  
        )
    }
}

export default TheGame;
