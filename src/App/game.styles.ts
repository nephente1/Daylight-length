import styled from '@emotion/styled';


export const App = styled('div')`
    padding: 25px;
    display: flex;
    justify-content: center;
    height: 100%;
`;
  
export const Box = styled('div')`
    background: #3e3150;
    padding: 25px 35px 30px;
    text-align: center;
    border-radius: 5px;
    color: #E5E8F6;
    width: 900px;
    height: auto;
    box-shadow: 0px 0px 20px 12px rgba(12,27,38,0.85);
    position: relative;
`;

export const MainText = styled('h1')`
    font-size: 26px;
    letter-spacing: 1px;
    margin-bottom: 10px;
    color: #E91E63;
`;

export const Button = styled('button')`
    padding: 5px 12px;
    border: none;
    background: #fabe09;
    margin: 5px 5px 0px 5px;
    text-transform: uppercase;
    cursor: pointer;
    border-radius: 4px;
    font-size: 18px;
`;

export const CardsWrapper = styled ('div')`;
    padding: 5px 12px;
    width: 260px;
    margin: auto;
`;

export const TitleText = styled('h2')`
    font-size: 18px;
    margin-top: 16px;
    margin-bottom: 12px;
    letter-spacing: 1px;
    color: #d5d5d5;
    text-transform: capitalize;
    cursor: pointer;
    color: #d5d5d5;
`;

export const ResultsWrapper = styled('div')`
    display: flex;
    justify-content: space-around;
    margin: 15px 0;
`;

export const DayPickerWrapper = styled('div')`
    display: flex;
    background: #dbd8da;
    width: 300px;
    flex-direction: column;
    justify-content: center;
    padding: 0 15px;
`;
