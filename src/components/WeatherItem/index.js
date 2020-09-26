import React from 'react';
import Skycons, { SkyconsType } from 'react-skycons';

class WeatherItem extends React.Component {
    constructor(props) {
        super(props);

        let icon = this.props.icon;
        this.skycons = icon.toUpperCase().replace('-', '_');
    }

    render() {
        return (
            <div>
                <Skycons
                color="#fff"
                type={SkyconsType[this.skycons]}
                animate={true}
                size={24}
                resizeClear={true}
                />
                <span className="temperature-val">{Math.round(this.props.temperature)}</span>°
            </div>
        );
    }
}

export default WeatherItem;