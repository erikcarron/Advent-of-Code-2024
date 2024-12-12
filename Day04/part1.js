let fs = require('fs')

let parseInput = input => input.split('\r\n').map(l => l.split(''))

let isXmasUp = (puzzle, x, y) => {
  if (y - 3 < 0) {
    return false
  } else {
    return puzzle[y][x] == 'X' && puzzle[y-1][x] == 'M' && puzzle[y-2][x] == 'A' && puzzle[y-3][x] == 'S'
  }
}

let isXmasDown = (puzzle, x, y) => {
  if (y + 3 > puzzle.length - 1) {
    return false
  } else {
    return puzzle[y][x] == 'X' && puzzle[y+1][x] == 'M' && puzzle[y+2][x] == 'A' && puzzle[y+3][x] == 'S'
  }
}

let isXmasLeft = (puzzle, x, y) => {
  if (x - 3 < 0) {
    return false
  } else {
    return puzzle[y][x] == 'X' && puzzle[y][x-1] == 'M' && puzzle[y][x-2] == 'A' && puzzle[y][x-3] == 'S'
  }
}

let isXmasRight = (puzzle, x, y) => {
  if (x + 3 > puzzle[0].length - 1) {
    return false
  } else {
    return puzzle[y][x] == 'X' && puzzle[y][x+1] == 'M' && puzzle[y][x+2] == 'A' && puzzle[y][x+3] == 'S'
  }
}

let isXmasUpRight = (puzzle, x, y) => {
  if ((x + 3 > puzzle[0].length - 1) || (y - 3 < 0)) {
    return false
  } else {
    return puzzle[y][x] == 'X' && puzzle[y-1][x+1] == 'M' && puzzle[y-2][x+2] == 'A' && puzzle[y-3][x+3] == 'S'
  }
}

let isXmasDownRight = (puzzle, x, y) => {
  if ((x + 3 > puzzle[0].length - 1) || (y + 3 > puzzle.length - 1)) {
    return false
  } else {
    return puzzle[y][x] == 'X' && puzzle[y+1][x+1] == 'M' && puzzle[y+2][x+2] == 'A' && puzzle[y+3][x+3] == 'S'
  }
}

let isXmasDownLeft = (puzzle, x, y) => {
  if ((x - 3 < 0) || (y + 3 > puzzle.length - 1)) {
    return false
  } else {
    return puzzle[y][x] == 'X' && puzzle[y+1][x-1] == 'M' && puzzle[y+2][x-2] == 'A' && puzzle[y+3][x-3] == 'S'
  }
}

let isXmasUpLeft = (puzzle, x, y) => {
  if ((x - 3 < 0) || (y - 3 < 0)) {
    return false
  } else {
    return puzzle[y][x] == 'X' && puzzle[y-1][x-1] == 'M' && puzzle[y-2][x-2] == 'A' && puzzle[y-3][x-3] == 'S'
  }
}

let findXmasCount = puzzle => {
  let count = 0

  for(let y = 0; y < puzzle.length; y++) {
    for(let x = 0; x < puzzle[y].length; x++) {
      if (puzzle[y][x] == 'X') {
        if (isXmasUp(puzzle, x, y)) {
          count++
        }
        if (isXmasRight(puzzle, x, y)) {
          count++
        }
        if (isXmasDown(puzzle, x, y)) {
          count++
        }
        if (isXmasLeft(puzzle, x, y)) {
          count++
        }
        if (isXmasUpRight(puzzle, x, y)) {
          count++
        }
        if (isXmasDownRight(puzzle, x, y)) {
          count++
        }
        if (isXmasDownLeft(puzzle, x, y)) {
          count++
        }
        if (isXmasUpLeft(puzzle, x, y)) {
          count++
        }
      }
    }
  }

  return count
}

let input = parseInput(fs.readFileSync('input.txt').toString())

let answer = findXmasCount(input)

console.log(`Answer: ${answer}`)