const http = require('http');
const io = require('socket.io');

let httpServer = http.createServer();
httpServer.listen(8080);

let socket = io.listen(httpServer);

let arrSock = [];
socket.on('connection',(sock)=>{
    arrSock.push(sock);
    
    sock.on('disconect',()=>{
        let n = arrSock.indexOf(sock);
        if(n != -1){
            arrSock.splice(n ,1);
        }
    });
    sock.on('msg',(str)=>{
        console.log('客户端信息：'+str);
       arrSock.forEach(s=>{
           if(s != sock){
                s.emit('msg',str);
           }
       }); 
    });
});

setInterval(function(){
    console.log('socket数量: ' + arrSock.length);
},1000 * 5);