import React from 'react';
import './App.css';

const getDiceValue = () => {
  return Math.ceil(Math.random() * 10)
}

const getDiceSuccesses = (again) => {
  let successes = 0
  const value = getDiceValue()
  if (value >= 8) {
    successes += 1
  }
  if (value >= again) {
    successes += getDiceSuccesses(again)
  }
  return successes
}

const getDiceSuccessesMultiple = (dices, again) => {
  let successes = 0
  for (let index = 0; index < dices; index++) {
    successes += getDiceSuccesses(again)
  }
  return successes
}

class App extends React.Component {
  state = {
    dices: 4,
    again: 10,
    successes: 0
  }

  handleDicesChanged = (event) => {
    const dices = event.target.value
    this.setState({ dices })
  }

  handleAgainChanged = (event) => {
    const again = event.target.value
    this.setState({ again })
  }

  handleRoll = () => {
    const { dices, again } = this.state
    const successes = getDiceSuccessesMultiple(dices, again)
    this.setState({ successes })
  }

  render() {
    const { dices, again, successes } = this.state
    return (
      <div className="App">
        <header className="App-header">
          <div>
            <input type="number" value={dices} onChange={this.handleDicesChanged} />
          </div>

          <div>
            <input type="number" value={again} onChange={this.handleAgainChanged} />
          </div>

          <div>
            <button type="button" onClick={this.handleRoll}>Roll</button>
          </div>

          <p>{successes} Successes</p>
        </header>
      </div>
    );
  }
}  

export default App;
