const http = require('http');
const url = require('url');
const mysql = require('mysql');
// const crypot = require('crypot');
const zlib = require('zlib');
const fs = require('fs');

let db = mysql.createPool({host:'127.0.0.1', prot : '3306', user :'root',password:'',database:'test'});

let service = http.createServer((req,rep)=>{
    
    let {pathname,query} = url.parse(req.url,true);
    let {user,pass} = query;

    console.log(pathname);
    
    switch(pathname){
        case '/1.html':
            let file = fs.createReadStream(`www/${pathname}`);
            let gz = zlib.createGzip();
            rep.setHeader('content-encoding','gzip');
            file.pipe(gz).pipe(rep);
            break;
        case '/req':
            console.log(user,pass);
            break;
        case '/login':
            console.log(user,pass);
            break;
        default :
            rep.writeHead('404');
            rep.writeHead('Not Found');
            rep.end();
            break;

    }
});
service.listen(8080);