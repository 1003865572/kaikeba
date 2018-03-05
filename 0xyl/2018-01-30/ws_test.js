const http = require('http');
const io = require('socket.io');

let service = http.createServer();
service.listen(8080);

let wsServer = io.listen(service);

wsServer.on('connection',(socket)=>{

    setInterval(function(){
        socket.emit('shijian',new Date());
    },1000);
    
});