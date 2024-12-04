let fs = require('fs')

let parseInput = input => {
  let pattern = /mul\((\d{1,3}),(\d{1,3})\)/gmi

  let matches = input.match(pattern)
  return matches
}

let findInstructions = input => {
  let pattern = /mul\((\d{1,3}),(\d{1,3})\)|do\(\)|don't\(\)/gmi

  let matches = input.match(pattern)
  return matches
}

let executeMultiplyInstruction = instruction => {
  let pattern = /mul\((\d{1,3}),(\d{1,3})\)/mi
  let match = instruction.match(pattern)
  let value1 = parseInt(match[1])
  let value2 = parseInt(match[2])
  return value1 * value2
}

let executeInstructions = instructions => {
  let value = 0
  let enabled = true

  for (let i = 0; i < instructions.length; i++) {
    let instruction = instructions[i]

    if (instruction == 'do()') {
      enabled = true
    } else if (instruction == 'don\'t()') {
      enabled = false
    } else if (instruction.startsWith('mul') && enabled) {
      value += executeMultiplyInstruction(instruction)
    }
  }

  return value
}


let input = fs.readFileSync('input.txt').toString()

let instructions = findInstructions(input)

let answer = executeInstructions(instructions)

console.log(`Answer: ${answer}`)