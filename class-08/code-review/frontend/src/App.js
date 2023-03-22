import React from 'react';
import axios from 'axios';


class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      city: '',
      cityData: {},
      error: false,
      errorMessage: '',
      weatherData: []
    }
  }

  handleCityInput = (event) => {
    this.setState({
      city: event.target.value
    })
  }


  getCityData = async (event) => {
    event.preventDefault();

    try {

      let url = `https://us1.locationiq.com/v1/search?key=${process.env.REACT_APP_LOCATIONIQ_API_KEY}&q=${this.state.city}&format=json`

      let cityDataFromAxios = await axios.get(url);


      this.setState({
        cityData: cityDataFromAxios.data[0],
        error: false
      });

      // TODO: CALL WEATHER HANDLER 
      let lat = cityDataFromAxios.data[0].lat;
      let lon = cityDataFromAxios.data[0].lon;

       this.handleGetWeather(lat, lon);


    } catch (error) {

      this.setState({
        error: true,
        errorMessage: error.message
      })
    }

  }

  handleGetWeather = async (lat, lon) => {
    try {
      // TODO: Call my server and pass in the lat, lon, and city name
      // http://localhost:3001/weather?lat=432.0&lon=343.3234&searchQuery=Seattle
      let url = `${process.env.REACT_APP_SERVER}/weather?searchQuery=${this.state.city}&lat=${lat}&lon=${lon}`;

      let weatherDataFromAxios = await axios.get(url);

      console.log('Weather: ', weatherDataFromAxios.data)

      this.setState({
        weatherData: weatherDataFromAxios.data
      })

      // TODO: Create a seperate Component pass that down as props

    } catch (error) {
      console.log(error.message)
    }
  }


  render() {
    return (
      <>
        <h1>API CALLS</h1>

        <form onSubmit={this.getCityData}>
          <label > Enter in a City:
            <input type="text" onChange={this.handleCityInput} />
          </label>
          <button type="submit">Explore!</button>
        </form>

        {/* TERNARY - WTF  */}
        {
          this.state.error
            ? <p>{this.state.errorMessage}</p>
            : Object.keys(this.state.cityData).length > 0 &&
            <>
              <p>{this.state.cityData.display_name}</p>
              <p>Lat: {this.state.cityData.lat}</p>
              <p>Lon: {this.state.cityData.lon}</p>
            </>
        }


      </>
    )
  }
}

export default App;








