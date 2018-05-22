const Event = require('events').EventEmitter;

var ev = new Event();

ev.on('msg', (a, b, c) => {
    console.log('收到了 msg:', a, b, c)
})

ev.emit('msg', 2,1,3);