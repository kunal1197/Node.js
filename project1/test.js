var http = require('http')

http.createServer(function(req, res) {
    
    res.writeHead(200, {'Content-Type' : 'text/html'})
    res.end("Welcome back kunal")

}).listen(8080)