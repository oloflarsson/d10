import React from 'react';
import './App.css';
import DiceUtil from './DiceUtil';

const STARTING_DICES = 4
const STARTING_AGAIN = 10
const STARTING_EXPECTED = DiceUtil.getExpected(STARTING_DICES, STARTING_AGAIN)

class App extends React.Component {
  state = {
    dices: STARTING_DICES,
    again: STARTING_AGAIN,
    expected: STARTING_EXPECTED,
    rollEnabled: true,
    willpowerEnabled: true,
    successes: 0,
  }

  handleDicesChanged = (event) => {
    const { again } = this.state
    const dices = event.target.value
    const expected = DiceUtil.getExpected(dices, again)
    this.setState({
      dices,
      expected,
    })
  }

  handleAgainChanged = (event) => {
    const { dices } = this.state
    const again = event.target.value
    const expected = DiceUtil.getExpected(dices, again)
    this.setState({
      again,
      expected,
    })
  }

  handleClear = () => {
    this.setState({
      rollEnabled: true,
      willpowerEnabled: true,
      successes: 0,
    })
  }

  handleRoll = () => {
    const { dices } = this.state
    this.rollDices(dices)
    this.setState({
      rollEnabled: false,
    })
  }

  handleWillpower = () => {
    this.rollDices(3)
    this.setState({
      willpowerEnabled: false,
    })
  }

  rollDices = (dices) => {
    const { again, successes } = this.state
    const targetSuccesses = successes + DiceUtil.getSuccesses(dices, again)
    this.setState({
      successes: targetSuccesses,
    }, this.updateExpected)
  }

  render() {
    const { dices, again, expected, rollEnabled, willpowerEnabled, successes } = this.state
    return (
      <div className="App">
        <header className="App-header">
          <div className="holder">
            <div className="map">
              <div className="entry">
                <div className="key">
                  Dices:
                </div>
                <div className="value">
                  <input type="number" min="1" value={dices} onChange={this.handleDicesChanged} />
                </div>
              </div>
              <div className="entry">
                <div className="key">
                  Again:
                </div>
                <div className="value">
                <input type="number" min="2" value={again} onChange={this.handleAgainChanged} />
                </div>
              </div>
            </div>

            <div className="buttons">
              <button className="button" type="button" onClick={this.handleClear}>Clear</button>
              <button className="button" type="button" onClick={this.handleRoll} disabled={rollEnabled ? '' : 'disabled'}>Roll</button>
              <button className="button" type="button" onClick={this.handleWillpower} disabled={willpowerEnabled ? '' : 'disabled'}>Willpower</button>
            </div>

            <div className="successes">
              {successes}
            </div>

            <div className="expected">
              {expected.toFixed(1)} expected
            </div>
          </div>
        </header>
      </div>
    );
  }
}  

export default App;
