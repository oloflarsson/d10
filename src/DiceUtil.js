import _ from 'lodash'
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

const getExpectedSingleUnmemoized = (again) => {
  const samples = 1000000
  let sum = 0
  for (let index = 0; index < samples; index++) {
    sum += getSuccessesSingle(again)
  }
  return sum / samples
}

const getExpectedSingle = _.memoize(getExpectedSingleUnmemoized)

const getExpected = (dices, again) => {
  const expectedSingle = getExpectedSingle(again)
  return expectedSingle * dices
}

export default {
  getValue,
  getSuccessesSingle,
  getSuccesses,
  getExpected,
}
