import React from 'react';
import './App.css';
import DiceUtil from './DiceUtil';
import LocalStorageAccessor from './LocalStorageAccessor';

const STARTING_DICES = 4
const STARTING_AGAIN = 10
const STARTING_EXPECTED = DiceUtil.getExpected(STARTING_DICES, STARTING_AGAIN)
const STARTING_CHANGE = DiceUtil.getChance(STARTING_DICES)
const STORAGE = new LocalStorageAccessor('storage', {
  dices: STARTING_DICES,
  again: STARTING_AGAIN,
  expected: STARTING_EXPECTED,
  chance: STARTING_CHANGE,
  rollEnabled: true,
  willpowerEnabled: true,
  successes: 0,
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
    }, this.saveState)
  }

  handleClear = () => {
    this.setState({
      rollEnabled: true,
      willpowerEnabled: true,
      successes: 0,
    }, this.saveState)
  }

  handleRoll = () => {
    const { dices } = this.state
    this.rollDices(dices)
    this.setState({
      rollEnabled: false,
    }, this.saveState)
  }

  handleWillpower = () => {
    this.rollDices(3)
    this.setState({
      willpowerEnabled: false,
    }, this.saveState)
  }

  rollDices = (dices) => {
    const { again, successes } = this.state
    const targetSuccesses = successes + DiceUtil.getSuccesses(dices, again)
    this.setState({
      successes: targetSuccesses,
    }, this.saveState)
  }

  render() {
    const { dices, again, expected, chance, rollEnabled, willpowerEnabled, successes } = this.state
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

          <div className="successes">
            {rollEnabled && willpowerEnabled ? '?' : successes}
          </div>

          <div className="expected">
            {expected.toFixed(1)} expected
          </div>
          <div className="chance">
            {Math.round(chance * 100)}% chance
          </div>
        </div>
      </div>
    );
  }
}  

export default App;
