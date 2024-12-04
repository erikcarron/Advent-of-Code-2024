let fs = require('fs')

let parseInput = input => {
  let lines = input.match(/^.+$/gm)
  let pattern = /^(\d+)   (\d+)$/mi

  let left = []
  let right = []

  lines.forEach(l => {
    let match = l.match(pattern)
    left.push(parseInt(match[1]))
    right.push(parseInt(match[2]))
  })

  return {left: left, right: right}
}

let input = parseInput(fs.readFileSync('input.txt').toString())

input.left.sort((a, b) => a - b)
input.right.sort((a, b) => a - b)

let differences = input.left.map((value, index) => {
  return Math.abs(value - input.right[index])
})

let answer = differences.reduce((accumulator, current) => accumulator + current, 0)

console.log(`Answer: ${answer}`)