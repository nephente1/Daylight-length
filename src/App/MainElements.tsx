import * as React from 'react';
import { observer } from 'mobx-react';
import { observable } from 'mobx';
import moment from 'moment';
import Cards from './Cards';
import { MainText, ResultsWrapper, CardsWrapper, TitleText } from './app.styles';


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
class MainElements extends React.Component<any, ResultsPropsType> {
    @observable datePick: string | null = moment().format('YYYY-MM-DD');
    @observable results1: any = {};
    @observable results2: any = {};
    @observable results3: any = {};
    @observable isLoading: boolean | undefined = true;
    @observable table: Array<Object> = [];
    
    componentDidMount() {
        this.loadData();  
    }

    componentDidUpdate(prevProps: DateItemType): void {
        if (this.props.datePick !== prevProps.datePick) {
            this.datePick = this.props.datePick;
            this.loadData();
        }
      }

    loadData = async () => {
        let [response1, response2, response3] = await Promise.all(arr.map( el =>
          fetch('https://api.sunrise-sunset.org/json?lat='+`${el.lat}`+'&lng='+`${el.lon}`+'&date='+`${this.datePick}`)
        ));
      
        const respJson1 = await response1.json();
        this.results1 = respJson1.results;
        const respJson2 = await response2.json();
        this.results2 = respJson2.results;
        const respJson3 = await response3.json();
        this.results3 = respJson3.results;

        this.isLoading = false;
      };  

    render() {
        const table = [this.results1, this.results2, this.results3];
        const renderResults = () => {
            if(table === null) {
                return null
            } else {
                return(
                    table.map((el, id) => 
                    <Cards key={id} sunrise={el.sunrise} dayLength={el.day_length} />)
                )
            }
        }

        return (
            <>
                <header>
                    <MainText>Day lengths</MainText>
                    <TitleText>Picked date: {this.datePick}</TitleText>
                </header>
                { this.isLoading && <div className="spinner"></div> }
                    <ResultsWrapper>
                        {arr.map((el, id) => 
                            <CardsWrapper key={id}>
                                <h2>{el.name}</h2>
                            </CardsWrapper>
                        )}
                    </ ResultsWrapper>
                <ResultsWrapper>{ renderResults() } </ResultsWrapper>
            </>  
        )
    }
}

export default MainElements;
