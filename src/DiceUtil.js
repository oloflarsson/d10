export const getValue = () => {
  return Math.ceil(Math.random() * 10);
};

export const getSuccessesSingle = (again, rote) => {
  const value = getValue();

  if (value < 8) {
    if (rote) {
      return getSuccessesSingle(again, false);
    } else {
      return 0;
    }
  }

  let successes = 1;

  if (value >= again) {
    successes += getSuccessesSingle(again, false);
  }

  return successes;
};

export const getSuccesses = (dices, again, rote) => {
  let successes = 0;
  for (let index = 0; index < dices; index++) {
    successes += getSuccessesSingle(again, rote);
  }
  return successes;
};

/*
const getExpectedSingleSampledUnmemoized = (again, samples) => {
  let sum = 0
  for (let index = 0; index < samples; index++) {
    sum += getSuccessesSingle(again)
  }
  return sum / samples
}
window.test1 = getExpectedSingleSampledUnmemoized
*/

const getExpectedSingle = (again, rote) => {
  if (again < 8) {
    throw new Error("again must be larger than or equal to 8");
  }

  if (rote) {
    // There is three dice "areas"
    // The (failure) reroll area, which has the expected value of a non rote dice
    // The (success) again area, which has the value of one + non rote dice
    // The (success) only area, which has the value of one

    const rerollArea = 7;
    const againArea = 10 - again + 1;
    const onlyArea = 10 - rerollArea - againArea;

    const rerollValue = getExpectedSingle(again, false);
    const againValue = 1 + getExpectedSingle(again, false);
    const onlyValue = 1;

    return (
      (rerollValue * rerollArea) / 10 +
      (againValue * againArea) / 10 +
      (onlyValue * onlyArea) / 10
    );
  }

  if (again >= 11) {
    return 3 / 10;
  }

  return 3 / (again - 1);
};

export const getExpected = (dices, again, rote) => {
  const expectedSingle = getExpectedSingle(again, rote);
  return expectedSingle * dices;
};

export const getChance = (dices, rote) => {
  if (rote) {
    // You need to fail with all dices, then roll them all again and fail again.
    // So in practice you need to fail with twice the dices
    dices *= 2;
  }
  return 1 - Math.pow(0.7, dices);
};
