import React from 'react';
import './App.css';
import axios from 'axios';
import Cats from './Cats';
import { Container, Form, Button } from 'react-bootstrap';



class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      cats: [],
    }
  }

  getCats = async () => {
    try {
      // TODO: use axios to call out to my server get all the cats from the DB
      let url = `${process.env.REACT_APP_SERVER}/cats`

      let catData = await axios.get(url);

      this.setState({
        cats: catData.data
      })

    } catch (error) {
      console.log(error.response)
    }
  }

  deleteCat = async (id) => {
    try {

      // TODO: AXIOS is going to send an ID of the cat to delete
      let url = `${process.env.REACT_APP_SERVER}/cats/${id}`

      await axios.delete(url);

      // TODO: UPDATE STATE TO REMOVE THAT DELETED CAT
      let updatedCats = this.state.cats.filter(cat => cat._id !== id);

      this.setState({
        cats: updatedCats
      })

    } catch (error) {
      console.log(error.response)
    }
  }

 //  ****** ADDING CAT TO DATABASE WITH THE USE OF 2 HANDLERS *****

 // **** HANDLER #1 - COMES FROM MY FORM - BUILD A CAT OBJECT ***** 
  handleCatSubmit = (event) => {
    event.preventDefault();

    // TODO: Build a cat object based off of the form data
    let catObj = {
      name: event.target.name.value,
      color: event.target.color.value,
      location: event.target.location.value,
      spayNeuter: event.target.spayNeuter.checked
    }

    this.postCat(catObj);
  }

 // *** HANDLER #2 - POST TO THE DATABASE
  postCat = async (catObj) => {
    try {
      // TODO: build the url, use axios and add the cat

      let url = `${process.env.REACT_APP_SERVER}/cats`

      // *** On a post, we pass in 2 args to axios, 1st is the url, 2nd is the data that will go on the request.body
      let createdCat = await axios.post(url, catObj)

      this.setState({
        cats: [...this.state.cats, createdCat.data]
      })
      
    } catch (error) {
      console.log(error.message)
    }
  }



  // *** REACT LIFECYCLE METHOD **** The minute APP is rendered, it will call the provided function
  componentDidMount() {
    this.getCats();
  }



  render() {
    console.log('App State >>> ', this.state);
    return (
      <>
        <header>
          <h1>Cool Cats</h1>
        </header>
        <main>
          {
            this.state.cats.length > 0 &&
            <>
              <Cats
                cats={this.state.cats}
                deleteCat={this.deleteCat}
              />
            </>
          }
          <Container className="mt-5">
            <Form onSubmit={this.handleCatSubmit}>
              <Form.Group controlId="name">
                <Form.Label>Name</Form.Label>
                <Form.Control type="text" />
              </Form.Group>
              <Form.Group controlId="color">
                <Form.Label>Color</Form.Label>
                <Form.Control type="text" />
              </Form.Group>
              <Form.Group controlId="location">
                <Form.Label>Location</Form.Label>
                <Form.Control type="text" />
              </Form.Group>
              <Form.Group controlId="spayNeuter">
                <Form.Check type="checkbox" label="spay-neuter" />
              </Form.Group>
              <Button type="submit">Add Cat</Button>
            </Form>
          </Container>
        </main>
      </>
    );
  }
}

export default App;