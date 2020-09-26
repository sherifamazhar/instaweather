import React from 'react';
import WeatherItem from '../WeatherItem';
import TabPanel from '../TabPanel';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import './style.css';

class WeatherItemsScroller extends React.Component {

    state = { activeTab: 'hourly-pane' };

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
            return <WeatherItem className="weather-item" key={'h'+item.time} hour={this.getHourFromTimestamp(item.time) + ':00'} icon={item.icon} temperature={item.temperature} />; 
        });
        const dailyItems = this.props.daily.data.map((item) => {
            return <WeatherItem className="weather-item" key={'d'+item.time} day={this.getDayFromTimestamp(item.time)} icon={item.icon} temperature={item.temperatureHigh} />; 
        });

        return (
            <div>
                <AppBar position="relative" className="navbar-header">
                    <Tabs value={this.state.activeTab} aria-label="simple tabs">
                        <Tab className="navbar-tab" value="hourly-pane" label="Hourly" onClick={() => this.setState({ activeTab: 'hourly-pane' })}>{hourlyItems}</Tab>
                        <Tab className="navbar-tab" value="daily-pane" label="Daily" onClick={() => this.setState({ activeTab: 'daily-pane' })}>{dailyItems}</Tab>
                    </Tabs>
                </AppBar>
                <TabPanel value={this.state.activeTab} index="hourly-pane">
                    {hourlyItems}
                </TabPanel>
                <TabPanel value={this.state.activeTab} index="daily-pane">
                    {dailyItems}
                </TabPanel>
            </div>
        );
    }
}

export default WeatherItemsScroller;