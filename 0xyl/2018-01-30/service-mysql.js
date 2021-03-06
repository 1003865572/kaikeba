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
        case '/req':
            console.log(user,pass);
            break;
        case '/login':
            console.log(user,pass);
            break;
    }

    
        let files = fs.createReadStream(`www/${pathname}`);
        rep.setHeader('content-encoding', 'gzip');
        let gz = zlib.createGzip();
        files.pipe(gz).pipe(rep);
        
        files.on('error',err=>{
            console.log(err);
            // if(err){
            //     console.log(`文件流error${err}`);
            //     rep.writeHead(404);
            //     rep.write('Not Found');
            //     rep.end();
            // }
        });


    
});
service.listen(8080);