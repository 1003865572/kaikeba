const http = require('http');
const url = require('url');
const mysql = require('mysql');
// const crypot = require('crypot');
const zlib = require('zlib');
const fs = require('fs');

let db = mysql.createPool({host:'127.0.0.1', prot : '3306', user :'root',password:'root',database:'test'});

let service = http.createServer((req,rep)=>{

    let {pathname,query} = url.parse(req.url,true);
    let {user,pass} = query;

    switch(pathname){
        case '/req':
            db.query(`INSERT INTO user (user,pass) VALUES ("${user}","${pass}")`,(err,data)=>{
                if(err){
                    console.log(err);
                    rep.write('{"status":1,"msg":"失败"}');
                    rep.end();
                }else{
                    rep.write('{"status":0,"msg":"成功"}');
                    rep.end();
                }
            });
            console.log(user,pass);
            break;
        case '/login':
            db.query(`SELECT * FROM USER WHERE user="${user}"`,(err,data)=>{
                if(err){
                    rep.write(`{"status":1,msg:"登陆失败"}`);
                    rep.end();
                }else{
                    consoel.log(data);
                }
            });
            console.log(user,pass);
            break;
        default : 
            if(pathname.length < 2){
                pathname = '1.html';
            }
            let files = fs.createReadStream(`www/${pathname}`);
            rep.setHeader('content-encoding', 'gzip');
            let gz = zlib.createGzip();
            files.pipe(gz).pipe(rep);
            
            files.on('error',err=>{
                console.log(err);
                if(err){
                    console.log(`文件流error${err}`);
                    rep.writeHead(404);
                    rep.write('Not Found');
                    rep.end();
                }
            });
            break;
    }
        
});
service.listen(8080);

