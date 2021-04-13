import React from 'react';

import './App.css';

class App extends React.Component {

  foo(){
    return 'akash';
  }

  render(){

    const loading=false;
    const name='akash';    
    return (
      <div className="App">
        <h2>My app</h2>
        { loading ? <h1>Hello from {this.foo()}</h1> : <h4> Loading</h4> }
      </div>
    );

  }
}

export default App;
