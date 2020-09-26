import React from 'react';
import Skycons, { SkyconsType } from 'react-skycons';

class Summary extends React.Component {
    constructor(props) {
        super(props);

        const today = new Date();
        const weekday = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
        const date = `${weekday[today.getDay()]} ${today.getDate()}, ${today.getYear()}`;

        this.skycons = this.props.icon.toUpperCase().replace('-', '_');
        this.state = { date: date };
    }

    render() {
        return (
            <div>
                <h2>{this.props.location}</h2>
                <label id="date">{this.state.date}</label>
                <Skycons
                color="#fff"
                type={SkyconsType[this.skycons]}
                animate={true}
                size={24}
                resizeClear={true}
                />
                <label>{this.props.currentShortSummary}</label>
                <label><span className="temperature-val">{this.props.currentTemperature}</span>°</label>
                <label><span className="temperature-val">{this.props.todaysHigh}</span>°/<span className="temperature-val">{this.props.todaysLow}</span>°</label>
                <label>{this.props.todaysSummary}</label>
            </div>
        );
    }
}

export default Summary;