import React from "react";
import "./App.scss";
import * as DiceUtil from "./DiceUtil";
import LocalStorageAccessor from "./LocalStorageAccessor";

const STARTING_DICES = 4;
const STARTING_AGAIN = 10;
const STARTING_ROTE = false;
const STARTING_ROLL_ENABLED = true;
const STARTING_WILLPOWER_ENABLED = true;
const STARTING_SUCCESSES = 0;
const STARTING_WILLPOWER_SUCCESSES = 0;
const STARTING_PRESETS = [];
const STORAGE = new LocalStorageAccessor("storagev4", {
  dices: STARTING_DICES,
  again: STARTING_AGAIN,
  rote: STARTING_ROTE,
  rollEnabled: STARTING_ROLL_ENABLED,
  willpowerEnabled: STARTING_WILLPOWER_ENABLED,
  successes: STARTING_SUCCESSES,
  willpowerSuccesses: STARTING_WILLPOWER_SUCCESSES,
  presets: STARTING_PRESETS
});


const getChanceDescription = (chance) => {
  return "" + Math.round(chance * 100) + "%";
};

const getExpectedDescription = (expected) => {
  return "" + Math.round(expected * 100) / 100;
};

class App extends React.Component {
  state = STORAGE.get();

  edit = (editState) => {
    this.setState(
      editState,
      this.saveState
    );
  }

  editPreset = (presetState) => {
    const { presets } = this.state;

    const presetsAfter = presets.map(preset => {
      if (preset.id === presetState.id) {
        return Object.assign({}, preset, presetState);
      } else {
        return preset;
      }
    });

    this.edit(
      {
        presets: presetsAfter,
      }
    );
  }

  addPreset = (presetState) => {
    const { presets } = this.state;
    const presetsAfter = [...presets, presetState];
    this.edit(
      {
        presets: presetsAfter,
      }
    );
  }

  removePreset = (presetState) => {
    const { presets } = this.state;
    const presetsAfter = presets.filter(preset => preset.id !== presetState.id);
    this.edit(
      {
        presets: presetsAfter,
      }
    );
  }

  saveState = () => {
    STORAGE.set(this.state);
  };

  handleDicesChanged = (event) => {
    const dices = event.target.value;
    this.edit(
      {
        dices,
        rollEnabled: STARTING_ROLL_ENABLED,
        willpowerEnabled: STARTING_WILLPOWER_ENABLED,
        successes: STARTING_SUCCESSES,
        willpowerSuccesses: STARTING_WILLPOWER_SUCCESSES,
      }
    );
  };

  handleAgainChanged = (event) => {
    const again = event.target.value;
    this.edit(
      {
        again,
        rollEnabled: STARTING_ROLL_ENABLED,
        willpowerEnabled: STARTING_WILLPOWER_ENABLED,
        successes: STARTING_SUCCESSES,
        willpowerSuccesses: STARTING_WILLPOWER_SUCCESSES,
      }
    );
  };

  handleRoteChanged = (event) => {
    const rote = event.target.checked;
    this.edit(
      {
        rote,
        rollEnabled: STARTING_ROLL_ENABLED,
        willpowerEnabled: STARTING_WILLPOWER_ENABLED,
        successes: STARTING_SUCCESSES,
        willpowerSuccesses: STARTING_WILLPOWER_SUCCESSES,
      }
    );
  };

  handleClear = () => {
    this.edit(
      {
        rollEnabled: STARTING_ROLL_ENABLED,
        willpowerEnabled: STARTING_WILLPOWER_ENABLED,
        successes: STARTING_SUCCESSES,
        willpowerSuccesses: STARTING_WILLPOWER_SUCCESSES,
      }
    );
  };

  handleRoll = () => {
    const { dices, again, rote, successes } = this.state;
    const additionalSuccesses = DiceUtil.getSuccesses(dices, again, rote);
    const targetSuccesses = successes + additionalSuccesses;
    this.edit(
      {
        rollEnabled: false,
        successes: targetSuccesses,
      }
    );
  };

  handleWillpower = () => {
    const { again, rote, successes } = this.state;
    const dices = 3;
    const additionalSuccesses = DiceUtil.getSuccesses(dices, again, rote);
    const targetSuccesses = successes + additionalSuccesses;
    this.edit(
      {
        willpowerEnabled: false,
        successes: targetSuccesses,
        willpowerSuccesses: additionalSuccesses,
      }
    );
  };

  handlePresetAdd = () => {
    const { dices, again, rote } = this.state;
    const id = Date.now();
    let name = `${dices} A${again}`;
    if (rote) {
      name += ' R';
    }
    const edit = false;
    const preset = { id, name, dices, again, rote, edit };
    this.addPreset(preset);
  };

  handlePresetEdit = ({ id }) => {
    const edit = true;
    this.editPreset(
      {
        id,
        edit,
      }
    );
  };

  handlePresetLoad = ({ dices, again, rote }) => {
    this.edit(
      {
        dices,
        again,
        rote,
        rollEnabled: STARTING_ROLL_ENABLED,
        willpowerEnabled: STARTING_WILLPOWER_ENABLED,
        successes: STARTING_SUCCESSES,
        willpowerSuccesses: STARTING_WILLPOWER_SUCCESSES,
      }
    );
  };

