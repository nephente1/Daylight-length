import * as React from 'react';
import { observer } from 'mobx-react';
import { observable } from 'mobx';
import Cards from './Cards';
import { MainText, Button, NamesBox , ResultsWrapper, CardsWrapper, TitleText } from './game.styles';


const arr = [
    {name: 'Kraków', lat: 50.064651, lon: 19.944981},
    {name: 'Tokio', lat: 39.758602, lon: -104.997437},
    {name: 'New York', lat: 55.755825, lon: 37.617298}
];

@observer
class TheGame extends React.Component<{}> {
    @observable results: any = '';
    @observable isLoading: boolean | undefined = true;
    
    componentDidMount() {
        this.loadData();  
    }
    
    loadData = async () => {
        const response = await fetch('https://api.sunrise-sunset.org/json?lat='+`${arr[0].lat}`+'&lng='+`${arr[0].lon}`+'&date=2019-12-01');
        const respJson = await response.json();
        this.results = respJson.results;
        this.isLoading = false;
    }

    render() {
        console.log('resp',this.results)
        const renderResults = () => {
            if(this.results === null) {
                return null
            } else {
                return(
                    <Cards sunrise={this.results.sunrise} dayLength={this.results.day_length} />
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
                    <CardsWrapper>
                        <h2>{arr[0].name}</h2>
                        <TitleText>data</TitleText>
                    </CardsWrapper>
                    <CardsWrapper>
                        <h2>{arr[1].name}</h2>
                        <TitleText>data</TitleText>
                    </CardsWrapper>
                    <CardsWrapper>
                        <h2>{arr[2].name}</h2>
                        <TitleText>data</TitleText>
                    </CardsWrapper>
                </ResultsWrapper>
                <ResultsWrapper>{ renderResults() } </ResultsWrapper>
            </NamesBox>  
        )
    }
}

export default TheGame;
