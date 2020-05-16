import React from 'react';
import './App.css';

class App extends React.Component {
  state = {
    dices: 4,
    again: 10,
    successes: 0
  }

  render() {
    const {dices, again, successes} = this.state
    return (
      <div className="App">
        <header className="App-header">
          <p>Dices: {dices}</p>
          <p>Again: {again}</p>
          <p>Successes: {successes}</p>
        </header>
      </div>
    );
  }
}  

export default App;
