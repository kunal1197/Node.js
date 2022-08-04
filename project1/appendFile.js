var fs = require('fs')

fs.appendFile('calc.js', 'console.log("done")', function(err){
     console.log('Data saved') 
})