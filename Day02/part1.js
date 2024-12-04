let fs = require('fs')

let parseInput = input => input.split('\r\n').map(v => v.split(' ').map(l => parseInt(l)))

let isReportSafe = report => {
  let increase = report[0] < report[1]
  let decrease = report[0] > report[1]

  if (!increase && !decrease) {
    return false
  }

  for (let i = 1; i < report.length; i++) {
    let diff = report[i-1] - report[i]

    if (Math.abs(diff) > 3) {
      return false
    }

    if (diff == 0) {
      return false
    }

    if (increase && diff > 0) {
      return false
    }

    if (decrease && diff < 0) {
      return false
    }
  }

  return true
}

let input = parseInput(fs.readFileSync('input.txt').toString())

let safeReports = input.filter(r => isReportSafe(r))

let answer = safeReports.length

console.log(`Answer: ${answer}`)