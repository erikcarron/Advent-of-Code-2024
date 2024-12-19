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
    guard: guard
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

    if (input.visitedPositions.hasOwnProperty(`${input.guard.x},${input.guard.y}`)) {
      input.visitedPositions[`${input.guard.x},${input.guard.y}`]++
    } else {
      input.visitedPositions[`${input.guard.x},${input.guard.y}`] = 1
    }
  }
}

let input = parseInput(fs.readFileSync('input.txt').toString())

input.visitedPositions = {}
input.visitedPositions[`${input.guard.x},${input.guard.y}`] = 1

calculatePositions(input)

let answer = Object.keys(input.visitedPositions).length

console.log(`Answer: ${answer}`)