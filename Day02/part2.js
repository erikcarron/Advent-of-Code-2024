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

let canTalerate = report => {

  for (let i = 0; i < report.length; i++) {
    if (isReportSafe(report.toSpliced(i, 1))) {
      return true;
    }
  }

  return false
}

let input = parseInput(fs.readFileSync('input.txt').toString())

let reports = input.map(r => ({levels: r, safe: false, tolerate: false}))

reports.forEach(r => r.safe = isReportSafe(r.levels))

reports.forEach(r => {
  if (!r.safe) {
    r.tolerate = canTalerate(r.levels)
    r.safe = r.tolerate
  }
})

let answer = reports.filter(r => r.safe).length

console.log(`Answer: ${answer}`)