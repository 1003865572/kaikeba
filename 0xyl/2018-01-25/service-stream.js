const http = require('http');
const fs = require('fs');

let service = http.createServer((req,rep)=>{
    let rs = fs.createReadStream(`www/${req.url}`);
    rs.pipe(rep);
    rs.on('error',err=>{
        rep.writeHead(404);
        rep.write('404');
        rep.end();
    });
});
service.listen(8089);