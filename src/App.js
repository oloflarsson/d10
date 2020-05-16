import React from 'react';
import './App.css';
import DiceUtil from './DiceUtil';

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
    const successes = DiceUtil.getSuccesses(dices, again)
    this.setState({ successes })
  }

  render() {
    const { dices, again, successes } = this.state
    return (
      <div className="App">
        <header className="App-header">
          <table>
            <tbody>
              <tr>
                <td>Dices: </td>
                <td><input type="number" value={dices} onChange={this.handleDicesChanged} /></td>
              </tr>
              <tr>
                <td>Again: </td>
                <td><input type="number" value={again} onChange={this.handleAgainChanged} /></td>
              </tr>
              <tr>
                <td colSpan={2}><button type="button" onClick={this.handleRoll}>Roll</button></td>
              </tr>
              <tr>
                <td>Successes: </td>
                <td>{successes}</td>
              </tr>
            </tbody>
          </table>
        </header>
      </div>
    );
  }
}  

export default App;
