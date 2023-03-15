// REBUILD AS A CLASS COMPONENT

// 1ST IMPORTS 
import React from 'react';
import Header from './Header';
import Main from './Main';
import Footer from './Footer';
import Modal from 'react-bootstrap/Modal';
import data from './data/data.json'

// 2ND CREATE THE CLASS - will always have a render method

class App extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      hearts: '',
      showModal: false,
      selectedPerson: '',
      // selectedBeast: {} OR
      // selectedBeastImg: '',
      // selectedBeastDesc: ''
    }
  }

  addHearts = () => {
    this.setState({
      hearts: this.state.hearts + '💖'
    })
  }

  // MODAL METHOD TO CLOSE THE MODAL
  handleCloseModal = () =>{
    this.setState({
      showModal: false
    })
  }

  handleOpenModal = (name) => {
    this.setState({
      showModal: true,
      selectedPerson: name
    })
  }

  render() {
    return (
      <>
        <Header hearts={this.state.hearts} />
        <Main addHearts={this.addHearts} handleOpenModal={this.handleOpenModal} data={data} />

        {/* <SelectedBeast /> */}
        <Modal show={this.state.showModal} onHide={this.handleCloseModal}>
          <Modal.Header closeButton>{this.state.selectedPerson}</Modal.Header>
        </Modal>
        <Footer />
      </>
    )
  }
}

// 3RD EXPORT THE CLASS FOR OTHER FILES TO IMPORT
export default App;