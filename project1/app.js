var fs = require('fs')

// Delete File
fs.unlink('calc1.js', function(err){
    console.log('Deleted')
})