const http=require('http');
const fs=require('fs');
const zlib=require('zlib');

let server=http.createServer((req, res)=>{
  let rs=fs.createReadStream('./www'+req.url);
  let gz=zlib.createGzip();

  //asdfasdfasfasdfasd

  res.setHeader('Content-Encoding', 'gzip');
  rs.pipe(gz).pipe(res);

  rs.on('error', (err)=>{
    res.setHeader('Content-Encoding', '');
    res.writeHeader(404);
    res.write('Not Found');
    res.end();
  });
});
server.listen(8080);
