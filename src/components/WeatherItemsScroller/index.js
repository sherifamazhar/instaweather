import React from 'react';
import WeatherItem from '../WeatherItem';
import TabPanel from '../TabPanel';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import './style.css';

class WeatherItemsScroller extends React.Component {

    state = { activeTab: 'hourly-panel' };

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
        const hourlyItems = this.props.hourly.data.map((item, index) => {
            if(index === 0)
                return <WeatherItem className="weather-item" key={'h'+item.time} label="Now" icon={item.icon} temperature={item.temperature} />; 
            else
                return <WeatherItem className="weather-item" key={'h'+item.time} label={this.getHourFromTimestamp(item.time) + ':00'} icon={item.icon} temperature={item.temperature} />; 
        });
        const dailyItems = this.props.daily.data.map((item, index) => {
            if(index === 0)
                return <WeatherItem className="weather-item" key={'d'+item.time} label="Today" icon={item.icon} temperature={item.temperatureHigh} />; 
            else
                return <WeatherItem className="weather-item" key={'d'+item.time} label={this.getDayFromTimestamp(item.time)} icon={item.icon} temperature={item.temperatureHigh} />; 
        });

        return (
            <div>
                <AppBar position="relative" className="navbar-header">
                    <Tabs value={this.state.activeTab} aria-label="simple tabs" centered={window.innerWidth > 767 ? false : true }>
                        <Tab className="navbar-tab" value="hourly-panel" label="Hourly" onClick={() => this.setState({ activeTab: 'hourly-panel' })} disableRipple>{hourlyItems}</Tab>
                        <Tab className="navbar-tab" value="daily-panel" label="Daily" onClick={() => this.setState({ activeTab: 'daily-panel' })} disableRipple>{dailyItems}</Tab>
                    </Tabs>
                </AppBar>
                <TabPanel value={this.state.activeTab} index="hourly-panel">
                    {hourlyItems}
                </TabPanel>
                <TabPanel value={this.state.activeTab} index="daily-panel">
                    {dailyItems}
                </TabPanel>
            </div>
        );
    }
}

export default WeatherItemsScroller;