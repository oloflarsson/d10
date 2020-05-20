import React from 'react';
import './App.css';
import DiceUtil from './DiceUtil';
import LocalStorageAccessor from './LocalStorageAccessor';

const STARTING_DICES = 4
const STARTING_AGAIN = 10
const STARTING_EXPECTED = DiceUtil.getExpected(STARTING_DICES, STARTING_AGAIN)
const STARTING_CHANGE = DiceUtil.getChance(STARTING_DICES)
const STARTING_ROLL_ENABLED = true
const STARTING_WILLPOWER_ENABLED = true
const STARTING_SUCCESSES = 0
const STARTING_WILLPOWER_SUCCESSES = 0
const STORAGE = new LocalStorageAccessor('storage', {
  dices: STARTING_DICES,
  again: STARTING_AGAIN,
  expected: STARTING_EXPECTED,
  chance: STARTING_CHANGE,
  rollEnabled: STARTING_ROLL_ENABLED,
  willpowerEnabled: STARTING_WILLPOWER_ENABLED,
  successes: STARTING_SUCCESSES,
  willpowerSuccesses: STARTING_WILLPOWER_SUCCESSES,
})

class App extends React.Component {
  state = STORAGE.get()

  saveState = () => {
    STORAGE.set(this.state)
  }

  handleDicesChanged = (event) => {
    const { again } = this.state
    const dices = event.target.value
    const expected = DiceUtil.getExpected(dices, again)
    const chance = DiceUtil.getChance(dices)
    this.setState({
      dices,
      expected,
      chance,
      rollEnabled: STARTING_ROLL_ENABLED,
      willpowerEnabled: STARTING_WILLPOWER_ENABLED,
      successes: STARTING_SUCCESSES,
      willpowerSuccesses: STARTING_WILLPOWER_SUCCESSES,
    }, this.saveState)
  }

  handleAgainChanged = (event) => {
    const { dices } = this.state
    const again = event.target.value
    const expected = DiceUtil.getExpected(dices, again)
    const chance = DiceUtil.getChance(dices)
    this.setState({
      again,
      expected,
      chance,
      rollEnabled: STARTING_ROLL_ENABLED,
      willpowerEnabled: STARTING_WILLPOWER_ENABLED,
      successes: STARTING_SUCCESSES,
      willpowerSuccesses: STARTING_WILLPOWER_SUCCESSES,
    }, this.saveState)
  }

  handleClear = () => {
    this.setState({
      rollEnabled: STARTING_ROLL_ENABLED,
      willpowerEnabled: STARTING_WILLPOWER_ENABLED,
      successes: STARTING_SUCCESSES,
      willpowerSuccesses: STARTING_WILLPOWER_SUCCESSES,
    }, this.saveState)
  }

  handleRoll = () => {
    const { dices, again, successes } = this.state
    const additionalSuccesses = DiceUtil.getSuccesses(dices, again)
    const targetSuccesses = successes + additionalSuccesses
    this.setState({
      rollEnabled: false,
      successes: targetSuccesses,
    }, this.saveState)
  }

  handleWillpower = () => {
    const { again, successes } = this.state
    const dices = 3
    const additionalSuccesses = DiceUtil.getSuccesses(dices, again)
    const targetSuccesses = successes + additionalSuccesses
    this.setState({
      willpowerEnabled: false,
      successes: targetSuccesses,
      willpowerSuccesses: additionalSuccesses
    }, this.saveState)
  }

  render() {
    const { dices, again, expected, chance, rollEnabled, willpowerEnabled, successes, willpowerSuccesses } = this.state
    return (
      <div className="App">
        <div className="holder">
          <div className="map">
            <div className="entry">
              <div className="key">
                Dices:
              </div>
              <div className="value">
                <input className="input" type="number" min="1" value={dices} onChange={this.handleDicesChanged} />
              </div>
            </div>
            <div className="entry">
              <div className="key">
                Again:
              </div>
              <div className="value">
              <input className="input" type="number" min="2" max="11" value={again} onChange={this.handleAgainChanged} />
              </div>
            </div>
          </div>

          <div className="buttons">
            <button className="button" type="button" onClick={this.handleClear}>Clear</button>
            <button className="button" type="button" onClick={this.handleRoll} disabled={rollEnabled ? '' : 'disabled'}>Roll</button>
            <button className="button" type="button" onClick={this.handleWillpower} disabled={willpowerEnabled ? '' : 'disabled'}>Willpower</button>
          </div>

          <div className="chance">
            {Math.round(chance * 100)}% chance
          </div>
          <div className="expected">
            {Math.round(expected * 100) / 100} expected
          </div>
          <div className="successes">
            {rollEnabled && willpowerEnabled ? '?' : successes}
          </div>

          {!willpowerEnabled && (
            <div className="willpowerSuccesses">
              {willpowerSuccesses} from willpower
            </div>
          )}
        </div>
      </div>
    );
  }
}  

export default App;
