import React from 'react';
import './Person.css';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';



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

  // Handler to call the open modal that requires an argument
  handleNameClick = () => {
    this.props.handleOpenModal(this.props.name)
  }

  render(){

    console.log('Person props', this.props);
    
    return (
      <Card>
        <Card.Title onClick={this.handleNameClick}>{this.props.name}</Card.Title>
        <p>👋 {this.state.waves} Greetings</p>
        <p onClick={this.handleWave}>Say Hello!</p>
        <Card.Img onClick={this.props.addHearts} src={this.props.imageURL} alt={this.props.name} />
        <Button onClick={this.needsHelp} variant="danger">Help!</Button>
        <Button onClick={this.gotHelp} variant="success">I got help</Button>

        <div>{this.state.helpMe ? 'I NEED HELP!!!' : ''}</div>
      </Card>
    )
  }
}

export default Person;