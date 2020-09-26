import React from 'react';
import Skycons, { SkyconsType } from 'react-skycons';
import './style.css';

class Summary extends React.Component {
    constructor(props) {
        super(props);

        const today = new Date();
        const weekday = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
        const date = `${weekday[today.getDay()]} ${today.getDate()}, ${today.getFullYear()}`;

        this.skycons = this.props.icon.toUpperCase().replace('-', '_');
        this.state = { date: date };
    }

    render() {
        return (
            <div id="summary">
                <div id="current">
                    <h2 id="location">{this.props.location}</h2>
                    <label id="date">{this.state.date}</label>
                    <Skycons
                    color="rgba(255,255,255,.8)"
                    type={SkyconsType[this.skycons]}
                    animate={false}
                    size={80}
                    resizeClear={true}
                    />
                    <label id="current-short-summary">{this.props.currentShortSummary}</label>
                </div>
                <div id="today">
                    <label id="current-temperature">
                        <span className="temperature-val">{Math.round(this.props.currentTemperature)}</span>°
                    </label>
                    <label id="todays-temperatures">
                        <span className="temperature-val">{Math.round(this.props.todaysHigh)}</span>°/
                        <span id="less-opacity"><span className="temperature-val">{Math.round(this.props.todaysLow)}</span>°</span>
                    </label>
                    <label id="todays-summary">{this.props.todaysSummary.replace(/[.]/g,"")}</label>
                </div>
            </div>
        );
    }
}

export default Summary;