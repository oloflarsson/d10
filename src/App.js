import React from 'react';
import './App.css';
import DiceUtil from './DiceUtil';

class App extends React.Component {
  state = {
    dices: 4,
    again: 10,
    rollEnabled: true,
    willpowerEnabled: true,
    successes: 0,
  }

  handleDicesChanged = (event) => {
    const dices = event.target.value
    this.setState({ dices })
  }

  handleAgainChanged = (event) => {
    const again = event.target.value
    this.setState({ again })
  }

  handleClear = () => {
    this.setState({
      rollEnabled: true,
      willpowerEnabled: true,
      successes: 0,
    })
  }

  handleRoll = () => {
    const { dices, again } = this.state
    const targetSuccesses = DiceUtil.getSuccesses(dices, again)
    this.setState({
      successes: targetSuccesses,
      rollEnabled: false,
    })
  }

  handleWillpower = () => {
    const { successes, again } = this.state
    const targetSuccesses = successes + DiceUtil.getSuccesses(3, again)
    this.setState({
      successes: targetSuccesses,
      willpowerEnabled: false,
    })
  }

  render() {
    const { dices, again, rollEnabled, willpowerEnabled, successes } = this.state
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
          </div>
        </header>
      </div>
    );
  }
}  

export default App;
