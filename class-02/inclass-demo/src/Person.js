import React from 'react';
import './Person.css';
import Button from 'react-bootstrap/Button';


class Person extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      waves: 0,
      helpMe: false
    }
  }

  // METHOD TO UPDATE STATE FOR EACH PERSON TO TRACK WAVES
  handleWave = () => {
    // react method called this.setState() -> takes in an object rebuilds that state obj
    this.setState({
      waves: this.state.waves + 1
    })
  }

  // METHODS TO UPDATE STATE OF HELPME 
  needsHelp = () => {
    this.setState({
      helpMe: true
    })
  }

  gotHelp = () => {
    this.setState({
      helpMe: false
    })
  }

  render(){
    return (
      <article>
        <h3>{this.props.name}</h3>
        <p>👋 {this.state.waves} Greetings</p>
        <p onClick={this.handleWave}>Say Hello!</p>
        <img src={this.props.imageURL} alt={this.props.name} />
        <Button onClick={this.needsHelp} variant="danger">Help!</Button>
        <Button onClick={this.gotHelp} variant="success">I got help</Button>

        <div>{this.state.helpMe ? 'I NEED HELP!!!' : ''}</div>
      </article>
    )
  }
}

export default Person;