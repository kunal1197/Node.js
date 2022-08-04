const fs = require('fs')

const a = fs.readFileSync('./second.js')
console.log(a.toString())

const b = fs.writeFileSync('file.js', 'data')
console.log(b)

