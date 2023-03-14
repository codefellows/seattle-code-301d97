import React from 'react';
import Person from './Person';
import data from './data/data.json'
import './Main.css'

class Main extends React.Component {
  render(){
    return (
       <main>
        {data.map((personObj,index) => {
          return <Person name={personObj.name} imageURL={personObj.imageURL} key={index} />
        })}
       </main>
    )
  }
}

export default Main;
