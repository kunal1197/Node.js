const EventEmitter = require('events')

class MyEmitter extends EventEmitter {}

const myEmitter = new MyEmitter()
myEmitter.on('event', () => {
    console.log('an event occured')
    setTimeout(() => {
        console.log('Do the action reminder')
    }, 3000)
})

console.log('it is running')
myEmitter.emit('event')
console.log('still running')