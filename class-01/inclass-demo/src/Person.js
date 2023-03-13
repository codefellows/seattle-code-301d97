import React from 'react';


class Person extends React.Component {
  render(){
    return (
      <article>
        <p>Hello {this.props.name}</p>

        <h2>{this.props.title}</h2>
      </article>
    )
  }
}

export default Person;