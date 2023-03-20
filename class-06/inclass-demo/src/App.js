import React from 'react';
import axios from 'axios';


class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      pokemonData: [],
      city: '',
      cityData: {},
      error: false,
      errorMessage: ''
    }
  }

  handleCityInput = (event) => {
    this.setState({
      city: event.target.value
    })
  }

  // ** async/await - handle our asynchronous code
  // ** try/catch - handle our errors - TRY resolve our successful promises & CATCH handle rejected promise

  getCityData = async (event) => {
    event.preventDefault();

    try {
      // TODO: Use axios to get the data from LocationIQ - using city in state
      let url = `https://us1.locationiq.com/v1/search?key=${process.env.REACT_APP_LOCATIONIQ_API_KEY}&q=${this.state.city}&format=json`

      let cityDataFromAxios = await axios.get(url);

      console.log(cityDataFromAxios.data[0])

      // TODO: Set State with the data that comes back from axios & set error boolean to false
      this.setState({
        cityData: cityDataFromAxios.data[0],
        error: false
      });

    } catch (error) {

      // TODO: Set state with the error boolean and the error message
      this.setState({
        error: true,
        errorMessage: error.message
      })
    }

  }

  // *** MAP PORTION OF YOUR LAB IMG SRC POINTS TO THIS URL: 
  // *** https://maps.locationiq.com/v3/staticmap?key=<YOUR API KEY>&center=<CITY'S LAT>,<CITY'S LON>&zoom=13

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
            : <p>{this.state.cityData.display_name}</p>
        }


      </>
    )
  }
}

export default App;










//  <form >
{/* <button type='submit' onClick={this.handleGetPokemonData}>Gotta Catch them all!</button>
</form>

<ul>
  {this.state.pokemonData.map((pokemon, i) => <li key={i}>{pokemon.name}</li>)}
</ul> */}

//  // *** GET POKEMAN DATA

//  handleGetPokemonData = async (event) => {
//   event.preventDefault();

//   // TODO: USE AXIOS TO MAKE A CALL OUT TO THE POKEMON API
//   let pokemonData = await axios.get('https://pokeapi.co/api/v2/pokemon/');

//   // ** .data - where axios stores the info
//   // ** .results - where the api stores the actual pokemon info

//   console.log(pokemonData.data.results);

//   // TODO: SET THAT DATA INTO STATE
//   this.setState({
//     pokemonData: pokemonData.data.results
//   })

// }