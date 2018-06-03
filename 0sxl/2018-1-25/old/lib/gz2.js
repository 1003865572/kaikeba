const http = require('http');
const fs = require('fs');
const zlib = require('zlib');


let server = http.createServer((req, res) => {
  let rs = fs.createReadStream(`www${req.url}`);
  res.setHeader('content-encoding', 'gzip');

  const gz = zlib.createGzip();

  rs.pipe(gz).pipe(res);
  // rs.pipe(res);
  rs.on('error', () => {
    res.writeHeader(404);
    res.write('Not found');
    res.end()
  })
})

server.listen(3000)
