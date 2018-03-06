const mysql = require('mysql');
const fs = require('fs');
const http = require('http');
const zlib = require('zlib');
const urlLib = require('url');


let httpServer = http.createServer((req, res) => {
    const {pathname, query} = urlLib.parse(req.url, true);
    const {user, pass} = query;
    switch (pathname) {
        case '/reg' : 
            console.log('注册')
        break;
        case '/login' : 
            console.log('登录')
        break;
        default: 
            let rs = fs.createReadStream(`www${pathname}`);
            let gz = zlib.createGzip();
            res.setHeader('content-encoding', 'gzip')
            rs.pipe(gz).pipe(res);
            
            rs.on('error', () => {
                console.log(pathname);
                res.writeHeader(404);
                res.write('Not Found');
                res.end();
            })
    }
})

httpServer.listen(8888);
console.log('server runing is ok prot 8888');