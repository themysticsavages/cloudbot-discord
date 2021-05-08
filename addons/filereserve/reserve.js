const fs = require('fs')

const data = require('./data.json')
const process = require('process')

const msg = process.argv.slice(2)
var count = 0

function LookFor(name) {
    while (true) {
        if (name.includes(data[count])) {
            return('true')
        } else {
            count++
        }
        if (count == 23) {
            return('false')
        }
    }
}

module.exports = { LookFor };