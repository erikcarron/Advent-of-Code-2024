let fs = require('fs')

let parseInput = input => {
  let lines = input.split('\r\n')
  let rules = []
  let updates = []

  let rulePattern = /(\d+)\|(\d+)/mi
  let i = 0

  while (i < lines.length && lines[i] !== '') {
    let matches = lines[i].match(rulePattern)
    rules.push({ before: parseInt(matches[1]), after: parseInt(matches[2]) })
    i++
  }

  i++

  while (i < lines.length) {
    updates.push(lines[i].split(',').map(v => parseInt(v)))
    i++
  }

  return { rules: rules, updates: updates }
}

let isCorrectOrder = (update, rules) => {
  let pages = {}

  for (let i = 0; i < update.length; i++) {
    pages[update[i].toString()] = i
  }

  for (let i = 0; i < rules.length; i++) {
    let before = rules[i].before.toString()
    let after = rules[i].after.toString()

    if (pages.hasOwnProperty(before) && pages.hasOwnProperty(after)) {
      if (pages[before] > pages[after]) {
        return false
      }
    }
  }

  return true
}

let getMiddlePageNumber = update => update[Math.floor(update.length / 2)]

let fixUpdate = (update, rules) => {
  let pages = {}

  for (let i = 0; i < update.length; i++) {
    pages[update[i].toString()] = i
  }

  for (let i = 0; i < rules.length; i++) {
    let before = rules[i].before.toString()
    let after = rules[i].after.toString()

    if (pages.hasOwnProperty(before) && pages.hasOwnProperty(after)) {
      if (pages[before] > pages[after]) {
        let index = pages[before]
        pages[before] = pages[after]
        pages[after] = index
      }
    }
  }

  let fixedUpdate = Array(update.length)

  Object.keys(pages).forEach((key) => {
    fixedUpdate[pages[key]] = parseInt(key)
  });

  if (!isCorrectOrder(fixedUpdate, rules)) {
    fixedUpdate = fixUpdate(fixedUpdate, rules)
  }

  return fixedUpdate
}

let input = parseInput(fs.readFileSync('input.txt').toString())

let answer = input.updates.filter(u => !isCorrectOrder(u, input.rules)).reduce((accumulator, currentValue) => accumulator + getMiddlePageNumber(fixUpdate(currentValue, input.rules)), 0)

console.log(`Answer: ${answer}`)