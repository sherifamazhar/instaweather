import React from 'react';
import Skycons, { SkyconsType } from 'react-skycons';
import './style.css';

class WeatherItem extends React.Component {
    constructor(props) {
        super(props);

        let icon = this.props.icon;
        this.skycons = icon.toUpperCase().replace('-', '_');
    }

    render() {
        return (
            <div className="weather-item">
                <h4 className="temperature-label">{this.props.label}</h4>
                <Skycons
                color="#fff"
                type={SkyconsType[this.skycons]}
                animate={false}
                size={50}
                resizeClear={true}
                />
                <h5 className="temperature-container"><span className="temperature-val">{Math.round(this.props.temperature)}</span>°</h5>
            </div>
        );
    }
}

export default WeatherItem;