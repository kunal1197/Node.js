const http = require('http')
const fs = require('fs')

const port = process.env.PORT || 3000

const server = http.createServer((req, res) => {
    res.setHeader('Content-Type', 'text/html')
    if (req.url == '/') {
        res.statusCode = 200
        res.end('<h1> This is the game now </h1> <p> Hey this is something i should have done long back </p>')
    }
    else if (req.url == '/About') {
        res.statusCode = 200
        res.end('<h1> This is Kunal now </h1> <p> Hey this is something i should have done long back </p>')
    }
    else if (req.url == '/Hello') {
        res.statusCode = 200
        const data = fs.readFileSync('index.html')
        res.end(data.toString())
    }
    else {
        res.statusCode = 404
        res.end('Not found')
    }
})

server.listen(port, () => {
    console.log(`Server is listening on ${port}`)
})