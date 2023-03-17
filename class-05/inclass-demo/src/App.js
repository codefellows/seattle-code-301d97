import React from 'react';
import Location from './Location';
import Error from './Error';


class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      city: '',
      locationData: []
    }
  }

  // Get our city from the form and set to state
  handleFormInput = (event) => {
    this.setState({
      city: event.target.value
    })
  }

  // make our call to the API 
  handleGetCityInfo = (event) => {
    event.preventDefault();

    console.log('this was submitted: ', this.state.city);
    let arr = [];
    arr.push(1);
    this.setState({
      locationData: arr
    })
  }
  

  render() {

    return (
      <>
        <h1>Forms in react</h1>
        <form onSubmit={this.handleGetCityInfo}>
          <label htmlFor="">Pick a City:
            <input type="text" onChange={this.handleFormInput}/>
          </label>
          <button type="submit">Explore!</button>
        </form>

        {/* TERNARY CONDITIONAL RENDERING  WTF WHAT ? TRUE : FALSE */}
        {this.state.locationData.length > 0 ? <Location /> : null}

        {/* SHORT CIRCUIT  - && */}
        {/* {this.state.locationData && <Location />} */}
      </>
    )
  }
}

export default App;


