// REBUILD AS A CLASS COMPONENT

// 1ST IMPORTS 
import React from 'react';
import Header from './Header';
import Main from './Main';


// 2ND CREATE THE CLASS - will always have a render method

class App extends React.Component {
  render() {
    return (
      <>
        <Header />
        <Main />
      </>
    )
  }
}

// 3RD EXPORT THE CLASS FOR OTHER FILES TO IMPORT
export default App;