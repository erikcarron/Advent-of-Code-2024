let fs = require('fs')

let findInstructions = input => {
  let pattern = /mul\((\d{1,3}),(\d{1,3})\)/gmi

  let matches = input.match(pattern)
  return matches
}

let executeInstruction = input => {
  let pattern = /mul\((\d{1,3}),(\d{1,3})\)/mi
  let match = input.match(pattern)
  let value1 = parseInt(match[1])
  let value2 = parseInt(match[2])
  return value1 * value2
}

let input = fs.readFileSync('input.txt').toString()

let instructions = findInstructions(input)

let results = instructions.map(i => executeInstruction(i))

let answer = results.reduce((a, c) => a + c, 0)

console.log(`Answer: ${answer}`)