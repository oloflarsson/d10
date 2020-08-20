import React from 'react';
import './App.scss';
import DiceUtil from './DiceUtil';
import LocalStorageAccessor from './LocalStorageAccessor';

const STARTING_DICES = 4
const STARTING_AGAIN = 10
const STARTING_ROTE = false
const STARTING_EXPECTED = DiceUtil.getExpected(STARTING_DICES, STARTING_AGAIN)
const STARTING_CHANGE = DiceUtil.getChance(STARTING_DICES)
const STARTING_ROLL_ENABLED = true
const STARTING_WILLPOWER_ENABLED = true
const STARTING_SUCCESSES = 0
const STARTING_WILLPOWER_SUCCESSES = 0
const STORAGE = new LocalStorageAccessor('storagev2', {
  dices: STARTING_DICES,
  again: STARTING_AGAIN,
  rote: STARTING_ROTE,
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
    const { again, rote } = this.state
    const dices = event.target.value
    const expected = DiceUtil.getExpected(dices, again, rote)
    const chance = DiceUtil.getChance(dices, rote)
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
    const { dices, rote } = this.state
    const again = event.target.value
    const expected = DiceUtil.getExpected(dices, again, rote)
    const chance = DiceUtil.getChance(dices, rote)
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

  handleRoteChanged = (event) => {
    const { again, dices } = this.state
    const rote = event.target.checked
    const expected = DiceUtil.getExpected(dices, again, rote)
    const chance = DiceUtil.getChance(dices, rote)
    this.setState({
      rote,
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
    const { dices, again, rote, successes } = this.state
    const additionalSuccesses = DiceUtil.getSuccesses(dices, again, rote)
    const targetSuccesses = successes + additionalSuccesses
    this.setState({
      rollEnabled: false,
      successes: targetSuccesses,
    }, this.saveState)
  }

  handleWillpower = () => {
    const { again, rote, successes } = this.state
    const dices = 3
    const additionalSuccesses = DiceUtil.getSuccesses(dices, again, rote)
    const targetSuccesses = successes + additionalSuccesses
    this.setState({
      willpowerEnabled: false,
      successes: targetSuccesses,
      willpowerSuccesses: additionalSuccesses
    }, this.saveState)
  }

  render() {
    const { dices, again, rote, expected, chance, rollEnabled, willpowerEnabled, successes, willpowerSuccesses } = this.state

    const chanceDescription = '' + Math.round(chance * 100) + '%'
    const expectedDescription = '' + Math.round(expected * 100) / 100
    
    const tooltipDices = 'The amount of dices to be rolled.'
    const tooltipAgain = 'Roll one more dice if the dice shows this value and above.'
    const tooltipRote = 'Reroll all failed dice on the initial roll while not rerolling the results of that reroll, or the results of any 8, 9, or 10-again rerolls.'
    const tooltipChance = `The chance to get at least 1 success is ${chanceDescription} when rolling ${dices} dices.`
    const tooltipExpected = `The average amount of successes is ${expectedDescription} when rolling ${dices} dices with ${again}-again.`

    return (
      <div className="App">
        <div className="holder">
          <div className="map">
            <div className="entry">
              <div className="key" title={tooltipDices}>
                Dices:
              </div>
              <div className="value">
                <input className="input" type="number" min="1" value={dices} onChange={this.handleDicesChanged} />
              </div>
            </div>
            <div className="entry">
              <div className="key" title={tooltipAgain}>
                Again:
              </div>
              <div className="value">
                <input className="input" type="number" min="8" max="11" value={again} onChange={this.handleAgainChanged} />
              </div>
            </div>
            <div className="entry">
              <div className="key" title={tooltipRote}>
                Rote:
              </div>
              <div className="value">
                <input className="input checkbox" type="checkbox" checked={rote} onChange={this.handleRoteChanged} />
              </div>
            </div>
          </div>

          <div className="stats">
            <div className="entry" title={tooltipChance}>
              <div className="key">
                Chance:
              </div>
              <div className="value">
                {chanceDescription}
              </div>
            </div>
            <div className="entry" title={tooltipExpected}>
              <div className="key">
                Expected:
              </div>
              <div className="value">
                {expectedDescription}
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

          {!willpowerEnabled && (
            <div className="willpowerSuccesses">
              {willpowerSuccesses} from Willpower
            </div>
          )}
        </div>
      </div>
    );
  }
}  

export default App;
