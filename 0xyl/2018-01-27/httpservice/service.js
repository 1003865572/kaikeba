const http = require('http');
const uuid = require('uuid/v4');
const url = require('url');
const fs = require('fs');
const gzip = require('zlib');

http.createServer((req,rep)=>{

    if(req.url.indexOf('favicon.ico')!= -1){
        rep.writehead('404');
        rep.write('Not Found');
        rep.end();
    }else{
        if(req.headers['if-modified-since']){
            console.log('接收到的：'+req.headers['if-modified-since']);
            fs.stat(`www${req.url}`,(err,staer)=>{
                let {mtime} = staer;
                let STime = mtime.getTime();
                let CTime = new Date(req.headers['if-modified-since']).getTime();
                if(CTime => STime){
                    rep.writeHead('304');
                    rep.end();
                }
            });
        }else{
            let file = fs.createReadStream(`www${req.url}`);
            fs.stat(`www${req.url}`,(err,staer)=>{
                let {mtime} = staer;
                rep.setHeader('Last-Modified',mtime.toUTCString());
            });
            file.pipe(rep);
        }

    }


}).listen(8081);