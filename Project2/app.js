const express = require('express')

const app = express();

app.get('/', function(req, res){
    res.send('Hello World')
})

// Query String Handler
app.get('/alien', function(req, res){
    const id = req.query.id
    res.send('Welcome Back Alien ' + id)
})

// Params String Handler
app.get('/alien/:id', function(req, res){
    const id = req.params.id
    res.send('Hey Kunal is back with a bang ' + id)
})

app.listen(8080, function(req, res){
    console.log('running')
});