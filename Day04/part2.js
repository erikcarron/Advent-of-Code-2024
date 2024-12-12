let fs = require('fs')

let parseInput = input => input.split('\r\n').map(l => l.split(''))

let isXmas = (puzzle, x, y) => {
  if (puzzle[y][x] !== 'A' || y - 1 < 0 || x - 1 < 0 || y + 1 > puzzle.length - 1 || x + 1 > puzzle[0].length) {
    return false
  } else {
    return ((puzzle[y-1][x-1] == 'M' && puzzle[y+1][x+1] == 'S') || (puzzle[y-1][x-1] == 'S' && puzzle[y+1][x+1] == 'M'))
      &&
      ((puzzle[y+1][x-1] == 'M' && puzzle[y-1][x+1] == 'S') || (puzzle[y+1][x-1] == 'S' && puzzle[y-1][x+1] == 'M'))
  }
}

let findXmasCount = puzzle => {
  let count = 0

  for(let y = 0; y < puzzle.length; y++) {
    for(let x = 0; x < puzzle[y].length; x++) {
      if (puzzle[y][x] == 'A') {
        if (isXmas(puzzle, x, y)) {
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