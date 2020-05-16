const getValue = () => {
  return Math.ceil(Math.random() * 10)
}

const getSuccessesSingle = (again) => {
  let successes = 0
  const value = getValue()
  if (value >= 8) {
    successes += 1
  }
  if (value >= again) {
    successes += getSuccessesSingle(again)
  }
  return successes
}

const getSuccesses = (dices, again) => {
  let successes = 0
  for (let index = 0; index < dices; index++) {
    successes += getSuccessesSingle(again)
  }
  return successes
}

const getExpected = (dices, again) => {
  const samples = 100000
  let sum = 0
  for (let index = 0; index < samples; index++) {
    sum += getSuccesses(dices, again)
  }
  return sum / samples
}

export default {
  getValue,
  getSuccessesSingle,
  getSuccesses,
  getExpected,
}