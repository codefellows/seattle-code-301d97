import React from 'react';
import Person from './Person';

class Main extends React.Component {
  render(){
    return (
      <>
        <h2>Hello Class!</h2>

        <Person name="Cameron"/>
        <Person name="Dasha"/>
        <Person name="Alex" />
        <Person name="Reece" />

        {/* <HornedBeast title="" description="" image_url="" */}
      </>
    )
  }
}

export default Main;