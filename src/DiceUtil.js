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

export default { getSuccesses }
