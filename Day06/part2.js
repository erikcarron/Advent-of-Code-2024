let fs = require('fs')

let parseInput = input => {
  let data = input.split('\r\n').map(l => l.split(''))
  let obsticles = {}
  let guard = { x: 0, y: 0, direction: 'up' }

  for (let y = 0; y < data.length; y++) {
    for (let x = 0; x < data[y].length; x++) {
      if (data[y][x] == '#') {
        obsticles[`${x},${y}`] = data[y][x]
      } else if (data[y][x] == '^') {
        guard.x = x
        guard.y = y
        guard.direction = 'up'
      } else if (data[y][x] == '>') {
        guard.x = x
        guard.y = y
        guard.direction = 'right'
      } else if (data[y][x] == '<') {
        guard.x = x
        guard.y = y
        guard.direction = 'left'
      } else if (data[y][x] == 'v') {
        guard.x = x
        guard.y = y
        guard.direction = 'down'
      }
    }
  }

  return {
    width: data[0].length,
    height: data.length,
    obsticles: obsticles,
    guard: guard,
    guardStart: { ...guard }
  }
}

let isGuardLeavingArea = input => {
  if (input.guard.y == 0 && input.guard.direction == 'up') {
    return true
  } else if (input.guard.x + 1 == input.width && input.guard.direction == 'right') {
    return true
  } else if (input.guard.y + 1 == input.height && input.guard.direction == 'down') {
    return true
  } else if (input.guard.x == 0 && input.guard.direction == 'left') {
    return true
  }

  return false
}

let isObsticle = (obsticles, x, y) => obsticles.hasOwnProperty(`${x},${y}`)

let moveGuard = input => {
  if (input.guard.direction == 'up') {
    if (isObsticle(input.obsticles, input.guard.x, input.guard.y - 1)) {
      input.guard.direction = 'right'
    } else {
      input.guard.y--
    }
  } else if (input.guard.direction == 'right') {
    if (isObsticle(input.obsticles, input.guard.x + 1, input.guard.y)) {
      input.guard.direction = 'down'
    } else {
      input.guard.x++
    }
  } else if (input.guard.direction == 'down') {
    if (isObsticle(input.obsticles, input.guard.x, input.guard.y + 1)) {
      input.guard.direction = 'left'
    } else {
      input.guard.y++
    }
  } else if (input.guard.direction == 'left') {
    if (isObsticle(input.obsticles, input.guard.x - 1, input.guard.y)) {
      input.guard.direction = 'up'
    } else {
      input.guard.x--
    }
  }
}

let calculatePositions = input => {
  while (!isGuardLeavingArea(input)) {
    moveGuard(input)

    if (input.visitedPositions.hasOwnProperty(`${input.guard.x},${input.guard.y},${input.guard.direction}`)) {
      input.visitedPositions[`${input.guard.x},${input.guard.y},${input.guard.direction}`]++
    } else {
      input.visitedPositions[`${input.guard.x},${input.guard.y},${input.guard.direction}`] = 1
    }
  }
}

let isInLoop = input => input.visitedPositions.hasOwnProperty(`${input.guard.x},${input.guard.y},${input.guard.direction}`)

let testNewObsticles = (input) => {
  for (let key in input.visitedPositions) {
    let parts = key.split(',')
    let x = parseInt(parts[0])
    let y = parseInt(parts[1])

    if (x == input.guardStart.x && y == input.guardStart.y) {
      continue
    }

    // clone input
    let testInput = JSON.parse(JSON.stringify(input))
    // restart guard
    testInput.guard = { ...testInput.guardStart }
    // insert new obsticle
    testInput.obsticles[`${x},${y}`] = 'O'
    // clear data
    testInput.visitedPositions = {}

    while (!isGuardLeavingArea(testInput)) {
      moveGuard(testInput)

      if (isInLoop(testInput)) {
        if (!input.loopObsticles.hasOwnProperty(`${x},${y}`)) {
          input.loopObsticles[`${x},${y}`] = 'loop'
        }

        break
      }

      if (testInput.visitedPositions.hasOwnProperty(`${testInput.guard.x},${testInput.guard.y},${testInput.guard.direction}`)) {
        testInput.visitedPositions[`${testInput.guard.x},${testInput.guard.y},${testInput.guard.direction}`]++
      } else {
        testInput.visitedPositions[`${testInput.guard.x},${testInput.guard.y},${testInput.guard.direction}`] = 1
      }
    }
  }
}

let input = parseInput(fs.readFileSync('input.txt').toString())

input.visitedPositions = {}
input.visitedPositions[`${input.guard.x},${input.guard.y},${input.guard.direction}`] = 1
input.loopObsticles = {}

calculatePositions(input)
testNewObsticles(input)

let answer = Object.keys(input.loopObsticles).length

console.log(`Answer: ${answer}`)