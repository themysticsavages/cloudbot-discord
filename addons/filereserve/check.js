const data = require('./data.json')
const process = require('process')

var count = 0

function LookFor(name) {
    while (true) {
    count++
    if (name.includes(data[count])) {
        return('true')
    }
    if (count > 10) {
        return('false')
    }
  }
}

module.exports = {
    LookFor
}