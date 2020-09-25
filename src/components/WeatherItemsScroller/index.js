import React from 'react';
import WeatherItem from '../WeatherItem';

class WeatherItemsScroller extends React.Component {

    getHourFromTimestamp = (timestamp) => {
        const currentDate = new Date(timestamp * 1000);
        const hour = currentDate.getHours();
        return hour;
    }

    getDayFromTimestamp = (timestamp) => {
        const weekday = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
        const currentDate = new Date(timestamp * 1000);
        const day = weekday[currentDate.getDay()];
        return day;
    }

    render() {
        const hourlyItems = this.props.hourly.data.map((item) => {
            return <WeatherItem key={item.time} hour={this.getHourFromTimestamp(item.time) + ':00'} icon={item.icon} temperature={item.temperature} />; 
        });
        const dailyItems = this.props.daily.data.map((item) => {
            return <WeatherItem key={item.time} day={this.getDayFromTimestamp(item.time)} icon={item.icon} temperature={item.temperatureHigh} />; 
        });

        return (
            <div>
                {hourlyItems}
                {dailyItems}
            </div>
        );
    }
}

export default WeatherItemsScroller;