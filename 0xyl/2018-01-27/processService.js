const http = require('http');
const cluster = require('cluster');
const process = require('process');
const os = require('os');

if(cluster.isMaster){
    console.log(`主进程的ID = ${process.pid}`);
    for(let i =0;i < os.cpus().length; i++){
        cluster.fork();
    }
    
}else{
    http.createServer((req,rep)=>{
        console.log(`工作进程${process.pid}`);
        rep.write('aaaa');
        rep.end();
    }).listen(8080);
}

