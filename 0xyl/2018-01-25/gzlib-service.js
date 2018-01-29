const http = require('http');
const fs = require('fs');
const zlib = require('zlib');

let service = http.createServer((req,rep)=>{
    let rs = fs.createReadStream(`www/${req.url}`);
    rep.setHeader('content-encoding','gzip');
    let gzlib = zlib.createGzip();

    rs.pipe(gzlib).pipe(rep);

    rs.on('error',()=>{
        rep.writeHeader(404);
        rep.write('not Found');
        rep.end();
    });
});

service.listen(8080);