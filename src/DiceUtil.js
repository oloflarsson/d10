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

const getExpectedSingleSampledUnmemoized = (again, samples) => {
  let sum = 0
  for (let index = 0; index < samples; index++) {
    sum += getSuccessesSingle(again)
  }
  return sum / samples
}
window.test1 = getExpectedSingleSampledUnmemoized

const getExpectedSingle = (again) => {
  if (again <= 1) {
    throw new Error('again must be larger than or equal to 2')
  }

  if (again >= 11) {
    return 3 / 10
  }

  return 3 / (again - 1)
}

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
