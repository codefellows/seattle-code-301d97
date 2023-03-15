import React from 'react';
import Person from './Person';
import './Main.css'

class Main extends React.Component {
  render() {
    return (
      <main>
        {this.props.data.map((personObj, index) => {
          return (
            <Person
              name={personObj.name}
              imageURL={personObj.imageURL}
              key={index}
              addHearts={this.props.addHearts}
              handleOpenModal={this.props.handleOpenModal}
            />
          )
        })}
      </main>
    )
  }
}

export default Main;