  render() {
    const {
      dices,
      again,
      rote,
      rollEnabled,
      willpowerEnabled,
      successes,
      willpowerSuccesses,
      presets
    } = this.state;

    const chance = DiceUtil.getChance(dices, rote);
    const expected = DiceUtil.getExpected(dices, again, rote);

    const chanceDescription = getChanceDescription(chance);
    const expectedDescription = getExpectedDescription(expected);

    const tooltipDices = "The amount of dices to be rolled.";
    const tooltipAgain =
      "Roll one more dice if the dice shows this value and above.";
    const tooltipRote =
      "Reroll all failed dice on the initial roll while not rerolling the results of that reroll, or the results of any 8, 9, or 10-again rerolls.";
    const tooltipChance = `The chance to get at least 1 success is ${chanceDescription} when rolling ${dices} dices.`;
    const tooltipExpected = `The average amount of successes is ${expectedDescription} when rolling ${dices} dices with ${again}-again.`;

    return (
      <div className="App">
        <div className="holder">
          <div className="map">
            <div className="entry">
              <div className="key" title={tooltipDices}>
                Dices:
              </div>
              <div className="value">
                <input
                  className="input"
                  type="number"
                  min="1"
                  value={dices}
                  onChange={this.handleDicesChanged}
                />
              </div>
            </div>
            <div className="entry">
              <div className="key" title={tooltipAgain}>
                Again:
              </div>
              <div className="value">
                <input
                  className="input"
                  type="number"
                  min="8"
                  max="11"
                  value={again}
                  onChange={this.handleAgainChanged}
                />
              </div>
            </div>
            <div className="entry">
              <div className="key" title={tooltipRote}>
                Rote:
              </div>
              <div className="value">
                <input
                  className="input checkbox"
                  type="checkbox"
                  checked={rote}
                  onChange={this.handleRoteChanged}
                />
              </div>
            </div>
          </div>

          <div className="stats">
            <div className="entry" title={tooltipChance}>
              <div className="key">Chance:</div>
              <div className="value">{chanceDescription}</div>
            </div>
            <div className="entry" title={tooltipExpected}>
              <div className="key">Expected:</div>
              <div className="value">{expectedDescription}</div>
            </div>
          </div>

          <div className="buttons">
            <button className="button" type="button" onClick={this.handleClear}>
              Clear
            </button>
            <button
              className="button"
              type="button"
              onClick={this.handleRoll}
              disabled={rollEnabled ? "" : "disabled"}
            >
              Roll
            </button>
            <button
              className="button"
              type="button"
              onClick={this.handleWillpower}
              disabled={willpowerEnabled ? "" : "disabled"}
            >
              Willpower
            </button>
          </div>

          <div className="successes">
            {rollEnabled && willpowerEnabled ? "?" : successes}
          </div>

          
          <div className="willpowerSuccesses">
            {!willpowerEnabled
              ? (<>{willpowerSuccesses} from Willpower</>)
              : (<>&nbsp;</>)
            }
          </div>
          
          <div className="presets">
            {presets.map(preset => {
              const presetChance = DiceUtil.getChance(preset.dices, preset.rote);
              const presetExpected = DiceUtil.getExpected(preset.dices, preset.again, preset.rote);

              const presetChanceDescription = getChanceDescription(presetChance);
              const presetExpectedDescription = getExpectedDescription(presetExpected);
              const tooltipPreset = `Dices: ${preset.dices}\nAgain: ${preset.again}\nRote: ${preset.rote}\nChance: ${presetChanceDescription}\nExpected: ${presetExpectedDescription}\n\nLeft click to apply. Right click to edit name. Press ENTER, ESC or click elsewhere to save. Will be deleted if saving with empty name.`;

              if (preset.edit) {
                const handleChange = (e) => {
                  this.editPreset(
                    {
                      id: preset.id,
                      name: e.target.value,
                    }
                  );
                };
                const handleBlur = () => {
                  if (preset.name !== '') {
                    this.editPreset(
                      {
                        id: preset.id,
                        edit: false,
                      }
                    );
                  } else {
                    this.removePreset(
                      {
                        id: preset.id,
                      }
                    );
                  }
                }
                const handleKeyDown = (e) => {
                  if (e.key === 'Escape' || e.key === 'Enter') {
                    handleBlur();
                  }
                };
                return (
                  <input key={preset.id} className="preset" type="text" value={preset.name} onChange={handleChange} onKeyDown={handleKeyDown} onBlur={handleBlur} title={tooltipPreset} autoFocus/>
                )
              } else {
                const handleClick = () => {
                  this.handlePresetLoad(preset);
                };
                const onContextMenu = (e) => {
                  e.preventDefault();
                  this.handlePresetEdit(preset);
                };
                return (
                  <button key={preset.id} className="preset" type="button" onClick={handleClick} onContextMenu={onContextMenu} title={tooltipPreset}>{preset.name}</button>
                )
              }
            })}
            <button className="preset" type="button" onClick={this.handlePresetAdd}>+</button>
          </div>
        </div>
      </div>
    );
  }
}

export default App;
