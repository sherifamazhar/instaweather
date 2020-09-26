import React from 'react';
import './style.css';
import darksky from '../../api/darksky';
import Summary from '../Summary';
import WeatherItemsScroller from '../WeatherItemsScroller';

class App extends React.Component {

  constructor(props) {
    super(props);
    this.state = { lat: null, long: null, forecast: [], errorMessage: '', unit: 'f' };
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
        this.setState({lat: position.coords.latitude, long: position.coords.longitude});
        this.fetchData(position.coords.latitude, position.coords.longitude);
      },
      err => this.setState({ errorMessage: err.message })
    );
  }

  convertTemperature = (unit) => {
    var values = document.getElementsByClassName("temperature-val");

    if(unit === 'c' && this.state.unit === 'f') {
      for (let i = 0; i < values.length; i++) {
        values[i].innerText = Math.round(((values[i].innerText - 32.0) * 5.0) / 9.0);
        this.setState({unit: 'c'});
      }
    } else if(unit === 'f' && this.state.unit === 'c') {
      for (let i = 0; i < values.length; i++) {
        values[i].innerText = Math.round((values[i].innerText * 9/5) + 32);
        this.setState({unit: 'f'});
      }
    }
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
          icon={this.state.forecast.currently.icon}
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
          <header>
            <h1 id="app-title">Instaweather</h1>
            <div>
              <button onClick={() => this.convertTemperature('c')}>C</button>
              <button onClick={() => this.convertTemperature('f')}>F</button>
            </div>
          </header>
          {this.renderContent()}
        </div>
      );
  }
};

export default App;