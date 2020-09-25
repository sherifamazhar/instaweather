import React from 'react';
import './style.css';
import darksky from '../../api/darksky';
// import Summary from '../Summary';
// import WeatherItem from '../WeatherItem';

class App extends React.Component {

  state = { lat: null, long: null, forecast: [], errorMessage: '' };
  
  componentDidMount() {
    window.navigator.geolocation.getCurrentPosition(
        position =>
            this.setState({ lat: position.coords.latitude, long: position.coords.longitude }),
        err => this.setState({ errorMessage: err.message })
    );
  }

  componentDidUpdate() {
    const response = darksky.get(`/${this.state.lat},${this.state.long}`);

    // this.setState({ forecast: response.data });
    console.log(response);
  }
  /////////////
  
  render() {
    // console.log(this.state);

      return (
          <div>
          <h1>test</h1>
          </div>
      );
  }
};

export default App;