import React from 'react';
import './style.css';
import darksky from '../../api/darksky';
import Summary from '../Summary';
import WeatherItemsScroller from '../WeatherItemsScroller';

class App extends React.Component {

  constructor(props) {
    super(props);
    this.state = { lat: null, long: null, forecast: [], errorMessage: '' };
  }

  fetchData = async (lat, long) => {
    await darksky.get(`/${lat},${long}`).then((response)=> {
        this.setState({ forecast: response.data });
    },
    function (error) {
          console.log(error);
    });     
  }

  componentDidMount() {
    window.navigator.geolocation.getCurrentPosition(
      position => {
        this.setState({lat: position.coords.latitude, long: position.coords.longitude})
        this.fetchData(position.coords.latitude, position.coords.longitude)
      },
      err => this.setState({ errorMessage: err.message })
    );
  }

  renderContent() {
    if(this.state.errorMessage && !this.state.lat && Object.keys(this.state.forecast).length === 0) {
        return (
            <div>
            Error: {this.state.errorMessage}
            </div>
        );
    }
    if(!this.state.errorMessage && this.state.lat && Object.keys(this.state.forecast).length !== 0) {
        return (
        <div>
          <Summary currentTemprature={this.state.forecast.currently.temperature}
          currentShortSummary={this.state.forecast.currently.summary}
          todaysHigh={this.state.forecast.daily.data[0].temperatureHigh}
          todaysLow={this.state.forecast.daily.data[0].temperatureLow}
          location={this.state.forecast.timezone.split('/')[1]}
          todaysSummary={this.state.forecast.hourly.summary}
          ></Summary>
          <WeatherItemsScroller hourly={this.state.forecast.hourly} daily={this.state.forecast.daily}></WeatherItemsScroller>
        </div>
        );
    }
    
    return "Please accept location request";
  }
  
  render() {
      return (
        <div>
          {this.renderContent()}
        </div>
      );
  }
};

export default App;