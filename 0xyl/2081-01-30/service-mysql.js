const http = require('http');
const url = require('url');
const mysql = require('mysql');
// const crypot = require('crypot');
const zlib = require('zlib');
const fs = require('fs');
let gz = zlib.createGzip();
let db = mysql.createPool({host:'127.0.0.1', prot : '3306', user :'root',password:'',database:'test'});

let service = http.createServer((req,rep)=>{
    
   

    let {pathname,query} = url.parse(req.url,true);
    let {user,pass} = query;

    console.log(pathname);
    
    switch(pathname){
        case '/req':
            console.log(user,pass);
            break;
        case '/login':
            console.log(user,pass);
            break;
    }

    try{
        let files = fs.createReadStream(`www/${pathname}`);
        rep.setHeader('content-encoding', 'gzip');
    
        files.pipe(gz).pipe(rep);
        
        files.on('error',err=>{
            console.log(`文件流error${err}`);
            rep.writeHead(404);
            rep.write('Not Found');
            rep.end();
        });
    }catch (e){
        console.log(`catch捕获到的异常：${e}`);
    }

    
});
service.listen(8080);